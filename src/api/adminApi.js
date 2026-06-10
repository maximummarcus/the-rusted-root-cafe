// Client wrapper around the secret-admin backend functions.
//
// Auth is server-side: `adminLogin` checks the password against the
// RRC_ADMIN_PASSWORD secret and issues a random session token that is stored
// server-side (admin_session entity, 30-day expiry). The client keeps only the
// token; it gates nothing by itself — every admin read/write below sends it to a
// backend function that re-validates it against the stored session before doing
// anything. A forged/expired token just gets 401s from every function.
//
// Writes go through those functions with the service role (asServiceRole), so
// they do not depend on open RLS on the Special / menu_item_availability entities.

import { base44 } from '@/api/base44Client';

const SESSION_KEY = 'rrc_admin_session';

// The pre-2026-06 admin used a forgeable client-side flag. Clear it on load so
// no stale state lingers; nothing reads it anymore.
try {
  localStorage.removeItem('rrc_admin_authed');
} catch {
  /* storage blocked (private mode) — nothing to clear */
}

function getToken() {
  try {
    return localStorage.getItem(SESSION_KEY) || '';
  } catch {
    return '';
  }
}

function setToken(token) {
  try {
    localStorage.setItem(SESSION_KEY, token);
  } catch {
    /* storage blocked — the session just won't survive a reload */
  }
}

function clearToken() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

// The SDK may resolve invoke() to the raw JSON body or to a response object
// with the body on `.data` depending on its interception config — accept both.
function bodyOf(res) {
  return res && typeof res === 'object' && 'data' in res ? res.data : res;
}

function errorMessage(err, fallback) {
  return err?.data?.error || err?.response?.data?.error || err?.message || fallback;
}

export async function adminLogin(password) {
  const res = await base44.functions.invoke('adminLogin', { password });
  const data = bodyOf(res);
  if (data?.success && data?.token) {
    setToken(data.token);
    return { success: true };
  }
  return { success: false, error: data?.error || 'Incorrect password' };
}

export async function adminVerify() {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await base44.functions.invoke('adminVerify', { token });
    const ok = Boolean(bodyOf(res)?.authenticated);
    if (!ok) clearToken();
    return ok;
  } catch {
    return false;
  }
}

export async function adminLogout() {
  const token = getToken();
  clearToken();
  if (!token) return;
  try {
    await base44.functions.invoke('adminLogout', { token });
  } catch {
    /* best-effort; the local token is already gone */
  }
}

export async function adminSaveSpecial(special, id) {
  try {
    const res = await base44.functions.invoke('adminSaveSpecial', {
      token: getToken(),
      id,
      special,
    });
    return bodyOf(res)?.special;
  } catch (err) {
    throw new Error(errorMessage(err, 'Could not save the special.'));
  }
}

export async function adminDeleteSpecial(id) {
  try {
    await base44.functions.invoke('adminDeleteSpecial', { token: getToken(), id });
  } catch (err) {
    throw new Error(errorMessage(err, 'Could not delete the special.'));
  }
}

export async function adminSetAvailability(menuItemId, available) {
  try {
    const res = await base44.functions.invoke('adminSetAvailability', {
      token: getToken(),
      menuItemId,
      available,
    });
    return bodyOf(res)?.availability;
  } catch (err) {
    throw new Error(errorMessage(err, 'Could not update availability.'));
  }
}
