// ============================================================
// HAMMY AWARDS campaign — single source of truth
// ============================================================
//
// The Rusted Root is nominated for Best Bakery in the Smithfield Times Hammy
// Awards (the paper's annual reader-voted local favorites contest). Three
// placements point at the ballot — the home page section, the site-wide
// first-visit popup, and the Vote nav tab — and every click is logged to the
// VoteClick entity (tagged by placement) so the owner can see engagement on
// the admin dashboard.
//
// Everything auto-expires: after HAMMY_VOTING_CLOSES the home section and
// popup unmount, the Vote tab drops out of the nav, and the /vote route shows
// a thank-you instead of the ballot link. Nothing needs to be manually
// removed when voting ends.
//
// Voting closes August 9, 2026 (owner-confirmed). After this date the whole
// campaign auto-retires — see the note above.

import { base44 } from '@/api/base44Client';

export const HAMMY_URL = 'https://www.smithfieldtimes.com/contests/hammy-awards';

// Last day voting is open (inclusive, local time).
export const HAMMY_VOTING_CLOSES = '2026-08-09';

export const hammyIsLive = () =>
  new Date() <= new Date(`${HAMMY_VOTING_CLOSES}T23:59:59`);

// Log the click (fire-and-forget — tracking must never block or delay the
// visitor), then open the ballot in a new tab. The VoteClick entity's create
// RLS is intentionally open because public visitors are anonymous and this
// app runs no backend functions; see base44/entities/VoteClick.jsonc.
export function openVote(source) {
  try {
    base44.entities.VoteClick.create({ source }).catch(() => {});
  } catch {
    /* tracking is best-effort only */
  }
  window.open(HAMMY_URL, '_blank', 'noopener');
}
