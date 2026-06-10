// ============================================================
// SECRET ADMIN — configuration
// ============================================================
//
// Two layers guard the admin:
//   1. An obscure URL token (this slug) keeps the page from being discoverable.
//   2. Base44 account auth: the dashboard only opens for a logged-in user whose
//      role is 'admin', and every write is enforced again by the admin-only write
//      RLS on the Special and menu_item_availability entities. See
//      src/components/admin/AdminDashboard.jsx and src/api/adminApi.js.
//
// There is NO password in this app and NO backend function: Base44 backend (Deno)
// functions need the Builder plan + a separate deploy and were never deployed here,
// so the prior function-based login always 404'd. Native auth + RLS avoids both.
//
// TODO Marcus: make sure your Base44 account's User role is 'admin' (Base44 ->
// Users). Anyone signed in without that role gets an "access denied" notice.
//
// The admin lives at /admin/<ADMIN_TOKEN>. Treat the slug like a second password:
// if it ever leaks (links, screenshots, the Base44 page index), rotate it by
// replacing ADMIN_TOKEN with a fresh 32-char random value.
export const ADMIN_TOKEN = 'nHrt0DUJU0pikTKNoDMRSTmSTivzurmn';

// Full admin path, e.g. "/admin/<token>".
export const ADMIN_PATH = `/admin/${ADMIN_TOKEN}`;

// TODO Marcus: paste the owner's Clover dashboard link here. Online orders are managed
// in Clover (not this site), so the Orders tab just deep-links here. Leave blank to show
// the "add your Clover dashboard link" setup note instead of the button.
export const CLOVER_DASHBOARD_URL = '';
