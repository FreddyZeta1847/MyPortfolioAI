/**
 * Projects.tsx
 *
 * The "Projects" section: the eight featured builds as covers of different sizes (rows of
 * 2/3 + 1/3, three thirds, two halves, then one full-width cover closing the grid on desktop;
 * one column on phones). Each cover is its project's
 * live scene plus kind, name and one-line hook, and links to the project's own page at
 * /projects/<slug> (ProjectPage.tsx). A hint under the header tells visitors to open one.
 * Below the covers sits the collapsible live GitHub archive in <MoreBuilds />.
 *
 * Cover data comes from data/projects.ts, scenes from projects/scenes.tsx.
 */
import { ArrowUpRight, MousePointerClick } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import { followLink } from '../utils/router';
import SectionHeader from './SectionHeader';
import MoreBuilds from './MoreBuilds';
import { SCENES } from './projects/scenes';

// Grid span and scene height per cover, in display order (see data/projects.ts).
const SHAPES: Record<string, { span: string; height: string }> = {
  blueprint: { span: 'md:col-span-4', height: 'h-64 md:h-72' },
  jarvis: { span: 'md:col-span-2', height: 'h-64 md:h-72' },
  'ai-calendar-assistant': { span: 'md:col-span-2', height: 'h-60' },
  sift: { span: 'md:col-span-2', height: 'h-60' },
  'asl-live': { span: 'md:col-span-2', height: 'h-60' },
  'az-mod': { span: 'md:col-span-3', height: 'h-72' },
  gameclaude: { span: 'md:col-span-3', height: 'h-72' },
  'fcc-dashboard': { span: 'md:col-span-6', height: 'h-64' },
};
const WIDE = 'fcc-dashboard'; // full-width cover: scene and text side by side

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-white dark:bg-surface-950/60 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader kicker="Projects" title="Projects" subtitle="Eight builds, each with its own story." />

        <p className="-mt-10 mb-10 flex items-center justify-center gap-2 text-sm font-medium text-primary-700 dark:text-primary-400 md:-mt-14">
          <MousePointerClick size={16} />
          <span className="[@media(hover:none)]:hidden">Click a project to see how it works</span>
          <span className="hidden [@media(hover:none)]:inline">Tap a project to see how it works</span>
        </p>

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-6">
          {projects.map((project) => (
            <ProjectCover key={project.slug} project={project} />
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <MoreBuilds />
        </div>
      </div>
    </section>
  );
}

function ProjectCover({ project }: { project: Project }) {
  const { span, height } = SHAPES[project.slug];
  const Scene = SCENES[project.slug];
  const wide = project.slug === WIDE;
  const path = `/projects/${project.slug}`;

  return (
    <a
      href={path}
      onClick={(e) => followLink(e, path)}
      aria-label={`${project.title}: ${project.hook} Open the project page.`}
      className={`${span} group block rounded-lg border border-surface-200 bg-surface-100/60 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/60 hover:shadow-glass dark:border-surface-800 dark:bg-surface-900/50 ${
        wide ? 'md:grid md:grid-cols-[1.4fr_1fr] md:items-center md:gap-6' : ''
      }`}
    >
      <div className={height}>
        <Scene />
      </div>
      <div className="px-2 pb-2 pt-4">
        <p className="text-xs text-surface-500 dark:text-surface-400">{project.kind}</p>
        <h3 className="mt-1 flex items-center gap-2 text-xl font-bold text-surface-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-500">
          {project.title}
          <ArrowUpRight size={16} className="text-surface-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </h3>
        <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">{project.hook}</p>
        {wide && <p className="mt-4 hidden text-sm leading-relaxed text-surface-600 dark:text-surface-400 md:block">{project.how}</p>}
      </div>
    </a>
  );
}
