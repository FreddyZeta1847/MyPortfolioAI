/**
 * scrollTo.ts
 *
 * Scrolls to the element with the given id, through Lenis when smooth scrolling is on (falls
 * back to the browser otherwise). `immediate` jumps without animating — used when coming back
 * to the home page from a project page, where a long smooth scroll would feel slow.
 */
import { getLenis } from './lenis';

export const scrollToElement = (id: string, offset = -80, immediate = false) => {
  const element = document.getElementById(id);
  if (!element) return;

  const lenis = getLenis();
  if (lenis) {
    // After a route change the page height changed; Lenis would clamp to the old one.
    lenis.resize();
    lenis.scrollTo(element, { offset, immediate });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
};
