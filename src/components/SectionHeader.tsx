import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center mb-16 md:mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-surface-800 dark:text-white mb-4"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-6"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-surface-500 dark:text-surface-400 max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
