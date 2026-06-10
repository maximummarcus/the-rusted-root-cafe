// Client admin data layer.
//
// Auth model: the admin is a logged-in Base44 user whose role is 'admin' (see
// AdminDashboard, which gates on base44.auth.me().role). These helpers talk to
// the entities directly; every write is authorized server-side by the entities'
// admin-only write RLS (write: { user_condition: { role: 'admin' } }), so a
// non-admin or anonymous caller is rejected by the platform regardless of the UI.
//
// No backend functions are involved: Base44 backend (Deno) functions require the
// Builder plan and a separate deploy, and were never deployed on this app, so the
// previous function-based login always 404'd. Native auth + RLS needs neither.

import { base44 } from '@/api/base44Client';

// Clear credentials left by the previous password/token-based admin so nothing stale lingers.
for (const key of ['rrc_admin_authed', 'rrc_admin_session']) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* storage blocked (private mode) — nothing to clear */
  }
}

// Only the fields the Special form owns, so a stray key never reaches the entity.
const SPECIAL_FIELDS = ['title', 'description', 'price', 'type', 'image_url', 'active', 'sort_order', 'month_label'];

function pickSpecial(special) {
  const data = {};
  for (const f of SPECIAL_FIELDS) {
    if (special?.[f] !== undefined) data[f] = special[f];
  }
  return data;
}

// A permission failure here means the user is not an admin (or their login lapsed),
// since the entity write RLS only admits role:admin. Surface that clearly.
function adminErrorMessage(err, fallback) {
  const status = err?.status ?? err?.response?.status;
  if (status === 401 || status === 403) {
    return 'Not authorized. Please log in again with the café’s admin account.';
  }
  return err?.message || fallback;
}

export async function adminSaveSpecial(special, id) {
  const data = pickSpecial(special);
  try {
    return id
      ? await base44.entities.Special.update(id, data)
      : await base44.entities.Special.create(data);
  } catch (err) {
    throw new Error(adminErrorMessage(err, 'Could not save the special.'));
  }
}

export async function adminDeleteSpecial(id) {
  try {
    await base44.entities.Special.delete(id);
  } catch (err) {
    throw new Error(adminErrorMessage(err, 'Could not delete the special.'));
  }
}

export async function adminSetAvailability(menuItemId, available) {
  try {
    // One row per menu item (keyed by name): update it if present, else create it.
    const existing = await base44.entities.menu_item_availability.filter({ menu_item_id: menuItemId });
    const row = existing?.[0];
    return row
      ? await base44.entities.menu_item_availability.update(row.id, { available })
      : await base44.entities.menu_item_availability.create({ menu_item_id: menuItemId, available });
  } catch (err) {
    throw new Error(adminErrorMessage(err, 'Could not update availability.'));
  }
}
