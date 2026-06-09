// Secret admin — create or update a Special.
//
// Why this runs server-side with the service role instead of a direct client entity
// write: the owner authenticates to this admin only with the secret password (no Base44
// user login on her phone), so a browser write would be anonymous and rejected by the
// Special RLS write rule ({ role: "admin" }) — that is the classic "Update failed" bug.
// Here we verify the admin password cookie, then write via asServiceRole, which is the
// admin-gated path. RLS on the entity stays { write: admin } as defense-in-depth.
//
// No ../_shared imports — the admin-cookie validation is inlined (Base44 can't resolve
// local cross-file imports; doing so 404s the function with deploymentNotFound).

import { createClientFromRequest } from "npm:@base44/sdk";

const COOKIE_NAME = "rrc_admin";
const TOKEN_PREFIX = "v1.";
const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function hmacHex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(value)));
}
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}
function getCookie(req: Request, name: string): string | null {
  const header = req.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}
async function isAdminRequest(req: Request): Promise<boolean> {
  const adminPassword = Deno.env.get("RRC_ADMIN_PASSWORD");
  if (!adminPassword) return false;
  const token = getCookie(req, COOKIE_NAME);
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!payload.startsWith(TOKEN_PREFIX)) return false;
  return timingSafeEqual(sig, await hmacHex(payload, adminPassword));
}

const ALLOWED_FIELDS = ["title", "description", "price", "type", "image_url", "active", "sort_order", "month_label"];

Deno.serve(async (req) => {
  if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
  if (!(await isAdminRequest(req))) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body: { id?: string; special?: Record<string, unknown> } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const input = body.special ?? {};
  const data: Record<string, unknown> = {};
  for (const f of ALLOWED_FIELDS) {
    if (input[f] !== undefined) data[f] = input[f];
  }
  if (!data.title || String(data.title).trim() === "") {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const base44 = createClientFromRequest(req);
    const record = body.id
      ? await base44.asServiceRole.entities.Special.update(body.id, data)
      : await base44.asServiceRole.entities.Special.create(data);
    return Response.json({ success: true, special: record }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: String((error as Error)?.message ?? error) }, { status: 500 });
  }
});
