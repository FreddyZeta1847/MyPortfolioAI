/**
 * App.tsx
 *
 * Root of the portfolio: providers, the first-visit intro, the fixed navbar and footer, and the
 * page in between — the home sections at "/", or one project's page at "/projects/<slug>"
 * (routing lives in utils/router.ts). On every route change it resets the scroll: top of the
 * project page, or back to the section the visitor was heading for on the home page.
 */
import { lazy, Suspense, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { IntroProvider } from './context/IntroContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import IntroSequence from './components/intro/IntroSequence';
import CustomCursor from './components/CustomCursor';
import AuroraBackground from './components/AuroraBackground';
import { getLenis } from './utils/lenis';
import { projectSlugOf, scrollToPendingSection, usePathname } from './utils/router';

const Education = lazy(() => import('./components/Education'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const BackToTop = lazy(() => import('./components/BackToTop'));
const ProjectPage = lazy(() => import('./components/ProjectPage'));

/** Scroll position after a route change (skipped on the first render: the browser handles it). */
function useScrollOnRouteChange(path: string) {
  const previous = useRef<string | null>(null);
  useEffect(() => {
    const from = previous.current;
    previous.current = path;
    if (from === null || from === path) return;
    if (projectSlugOf(path)) {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    } else {
      scrollToPendingSection(projectSlugOf(from) ? 'projects' : null);
    }
  }, [path]);
}

function App() {
  const path = usePathname();
  const slug = projectSlugOf(path);
  useScrollOnRouteChange(path);

  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <IntroProvider>
          <IntroSequence />
          <CustomCursor />
          <div className="min-h-screen bg-white dark:bg-surface-950 font-sans antialiased transition-colors duration-300">
            <AuroraBackground />
            <ScrollProgress />
            <Navbar />
            <main>
              {slug ? (
                <Suspense fallback={null}>
                  <ProjectPage slug={slug} />
                </Suspense>
              ) : (
                <>
                  <Hero />
                  <Suspense fallback={null}>
                    <Education />
                    <Experience />
                    <Skills />
                    <Projects />
                    <Contact />
                  </Suspense>
                </>
              )}
            </main>
            <Suspense fallback={null}>
              <Footer />
              <BackToTop />
            </Suspense>
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: '!bg-surface-50 dark:!bg-surface-900 !text-surface-800 dark:!text-surface-100 !border !border-surface-200 dark:!border-white/10 !shadow-glass',
                duration: 4000,
              }}
            />
          </div>
        </IntroProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export default App;
