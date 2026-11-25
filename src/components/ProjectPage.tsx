/**
 * ProjectPage.tsx
 *
 * The page of one featured project, shown by App at /projects/<slug> in place of the home
 * sections (navbar and footer stay). It reads the project from data/projects.ts and lays out:
 * back link, kind and status, title and hook, GitHub link, the project's scene at its natural
 * height, then problem / how it works / methods, the hard fact with the tags, and a link to the
 * next project. An unknown slug shows a short "not found" with the way back.
 * Sets the browser tab title while it is open.
 */
import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Github } from 'lucide-react';
import { projects } from '../data/projects';
import { followLink } from '../utils/router';
import { SCENES } from './projects/scenes';

function BackLink() {
  return (
    <a
      href="/"
      onClick={(e) => followLink(e, '/', 'projects')}
      className="inline-flex items-center gap-2 text-sm font-medium text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
    >
      <ArrowLeft size={16} />All projects
    </a>
  );
}

export default function ProjectPage({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useEffect(() => {
    const previous = document.title;
    document.title = project ? `${project.title} — Federico Santini` : 'Project not found — Federico Santini';
    return () => { document.title = previous; };
  }, [project]);

  if (!project) {
    return (
      <section className="container mx-auto max-w-5xl px-4 pb-24 pt-32 md:px-6">
        <BackLink />
        <h1 className="mt-10 text-4xl font-bold text-surface-900 dark:text-white">Project not found</h1>
        <p className="mt-3 text-surface-600 dark:text-surface-400">There is no project at this address. All my projects are on the home page.</p>
      </section>
    );
  }

  const next = projects[(index + 1) % projects.length];
  const nextPath = `/projects/${next.slug}`;
  const Scene = SCENES[project.slug];

  return (
    <article className="container mx-auto max-w-5xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
      <BackLink />

      <header className="mb-10 mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm text-surface-500 dark:text-surface-400">{project.kind} · {project.status}</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-surface-900 dark:text-white md:text-6xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-xl text-surface-700 dark:text-surface-300 md:text-2xl">{project.hook}</p>
        </div>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-700 underline-offset-4 hover:text-accent-600 hover:underline dark:text-primary-400 dark:hover:text-accent-400"
        >
          <Github size={16} />View on GitHub
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </header>

      <div className="mx-auto max-w-3xl">
        <Scene />
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-surface-900 dark:text-white">The problem</h2>
          <p className="leading-relaxed text-surface-600 dark:text-surface-400">{project.problem}</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-surface-900 dark:text-white">How it works</h2>
          <p className="leading-relaxed text-surface-600 dark:text-surface-400">{project.how}</p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-surface-900 dark:text-white">Methods</h2>
          <ul className="space-y-2">
            {project.methods.map((method) => (
              <li key={method} className="flex gap-2.5 text-sm text-surface-700 dark:text-surface-300">
                <Check size={16} className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-500" />
                {method}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-lg border border-surface-200 bg-cream px-6 py-5 dark:border-surface-800 dark:bg-surface-900/60">
        <p className="flex items-baseline gap-3">
          <span className="text-5xl font-bold tabular-nums text-accent-600 dark:text-accent-400">{project.fact.value}</span>
          <span className="text-surface-600 dark:text-surface-400">{project.fact.label}</span>
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-md border border-surface-300 px-2 py-1 text-xs font-medium text-surface-700 dark:border-surface-700 dark:text-surface-300">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={nextPath}
        onClick={(e) => followLink(e, nextPath)}
        className="group mt-16 flex items-center justify-between border-t border-surface-200 pt-8 dark:border-surface-800"
      >
        <span>
          <span className="block text-sm text-surface-500">Next project</span>
          <span className="block text-2xl font-bold text-surface-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-500">{next.title}</span>
        </span>
        <ArrowUpRight size={24} className="text-surface-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-500" />
      </a>
    </article>
  );
}
