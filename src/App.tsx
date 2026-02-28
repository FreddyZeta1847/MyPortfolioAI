import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';

const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const BackToTop = lazy(() => import('./components/BackToTop'));

function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <LoadingScreen />
        <CustomCursor />
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans antialiased transition-colors duration-300">
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={null}>
              <Education />
              <Skills />
              <Projects />
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
            <BackToTop />
          </Suspense>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: '!bg-white dark:!bg-surface-800 !text-surface-800 dark:!text-surface-100 !shadow-glass',
              duration: 4000,
            }}
          />
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export default App;
