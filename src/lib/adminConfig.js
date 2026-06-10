// ============================================================
// SECRET ADMIN — configuration
// ============================================================
//
// Layered lock: an obscure URL token + a password verified SERVER-SIDE.
//
// SECURITY MODE: the password is checked by the `adminLogin` backend function
// against the RRC_ADMIN_PASSWORD secret (Base44 → Secrets) — no password or
// password hash ships in client JS. On success the backend issues a random
// session token stored server-side (admin_session entity, 30-day expiry); the
// client keeps only that token, and every admin read/write goes through backend
// functions that re-validate it before touching data with the service role.
// See src/api/adminApi.js and base44/functions/admin*.
//
// TODO Marcus: set RRC_ADMIN_PASSWORD in Base44 → Secrets (Workspace → Settings).
// Until it is set, admin login fails closed (nobody can log in).
//
// The admin lives at /admin/<ADMIN_TOKEN>. Treat the slug like a second password:
// if it ever leaks (links, screenshots, the Base44 page index), rotate it by
// replacing ADMIN_TOKEN with a fresh 32-char random value.
export const ADMIN_TOKEN = 's7nOK5G028RCzEcmGTFt9xM8issGRrE3';

// Full admin path, e.g. "/admin/<token>".
export const ADMIN_PATH = `/admin/${ADMIN_TOKEN}`;

// TODO Marcus: paste the owner's Clover dashboard link here. Online orders are managed
// in Clover (not this site), so the Orders tab just deep-links here. Leave blank to show
// the "add your Clover dashboard link" setup note instead of the button.
export const CLOVER_DASHBOARD_URL = '';
