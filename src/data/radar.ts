import { RadarAxis } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// 👉 SET YOUR RADAR VALUES HERE (0–100).
// The axes (labels) are fixed to keep a clean hexagon. Only change the numbers
// to reflect how strong / central each domain is in your toolkit.
// 0 = none, 100 = max. The shape redraws automatically.
//
// Tip: keep the *relative* gaps meaningful — if everything is 90+ the shape
// flattens into the outer ring and loses its personality.
// ─────────────────────────────────────────────────────────────────────────────
export const radar: RadarAxis[] = [
  { label: 'AI / LLM',        value: 88 },
  { label: 'Web Dev',         value: 72 },
  { label: 'Cloud & DevOps',  value: 79 },
  { label: 'Languages',       value: 75 },
  { label: 'Databases',       value: 70 },
  { label: 'Networking',      value: 55 },
];
