import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  kicker?: string;
}

export default function SectionHeader({ title, subtitle, kicker }: SectionHeaderProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="relative text-center mb-16 md:mb-20">
      {/* Ambient glow behind the header */}
      <div className="aurora-glow w-80 h-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500/10 dark:bg-primary-600/15" />

      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="relative font-mono text-xs tracking-[0.3em] text-accent-600 dark:text-accent-400 uppercase mb-4"
        >
          {kicker}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative font-display text-3xl md:text-4xl lg:text-5xl font-bold text-surface-800 dark:text-white mb-4"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 mx-auto rounded-full mb-6"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="relative text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
