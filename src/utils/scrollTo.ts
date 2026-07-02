import { getLenis } from './lenis';

export const scrollToElement = (id: string, offset = -80) => {
  const element = document.getElementById(id);
  if (!element) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(element, { offset });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
};
