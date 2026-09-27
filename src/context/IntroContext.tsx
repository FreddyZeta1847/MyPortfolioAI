/**
 * IntroContext.tsx
 *
 * Shares the first-visit intro state between the intro overlay and the Hero.
 *
 * `playIntro` is decided once on load. `heroReady` tells the Hero when to run
 * its entrance animations: immediately when there is no intro, or at the
 * moment the intro starts revealing the site through the monitor screen, so
 * the name slide-in is seen instead of playing hidden behind the overlay.
 */
import { createContext, useCallback, useContext, useState } from 'react';
import { shouldPlayIntro } from '../components/intro/introGate';

interface IntroState {
  playIntro: boolean;
  heroReady: boolean;
  markHeroReady: () => void;
}

const IntroContext = createContext<IntroState>({
  playIntro: false,
  heroReady: true,
  markHeroReady: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [playIntro] = useState(shouldPlayIntro);
  const [heroReady, setHeroReady] = useState(!playIntro);
  const markHeroReady = useCallback(() => setHeroReady(true), []);

  return (
    <IntroContext.Provider value={{ playIntro, heroReady, markHeroReady }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
