import React from 'react';
import { Code, Globe, PenTool as Tool, Brain } from 'lucide-react';
import { skills } from '../data/skills';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categoryStyles: Record<string, { icon: string; badge: string; badgeDark: string; border: string }> = {
  'Programming Languages': {
    icon: 'text-primary-600 dark:text-primary-400',
    badge: 'bg-primary-100 text-primary-700',
    badgeDark: 'dark:bg-primary-900/40 dark:text-primary-300',
    border: 'border-primary-500',
  },
  'Web Technologies': {
    icon: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    badgeDark: 'dark:bg-blue-900/40 dark:text-blue-300',
    border: 'border-blue-500',
  },
  'Development Tools & Environments': {
    icon: 'text-accent-600 dark:text-accent-400',
    badge: 'bg-accent-100 text-accent-700',
    badgeDark: 'dark:bg-accent-900/40 dark:text-accent-300',
    border: 'border-accent-500',
  },
  'Additional Skills': {
    icon: 'text-rose-500 dark:text-rose-400',
    badge: 'bg-rose-100 text-rose-600',
    badgeDark: 'dark:bg-rose-900/40 dark:text-rose-300',
    border: 'border-rose-400',
  },
};

const getIconForCategory = (category: string) => {
  const style = categoryStyles[category] || categoryStyles['Programming Languages'];
  switch(category) {
    case 'Programming Languages':
      return <Code size={24} className={style.icon} />;
    case 'Web Technologies':
      return <Globe size={24} className={style.icon} />;
    case 'Development Tools & Environments':
      return <Tool size={24} className={style.icon} />;
    case 'Additional Skills':
      return <Brain size={24} className={style.icon} />;
    default:
      return <Code size={24} className={style.icon} />;
  }
};

const Skills: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 bg-warm-100 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Here are the tools and languages I've worked with. I continuously stay updated through online courses and personal projects.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => {
            const style = categoryStyles[skill.category] || categoryStyles['Programming Languages'];
            return (
              <div
                key={index}
                className={`bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 border-l-4 ${style.border} hover:shadow-warm transition-all duration-300 hover:-translate-y-1 animate-on-scroll-scale ${gridVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-warm-100 dark:bg-slate-700 rounded-lg">
                    {getIconForCategory(skill.category)}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white ml-3">{skill.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span
                      key={idx}
                      className={`${style.badge} ${style.badgeDark} px-3 py-1.5 rounded-lg text-sm font-medium`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
