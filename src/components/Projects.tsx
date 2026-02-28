import { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, X, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import SectionHeader from './SectionHeader';

/* ═══════════════════════════════════════════
   3D Tilt Card
   ═══════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  inView,
  onSelect,
}: {
  project: Project;
  index: number;
  inView: boolean;
  onSelect: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springCfg = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springCfg);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mouseX.set(x);
    mouseY.set(y);
    setSpotlight({ x: x * 100, y: y * 100 });
  };

  const onLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onLeave}
        onClick={() => onSelect(project)}
        className="relative rounded-2xl cursor-pointer group"
      >
        {/* gradient border */}
        <div
          className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"
          style={{
            backgroundSize: '200% 100%',
            animation: isHovered ? 'gradient 3s ease infinite' : 'none',
          }}
        />

        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-surface-800 border border-surface-200/50 dark:border-surface-700/50 group-hover:border-transparent transition-colors duration-500">
          {/* spotlight */}
          <div
            className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{
              background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(20,184,166,0.08), transparent 40%)`,
            }}
          />

          {/* image */}
          <div className="relative h-56 overflow-hidden bg-surface-900">
            <img
              src={project.imageUrl}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-[1]" />

            {/* number */}
            <div
              className="absolute top-0 right-0 font-display font-bold text-[7rem] leading-none text-white/[0.06] select-none pr-3 -mt-3 z-[2]"
              style={{ transform: 'translateZ(30px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* title on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-[3]" style={{ transform: 'translateZ(20px)' }}>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-white/10 text-white/60 backdrop-blur-sm border border-white/10">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* content */}
          <div className="p-6 relative" style={{ transform: 'translateZ(15px)' }}>
            <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-5 line-clamp-3">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-white transition-colors"
                >
                  <Github size={16} />
                  <span>Source</span>
                </a>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all duration-300">
                Explore
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Zigzag modal row — animated on scroll
   ═══════════════════════════════════════════ */
function ZigzagRow({
  left,
  right,
  index,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
        !isEven ? 'md:[direction:rtl]' : ''
      }`}
    >
      <div className={!isEven ? 'md:[direction:ltr]' : ''}>{left}</div>
      <div className={!isEven ? 'md:[direction:ltr]' : ''}>{right}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Main section
   ═══════════════════════════════════════════ */
export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (!selectedProject) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedProject, closeModal]);

  /* Build the alternating content blocks for the modal */
  const buildModalSections = (project: Project) => {
    const gifs = project.gifs ?? [];
    const sections: { left: React.ReactNode; right: React.ReactNode }[] = [];

    /* Row 0: Description (left) | GIF 1 (right)
       Row 1: GIF 2 (left)       | Technologies (right)
       Row 2+: remaining GIFs    | keep alternating              */

    // Row 0 — description + first gif (or tech if no gifs)
    sections.push({
      left: (
        <div>
          <p className="text-xs font-mono font-medium text-surface-400 uppercase tracking-widest mb-3">
            About
          </p>
          <p className="text-surface-600 dark:text-surface-300 leading-relaxed text-[15px]">
            {project.description}
          </p>
        </div>
      ),
      right: gifs[0] ? (
        <div className="rounded-2xl overflow-hidden shadow-glass border border-surface-200/50 dark:border-surface-700/50">
          <img src={gifs[0]} alt={`${project.title} demo 1`} className="w-full h-auto" />
        </div>
      ) : (
        <TechStackBlock technologies={project.technologies} />
      ),
    });

    if (gifs.length === 0) return sections;

    // Row 1 — second gif (or placeholder) + technologies
    sections.push({
      left: gifs[1] ? (
        <div className="rounded-2xl overflow-hidden shadow-glass border border-surface-200/50 dark:border-surface-700/50">
          <img src={gifs[1]} alt={`${project.title} demo 2`} className="w-full h-auto" />
        </div>
      ) : (
        <TechStackBlock technologies={project.technologies} />
      ),
      right: gifs[1] ? (
        <TechStackBlock technologies={project.technologies} />
      ) : null,
    });

    // Filter out the row if the right side ended up null (only 1 gif, tech already placed)
    if (!sections[sections.length - 1].right) {
      // Replace with: tech on the right
      sections[sections.length - 1].right = (
        <TechStackBlock technologies={project.technologies} />
      );
    }

    // Remaining gifs (3, 4, …) — each gets its own row paired with an empty spacer
    for (let i = 2; i < gifs.length; i++) {
      const gifBlock = (
        <div className="rounded-2xl overflow-hidden shadow-glass border border-surface-200/50 dark:border-surface-700/50">
          <img src={gifs[i]} alt={`${project.title} demo ${i + 1}`} className="w-full h-auto" />
        </div>
      );
      const spacer = <div />;

      sections.push(
        i % 2 === 0
          ? { left: gifBlock, right: spacer }
          : { left: spacer, right: gifBlock }
      );
    }

    return sections;
  };

  const projectIndex = selectedProject
    ? projects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  return (
    <section id="projects" className="section-padding bg-white dark:bg-surface-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Projects"
          subtitle="Recent builds — each one a chance to push boundaries and learn something new."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* ═══ Full-page scrollable modal ═══ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="min-h-full flex items-start justify-center py-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="relative bg-white dark:bg-surface-900 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* ── Close button ── */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white transition-colors"
                >
                  <X size={18} />
                </motion.button>

                {/* ── Hero image + title ── */}
                <div className="relative h-72 md:h-[26rem] overflow-hidden">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/100 dark:from-surface-900 via-black/20 to-black/10" />

                  {/* Project number */}
                  <div className="absolute top-6 left-8 font-display font-bold text-8xl text-white/10 select-none">
                    {String(projectIndex + 1).padStart(2, '0')}
                  </div>

                  {/* Title + GitHub */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-xl mb-4"
                    >
                      {selectedProject.title}
                    </motion.h3>
                    {selectedProject.githubUrl && (
                      <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-sm font-medium transition-all duration-300"
                      >
                        <Github size={16} />
                        View on GitHub
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* ── Zigzag content sections ── */}
                <div className="p-8 md:p-10 space-y-16">
                  {buildModalSections(selectedProject).map((section, i) => (
                    <ZigzagRow
                      key={i}
                      index={i}
                      left={section.left}
                      right={section.right}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Reusable tech stack block ── */
function TechStackBlock({ technologies }: { technologies: string[] }) {
  return (
    <div>
      <p className="text-xs font-mono font-medium text-surface-400 uppercase tracking-widest mb-3">
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 text-sm font-medium rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/30"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
