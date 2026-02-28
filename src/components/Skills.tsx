import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Wrench, Brain } from 'lucide-react';
import { skills } from '../data/skills';
import { skillIconMap } from '../data/skillIcons';
import SectionHeader from './SectionHeader';

const categoryConfig: Record<
  string,
  {
    icon: typeof Code;
    gradient: string;
    badgeBg: string;
    badgeText: string;
    colSpan: string;
    theme: string;
  }
> = {
  'Programming Languages': {
    icon: Code,
    gradient: 'from-primary-500 to-primary-700',
    badgeBg: 'bg-primary-100 dark:bg-primary-900/40',
    badgeText: 'text-primary-700 dark:text-primary-300',
    colSpan: 'md:col-span-2',
    theme: 'code',
  },
  'Web Technologies': {
    icon: Globe,
    gradient: 'from-blue-500 to-blue-700',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-700 dark:text-blue-300',
    colSpan: '',
    theme: 'browser',
  },
  'Development Tools & Environments': {
    icon: Wrench,
    gradient: 'from-accent-500 to-accent-700',
    badgeBg: 'bg-accent-100 dark:bg-accent-900/40',
    badgeText: 'text-accent-700 dark:text-accent-300',
    colSpan: '',
    theme: 'terminal',
  },
  'Additional Skills': {
    icon: Brain,
    gradient: 'from-rose-500 to-rose-700',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/40',
    badgeText: 'text-rose-700 dark:text-rose-300',
    colSpan: 'md:col-span-2',
    theme: 'default',
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section-padding bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="The tools and languages I work with. I continuously stay updated through courses and personal projects."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          {skills.map((skill) => {
            const config = categoryConfig[skill.category] || categoryConfig['Programming Languages'];
            const Icon = config.icon;

            return (
              <motion.div
                key={skill.category}
                variants={cardVariants}
                className={`glass rounded-2xl overflow-hidden group hover:shadow-glass transition-all duration-300 ${config.colSpan}`}
              >
                {/* Card header bar */}
                <div className={`flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${config.gradient}`}>
                  <Icon size={20} className="text-white/90" />
                  <h3 className="font-display font-semibold text-white text-sm tracking-wide">
                    {skill.category}
                  </h3>
                  {config.theme === 'code' && (
                    <div className="ml-auto flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                  )}
                  {config.theme === 'terminal' && (
                    <span className="ml-auto text-xs text-white/40 font-mono">~</span>
                  )}
                  {config.theme === 'browser' && (
                    <div className="ml-auto flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    </div>
                  )}
                </div>

                {/* Skills badges */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2.5">
                    {skill.items.map((item, idx) => {
                      const IconComp = skillIconMap[item];
                      return (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + idx * 0.04 }}
                          className={`inline-flex items-center gap-1.5 ${config.badgeBg} ${config.badgeText} px-3 py-2 rounded-lg text-sm font-medium`}
                        >
                          {IconComp && <IconComp className="text-[0.9em]" />}
                          {item}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
