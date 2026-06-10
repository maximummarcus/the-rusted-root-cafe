// Secret admin — login.
//
// Checks the submitted password against the RRC_ADMIN_PASSWORD secret SERVER-SIDE
// (the password never ships in client JS — not even a hash). On success it issues a
// random session token, stores ONLY its SHA-256 hash in the admin_session entity
// (30-day expiry, service role), and returns the token to the client. Every other
// admin function re-validates that token against the stored session, so the client
// holds nothing forgeable: minting a valid session requires the password.
//
// TODO Marcus: set RRC_ADMIN_PASSWORD in Base44 → Secrets. Until then login fails closed.
//
// CRITICAL Base44 deploy gotcha: do NOT use ../_shared/*.ts local imports — Base44's
// bundler can't resolve them and the function deploys silently broken (every call 404s
// with deploymentNotFound). All helpers below are inlined on purpose.

import { createClientFromRequest } from "npm:@base44/sdk";

// 30 days, matching the owner's expectation: the session stays active until manual
// logout or expiry (no inactivity timeout).
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

const enc = new TextEncoder();

function toHex(bytes: ArrayBuffer | Uint8Array): string {
  return Array.from(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(value)));
}

// Constant-time string comparison (inputs here are fixed-length hex digests).
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const adminPassword = Deno.env.get("RRC_ADMIN_PASSWORD");
  if (!adminPassword) {
    return Response.json(
      { success: false, error: "Admin password not configured. Set RRC_ADMIN_PASSWORD in Base44 → Secrets." },
      { status: 500 },
    );
  }

  let submitted = "";
  try {
    const body = await req.json();
    submitted = (body?.password ?? "").toString();
  } catch {
    // no/invalid body → treated as empty password
  }

  // Compare SHA-256 digests so the comparison is constant-length and constant-time.
  const ok = timingSafeEqual(await sha256Hex(submitted), await sha256Hex(adminPassword));
  if (!ok) {
    // 200 (not 4xx) so the SDK resolves instead of throwing; the client checks `success`.
    return Response.json({ success: false, error: "Incorrect password" }, { status: 200 });
  }

  // Random 256-bit session token. Only its hash is persisted, so a read of the
  // admin_session entity can never yield a usable credential.
  const tokenBytes = new Uint8Array(32);
  crypto.getRandomValues(tokenBytes);
  const token = toHex(tokenBytes);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  try {
    const base44 = createClientFromRequest(req);
    await base44.asServiceRole.entities.admin_session.create({
      token_hash: await sha256Hex(token),
      expires_at: expiresAt,
    });

    // Opportunistic cleanup of expired sessions; never blocks a successful login.
    try {
      const sessions = await base44.asServiceRole.entities.admin_session.list();
      for (const s of sessions ?? []) {
        const exp = Date.parse(s?.expires_at ?? "");
        if (!Number.isFinite(exp) || exp <= Date.now()) {
          await base44.asServiceRole.entities.admin_session.delete(s.id);
        }
      }
    } catch {
      /* best effort */
    }

    return Response.json({ success: true, token, expiresAt }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, error: String((error as Error)?.message ?? error) },
      { status: 500 },
    );
  }
});
