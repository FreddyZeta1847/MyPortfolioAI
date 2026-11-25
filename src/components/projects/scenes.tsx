/**
 * scenes.tsx
 *
 * One small animated "scene" per featured project, drawn in HTML/CSS (no screenshots): it shows
 * what the project does in a few seconds. Used on the Projects covers (inside a fixed-height
 * frame) and on each project page (natural height). Keyed by the project's slug in SCENES.
 *
 * Every scene is a short story in steps driven by useLoopStep: the steps play one after the
 * other, the last frame rests ~2 s, then it starts over — only while the scene is on screen.
 * Ambient motion (voice wave, landmark pulse, caret) uses the scene-* keyframes in index.css.
 * Numbers in the sift and fcc scenes are made up and labelled "example data".
 */
import type { ComponentType } from 'react';
import { useInView } from 'react-intersection-observer';
import { Calendar, CloudSun, Mail, Mic, Rss, Volume2, Wallet } from 'lucide-react';
import { useLoopStep } from '../../hooks/useLoopStep';

/** Loop state of a scene plus the ref that tells it whether it is on screen. */
function useScene(steps: number, stepMs?: number) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  return { ref, ...useLoopStep(steps, inView, stepMs) };
}

/** Classes that fade an element in when `on`, out (and slightly down) otherwise. */
const show = (on: boolean) => (on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2');

function ExampleNote() {
  return (
    <p className="absolute bottom-2 right-3 text-[10px] uppercase tracking-wider text-surface-400 dark:text-surface-500">
      example data
    </p>
  );
}

/* ---------- blueprint: a terminal where the stage phases light up one by one ---------- */
const PHASES = ['clarify', 'plan', 'build', 'test', 'review', 'first use'];

function BlueprintScene() {
  const { ref, step } = useScene(PHASES.length + 1, 700);
  return (
    <div ref={ref} className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-surface-800 bg-surface-950 font-mono text-[12px] text-surface-200 shadow-glass sm:text-[13px]">
      <div className="flex items-center gap-1.5 border-b border-surface-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-600" />
        <span className="ml-2 text-surface-500">~/gym-bookings</span>
      </div>
      <div className="flex-1 space-y-1.5 p-4 leading-relaxed">
        <p><span className="text-primary-500">›</span> /blueprint</p>
        <p className="text-surface-400">context&nbsp;&nbsp;<span className="text-primary-400">confirmed</span> · medium · calm pace</p>
        <p className="text-surface-400">plan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 stages written to <span className="text-surface-200">plan.json</span></p>
        <p className="text-surface-400">stage 2&nbsp;&nbsp;<span className="text-accent-400">Frontend demo</span> · implementation</p>
        <div className="flex flex-wrap gap-1.5 pt-3">
          {PHASES.map((phase, i) => (
            <span
              key={phase}
              className={`rounded border px-2 py-0.5 transition-colors duration-300 ${
                i < step ? 'border-primary-500 bg-primary-500 text-surface-950' : 'border-surface-700'
              }`}
            >
              {phase}
            </span>
          ))}
        </div>
        <p className="pt-3">
          <span className="text-primary-500">›</span>{' '}
          <span className="inline-block h-4 w-2 animate-[scene-caret_1s_steps(1)_infinite] bg-surface-300 align-middle" />
        </p>
      </div>
    </div>
  );
}

/* ---------- Jarvis: a spoken request, the orchestrator, the agent that answers ---------- */
const AGENTS = [
  { Icon: Wallet, name: 'Expenses', says: 'Add 12 euro for lunch' },
  { Icon: Calendar, name: 'Calendar', says: 'Move my 3pm to Friday' },
  { Icon: Mail, name: 'Gmail', says: 'Any mail from the professor?' },
  { Icon: CloudSun, name: 'Weather', says: 'Will it rain in Milan?' },
];
const WAVE = Array.from({ length: 28 }, (_, i) => 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7)));
const WIRE_X = [50, 150, 250, 350];

