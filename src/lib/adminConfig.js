// ============================================================
// SECRET ADMIN — configuration
// ============================================================
//
// Layered lock: an obscure URL token + a server-checked password.
//
// TODO Marcus: change ADMIN_TOKEN to your own random slug before launch. The admin lives
// at /admin/<ADMIN_TOKEN>. Treat this slug like a second password — only the owner gets
// the full link. (The password itself lives in Base44 → Secrets as RRC_ADMIN_PASSWORD and
// is checked server-side; it is never in this file or any client JS.)
export const ADMIN_TOKEN = 'rr-7q9x2k4m8p';

// Full admin path, e.g. "/admin/rr-7q9x2k4m8p".
export const ADMIN_PATH = `/admin/${ADMIN_TOKEN}`;

// TODO Marcus: paste the owner's Clover dashboard link here. Online orders are managed in
// Clover (not this site), so the Orders tab just deep-links here. Leave blank to show the
// "add your Clover dashboard link" setup note instead of the button.
export const CLOVER_DASHBOARD_URL = '';
