import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '../data/education';
import SectionHeader from './SectionHeader';

const institutionImages: Record<string, string> = {
  'ITIS P. Hensemberger, Monza': '/images/hensemberger.jpg',
  'Politecnico di Milano': '/images/polimi.jpeg',
};

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section-padding bg-white dark:bg-surface-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader title="Education" />

        <div ref={ref} className="max-w-3xl mx-auto relative">
          {/* Animated timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-surface-200 dark:bg-surface-700">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-b from-primary-500 to-accent-500 origin-top"
            />
          </div>

          {education.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className={`relative mb-12 pl-12 md:pl-0 ${
                  isLeft
                    ? 'md:pr-12 md:text-right md:mr-auto md:w-1/2'
                    : 'md:pl-12 md:ml-auto md:w-1/2'
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.2, type: 'spring' }}
                  className={`absolute top-6 ${
                    isLeft ? 'left-2.5 md:-right-[7px] md:left-auto' : 'left-2.5 md:-left-[7px]'
                  } w-3 h-3 rounded-full bg-primary-500 ring-4 ring-white dark:ring-surface-900 z-10`}
                />

                {/* Date */}
                <div className={`flex items-center gap-1.5 mb-3 text-sm font-medium text-primary-600 dark:text-primary-400 ${
                  isLeft ? 'md:justify-end' : ''
                }`}>
                  <Calendar size={14} className={isLeft ? 'md:order-2' : ''} />
                  <span>{item.period}</span>
                </div>

                {/* Card */}
                <div className={`glass rounded-xl p-6 shadow-soft hover:shadow-glass transition-all duration-300 group ${
                  isLeft ? 'md:mr-4' : 'md:ml-4'
                }`}>
                  <div className={`flex items-start gap-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                    {/* Institution logo */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-glow ring-2 ring-primary-500/20">
                      <img
                        src={institutionImages[item.institution]}
                        alt={item.institution}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={isLeft ? 'md:text-right' : ''}>
                      <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-1">
                        {item.institution}
                      </h3>
                      <div className={`flex items-center gap-1.5 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                        <GraduationCap size={16} className="text-accent-500" />
                        <span className="text-surface-600 dark:text-surface-300 text-sm">
                          {item.degree}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-surface-500 dark:text-surface-400 text-sm">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-surface-500 dark:text-surface-400 italic glass rounded-xl py-4 px-6 inline-block text-sm">
              Strong foundations in programming, networking, operating systems, databases, and software development.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
