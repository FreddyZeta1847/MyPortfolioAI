/**
 * ProjectPage.tsx
 *
 * The page of one featured project, shown by App at /projects/<slug> in place of the home
 * sections (navbar and footer stay). It finds the project in data/projects.ts and renders the
 * layout the project asks for (walkthrough, case study or spec — see projects/layouts.tsx),
 * with the previous and next projects for the links at the bottom. An unknown slug shows a
 * short "not found" with the way back. Sets the browser tab title while it is open.
 */
import { useEffect } from 'react';
import { projects } from '../data/projects';
import { BackLink } from './projects/pageParts';
import { CaseStudyLayout, SpecLayout, WalkthroughLayout } from './projects/layouts';

const LAYOUTS = { walkthrough: WalkthroughLayout, caseStudy: CaseStudyLayout, spec: SpecLayout };

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

  const Layout = LAYOUTS[project.layout];
  const prev = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="container mx-auto max-w-6xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
      {/* key: a new project starts its walkthrough from step 1 */}
      <Layout key={project.slug} project={project} prev={prev} next={next} />
    </article>
  );
}
