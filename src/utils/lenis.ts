import type Lenis from 'lenis';

// Module-level handle so non-React code (scrollTo) can drive the active Lenis
// instance. Null when smooth scroll is disabled (reduced motion) or unmounted.
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
