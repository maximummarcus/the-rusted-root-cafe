// Client wrapper around the secret-admin backend functions.
//
// Auth is entirely server-side: the password is checked in `adminLogin` against the
// RRC_ADMIN_PASSWORD secret, and an httpOnly cookie carries the session. Because the
// Base44 SDK talks to a same-origin "/api/..." endpoint, that cookie is stored and resent
// automatically — the browser/JS never sees it. All writes go through password-cookie
// gated functions that use the service role, so they succeed without a Base44 user login.
//
// Note: base44.functions is configured with interceptResponses:false, so `invoke` resolves
// to the full axios response — the function's JSON body is on `res.data`, and non-2xx
// responses reject (we surface the message).

import { base44 } from '@/api/base44Client';

function errorMessage(err, fallback) {
  return err?.data?.error || err?.message || fallback;
}

export async function adminLogin(password) {
  const res = await base44.functions.invoke('adminLogin', { password });
  return res.data; // { success: boolean, error?: string }
}

export async function adminVerify() {
  try {
    const res = await base44.functions.invoke('adminVerify', {});
    return Boolean(res.data?.authenticated);
  } catch {
    return false;
  }
}

export async function adminLogout() {
  try {
    await base44.functions.invoke('adminLogout', {});
  } catch {
    // best-effort; the client redirects regardless
  }
}

export async function adminSaveSpecial(special, id) {
  try {
    const res = await base44.functions.invoke('adminSaveSpecial', { id, special });
    return res.data?.special;
  } catch (err) {
    throw new Error(errorMessage(err, 'Could not save the special.'));
  }
}

export async function adminDeleteSpecial(id) {
  try {
    await base44.functions.invoke('adminDeleteSpecial', { id });
  } catch (err) {
    throw new Error(errorMessage(err, 'Could not delete the special.'));
  }
}

export async function adminSetAvailability(menuItemId, available) {
  try {
    const res = await base44.functions.invoke('adminSetAvailability', {
      menu_item_id: menuItemId,
      available,
    });
    return res.data?.availability;
  } catch (err) {
    throw new Error(errorMessage(err, 'Could not update availability.'));
  }
}
