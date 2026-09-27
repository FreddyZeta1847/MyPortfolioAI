/**
 * introGate.ts
 *
 * Decides whether the first-visit intro should play, and remembers that it did.
 *
 * Rules:
 *  - `?intro` in the URL always forces it (handy for demos and testing).
 *  - prefers-reduced-motion never plays it (and counts as "seen").
 *  - otherwise it plays once per browser, tracked in localStorage.
 * Storage access can throw (private mode, blocked site data); in that case the
 * intro is skipped rather than risking it replaying on every load.
 */
const SEEN_KEY = 'portfolio-intro-seen-v1';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isForcedByUrl(): boolean {
  return new URLSearchParams(window.location.search).has('intro');
}

function hasSeenIntro(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) !== null;
  } catch {
    return true;
  }
}

export function markIntroSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Storage unavailable: nothing to remember, hasSeenIntro() already skips.
  }
}

export function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (isForcedByUrl()) return true;
  return !hasSeenIntro();
}
