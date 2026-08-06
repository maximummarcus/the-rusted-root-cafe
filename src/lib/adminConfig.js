// ============================================================
// ADMIN — configuration
// ============================================================
//
// The admin lives at a fixed, plain path (ADMIN_PATH below) — no secret URL
// slug anymore. Access is gated by Base44 sign-in (Google or email/password,
// handled inline by src/components/admin/AdminLogin.jsx) and checked here in
// isAdminAuthorized(). Every write is independently enforced again by the
// admin-only write RLS on the Special and menu_item_availability entities
// (see src/api/adminApi.js) — that server-side check doesn't depend on
// isAdminAuthorized() below, so it's the real backstop either way.
//
// TEMPORARY (set 2026-08-06 at Marcus's request): isAdminAuthorized() admits
// ANY signed-in account for now, so signing in with Google is enough to reach
// the dashboard UI while this is being wired up. Reads/writes inside the
// dashboard will still fail for an account whose Base44 User role isn't
// 'admin' (RLS rejects them server-side). Tighten this back to a real check
// when ready, e.g.:
//   export const isAdminAuthorized = (user) => user?.role === 'admin';
export const isAdminAuthorized = (user) => Boolean(user);

// TODO Marcus: make sure your Base44 account's User role is 'admin' (Base44 ->
// Users) — needed for Specials/Stock/Orders to actually load and save once
// you're signed in, and it's what isAdminAuthorized() above should check once
// you tighten it back up.
export const ADMIN_PATH = '/admin';

// TODO Marcus: paste the owner's Clover dashboard link here. Online orders are managed
// in Clover (not this site), so the Orders tab just deep-links here. Leave blank to show
// the "add your Clover dashboard link" setup note instead of the button.
export const CLOVER_DASHBOARD_URL = '';
