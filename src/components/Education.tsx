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
    <section id="education" className="section-padding bg-primary-50/60 dark:bg-surface-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader kicker="01 / Education" title="Education" />

        <div ref={ref} className="max-w-3xl mx-auto relative pl-10 md:pl-14">
          {/* Glowing rail */}
          <div className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-surface-200 dark:bg-surface-800">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 w-full bg-gradient-to-b from-primary-500 via-primary-400 to-accent-400 origin-top shadow-glow"
            />
          </div>

          {education.map((item, index) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative mb-10 last:mb-0"
            >
              {/* Rail node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.25, type: 'spring' }}
                className="absolute -left-10 md:-left-14 translate-x-[3.5px] md:translate-x-[7.5px] top-9 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-500/20 shadow-glow z-10"
              />

              <SpotlightCard className="glass rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-glass transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Logo in a gradient ring */}
                  <div className="shrink-0 p-[2px] rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 w-fit">
                    <div className="w-14 h-14 rounded-[14px] overflow-hidden bg-white dark:bg-surface-900">
                      <img
                        src={institutionImages[item.institution]}
                        alt={item.institution}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="font-mono text-xs text-accent-600 dark:text-accent-400 tracking-wider mb-2">
                      {item.period}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-surface-800 dark:text-white mb-1.5">
                      {item.institution}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <GraduationCap size={16} className="text-primary-500 dark:text-primary-400 shrink-0" />
                      <span className="text-surface-600 dark:text-surface-300 text-sm font-medium">
                        {item.degree}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-10 text-surface-500 dark:text-surface-400 italic glass rounded-xl py-4 px-6 inline-block text-sm"
          >
            Strong foundations in programming, networking, operating systems, databases, and software development.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
