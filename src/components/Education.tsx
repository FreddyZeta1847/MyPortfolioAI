import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap } from 'lucide-react';
import { education } from '../data/education';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';

const institutionImages: Record<string, string> = {
  'ITIS P. Hensemberger, Monza': '/images/hensemberger.jpg',
  'Politecnico di Milano': '/images/polimi.jpeg',
};

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section-padding bg-primary-100/40 dark:bg-surface-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader kicker="01 / Education" title="Education" />

        <div ref={ref} className="max-w-3xl mx-auto space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
              className="pb-6 border-b border-surface-200 dark:border-surface-700 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Logo */}
                <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-surface-200 dark:bg-surface-800">
                  <img
                    src={institutionImages[item.institution]}
                    alt={item.institution}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-primary-600 dark:text-primary-500 mb-1">
                    {item.period}
                  </p>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1">
                    {item.institution}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-2">
                    <GraduationCap size={15} className="text-primary-600 dark:text-primary-500 shrink-0" />
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      {item.degree}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 text-sm text-surface-600 dark:text-surface-400"
          >
            Strong foundations in programming, networking, operating systems, databases, and software development principles.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
