/**
 * IntroSequence.tsx
 *
 * First-visit cinematic intro (~5.5s): the dark bedroom fades in, the PC powers
 * on, three lines of code type out, then the camera pushes into the monitor
 * until its screen fills the viewport. Because the screen is a hole in the
 * overlay (see IntroScene), the "screen" the camera lands on is the live site.
 *
 * Timeline (seconds): room 0-0.8 · power-on 0.7-1.4 · typing 1.35-3.0 ·
 * push-in 3.0-4.8 · screen content fades 4.2-4.9 (Hero entrance starts) · unmount.
 *
 * Also owns: the scroll lock while playing, skip (button, click anywhere,
 * Esc / Enter / Space → quick fade), and marking the intro as seen.
 * Whether it plays at all is decided by introGate via IntroContext.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import type { AnimationPlaybackControls, AnimationSequence } from 'framer-motion';
import IntroScene from './IntroScene';
import { TOTAL_CODE_CHARS } from './introCode';
import { markIntroSeen } from './introGate';
import { useIntro } from '../../context/IntroContext';
import { getLenis } from '../../utils/lenis';

const TYPING_START_MS = 1350;
const TYPING_STEP_MS = 20;
const HERO_READY_MS = 4200;
const PUSH_START_S = 3.0;
const PUSH_DURATION_S = 1.8;
const SKIP_FADE_S = 0.35;
const SKIP_KEYS = new Set(['Escape', 'Enter', ' ']);

function lockScroll() {
  window.scrollTo(0, 0);
  document.documentElement.style.overflow = 'hidden';
  // Lenis is created in a parent effect that runs after ours, so wait a frame.
  requestAnimationFrame(() => getLenis()?.stop());
}

function unlockScroll() {
  document.documentElement.style.overflow = '';
  getLenis()?.start();
}

/** Scale + translate that brings the screen rect to the viewport center, filling it. */
function computePush(screen: Element) {
  const r = screen.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  return {
    origin: `${cx}px ${cy}px`,
    x: vw / 2 - cx,
    y: vh / 2 - cy,
    scale: Math.max(vw / r.width, vh / r.height) * 1.08,
  };
}

function buildSequence(push: ReturnType<typeof computePush>, stage: Element): AnimationSequence {
  return [
    ['[data-room]', { opacity: [0, 1] }, { duration: 0.8, at: 0 }],
    ['[data-pc-led]', { opacity: [0, 1] }, { duration: 0.2, at: 0.7 }],
    [
      '[data-crt]',
      { opacity: [0, 1, 1], scaleY: [0.015, 0.015, 1] },
      { duration: 0.5, at: 0.85, times: [0, 0.3, 1], ease: 'easeOut' },
    ],
    ['[data-spill]', { opacity: [0, 1] }, { duration: 0.6, at: 0.95 }],
    [
      stage,
      { x: push.x, y: push.y, scale: push.scale },
      { duration: PUSH_DURATION_S, at: PUSH_START_S, ease: [0.7, 0, 0.3, 1] },
    ],
    ['[data-screen-content]', { opacity: [1, 0] }, { duration: 0.7, at: 4.2 }],
  ];
}

function useTypewriter(active: boolean) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!active) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTyped((n) => {
          if (n + 1 >= TOTAL_CODE_CHARS) window.clearInterval(interval);
          return Math.min(n + 1, TOTAL_CODE_CHARS);
        });
      }, TYPING_STEP_MS);
    }, TYPING_START_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [active]);

  return typed;
}

export default function IntroSequence() {
  const { playIntro, heroReady, markHeroReady } = useIntro();
  const [active, setActive] = useState(playIntro);
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const endingRef = useRef(false);
  const typed = useTypewriter(active);

  const finish = useCallback(() => {
    markHeroReady();
    setActive(false);
  }, [markHeroReady]);

  const skip = useCallback(() => {
    if (endingRef.current || !scope.current) return;
    endingRef.current = true;
    controlsRef.current?.stop();
    markHeroReady();
    animate(scope.current.parentElement!, { opacity: 0 }, { duration: SKIP_FADE_S }).then(finish);
  }, [animate, finish, markHeroReady, scope]);

  // Main timeline
  useEffect(() => {
    if (!active || !scope.current) return;
    const stage = scope.current;
    const screen = stage.querySelector('[data-screen]');
    if (!screen) return;

    markIntroSeen();
    lockScroll();
    const push = computePush(screen);
    stage.style.transformOrigin = push.origin;

    // `cancelled` guards StrictMode's mount/unmount/remount in dev: a stopped
    // run must not end the intro that the remount is about to replay.
    let cancelled = false;
    const controls = animate(buildSequence(push, stage));
    controlsRef.current = controls;
    controls.then(() => {
      if (!cancelled && !endingRef.current) finish();
    });
    const heroTimer = window.setTimeout(markHeroReady, HERO_READY_MS);

    return () => {
      cancelled = true;
      controls.stop();
      window.clearTimeout(heroTimer);
      unlockScroll();
    };
  }, [active, animate, finish, markHeroReady, scope]);

  // Keyboard skip
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (!SKIP_KEYS.has(e.key)) return;
      e.preventDefault();
      skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, skip]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden cursor-pointer" onClick={skip}>
      <div ref={scope} className="absolute inset-0">
        <IntroScene typedChars={typed} />
      </div>
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroReady ? 0 : 1 }}
        transition={{ delay: heroReady ? 0 : 0.6, duration: 0.4 }}
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-lg border border-white/15 bg-black/40 text-sm font-medium text-surface-300 hover:text-white hover:border-primary-500 transition-colors"
      >
        Skip intro
      </motion.button>
    </div>
  );
}
