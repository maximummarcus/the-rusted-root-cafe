// Secret admin — verify. The dashboard calls this on load; the admin UI does NOT mount
// in the DOM until this returns { authenticated: true }. Validates the signed httpOnly
// cookie set by adminLogin.
//
// No ../_shared imports — helpers inlined (Base44 bundler can't resolve local cross-file
// imports; doing so makes the function 404 with deploymentNotFound).

const COOKIE_NAME = "rrc_admin";
const TOKEN_PREFIX = "v1.";

const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
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

// NOTE: this same validation is intentionally inlined (copy/pasted) into every admin
// write function — Base44 cannot resolve local cross-file imports, so we cannot share it.
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
  return Response.json({ authenticated: await isAdminRequest(req) }, { status: 200 });
});
