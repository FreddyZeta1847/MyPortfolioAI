/**
 * Projects.tsx
 *
 * The "Projects" section: the six GitHub-pinned builds shown as a card grid
 * (3 across on desktop = 2 rows, 2 on tablet, 1 on phone), followed by the
 * collapsible live GitHub archive in <MoreBuilds />.
 *
 * Each card is a single link straight to the repository — the thumbnail,
 * description and tech pills are all visible up front, so there is no expand
 * step and no cursor-following preview to compensate for text-only rows.
 *
 * Card data (including the OG-card thumbnails) comes from data/projects.ts.
 */
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';
import MoreBuilds from './MoreBuilds';

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="section-padding bg-surface-50/80 dark:bg-surface-950/60 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          kicker="04 / Projects"
          title="Projects"
          subtitle="My six pinned builds — tap a card to open it on GitHub."
        />

        <div ref={ref} className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <MoreBuilds />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} on GitHub`}
        className="group block h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1"
      >
        <SpotlightCard className="glass flex h-full flex-col overflow-hidden rounded-2xl shadow-soft transition-shadow duration-300 group-hover:shadow-glow">
          {/* Thumbnail — GitHub OG card, 2:1, slow zoom on hover */}
          <div className="aspect-video overflow-hidden border-b border-surface-200/60 dark:border-white/[0.06]">
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="flex items-start gap-2 font-display text-lg font-bold text-surface-800 transition-colors duration-300 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
              <span className="flex-1">{project.title}</span>
              <ArrowUpRight
                size={18}
                className="mt-1 shrink-0 text-surface-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-500"
              />
            </h3>

            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-surface-600 dark:text-surface-300">
              {project.description}
            </p>

            {/* Pills pinned to the bottom so cards line up despite ragged copy */}
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-primary-500/30 bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-700 dark:text-primary-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </a>
    </motion.div>
  );
}
