// Secret admin — set a menu item's availability (SOLD OUT toggle).
//
// Runs server-side with the service role after re-validating the session token
// against the admin_session entity — see adminSaveSpecial for the full rationale.
//
// No ../_shared imports — session validation inlined on purpose (Base44 cannot
// resolve local cross-file imports; using them 404s the function with
// deploymentNotFound).

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

  let body: { token?: unknown; menuItemId?: string; available?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const base44 = createClientFromRequest(req);
  if (!(await findValidSession(base44, body.token))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const menuItemId = (body.menuItemId ?? "").toString().trim();
  if (!menuItemId) {
    return Response.json({ error: "menuItemId is required" }, { status: 400 });
  }
  const available = Boolean(body.available);

  try {
    const existing = await base44.asServiceRole.entities.menu_item_availability.filter({
      menu_item_id: menuItemId,
    });
    const record = existing && existing.length > 0
      ? await base44.asServiceRole.entities.menu_item_availability.update(existing[0].id, { available })
      : await base44.asServiceRole.entities.menu_item_availability.create({ menu_item_id: menuItemId, available });
    return Response.json({ success: true, availability: record }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: String((error as Error)?.message ?? error) }, { status: 500 });
  }
});
