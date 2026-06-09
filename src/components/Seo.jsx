import { useEffect } from 'react';

export default function Seo({ title, description, noindex = false }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);

  useEffect(() => {
    const SELECTOR = 'meta[name="robots"][data-seo="noindex"]';
    const existing = document.querySelector(SELECTOR);
    if (noindex) {
      if (!existing) {
        const tag = document.createElement('meta');
        tag.setAttribute('name', 'robots');
        tag.setAttribute('content', 'noindex, nofollow');
        tag.setAttribute('data-seo', 'noindex');
        document.head.appendChild(tag);
      }
      return () => {
        document.querySelector(SELECTOR)?.remove();
      };
    }
    // Not a noindex page — make sure a stale tag from a previous route is removed.
    existing?.remove();
    return undefined;
  }, [noindex]);

  return null;
}