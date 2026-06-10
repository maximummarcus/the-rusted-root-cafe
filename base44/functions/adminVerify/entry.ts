// Secret admin — verify. The dashboard calls this on load; the admin UI does NOT
// mount in the DOM until this returns { authenticated: true }. Validates the
// submitted session token against the server-side admin_session entity (hash
// lookup + expiry check) — the token in the browser proves nothing by itself.
//
// No ../_shared imports — this validation is intentionally inlined (copy/pasted)
// into every admin function: Base44 cannot resolve local cross-file imports, and
// using them deploys the function silently broken (404 deploymentNotFound).

import { createClientFromRequest } from "npm:@base44/sdk";

const enc = new TextEncoder();

function toHex(bytes: ArrayBuffer | Uint8Array): string {
  return Array.from(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(value)));
}

async function findValidSession(
  base44: ReturnType<typeof createClientFromRequest>,
  token: unknown,
) {
  if (typeof token !== "string" || token.length < 32) return null;
  const matches = await base44.asServiceRole.entities.admin_session.filter({
    token_hash: await sha256Hex(token),
  });
  const session = matches?.[0];
  if (!session) return null;
  const expiresAt = Date.parse(session.expires_at ?? "");
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    try {
      await base44.asServiceRole.entities.admin_session.delete(session.id);
    } catch {
      /* best effort */
    }
    return null;
  }
  return session;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let token: unknown = "";
  try {
    const body = await req.json();
    token = body?.token;
  } catch {
    // no/invalid body → unauthenticated
  }

  try {
    const base44 = createClientFromRequest(req);
    const session = await findValidSession(base44, token);
    return Response.json({ authenticated: Boolean(session) }, { status: 200 });
  } catch {
    return Response.json({ authenticated: false }, { status: 200 });
  }
});
