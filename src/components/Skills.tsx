import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Wrench, Brain, LayoutGrid } from 'lucide-react';
import { skills } from '../data/skills';
import { skillIconMap } from '../data/skillIcons';
import SectionHeader from './SectionHeader';
import SkillRadar from './SkillRadar';

// Filter chips — keyed to the categories in data/skills.ts, with a short label
// and the accent color used when active.
const filters: { key: string; label: string; icon: typeof Code; active: string }[] = [
  { key: 'all', label: 'All', icon: LayoutGrid, active: 'from-primary-500 to-accent-500' },
  { key: 'Programming Languages', label: 'Languages', icon: Code, active: 'from-primary-500 to-primary-700' },
  { key: 'Web Technologies', label: 'Web', icon: Globe, active: 'from-blue-500 to-blue-700' },
  { key: 'Development Tools & Environments', label: 'Tools', icon: Wrench, active: 'from-accent-500 to-accent-700' },
  { key: 'Additional Skills', label: 'Other', icon: Brain, active: 'from-rose-500 to-rose-700' },
];

type FlatSkill = { name: string; categories: string[] };

// Top skills — rendered with a gold border + luxury sheen (case-insensitive).
const FEATURED = new Set(['claude code', 'python', 'azure']);

// Distinct icons for the scrolling tech band between Skills and Projects.
const iconBand = Array.from(
  new Map(Object.entries(skillIconMap).map(([name, Icon]) => [Icon, { name, Icon }])).values()
);

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [active, setActive] = useState('all');

  // Flatten the categorized data into a de-duplicated list (case-insensitive),
  // remembering which categories each skill belongs to so filtering works.
  const allSkills = useMemo<FlatSkill[]>(() => {
    const map = new Map<string, FlatSkill>();
    skills.forEach((group) => {
      group.items.forEach((item) => {
        const key = item.trim().toLowerCase();
        const existing = map.get(key);
        if (existing) {
          if (!existing.categories.includes(group.category)) existing.categories.push(group.category);
        } else {
          map.set(key, { name: item.trim(), categories: [group.category] });
        }
      });
    });
    return Array.from(map.values());
  }, []);

  const visible =
    active === 'all' ? allSkills : allSkills.filter((s) => s.categories.includes(active));

  return (
    <section id="skills" className="section-padding bg-cream dark:bg-surface-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="A snapshot of where my strengths lie, and the tools I reach for. I keep this current through courses and personal projects."
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* ── Left: radar ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6 md:p-8 shadow-soft"
          >
            <SkillRadar />
            <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-2">
              Strength across the domains I work in.
            </p>
          </motion.div>

          {/* ── Right: filterable skill grid ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((f) => {
                const Icon = f.icon;
                const isActive = active === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActive(f.key)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${f.active} text-white shadow-glow`
                        : 'glass text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={15} />
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Pills */}
            <motion.div layout className="flex flex-wrap gap-2.5">
              <AnimatePresence mode="popLayout">
                {visible.map((skill) => {
                  const IconComp = skillIconMap[skill.name];
                  const featured = FEATURED.has(skill.name.toLowerCase());

                  if (featured) {
                    return (
                      <motion.span
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        whileHover={{ y: -3 }}
                        className="relative inline-flex p-[1.5px] rounded-xl bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 shadow-[0_0_16px_rgba(245,180,40,0.45)] cursor-default"
                      >
                        <span className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-white dark:bg-surface-900 text-sm font-semibold text-amber-700 dark:text-amber-300 overflow-hidden">
                          {IconComp && <IconComp className="text-[0.95em]" />}
                          {skill.name}
                          {/* luxury sheen sweep */}
                          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine" />
                        </span>
                      </motion.span>
                    );
                  }

                  return (
                    <motion.span
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ y: -3 }}
                      className="inline-flex items-center gap-1.5 glass px-3.5 py-2 rounded-xl text-sm font-medium text-surface-700 dark:text-surface-200 hover:shadow-glow hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default"
                    >
                      {IconComp && <IconComp className="text-[0.95em]" />}
                      {skill.name}
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling tech-icon band — bridges Skills → Projects */}
      <div className="edge-fade group relative mt-20 flex overflow-hidden border-y border-surface-200 dark:border-surface-700/60 py-6">
        <div className="flex">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
            >
              {iconBand.map(({ name, Icon }) => (
                <li
                  key={name}
                  title={name}
                  className="text-surface-400 dark:text-surface-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  <Icon size={34} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
