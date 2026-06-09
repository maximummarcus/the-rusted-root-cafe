// TODO Marcus: set RRC_ADMIN_PASSWORD in Base44 → Secrets. Tell the owner to change it after first login.
//
// Secret admin — login. Checks the submitted password against the RRC_ADMIN_PASSWORD
// secret SERVER-SIDE (the password never ships in client JS, so it can't be read from
// page source). On success it sets an httpOnly, signed session cookie that adminVerify
// (and the admin write functions) validate on every call.
//
// CRITICAL Base44 deploy gotcha: do NOT use ../_shared/*.ts local imports — Base44's
// bundler can't resolve them and the function deploys silently broken (every call 404s
// with deploymentNotFound). All helpers below are inlined on purpose.

const COOKIE_NAME = "rrc_admin";
const TOKEN_PREFIX = "v1.";
// 30 days. Matches Luna's: the session stays active until manual logout (no inactivity timeout).
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(value)));
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

  // Stateless signed session token: payload is signed with the admin password so any
  // other function can validate it without a shared session store. Changing the password
  // automatically invalidates every existing cookie.
  const payload = `${TOKEN_PREFIX}${Date.now()}`;
  const token = `${payload}.${await hmacHex(payload, adminPassword)}`;

  const cookie = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${MAX_AGE_SECONDS}`,
  ].join("; ");

  return Response.json({ success: true }, { status: 200, headers: { "Set-Cookie": cookie } });
});
