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
      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-xs uppercase tracking-widest text-primary-600 dark:text-primary-500 mb-3"
        >
          {kicker}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-6"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-base md:text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
