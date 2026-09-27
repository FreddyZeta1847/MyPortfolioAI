/**
 * introCode.ts
 *
 * The three lines of code typed on the monitor during the intro, split into
 * colored segments (simple syntax highlighting), and their total length,
 * which drives the typewriter in IntroSequence.
 */
import { C } from './introPalette';

export type Segment = { t: string; c: string };

export const CODE_LINES: Segment[][] = [
  [
    { t: 'const ', c: C.teal },
    { t: 'dev', c: C.text },
    { t: ' = ', c: C.dim },
    { t: '"Federico Santini"', c: C.rustLight },
    { t: ';', c: C.dim },
  ],
  [
    { t: 'await ', c: C.teal },
    { t: 'build', c: C.tealLight },
    { t: '(', c: C.dim },
    { t: 'portfolio', c: C.text },
    { t: ');', c: C.dim },
  ],
  [
    { t: '> ', c: C.rust },
    { t: 'launching…', c: C.dim },
  ],
];

export const TOTAL_CODE_CHARS = CODE_LINES.reduce(
  (sum, line) => sum + line.reduce((n, seg) => n + seg.t.length, 0),
  0,
);
