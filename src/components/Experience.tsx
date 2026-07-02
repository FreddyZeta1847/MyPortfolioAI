import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Briefcase } from 'lucide-react';
import { experience } from '../data/experience';
import { Experience as ExperienceType } from '../types';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';

// ── Company logo with a graceful fallback if the image is missing ───────────
function Logo({ company, src, size = 'w-12 h-12' }: { company: string; src: string; size?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`shrink-0 ${size} p-[2px] rounded-xl bg-gradient-to-br from-primary-500 to-accent-400`}>
      <div className="w-full h-full rounded-[10px] overflow-hidden bg-white dark:bg-surface-900 flex items-center justify-center">
        {failed ? (
          <span className="gradient-text font-display font-bold text-lg">{company.charAt(0)}</span>
        ) : (
          <img
            src={src}
            alt={company}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

// Shared card body used by both the desktop expanding panel and mobile cards.
function CardBody({ item }: { item: ExperienceType }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <Logo company={item.company} src={item.logo} />
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold text-surface-800 dark:text-white leading-tight truncate">
            {item.company}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-surface-600 dark:text-surface-300">
            <Briefcase size={13} className="text-accent-500 dark:text-accent-400 shrink-0" />
            <span className="truncate">{item.role}</span>
          </div>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 font-mono text-xs text-primary-600 dark:text-primary-400">
          <Calendar size={13} />
          <span>{item.period}</span>
        </div>
      </div>

      <p className="sm:hidden flex items-center gap-1.5 mt-3 font-mono text-xs text-primary-600 dark:text-primary-400">
        <Calendar size={13} />
        {item.period}
      </p>

      <p className="text-sm text-surface-500 dark:text-surface-400 mt-4 pt-4 border-t border-surface-200/70 dark:border-white/[0.06] leading-relaxed">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {item.competencies.map((c) => (
          <span
            key={c}
            className="px-2.5 py-1 rounded-md text-xs font-medium border border-primary-500/30 bg-primary-500/10 text-primary-700 dark:text-primary-300"
          >
            {c}
          </span>
        ))}
      </div>
    </>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [active, setActive] = useState(experience.length - 1);

  return (
    <section id="experience" className="section-padding bg-white/80 dark:bg-surface-950/60 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader kicker="02 / Experience" title="Work Experience" />

        {/* ── Desktop: horizontal gradient rail + expanding card ─────────── */}
        <div ref={ref} className="hidden md:block max-w-3xl mx-auto">
          <div className="relative h-24">
            {/* Rail */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-surface-200 dark:bg-surface-800">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 origin-left"
              />
            </div>

            {/* Nodes */}
            {experience.map((item, i) => {
              const pos = ((i + 0.5) / experience.length) * 100;
              const isActive = active === i;
              return (
                <motion.button
                  key={item.company}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15, type: 'spring' }}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
                  style={{ left: `${pos}%` }}
                >
                  <span className="font-mono text-xs text-surface-500 dark:text-surface-400 -translate-y-1">
                    {item.period}
                  </span>
                  <span
                    className={`block w-4 h-4 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-accent-400 ring-4 ring-accent-400/25 shadow-glow-cyan scale-110'
                        : 'bg-primary-500 ring-4 ring-primary-500/20 group-hover:ring-primary-500/40'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-surface-800 dark:text-white'
                        : 'text-surface-500 dark:text-surface-400 group-hover:text-surface-700 dark:group-hover:text-surface-200'
                    }`}
                  >
                    {item.company}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active card */}
          <div className="mt-12 max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <SpotlightCard className="glass rounded-2xl p-6 md:p-8 shadow-soft">
                  <CardBody item={experience[active]} />
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: vertical rail, always-open cards ────────────────────── */}
        <div className="md:hidden max-w-md mx-auto relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500 to-accent-400" />
          {experience.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-8 top-4 translate-x-[1.5px] w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-500/20" />
              <div className="glass rounded-2xl p-5 shadow-soft">
                <CardBody item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
