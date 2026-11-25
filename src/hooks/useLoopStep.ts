/**
 * useLoopStep.ts
 *
 * Drives the project scenes: starts on the last step (the finished frame), then loops — counts
 * steps 0 → count-1, one every `stepMs`, holds the last step
 * for `pauseMs` (the ~2 s rest Federico asked for between the end and the restart), then starts
 * again at 0 and bumps `cycle`. It only ticks while `active` (the scene is on screen); with
 * prefers-reduced-motion it stays on the last step, so every scene rests fully drawn.
 */
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useLoopStep(count: number, active: boolean, stepMs = 800, pauseMs = 2000) {
  const reduced = useReducedMotion();
  // Start on the finished frame: a scene never looks empty before it plays, and on entering
  // the screen it rests `pauseMs` like at the end of a loop, then replays from step 0.
  const [state, setState] = useState({ step: count - 1, cycle: 0 });

  useEffect(() => {
    if (!active || reduced) return;
    const last = state.step === count - 1;
    const timer = window.setTimeout(
      () => setState((s) => (last ? { step: 0, cycle: s.cycle + 1 } : { step: s.step + 1, cycle: s.cycle })),
      last ? pauseMs : stepMs
    );
    return () => window.clearTimeout(timer);
  }, [state, active, reduced, count, stepMs, pauseMs]);

  return reduced ? { step: count - 1, cycle: 0 } : state;
}