function JarvisScene() {
  const { ref, step, cycle } = useScene(4, 900);
  const active = cycle % AGENTS.length;
  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-between gap-4 overflow-hidden rounded-lg border border-surface-200 bg-gradient-to-b from-primary-50 to-white p-5 dark:border-surface-700 dark:from-primary-900/30 dark:to-surface-900">
      <p className={`h-6 text-center text-sm font-medium text-surface-800 transition-all duration-500 dark:text-surface-100 ${show(step >= 1)}`}>
        “{AGENTS[active].says}”
      </p>
      <div className="flex h-14 items-center gap-[3px]" aria-hidden="true">
        <span className="mr-3 grid h-10 w-10 place-items-center rounded-full bg-primary-500 text-surface-950">
          <Mic size={20} />
        </span>
        {WAVE.map((h, i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full bg-primary-500 transition-transform duration-500 ${
              step === 1 ? 'animate-[scene-wave_0.55s_ease-in-out_infinite_alternate]' : 'scale-y-[0.3]'
            }`}
            style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${(i % 7) * 0.08}s` }}
          />
        ))}
      </div>
      <div className="w-full">
        <p className={`mx-auto w-max rounded-md px-3 py-1 text-xs font-semibold transition-shadow duration-300 bg-surface-900 text-white dark:bg-surface-100 dark:text-surface-900 ${
          step === 2 ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-surface-900' : ''
        }`}>
          Orchestrator · GPT-4o
        </p>
        <svg className="h-6 w-full overflow-visible" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
          {WIRE_X.map((x, i) => (
            <path
              key={x}
              d={`M200 0 C200 12 ${x} 12 ${x} 24`}
              fill="none"
              vectorEffect="non-scaling-stroke"
              className={`transition-all duration-300 ${step >= 2 && i === active ? 'stroke-primary-500 [stroke-width:2]' : 'stroke-surface-200 dark:stroke-surface-700'}`}
            />
          ))}
        </svg>
        <div className="grid grid-cols-4 gap-2">
          {AGENTS.map(({ Icon, name }, i) => (
            <div
              key={name}
              className={`flex flex-col items-center gap-1 rounded-md border bg-white/70 py-2 text-[11px] font-medium transition-all duration-300 dark:bg-surface-900/70 ${
                step === 3 && i === active
                  ? 'border-primary-500 text-primary-600 shadow-[0_6px_18px_-6px_rgba(47,168,159,0.55)] dark:text-primary-400'
                  : 'border-surface-200 text-surface-600 dark:border-surface-700 dark:text-surface-300'
              }`}
            >
              <Icon size={16} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- AI Calendar Assistant: a WhatsApp message becomes a calendar event ---------- */
const HOURS = ['18', '19', '20', '21', '22'];

function CalendarScene() {
  const { ref, step } = useScene(4, 900);
  return (
    <div ref={ref} className="grid h-full w-full grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-4 overflow-hidden rounded-lg border border-surface-200 bg-cream p-4 dark:border-surface-700 dark:bg-surface-900">
      <div className="flex flex-col justify-center gap-2 text-[13px]">
        <p className={`max-w-[92%] self-end rounded-lg rounded-br-sm bg-primary-600 px-3 py-2 text-white shadow-soft transition-all duration-500 ${show(step >= 1)}`}>
          Dinner with Marco tomorrow at 8pm in red
        </p>
        <p className={`max-w-[92%] self-start rounded-lg rounded-bl-sm bg-white px-3 py-2 text-surface-700 shadow-soft transition-all duration-500 dark:bg-surface-800 dark:text-surface-200 ${show(step >= 3)}`}>
          Added: <b>Dinner with Marco</b>, Thu 20:00–21:00
        </p>
      </div>
      <div className="rounded-md border border-surface-200 bg-white px-2 pb-1 pt-2 dark:border-surface-700 dark:bg-surface-950">
        <p className="mb-1 text-[11px] font-semibold text-surface-500 dark:text-surface-400">Thu 27</p>
        <div className="relative">
          {HOURS.map((h) => (
            <div key={h} className="h-7 border-t border-surface-200 font-mono text-[10px] text-surface-400 dark:border-surface-800">{h}</div>
          ))}
          <div className={`absolute left-6 right-1 top-[58px] h-7 truncate rounded bg-[#d50000] px-1.5 py-1 text-[10px] font-semibold leading-tight text-white shadow-soft transition-all duration-500 ${
            step >= 2 ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-4 scale-95 opacity-0'
          }`}>
            Dinner with Marco
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- sift: many headlines in, three picked, three drafts out ---------- */
const FEED = [
  ['arXiv', 'Sparse attention for long-context agents'],
  ['HN', 'Show HN: a local-first RSS reader'],
  ['The Record', 'New ransomware group targets clinics'],
  ['IEEE Spectrum', 'Soft grippers learn to sort recycling'],
  ['arXiv', 'Benchmarking tool use in small LLMs'],
  ['HN', 'Why we moved off Kubernetes'],
];
const PICKED = [0, 4, 3];
const DRAFT_STATUS = ['In review', 'Edited', 'Posted by you'];

function SiftScene() {
  const { ref, step } = useScene(5, 800);
  return (
    <div ref={ref} className="relative grid h-full w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 overflow-hidden rounded-lg border border-surface-200 bg-white p-4 pb-8 dark:border-surface-700 dark:bg-surface-900">
      <ul className="space-y-1.5 text-[11px]">
        {FEED.map(([source, title], i) => (
          <li
            key={title}
            className={`flex gap-1.5 text-surface-500 transition-opacity duration-500 dark:text-surface-400 ${
              step >= 1 && !PICKED.includes(i) ? 'opacity-30' : 'opacity-100'
            }`}
          >
            <Rss size={12} className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-400" />
            <span className="truncate">
              <b className="font-semibold text-surface-700 dark:text-surface-300">{source}</b> · {title}
            </span>
          </li>
        ))}
      </ul>
      <svg className="h-28 w-10 text-surface-300 dark:text-surface-600" viewBox="0 0 40 112" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 4 L38 40 L38 72 L2 108" />
        <path d="M14 56h22" stroke="#2fa89f" strokeWidth="2" />
        <path d="m30 50 6 6-6 6" stroke="#2fa89f" strokeWidth="2" />
      </svg>
      <div className="space-y-2">
        {PICKED.map((feedIndex, i) => (
          <div
            key={feedIndex}
            className={`rounded-md border border-surface-200 bg-cream px-2.5 py-2 shadow-soft transition-all duration-500 dark:border-surface-700 dark:bg-surface-800 ${show(step >= i + 2)}`}
          >
            <p className="truncate text-[11px] font-semibold text-surface-800 dark:text-surface-100">{FEED[feedIndex][1]}</p>
            <p className={`mt-1 text-[10px] ${i === 2 ? 'text-primary-700 dark:text-primary-400' : 'text-surface-500'}`}>
              Draft {i + 1} · {DRAFT_STATUS[i]}
            </p>
          </div>
        ))}
      </div>
      <ExampleNote />
    </div>
  );
}

/* ---------- ASL-live: 21 hand landmarks, letters spelled, the word spoken ---------- */
const LANDMARKS = [[100, 220], [70, 205], [50, 185], [38, 162], [30, 142], [72, 140], [66, 105], [62, 82], [60, 62],
  [96, 134], [96, 95], [96, 70], [96, 48], [120, 138], [124, 102], [127, 80], [129, 62], [142, 148], [150, 122], [155, 105], [159, 88]];
const BONES = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13],
  [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]];
const WORD = 'HELLO';

function AslScene() {
  const { ref, step } = useScene(WORD.length + 2, 550);
  return (
    <div ref={ref} className="grid h-full w-full grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-3 overflow-hidden rounded-lg border border-surface-800 bg-surface-950 p-4 text-surface-100">
      <svg className="max-h-56 w-full" viewBox="20 36 160 196" role="img" aria-label="A hand with its 21 landmarks">
        {BONES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={LANDMARKS[a][0]} y1={LANDMARKS[a][1]} x2={LANDMARKS[b][0]} y2={LANDMARKS[b][1]} stroke="#5ebab5" strokeOpacity=".55" strokeWidth="2" />
        ))}
        {LANDMARKS.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.2"
            fill={i === 0 ? '#d97546' : '#f0f9f8'}
            className="origin-center animate-[scene-pulse_2.4s_ease-in-out_infinite] [transform-box:fill-box]"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </svg>
      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-wider text-surface-400">Letters</p>
        <p className="flex gap-1 font-mono text-2xl font-semibold">
          {[...WORD].map((letter, i) => (
            <span key={i} className={`grid h-10 w-8 place-items-center rounded border border-surface-700 bg-surface-800 transition-all duration-300 ${show(step >= i + 1)}`}>
              {letter}
            </span>
          ))}
        </p>
        <p className={`flex items-center gap-2 text-sm text-surface-300 transition-all duration-500 ${show(step >= WORD.length + 1)}`}>
          <Volume2 size={16} className="text-primary-400" />“ciao” <span className="text-surface-500">· offline</span>
        </p>
        <p className="font-mono text-xs text-surface-400">macro-F1 <span className="text-primary-400">0.988</span></p>
      </div>
    </div>
  );
}

/* ---------- fcc-dashboard: live status, savings chart, a price that is never guessed ---------- */
const BARS = [30, 42, 38, 55, 48, 62, 58, 70, 66, 81, 77, 90, 86, 100];
const MODELS = [['deepseek-chat', '204', '$11.20'], ['kimi-k2', '96', '$7.20'], ['ollama · qwen3', '12', 'unknown']];

function FccScene() {
  const { ref, step } = useScene(4, 900);
  return (
    <div ref={ref} className="relative flex h-full w-full flex-col gap-3 overflow-hidden rounded-lg border border-surface-200 bg-white p-4 pb-8 text-[12px] dark:border-surface-700 dark:bg-surface-900">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-surface-800 dark:text-surface-100">FCC Dashboard</p>
        <p className="flex items-center gap-1.5 text-surface-500">
          <span className="h-2 w-2 animate-[scene-breathe_2s_ease-in-out_infinite] rounded-full bg-primary-500" />running · 127.0.0.1
        </p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-surface-500">Saved vs Anthropic, 14 days</p>
          <p className="text-3xl font-bold tabular-nums text-surface-900 dark:text-white">$18.40</p>
        </div>
        <div className="flex h-12 items-end gap-[3px]" aria-hidden="true">
          {BARS.map((b, i) => (
            <span
              key={i}
              className={`w-[6px] origin-bottom rounded-sm bg-primary-500/80 transition-transform duration-700 ${step >= 1 ? 'scale-y-100' : 'scale-y-0'}`}
              style={{ height: `${b}%`, transitionDelay: step >= 1 ? `${i * 40}ms` : '0ms' }}
            />
          ))}
        </div>
      </div>
      <table className="w-full tabular-nums">
        <thead>
          <tr className="text-left text-surface-400">
            <th className="pb-1 font-medium">model</th>
            <th className="pb-1 text-right font-medium">requests</th>
            <th className="pb-1 text-right font-medium">saved</th>
          </tr>
        </thead>
        <tbody className={`transition-all duration-500 ${show(step >= 2)}`}>
          {MODELS.map(([model, requests, saved]) => (
            <tr key={model} className="border-t border-surface-100 dark:border-surface-800">
              <td className="py-1 font-mono text-surface-700 dark:text-surface-300">{model}</td>
              <td className="py-1 text-right text-surface-600 dark:text-surface-400">{requests}</td>
              <td className="py-1 text-right font-semibold">
                {saved === 'unknown' ? (
                  <span className={`rounded px-1 text-accent-600 transition-colors duration-300 dark:text-accent-400 ${step === 3 ? 'bg-accent-500/15' : ''}`}>
                    unknown
                  </span>
                ) : (
                  <span className="text-surface-800 dark:text-surface-100">{saved}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ExampleNote />
    </div>
  );
}

export const SCENES: Record<string, ComponentType> = {
  blueprint: BlueprintScene,
  jarvis: JarvisScene,
  'ai-calendar-assistant': CalendarScene,
  sift: SiftScene,
  'asl-live': AslScene,
  'fcc-dashboard': FccScene,
};
