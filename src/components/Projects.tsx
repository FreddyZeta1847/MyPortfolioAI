import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Plus, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import SectionHeader from './SectionHeader';
import MoreBuilds from './MoreBuilds';

const detailItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Projects() {
  const [openId, setOpenId] = useState<number | null>(projects[0]?.id ?? null);
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.6 });
  const previewY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const previewEnabled = finePointer && !reduce;
  const previewProject = previewEnabled ? projects.find((p) => p.id === previewId) : undefined;

  const onRowMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 28);
    mouseY.set(e.clientY - 100);
  };

  // Teleport the preview to the cursor when entering a row, so it doesn't
  // swoop in from wherever it was last (or from 0,0 on first hover).
  const onRowEnter = (id: number) => (e: React.MouseEvent) => {
    mouseX.jump(e.clientX + 28);
    mouseY.jump(e.clientY - 100);
    previewX.jump(e.clientX + 28);
    previewY.jump(e.clientY - 100);
    setPreviewId(id);
  };

  return (
    <section id="projects" className="section-padding bg-surface-50/80 dark:bg-surface-950/60 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          kicker="04 / Projects"
          title="Projects"
          subtitle="Recent builds — tap any project to expand the details."
        />

        <div className="max-w-4xl mx-auto border-t border-surface-200 dark:border-white/[0.06]">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isOpen={openId === project.id}
              onToggle={() => {
                // Hide the hover preview on toggle — otherwise closing a row
                // instantly pops the preview under the cursor and the row
                // looks like it never closed.
                setPreviewId(null);
                setOpenId((cur) => (cur === project.id ? null : project.id));
              }}
              onHoverStart={onRowEnter(project.id)}
              onHoverEnd={() => setPreviewId((cur) => (cur === project.id ? null : cur))}
              onMouseMove={onRowMove}
            />
          ))}
          <MoreBuilds />
        </div>
      </div>

      {/* Floating preview that trails the cursor over closed rows (desktop only) */}
      <AnimatePresence>
        {previewProject && previewProject.id !== openId && (
          <motion.div
            key={previewProject.id}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ x: previewX, y: previewY }}
            className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
            aria-hidden="true"
          >
            <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-primary-500/70 to-accent-400/70 shadow-glow-lg">
              <img
                src={previewProject.imageUrl}
                alt=""
                className="w-80 h-48 object-cover rounded-[14px]"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
  onHoverStart,
  onHoverEnd,
  onMouseMove,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onHoverStart: (e: React.MouseEvent) => void;
  onHoverEnd: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative border-b border-surface-200 dark:border-white/[0.06] transition-[padding] duration-300 ${
        isOpen ? 'pl-5 md:pl-8' : ''
      }`}
    >
      {/* Active marker on the open row */}
      {isOpen && (
        <motion.span
          layoutId="projectActiveRule"
          className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full bg-gradient-to-b from-primary-500 to-accent-400"
        />
      )}

      <button
        onClick={onToggle}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onMouseMove={onMouseMove}
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-4 py-6 text-left md:gap-8 md:py-8"
      >
        <span className="w-8 shrink-0 font-mono text-sm font-bold tabular-nums text-accent-500/80 dark:text-accent-400/80">
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
              ? 'rotate-45 border-transparent bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-glow'
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
              {/* Image — gradient border + slow zoom reveal */}
              <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-primary-500/50 via-transparent to-accent-400/50 self-start">
                <div className="aspect-video overflow-hidden rounded-[14px]">
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
                      className="rounded-lg border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-700 dark:text-primary-300"
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
                    className="group/link mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 px-5 py-3 font-medium text-white shadow-soft transition-all duration-300 hover:shadow-glow hover:from-primary-500 hover:to-accent-400"
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
