/**
 * router.ts
 *
 * The site's whole routing, in a few lines and without a library: the home page at "/" and one
 * page per featured project at "/projects/<slug>" (Azure serves index.html for both, see
 * public/staticwebapp.config.json).
 *
 * - usePathname(): the current path, re-rendering on navigate() and on browser Back/Forward.
 * - navigate(path, section?): pushes a new history entry; `section` is the home-page section to
 *   scroll to once the home page has rendered (consumed by scrollToPendingSection).
 * - followLink(e, path): onClick for <a href> links, so a plain click stays in the app while
 *   ctrl/cmd/middle click still opens a new tab.
 * - goToSection(id): navbar/footer behaviour — scroll on the home page, or go home then scroll.
 */
import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { scrollToElement } from './scrollTo';

const NAVIGATE_EVENT = 'app:navigate';
let pendingSection: string | null = null;

export function projectSlugOf(path: string): string | null {
  const match = path.match(/^\/projects\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function navigate(path: string, section: string | null = null) {
  pendingSection = section;
  if (path !== window.location.pathname) window.history.pushState(null, '', path);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

export function followLink(e: MouseEvent<HTMLAnchorElement>, path: string, section: string | null = null) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigate(path, section);
}

export function goToSection(id: string) {
  if (!projectSlugOf(window.location.pathname)) scrollToElement(id);
  else navigate('/', id);
}

export function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    window.addEventListener(NAVIGATE_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);
  return path;
}

/**
 * Called once the home page is back on screen. Sections are lazy-loaded, so the target may not
 * exist yet: retry for up to ~3 s. `fallback` is used when nothing asked for a section
 * (e.g. browser Back from a project page lands on the Projects section).
 */
export function scrollToPendingSection(fallback: string | null) {
  const id = pendingSection ?? fallback;
  pendingSection = null;
  if (!id) return;
  let tries = 0;
  const timer = window.setInterval(() => {
    if (document.getElementById(id) || ++tries > 60) {
      window.clearInterval(timer);
      scrollToElement(id, -80, true);
    }
  }, 50);
}
