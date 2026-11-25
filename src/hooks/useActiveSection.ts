/**
 * useActiveSection.ts
 *
 * Which home-page section is in the middle of the screen, for the navbar's active indicator.
 * Sections are lazy-loaded and re-created when the visitor comes back from a project page, so
 * the observer is rebuilt on every route change and keeps picking up sections as they mount.
 * On a project page the answer is always "projects".
 */
import { useState, useEffect } from 'react';
import { projectSlugOf } from '../utils/router';

const SECTIONS = ['hero', 'education', 'experience', 'skills', 'projects', 'contact'];

export function useActiveSection(path: string) {
  const [activeSection, setActiveSection] = useState('hero');
  const onProjectPage = projectSlugOf(path) !== null;

  useEffect(() => {
    if (onProjectPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    const watched = new Set<string>();
    const observeMounted = () => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !watched.has(id)) {
          watched.add(id);
          observer.observe(el);
        }
      });
      if (watched.size === SECTIONS.length) window.clearInterval(timer);
    };
    const timer = window.setInterval(observeMounted, 300);
    const stop = window.setTimeout(() => window.clearInterval(timer), 5000);
    observeMounted();

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, [onProjectPage, path]);

  return onProjectPage ? 'projects' : activeSection;
}
