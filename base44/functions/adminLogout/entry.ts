// Secret admin — logout. Clears the httpOnly session cookie (the client cannot clear an
// httpOnly cookie itself, so this must happen server-side). The client redirects to "/".
//
// No ../_shared imports — nothing to inline here beyond the cookie name.

const COOKIE_NAME = "rrc_admin";

Deno.serve(() => {
  const cookie = [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Max-Age=0",
  ].join("; ");

  return Response.json({ success: true }, { status: 200, headers: { "Set-Cookie": cookie } });
});
