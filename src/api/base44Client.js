import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// serverUrl must point at Base44's real API host. This app is self-hosted on
// Vercel now (not served from a base44.app subdomain), so there is no
// same-origin proxy for a relative '' + '/api' path — that used to silently
// 404 (caught by callers' .catch() blocks), and after vercel.json gained a
// SPA catch-all rewrite it started resolving to index.html's HTML instead of
// JSON/an error, which crashed pages that call entities (Menu, Specials) and
// made AdminDashboard's base44.auth.me() "succeed" with garbage for every
// visitor, opening the dashboard to anyone. https://base44.app is Base44's
// API gateway and routes by the {appId} already embedded in every request
// path, so this works regardless of which app-specific subdomain (here
// rooted-cafe-co.base44.app) the app happens to live on, and it sends
// permissive CORS headers for exactly this external-hosting case.
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: 'https://base44.app',
  requiresAuth: false,
  appBaseUrl
});
