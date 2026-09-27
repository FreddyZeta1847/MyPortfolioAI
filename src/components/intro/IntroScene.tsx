/**
 * IntroScene.tsx
 *
 * Pure SVG artwork for the first-visit intro: a dark, flat-cartoon bedroom
 * (window with moon and skyline, desk lamp, PC, monitor, bed, poster, plant)
 * in the site's teal / rust palette.
 *
 * The key trick: every piece of the room is drawn through a mask whose only
 * hole is the monitor's screen (SCREEN). The real website, rendered under the
 * overlay, shows through that hole. The "screen content" group (dark glass +
 * typed code) sits on top of the hole until IntroSequence fades it out, which
 * is what turns the monitor into the live site.
 *
 * Animated parts are tagged with data-* attributes (data-room, data-pc-led,
 * data-crt, data-spill, data-screen-content, data-screen) and driven by
 * IntroSequence; this file has no timing logic. `typedChars` controls how
 * much of the code on screen is visible.
 */
import { motion } from 'framer-motion';
import { C } from './introPalette';
import { CODE_LINES, type Segment } from './introCode';

/** Monitor screen rectangle in viewBox units: the hole into the real site. */
const SCREEN = { x: 640, y: 300, w: 320, h: 184 };

const CODE_X = 676;
const CODE_Y0 = 348;
const CODE_LINE_H = 24;
const CHAR_W = 7.5; // JetBrains Mono at 12.5px is ~0.6em wide

function Defs() {
  return (
    <defs>
      <linearGradient id="intro-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.wallTop} />
        <stop offset="100%" stopColor={C.wallBottom} />
      </linearGradient>
      <linearGradient id="intro-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#071218" />
        <stop offset="100%" stopColor="#0f2a30" />
      </linearGradient>
      <radialGradient id="intro-lamp-glow">
        <stop offset="0%" stopColor={C.rust} stopOpacity="0.45" />
        <stop offset="100%" stopColor={C.rust} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="intro-lamp-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.rustLight} stopOpacity="0.35" />
        <stop offset="100%" stopColor={C.rustLight} stopOpacity="0" />
      </linearGradient>
      <radialGradient id="intro-screen-halo">
        <stop offset="0%" stopColor={C.teal} stopOpacity="0.28" />
        <stop offset="100%" stopColor={C.teal} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="intro-screen-bg" cx="50%" cy="40%" r="75%">
        <stop offset="0%" stopColor="#10262a" />
        <stop offset="100%" stopColor="#071012" />
      </radialGradient>
      <radialGradient id="intro-vignette" cx="50%" cy="48%" r="70%">
        <stop offset="55%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
      </radialGradient>
      <mask id="intro-screen-hole" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
        <rect x="0" y="0" width="1600" height="900" fill="#fff" />
        <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx="3" fill="#000" />
      </mask>
    </defs>
  );
}

function Window() {
  return (
    <g>
      <rect x="170" y="150" width="260" height="270" rx="6" fill="url(#intro-sky)" />
      {[
        [210, 190], [250, 230], [395, 180], [205, 260], [280, 175], [330, 250], [410, 275],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill={C.text} opacity="0.7" />
      ))}
      <circle cx="355" cy="215" r="26" fill={C.text} opacity="0.92" />
      <circle cx="367" cy="207" r="23" fill="#0a1a20" />
      <path
        d="M170 420 V350 h28 v-30 h24 v40 h30 v-55 h26 v45 h22 v-25 h30 v40 h26 v-35 h24 v60 h20 V420 Z"
        fill="#06101a"
      />
      {[[180, 360], [232, 335], [262, 372], [312, 360], [372, 378], [240, 390]].map(([x, y], i) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="5" height="6" fill={i % 2 ? C.rust : C.teal} opacity="0.7" />
      ))}
      <rect x="170" y="150" width="260" height="270" rx="6" fill="none" stroke={C.mid} strokeWidth="12" />
      <line x1="300" y1="150" x2="300" y2="420" stroke={C.mid} strokeWidth="8" />
      <line x1="170" y1="285" x2="430" y2="285" stroke={C.mid} strokeWidth="8" />
      <rect x="160" y="420" width="280" height="10" rx="2" fill={C.soft} />
      <path d="M150 130 C175 230 160 340 180 440 L140 440 L140 130 Z" fill={C.tealDeep} opacity="0.45" />
      <rect x="130" y="124" width="320" height="8" rx="4" fill={C.line} />
      {/* moonlight falling on the floor */}
      <polygon points="190,430 430,430 700,900 330,900" fill={C.tealLight} opacity="0.035" />
    </g>
  );
}

