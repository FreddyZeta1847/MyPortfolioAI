import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Plus, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import SectionHeader from './SectionHeader';

const detailItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Projects() {
  const [openId, setOpenId] = useState<number | null>(projects[0]?.id ?? null);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-surface-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Projects"
          subtitle="Recent builds — tap any project to expand the details."
        />

        <div className="max-w-4xl mx-auto border-t border-surface-200 dark:border-surface-800">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isOpen={openId === project.id}
              onToggle={() => setOpenId((cur) => (cur === project.id ? null : project.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-b border-surface-200 dark:border-surface-800"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-4 py-6 text-left md:gap-8 md:py-8"
      >
        <span className="w-8 shrink-0 font-display text-sm font-bold tabular-nums text-primary-500/70 dark:text-primary-400/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          className={`flex-1 font-display text-2xl font-bold transition-colors duration-300 md:text-4xl ${
            isOpen
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-surface-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400'
          }`}
        >
          {project.title}
        </h3>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'rotate-45 border-primary-500 bg-primary-500 text-white'
              : 'border-surface-300 text-surface-500 group-hover:border-primary-500 group-hover:text-primary-500 dark:border-surface-700 dark:text-surface-400'
          }`}
        >
          <Plus size={20} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-10 md:grid-cols-2 md:gap-10">
              {/* Image — slow reveal + zoom */}
              <div className="overflow-hidden rounded-2xl border border-surface-200/60 shadow-soft dark:border-surface-700/50">
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    initial={{ scale: 1.12, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>

              {/* Details — staggered in */}
              <motion.div
                className="flex flex-col"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
              >
                <motion.p
                  variants={detailItem}
                  className="leading-relaxed text-surface-600 dark:text-surface-300"
                >
                  {project.description}
                </motion.p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={detailItem}
                      className="rounded-lg border border-primary-200/50 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:border-primary-800/30 dark:bg-primary-900/30 dark:text-primary-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {project.githubUrl && (
                  <motion.a
                    variants={detailItem}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-3 font-medium text-white shadow-soft transition-all duration-300 hover:from-primary-700 hover:to-primary-600"
                  >
                    <Github size={18} />
                    View on GitHub
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
