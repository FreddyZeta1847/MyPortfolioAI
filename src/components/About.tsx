import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';
import StatCounter from './StatCounter';
import GitHubActivity from './GitHubActivity';
import DraggableChips from './DraggableChips';
import { stats } from '../data/about';

function Tile({
  className = '',
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      <SpotlightCard className="glass h-full rounded-2xl p-6 shadow-soft">{children}</SpotlightCard>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-surface-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="At a glance"
          subtitle="A quick, interactive snapshot — peek at my live GitHub and drag the chips around."
        />

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Tile key={s.label} delay={i * 0.05} className="col-span-1 min-h-[120px]">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </Tile>
          ))}

          <Tile delay={0.2} className="col-span-2 min-h-[320px]">
            <GitHubActivity />
          </Tile>

          <Tile delay={0.25} className="col-span-2 min-h-[320px]">
            <DraggableChips />
          </Tile>
        </div>
      </div>
    </section>
  );
}
