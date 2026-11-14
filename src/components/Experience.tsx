/*
 * Experience.tsx
 *
 * Work-experience section drawn like a git graph: newest role on top, every card always
 * open, and vertical "lanes" on the left that end in an arrowhead ("now"). Jobs with a
 * `branch` (e.g. freelance) run on a second lane that forks off the main one, so roles that
 * overlap in time are visible as such. The lane geometry is measured from the rendered rows
 * (heights depend on text and images) and redrawn whenever the graph is resized.
 * Data comes from ../data/experience. Works unchanged on mobile (tighter lanes).
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Briefcase } from 'lucide-react';
import { experience } from '../data/experience';
import { Experience as ExperienceType } from '../types';
import SectionHeader from './SectionHeader';

// Lane x positions and the card's left edge, in px. Tighter on phones.
const LAYOUT = {
  wide: { main: 22, side: 58, card: 96 },
  narrow: { main: 14, side: 38, card: 64 },
};
const DOT_Y = 24;   // dot sits level with the card's logo
const HEAD_TOP = 4; // arrowheads sit just above the first row
const MAIN_BRANCH = 'work';

const branchOf = (item: ExperienceType) => item.branch ?? MAIN_BRANCH;

// ── Responsive switch for the lane layout ───────────────────────────────────
function useWideScreen() {
  const query = '(min-width: 640px)';
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return wide;
}

// ── Measures where each row's dot sits (row top + DOT_Y) and the graph's size ─
interface Geometry { ys: number[]; w: number; h: number }

function useGeometry(graphRef: React.RefObject<HTMLDivElement>, rowRefs: React.MutableRefObject<(HTMLLIElement | null)[]>) {
  const [geo, setGeo] = useState<Geometry>({ ys: [], w: 0, h: 0 });

  useLayoutEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    const measure = () =>
      setGeo({
        ys: rowRefs.current.map((el) => (el ? el.offsetTop + DOT_Y : 0)),
        w: graph.offsetWidth,
        h: graph.offsetHeight,
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(graph);
    document.fonts.ready.then(measure); // text height changes once the fonts arrive
    return () => observer.disconnect();
  }, [graphRef, rowRefs]);

  return geo;
}

// ── Company logo with a graceful fallback if the image is missing ───────────
function Logo({ company, src }: { company: string; src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-soft ring-2 ring-primary-500/20 bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
      {failed ? (
        <span className="text-white font-display font-bold text-lg">{company.charAt(0)}</span>
      ) : (
        <img src={src} alt={company} onError={() => setFailed(true)} className="w-full h-full object-cover" />
      )}
    </div>
  );
}

// Pulsing "in corso" marker for roles that are still going.
function NowMarker() {
  return (
    <span className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[10px] uppercase tracking-wider text-accent-600 dark:text-accent-400">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
      </span>
      in corso
    </span>
  );
}

function ExperienceCard({ item }: { item: ExperienceType }) {
  return (
    <div className="glass relative rounded-xl p-4 sm:p-5 bg-white dark:bg-surface-900 shadow-soft hover:shadow-accent-glow transition-shadow duration-300">
      <span className="absolute top-4 right-4 font-mono text-[10px] tracking-wide px-1.5 py-0.5 rounded border border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400">
        {branchOf(item)}
      </span>

      <div className="flex items-center gap-3 pr-20">
        <Logo company={item.company} src={item.logo} />
        <div className="min-w-0">
          <h3 className="font-semibold text-surface-800 dark:text-white leading-tight truncate">{item.company}</h3>
          <div className="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-300">
            <Briefcase size={13} className="text-accent-500 dark:text-accent-400 flex-shrink-0" />
            <span className="truncate">{item.role}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mt-3 font-mono text-xs font-medium text-primary-600 dark:text-primary-400">
        <Calendar size={13} />
        <span className="whitespace-nowrap">{item.period}</span>
        {item.current && <NowMarker />}
      </div>

      <p className="text-sm text-surface-500 dark:text-surface-400 mt-3 pt-3 border-t border-surface-200/70 dark:border-white/[0.06]">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.competencies.map((c) => (
          <span
            key={c}
            className="px-2.5 py-1 rounded-md text-xs font-medium border border-primary-500/30 bg-primary-500/10 text-primary-700 dark:text-primary-300"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── SVG overlay: lanes, arrowheads, dots and the short stubs to each card ───
function Lanes({ items, geo, wide, inView }: { items: ExperienceType[]; geo: Geometry; wide: boolean; inView: boolean }) {
  const x = wide ? LAYOUT.wide : LAYOUT.narrow;
  const { ys } = geo;
  const sideIdx = items.map((it, i) => (branchOf(it) !== MAIN_BRANCH ? i : -1)).filter((i) => i >= 0);
  const hasSide = sideIdx.length > 0;
  const top = HEAD_TOP;

  // The side lane forks off the main one at the row just below its last (oldest) role.
  const forkRow = Math.min((hasSide ? Math.max(...sideIdx) : 0) + 1, items.length - 1);
  const yFork = ys[forkRow];

  const mainPath = `M${x.main},${ys[ys.length - 1]} L${x.main},${top + 10}`;
  const sidePath = hasSide
    ? `M${x.main},${yFork} C${x.main},${yFork - 30} ${x.side},${yFork - 6} ${x.side},${yFork - 40} L${x.side},${top + 10}`
    : '';
  const laneX = (item: ExperienceType) => (branchOf(item) === MAIN_BRANCH ? x.main : x.side);

  return (
    <svg width={geo.w} height={geo.h} className="absolute left-0 top-0 overflow-visible pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id="expLane" gradientUnits="userSpaceOnUse" x1="0" y1={geo.h} x2="0" y2="0">
          <stop offset="0%" stopColor="#2fa89f" />
          <stop offset="100%" stopColor="#d97546" />
        </linearGradient>
      </defs>

      {items.map((item, i) => (
        <line
          key={`stub-${i}`}
          x1={laneX(item)} y1={ys[i]} x2={x.card - 10} y2={ys[i]}
          className="stroke-surface-300 dark:stroke-surface-700"
          strokeWidth={2} strokeDasharray="3 4"
        />
      ))}

      {[mainPath, sidePath].filter(Boolean).map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#expLane)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      ))}

      {[x.main, ...(hasSide ? [x.side] : [])].map((lx) => (
        <motion.polygon
          key={`head-${lx}`}
          points="-6,0 0,-14 6,0"
          fill="#d97546"
          transform={`translate(${lx} ${top + 4})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.2 }}
        />
      ))}

      {items.map((item, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={laneX(item)} cy={ys[i]} r={7}
          strokeWidth={4}
          className={`stroke-white dark:stroke-surface-950 ${item.current ? 'fill-accent-400' : 'fill-primary-500'}`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
        />
      ))}
    </svg>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const graphRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const wide = useWideScreen();
  const geo = useGeometry(graphRef, rowRefs);
  const items = [...experience].reverse(); // newest first

  return (
    <section id="experience" className="section-padding bg-white dark:bg-surface-950/60 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader kicker="Experience" title="Work Experience" />

        <div ref={ref}>
          <div ref={graphRef} className="relative max-w-3xl mx-auto">
            {geo.ys.length === items.length && <Lanes items={items} geo={geo} wide={wide} inView={inView} />}
            <ol className="relative space-y-8 pt-8">
              {items.map((item, i) => (
                <motion.li
                  key={item.company}
                  ref={(el) => { rowRefs.current[i] = el; }}
                  style={{ paddingLeft: (wide ? LAYOUT.wide : LAYOUT.narrow).card }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <ExperienceCard item={item} />
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
