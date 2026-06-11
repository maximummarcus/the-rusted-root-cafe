import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 


export const isIframe = window.self !== window.top;

// Compact "x min ago" style relative timestamp used in the admin dashboard.
// Base44 returns entity timestamps (created_date/updated_date) as timezone-naive
// UTC strings like "2026-06-10T23:54:14.503000". new Date() reads a tz-less
// string as LOCAL time, which placed stored times hours in the future in US
// timezones and clamped every recent toggle to a permanent "just now" — so
// append Z to naive strings to parse them as the UTC instants they are.
export function timeAgo(value) {
  if (!value) return '';
  const isNaiveIso =
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value) &&
    !/(Z|[+-]\d{2}:?\d{2})$/i.test(value);
  const then = new Date(isNaiveIso ? `${value}Z` : value).getTime();
  if (Number.isNaN(then)) return '';
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}