function WallDecor() {
  return (
    <g>
      {/* shelf with books */}
      <rect x="455" y="238" width="150" height="7" rx="2" fill={C.line} />
      {[
        [468, 196, 14, C.tealDeep], [484, 204, 12, C.rustDeep], [498, 190, 16, C.soft],
        [516, 200, 12, C.teal], [536, 214, 30, C.muted],
      ].map(([x, y, w, fill]) => (
        <rect key={`${x}`} x={x as number} y={y as number} width={w as number}
          height={238 - (y as number)} rx="2" fill={fill as string} />
      ))}
      {/* poster: sunset over hills */}
      <rect x="1040" y="165" width="150" height="200" rx="4" fill={C.mid} stroke={C.line} strokeWidth="4" />
      <rect x="1054" y="179" width="122" height="150" fill="#1a1426" />
      <circle cx="1115" cy="270" r="30" fill={C.rust} />
      <polygon points="1054,329 1054,290 1090,262 1128,300 1150,282 1176,305 1176,329" fill={C.tealDeep} />
      <polygon points="1054,329 1054,312 1100,294 1176,322 1176,329" fill={C.tealDark} />
      <text x="1115" y="352" textAnchor="middle" fontFamily="JetBrains Mono, monospace"
        fontSize="10" fill={C.dim} letterSpacing="2">
        SHIP IT
      </text>
    </g>
  );
}

function Lamp() {
  return (
    <g>
      <circle cx="570" cy="430" r="190" fill="url(#intro-lamp-glow)" />
      <polygon points="548,428 592,418 690,540 470,540" fill="url(#intro-lamp-cone)" />
      <ellipse cx="480" cy="539" rx="34" ry="6" fill={C.soft} />
      <path d="M480 536 L505 450 L560 405" fill="none" stroke={C.line} strokeWidth="6"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="505" cy="450" r="5" fill={C.line} />
      <path d="M535 395 L588 382 L602 420 L548 432 Z" fill={C.rust} />
      <ellipse cx="575" cy="426" rx="27" ry="5" fill={C.rustLight} transform="rotate(-13 575 426)" />
    </g>
  );
}

function Desk() {
  return (
    <g>
      <polygon points="380,540 1220,540 1242,562 358,562" fill={C.line} />
      <rect x="358" y="562" width="884" height="16" fill={C.mid} />
      <rect x="386" y="578" width="16" height="124" fill={C.mid} />
      <rect x="1198" y="578" width="16" height="124" fill={C.mid} />
      <rect x="1060" y="578" width="138" height="90" fill={C.dark} />
      <rect x="1110" y="618" width="38" height="5" rx="2" fill={C.line} />
      {/* PC tower under the desk */}
      <rect x="420" y="596" width="72" height="106" rx="5" fill={C.mid} stroke={C.soft} strokeWidth="2" />
      <rect x="432" y="610" width="48" height="4" rx="2" fill={C.soft} />
      <rect data-pc-led x="432" y="620" width="48" height="3" rx="1.5" fill={C.teal} opacity={0} />
    </g>
  );
}

function Monitor() {
  return (
    <g>
      <rect x="784" y="496" width="32" height="40" fill={C.soft} />
      <ellipse cx="800" cy="539" rx="80" ry="7" fill={C.soft} />
      <rect x="624" y="284" width="352" height="216" rx="12" fill={C.mid} stroke={C.line} strokeWidth="3" />
      <circle data-pc-led cx="958" cy="492" r="2.5" fill={C.teal} opacity={0} />
    </g>
  );
}

function DeskItems() {
  return (
    <g>
      <polygon points="690,548 904,548 912,559 682,559" fill={C.mid} stroke={C.line} strokeWidth="1.5" />
      <line x1="700" y1="553.5" x2="894" y2="553.5" stroke={C.soft} strokeWidth="2" strokeDasharray="6 3" />
      <ellipse cx="950" cy="553" rx="12" ry="5" fill={C.mid} stroke={C.line} strokeWidth="1.5" />
      {/* mug */}
      <rect x="1004" y="513" width="24" height="28" rx="3" fill={C.rustDeep} />
      <path d="M1028 519 q10 0 10 8 q0 8 -10 8" fill="none" stroke={C.rustDeep} strokeWidth="4" />
      {/* plant */}
      <path d="M1150 510 q-26 -22 -12 -52 q18 18 12 52" fill={C.tealDeep} />
      <path d="M1160 510 q6 -40 32 -48 q2 34 -32 48" fill={C.teal} />
      <path d="M1155 510 q-4 -34 8 -62 q14 30 -8 62" fill={C.tealDark} />
      <polygon points="1136,508 1180,508 1174,540 1142,540" fill={C.rustDark} />
    </g>
  );
}

function Bed() {
  return (
    <g>
      <rect x="1285" y="520" width="18" height="182" rx="4" fill={C.soft} />
      <rect x="1296" y="600" width="320" height="100" fill={C.mid} />
      <rect x="1296" y="578" width="320" height="30" rx="8" fill={C.soft} />
      <ellipse cx="1345" cy="574" rx="40" ry="14" fill={C.line} />
      <path d="M1390 570 H1616 V640 H1400 Q1380 606 1390 570 Z" fill={C.tealDeep} />
      <path d="M1400 640 Q1380 606 1390 570 H1420 Q1410 606 1428 640 Z" fill={C.tealDark} />
    </g>
  );
}

