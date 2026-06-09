// Admin operations — client-side only (no backend functions on this Base44 plan).
//
// Auth: the password is hashed in the browser and compared to ADMIN_PASSWORD_SHA256.
// A flag in localStorage keeps the session active until logout (no inactivity timeout).
// This is a lightweight gate, NOT server-side security — see src/lib/adminConfig.js.
//
// Writes: go directly through base44.entities. The Special and menu_item_availability
// entities use public write RLS so these succeed without a logged-in Base44 account.

import { base44 } from '@/api/base44Client';
import { ADMIN_PASSWORD_SHA256 } from '@/lib/adminConfig';

const AUTH_KEY = 'rrc_admin_authed';

async function sha256Hex(value) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function adminLogin(password) {
  const hash = await sha256Hex(password || '');
  if (hash === ADMIN_PASSWORD_SHA256) {
    localStorage.setItem(AUTH_KEY, '1');
    return { success: true };
  }
  return { success: false, error: 'Incorrect password' };
}

export async function adminVerify() {
  return localStorage.getItem(AUTH_KEY) === '1';
}

export async function adminLogout() {
  localStorage.removeItem(AUTH_KEY);
}

const SPECIAL_FIELDS = ['title', 'description', 'price', 'type', 'image_url', 'active', 'sort_order', 'month_label'];

export async function adminSaveSpecial(special, id) {
  const data = {};
  for (const f of SPECIAL_FIELDS) {
    if (special[f] !== undefined) data[f] = special[f];
  }
  try {
    return id
      ? await base44.entities.Special.update(id, data)
      : await base44.entities.Special.create(data);
  } catch (err) {
    throw new Error(err?.message || 'Could not save the special.');
  }
}

export async function adminDeleteSpecial(id) {
  try {
    await base44.entities.Special.delete(id);
  } catch (err) {
    throw new Error(err?.message || 'Could not delete the special.');
  }
}

export async function adminSetAvailability(menuItemId, available) {
  try {
    const existing = await base44.entities.menu_item_availability.filter({ menu_item_id: menuItemId });
    if (existing && existing.length > 0) {
      return await base44.entities.menu_item_availability.update(existing[0].id, { available });
    }
    return await base44.entities.menu_item_availability.create({ menu_item_id: menuItemId, available });
  } catch (err) {
    throw new Error(err?.message || 'Could not update availability.');
  }
}
