// Secret admin — delete a Special. Password-cookie gated; writes via the service role.
// See adminSaveSpecial for the rationale. No ../_shared imports — validation inlined.

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

Deno.serve(async (req) => {
  if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
  if (!(await isAdminRequest(req))) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body: { id?: string } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.id) return Response.json({ error: "id is required" }, { status: 400 });

  try {
    const base44 = createClientFromRequest(req);
    await base44.asServiceRole.entities.Special.delete(body.id);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: String((error as Error)?.message ?? error) }, { status: 500 });
  }
});