function Chair() {
  return (
    <g>
      <rect x="862" y="720" width="14" height="48" fill={C.dark} />
      <path d="M800 790 L869 768 L938 790" fill="none" stroke={C.dark} strokeWidth="8" strokeLinecap="round" />
      <rect x="800" y="600" width="138" height="124" rx="22" fill="#15151f" stroke={C.soft} strokeWidth="3" />
      <rect x="822" y="620" width="94" height="6" rx="3" fill={C.tealDark} opacity="0.6" />
    </g>
  );
}

function Room() {
  return (
    <g data-room opacity={0}>
      <rect x="0" y="0" width="1600" height="700" fill="url(#intro-wall)" />
      <rect x="0" y="700" width="1600" height="200" fill="#09090f" />
      <rect x="0" y="698" width="1600" height="6" fill={C.mid} />
      <ellipse cx="840" cy="800" rx="340" ry="46" fill={C.tealDark} opacity="0.3" />
      <Window />
      <WallDecor />
      {/* screen light spill on wall and desk, off until the PC powers on */}
      <g data-spill opacity={0}>
        <circle cx="800" cy="392" r="360" fill="url(#intro-screen-halo)" />
        <ellipse cx="800" cy="552" rx="280" ry="26" fill={C.teal} opacity="0.12" />
      </g>
      <Lamp />
      <Desk />
      <Monitor />
      <DeskItems />
      <Bed />
      <Chair />
      <rect x="0" y="0" width="1600" height="900" fill="url(#intro-vignette)" />
    </g>
  );
}

function CodeLine({ segments, index, visibleChars }: {
  segments: Segment[];
  index: number;
  visibleChars: number;
}) {
  let remaining = visibleChars;
  const y = CODE_Y0 + index * CODE_LINE_H;
  return (
    <g>
      <text x={CODE_X - 20} y={y} fontSize="12.5" fill={C.muted}
        fontFamily="JetBrains Mono, monospace">
        {index + 1}
      </text>
      <text x={CODE_X} y={y} fontSize="12.5" fontFamily="JetBrains Mono, monospace" xmlSpace="preserve">
        {segments.map((seg, i) => {
          const shown = seg.t.slice(0, Math.max(0, remaining));
          remaining -= seg.t.length;
          return shown ? <tspan key={i} fill={seg.c}>{shown}</tspan> : null;
        })}
      </text>
    </g>
  );
}

function ScreenCode({ typedChars }: { typedChars: number }) {
  let before = 0;
  let cursor = { x: CODE_X, y: CODE_Y0 };
  const lines = CODE_LINES.map((segments, index) => {
    const length = segments.reduce((n, s) => n + s.t.length, 0);
    const visible = Math.min(length, Math.max(0, typedChars - before));
    if (typedChars >= before) {
      cursor = { x: CODE_X + visible * CHAR_W, y: CODE_Y0 + index * CODE_LINE_H };
    }
    before += length;
    return <CodeLine key={index} segments={segments} index={index} visibleChars={visible} />;
  });

  return (
    <g>
      {lines}
      <motion.rect
        x={cursor.x + 1}
        y={cursor.y - 11}
        width="7"
        height="14"
        fill={C.teal}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </g>
  );
}

function ScreenContent({ typedChars }: { typedChars: number }) {
  return (
    <g data-screen-content>
      {/* powered-off glass */}
      <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx="3" fill="#040608" />
      <polygon
        points={`${SCREEN.x},${SCREEN.y} ${SCREEN.x + 130},${SCREEN.y} ${SCREEN.x + 50},${SCREEN.y + SCREEN.h} ${SCREEN.x},${SCREEN.y + SCREEN.h}`}
        fill="#fff" opacity="0.03"
      />
      {/* powered-on display: opens like an old CRT */}
      <g data-crt opacity={0} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx="3" fill="url(#intro-screen-bg)" />
        <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height="22" fill="#0b1b1e" />
        <circle cx={SCREEN.x + 14} cy={SCREEN.y + 11} r="3.5" fill={C.rust} />
        <circle cx={SCREEN.x + 26} cy={SCREEN.y + 11} r="3.5" fill={C.rustLight} />
        <circle cx={SCREEN.x + 38} cy={SCREEN.y + 11} r="3.5" fill={C.teal} />
        <text x={SCREEN.x + SCREEN.w / 2} y={SCREEN.y + 15} textAnchor="middle" fontSize="9"
          fill={C.muted} fontFamily="JetBrains Mono, monospace">
          ~/portfolio
        </text>
        <ScreenCode typedChars={typedChars} />
      </g>
    </g>
  );
}

export default function IntroScene({ typedChars }: { typedChars: number }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <Defs />
      <g mask="url(#intro-screen-hole)">
        {/* opaque base so the site never peeks through before the room fades in */}
        <rect x="0" y="0" width="1600" height="900" fill={C.ink} />
        <Room />
      </g>
      <rect data-screen x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} fill="none" />
      <ScreenContent typedChars={typedChars} />
    </svg>
  );
}
