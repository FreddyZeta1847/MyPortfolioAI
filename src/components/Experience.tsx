import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Briefcase } from 'lucide-react';
import { experience } from '../data/experience';
import { Experience as ExperienceType } from '../types';
import SectionHeader from './SectionHeader';

// ── Wave geometry (desktop arrow) ───────────────────────────────────────────
// The arrow is a sine wave sampled into a smooth polyline. Both the drawn path
// and each node's vertical position come from `waveY`, so dots always sit on it.
// viewBox is 1000×160 (centre line at y=80); WAVE_AMP is the crest/trough height.
const WAVE_AMP = 64;
const TIMELINE_H = 520; // must match the container's h-[520px]
const waveY = (t: number) => 80 - WAVE_AMP * Math.sin(2 * Math.PI * t);

const ARROW_PATH = (() => {
  const steps = 64;
  let d = `M0,${waveY(0).toFixed(2)}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    d += ` L${(t * 1000).toFixed(1)},${waveY(t).toFixed(2)}`;
  }
  return d;
})();

// Node's vertical position as a % of the container, mapped from the wave.
const nodeYPct = (t: number) => ((TIMELINE_H / 2 - WAVE_AMP * Math.sin(2 * Math.PI * t)) / TIMELINE_H) * 100;

// ── Company logo with a graceful fallback if the image is missing ───────────
function Logo({ company, src, size = 'w-12 h-12' }: { company: string; src: string; size?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`flex-shrink-0 ${size} rounded-xl overflow-hidden shadow-glow ring-2 ring-primary-500/20 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center`}
    >
      {failed ? (
        <span className="text-white font-display font-bold text-lg">{company.charAt(0)}</span>
      ) : (
        <img
          src={src}
          alt={company}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

// Shared card body. `expanded` controls whether description + tags are shown.
function CardBody({ item, expanded }: { item: ExperienceType; expanded: boolean }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Logo company={item.company} src={item.logo} />
        <div className="min-w-0">
          <h3 className="font-semibold text-surface-800 dark:text-white leading-tight truncate">
            {item.company}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-300">
            <Briefcase size={13} className="text-accent-500 flex-shrink-0" />
            <span className="truncate">{item.role}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-primary-600 dark:text-primary-400">
        <Calendar size={13} />
        <span>{item.period}</span>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-3 pt-3 border-t border-surface-200/70 dark:border-surface-700/50">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.competencies.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Single node, sitting on the curved arrow (desktop) ──────────────────────
// `yPct` is the node's vertical position (% of the container) along the curve.
function TimelineNode({
  item,
  pos,
  yPct,
  above,
  inView,
  index,
}: {
  item: ExperienceType;
  pos: number;
  yPct: number;
  above: boolean;
  inView: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.5 + index * 0.2;

  return (
    <>
      {/* Connector */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.4, delay }}
        className={`absolute w-0.5 h-7 bg-surface-300 dark:bg-surface-600 ${above ? 'origin-bottom' : 'origin-top'}`}
        style={{
          left: `${pos}%`,
          top: above ? `calc(${yPct}% - 28px)` : `${yPct}%`,
          transform: 'translateX(-50%)',
        }}
      />

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.1, type: 'spring' }}
        className="absolute w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-surface-950 z-10"
        style={{ left: `${pos}%`, top: `${yPct}%`, transform: 'translate(-50%, -50%)' }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: above ? -20 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.15 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="absolute w-60 glass rounded-xl p-4 shadow-soft hover:shadow-glass transition-shadow duration-300 z-20"
        style={{
          left: `${pos}%`,
          ...(above
            ? { bottom: `calc(${100 - yPct}% + 28px)` }
            : { top: `calc(${yPct}% + 28px)` }),
          transform: 'translateX(-50%)',
        }}
      >
        <CardBody item={item} expanded={hovered} />
      </motion.div>
    </>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="experience" className="section-padding bg-white dark:bg-surface-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Work Experience" />

        {/* ── Desktop: curved time arrow ──────────────────────────────── */}
        <div ref={ref} className="hidden md:block max-w-5xl mx-auto">
          <div className="relative h-[520px]">
            {/* Curved arrow (sine wave). Stroke stays 2px despite the stretch. */}
            <svg
              viewBox="0 0 1000 160"
              preserveAspectRatio="none"
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-40 overflow-visible"
            >
              <defs>
                <linearGradient id="expArrow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <motion.path
                d={ARROW_PATH}
                fill="none"
                stroke="url(#expArrow)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </svg>
            {/* Arrowhead — custom triangle sitting on the curve's right endpoint,
                tilted to follow the curve's gentle descent. */}
            <div
              className="absolute right-0 top-1/2 overflow-visible"
              style={{ transform: 'translate(3px, -50%) rotate(-22deg)' }}
            >
              <motion.svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                className="block overflow-visible"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.1, type: 'spring' }}
              >
                <polygon points="0,0 14,6 0,12" fill="#f97316" />
              </motion.svg>
            </div>

            {experience.map((item, i) => {
              const t = (i + 0.5) / experience.length;
              const pos = t * 100;
              const yPct = nodeYPct(t);
              return (
                <TimelineNode
                  key={i}
                  item={item}
                  pos={pos}
                  yPct={yPct}
                  above={i % 2 === 0}
                  inView={inView}
                  index={i}
                />
              );
            })}
          </div>
          <p className="text-center text-sm text-surface-400 dark:text-surface-500 italic mt-2">
            Hover a role to see details and skills.
          </p>
        </div>

        {/* ── Mobile: vertical stacked timeline ───────────────────────── */}
        <div className="md:hidden max-w-md mx-auto relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-8 top-3 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-surface-950" />
              <div className="glass rounded-xl p-4 shadow-soft">
                <CardBody item={item} expanded />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
