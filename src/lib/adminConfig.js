// ============================================================
// SECRET ADMIN — configuration
// ============================================================
//
// Layered lock: an obscure URL token + a password checked in the browser.
//
// NOTE ON SECURITY MODE: This app's Base44 plan does not deploy backend functions,
// so the password can't be checked server-side. Instead it's checked client-side
// against the SHA-256 hash below, a localStorage flag keeps the session, and the
// Special / menu_item_availability entities have public write rules so the
// dashboard can save without a logged-in account.
// This is a deliberately lightweight gate ("keep casual visitors out") for a
// low-stakes work-in-progress site — it is NOT strong security: someone technical
// could bypass the gate or write via the API.
//
// TODO (launch gate): server-side password verification + restricted RLS on the
// Special / menu_item_availability entities are required before real launch.
//
// The admin lives at /admin/<ADMIN_TOKEN>. Treat the slug like a second password:
// if it ever leaks (links, screenshots, the Base44 page index), rotate it by
// replacing ADMIN_TOKEN with a fresh 32-char random value.
export const ADMIN_TOKEN = 'ee1grSVD9wDrLcqh6G6JDb3ubyvLFaF3';

// Full admin path, e.g. "/admin/rr-...".
export const ADMIN_PATH = `/admin/${ADMIN_TOKEN}`;

// SHA-256 hash of the admin password. The plaintext is never stored in this repo
// or its history of comments. To change the password, run
//   printf '%s' 'YOUR NEW PASSWORD' | openssl dgst -sha256
// and paste the hex value below.
export const ADMIN_PASSWORD_SHA256 = '8e66fd75e8aa0a9edecbb4793e11590ebd910a06ac5dbbff8c28cd8afa9d03f9';

// TODO Marcus: paste the owner's Clover dashboard link here. Online orders are managed
// in Clover (not this site), so the Orders tab just deep-links here. Leave blank to show
// the "add your Clover dashboard link" setup note instead of the button.
export const CLOVER_DASHBOARD_URL = '';
