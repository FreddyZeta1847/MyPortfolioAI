import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Wrench, Brain } from 'lucide-react';
import { skills } from '../data/skills';
import { skillIconMap } from '../data/skillIcons';
import SectionHeader from './SectionHeader';
import SkillRadar from './SkillRadar';
import SpotlightCard from './SpotlightCard';

// Top skills — rendered with an aurora gradient border + sheen (case-insensitive).
const FEATURED = new Set(['claude code', 'python', 'azure']);

// Bento tiles — keyed to the categories in data/skills.ts.
const tiles = [
  { key: 'Programming Languages', label: 'Languages', icon: Code },
  { key: 'Web Technologies', label: 'Web', icon: Globe },
  { key: 'Development Tools & Environments', label: 'Tools & Environments', icon: Wrench },
  { key: 'Additional Skills', label: 'Beyond the Code', icon: Brain },
];

// Distinct icons for the scrolling tech band between Skills and Projects.
const iconBand = Array.from(
  new Map(Object.entries(skillIconMap).map(([name, Icon]) => [Icon, { name, Icon }])).values()
);

function SkillPill({ name }: { name: string }) {
  const IconComp = skillIconMap[name];
  const featured = FEATURED.has(name.toLowerCase());

  if (featured) {
    return (
      <motion.span
        whileHover={{ y: -3 }}
        className="relative inline-flex p-[1.5px] rounded-xl bg-gradient-to-br from-primary-400 via-fuchsia-400 to-accent-400 shadow-glow cursor-default"
      >
        <span className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-surface-50 dark:bg-surface-900 text-sm font-semibold text-primary-700 dark:text-primary-300 overflow-hidden">
          {IconComp && <IconComp className="text-[0.95em]" />}
          {name}
          {/* sheen sweep */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine" />
        </span>
      </motion.span>
    );
  }

  return (
    <motion.span
      whileHover={{ y: -3 }}
      className="inline-flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl text-sm font-medium text-surface-700 dark:text-surface-200 hover:shadow-glow hover:text-primary-600 dark:hover:text-primary-400 transition-all cursor-default"
    >
      {IconComp && <IconComp className="text-[0.95em]" />}
      {name}
    </motion.span>
  );
}

function BentoTile({
  label,
  icon: Icon,
  items,
  className = '',
  delay = 0,
  inView,
}: {
  label: string;
  icon: typeof Code;
  items: string[];
  className?: string;
  delay?: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      <SpotlightCard className="glass rounded-2xl p-6 shadow-soft h-full">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
            <Icon size={16} />
          </span>
          <h3 className="font-display font-semibold text-surface-800 dark:text-white">{label}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <SkillPill key={item} name={item} />
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const byCategory = (key: string) => skills.find((g) => g.category === key)?.items ?? [];

  return (
    <section id="skills" className="section-padding bg-primary-100/40 dark:bg-surface-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          kicker="03 / Skills"
          title="Skills & Technologies"
          subtitle="A snapshot of where my strengths lie, and the tools I reach for. I keep this current through courses and personal projects."
        />

        {/* ── Bento grid ─────────────────────────────────────────────────── */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {/* Radar tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-2 lg:row-span-2"
          >
            <SpotlightCard className="glass rounded-2xl p-6 md:p-8 shadow-soft h-full flex flex-col justify-center">
              <SkillRadar />
              <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-2">
                Strength across the domains I work in.
              </p>
            </SpotlightCard>
          </motion.div>

          <BentoTile
            label={tiles[0].label}
            icon={tiles[0].icon}
            items={byCategory(tiles[0].key)}
            className="md:col-span-2 lg:col-span-2"
            delay={0.1}
            inView={inView}
          />
          <BentoTile
            label={tiles[1].label}
            icon={tiles[1].icon}
            items={byCategory(tiles[1].key)}
            className="md:col-span-2 lg:col-span-2"
            delay={0.2}
            inView={inView}
          />
          <BentoTile
            label={tiles[2].label}
            icon={tiles[2].icon}
            items={byCategory(tiles[2].key)}
            className="md:col-span-1 lg:col-span-2"
            delay={0.3}
            inView={inView}
          />
          <BentoTile
            label={tiles[3].label}
            icon={tiles[3].icon}
            items={byCategory(tiles[3].key)}
            className="md:col-span-1 lg:col-span-2"
            delay={0.4}
            inView={inView}
          />
        </div>
      </div>

      {/* Scrolling tech-icon band — bridges Skills → Projects */}
      <div className="edge-fade group relative mt-20 flex overflow-hidden border-y border-surface-200 dark:border-white/[0.06] py-6">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1, 2, 3].map((dup) => (
            <ul
              key={dup}
              aria-hidden={dup > 0}
              className="flex shrink-0 items-center gap-12 pr-12"
            >
              {iconBand.map(({ name, Icon }) => (
                <li
                  key={name}
                  title={name}
                  className="text-surface-400 dark:text-surface-500 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
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
