// Secret admin — create or update a Special.
//
// Runs server-side with the service role: the browser never writes this entity
// directly, so the write does not rely on the entity's RLS being open. The session
// token is re-validated against the admin_session entity on EVERY call — a forged
// or expired token gets a 401 and no write happens.
//
// No ../_shared imports — the session validation is intentionally inlined
// (copy/pasted) into every admin function: Base44 cannot resolve local cross-file
// imports, and using them deploys the function silently broken (404 deploymentNotFound).

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

const ALLOWED_FIELDS = ["title", "description", "price", "type", "image_url", "active", "sort_order", "month_label"];

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: { token?: unknown; id?: string; special?: Record<string, unknown> } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const base44 = createClientFromRequest(req);
  if (!(await findValidSession(base44, body.token))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const input = body.special ?? {};
  const data: Record<string, unknown> = {};
  for (const f of ALLOWED_FIELDS) {
    if (input[f] !== undefined) data[f] = input[f];
  }
  if (body.id === undefined && (!data.title || String(data.title).trim() === "")) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const record = body.id
      ? await base44.asServiceRole.entities.Special.update(body.id, data)
      : await base44.asServiceRole.entities.Special.create(data);
    return Response.json({ success: true, special: record }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: String((error as Error)?.message ?? error) }, { status: 500 });
  }
});
