/**
 * layouts.tsx
 *
 * The three project-page layouts; each project picks one with its `layout` field
 * (data/projects.ts, decision of 2026-11-27):
 *  - CaseStudyLayout   — the story and the why: split hero (text left, scene right), a strip of
 *                         three facts, the 4 steps in a row, then why + stack.
 *  - SpecLayout        — a tool to install: sticky sidebar with title, facts, stack, GitHub and
 *                         install line; the scene, the problem and a vertical timeline beside it.
 *  - WalkthroughLayout — watch the mechanism: big centred title, then the 4 steps as buttons
 *                         beside the scene. Steps advance every 3.5 s; clicking one holds it for
 *                         8 s, and the scene shows that step (SCENE_STEP_OF).
 * All three end with the previous / next project cards (pageParts.tsx).
 */
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Project } from '../../types';
import { SCENES, SCENE_STEP_OF } from './scenes';
import { BackLink, FlagshipBadge, GitHubButton, InstallLine, Meta, PrevNext, SectionTitle, StackList, WhyList } from './pageParts';

export type LayoutProps = { project: Project; prev: Project; next: Project };

/* ---------- Case study ---------- */
export function CaseStudyLayout({ project, prev, next }: LayoutProps) {
  const Scene = SCENES[project.slug];
  return (
    <>
      <BackLink />
      <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          {project.flagship && <div className="mb-4"><FlagshipBadge /></div>}
          <Meta project={project} />
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-surface-900 dark:text-white md:text-6xl">{project.title}</h1>
          <p className="mt-4 text-xl text-surface-700 dark:text-surface-300 md:text-2xl">{project.hook}</p>
          <p className="mt-5 max-w-lg leading-relaxed text-surface-600 dark:text-surface-400">{project.problem} {project.how}</p>
          <div className="mt-7 space-y-3"><GitHubButton project={project} /><InstallLine project={project} /></div>
        </div>
        {/* wrapper: the scene's h-full must not resolve against the grid row and stretch it */}
        <div><Scene /></div>
      </header>

      <dl className="mt-16 grid grid-cols-3 divide-x divide-surface-200 rounded-lg border border-surface-200 dark:divide-surface-800 dark:border-surface-800">
        {project.facts.map((fact) => (
          <div key={fact.label} className="flex flex-col-reverse px-3 py-6 text-center md:px-8">
            <dt className="mt-2 text-sm text-surface-600 dark:text-surface-400">{fact.label}</dt>
            <dd className="text-3xl font-bold tabular-nums text-accent-600 dark:text-accent-400 md:text-5xl">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-20">
        <SectionTitle>How it works</SectionTitle>
        <ol className="relative mt-10 grid gap-8 md:grid-cols-4">
          <span className="absolute left-5 right-5 top-5 hidden h-px bg-surface-200 dark:bg-surface-800 md:block" aria-hidden="true" />
          {project.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-primary-500 bg-white font-mono font-semibold text-primary-600 dark:bg-surface-950 dark:text-primary-400">{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-surface-900 dark:text-white">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-surface-600 dark:text-surface-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div><SectionTitle>Why it’s built this way</SectionTitle><div className="mt-6"><WhyList project={project} /></div></div>
        <div><SectionTitle>Built with</SectionTitle><div className="mt-6"><StackList project={project} /></div></div>
      </section>
      <PrevNext prev={prev} next={next} />
    </>
  );
}

/* ---------- Spec sheet ---------- */
export function SpecLayout({ project, prev, next }: LayoutProps) {
  const Scene = SCENES[project.slug];
  return (
    <>
      <BackLink />
      <div className="mt-10 grid gap-12 lg:grid-cols-[19rem_1fr]">
        <aside className="space-y-8 self-start lg:sticky lg:top-28">
          <div>
            <Meta project={project} />
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-surface-900 dark:text-white md:text-5xl">{project.title}</h1>
            <p className="mt-3 text-lg text-surface-700 dark:text-surface-300">{project.hook}</p>
          </div>
          <dl className="divide-y divide-surface-200 border-y border-surface-200 dark:divide-surface-800 dark:border-surface-800">
            {project.facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-surface-600 dark:text-surface-400">{fact.label}</dt>
                <dd className="text-xl font-bold tabular-nums text-accent-600 dark:text-accent-400">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div><p className="mb-3 text-sm font-semibold text-surface-900 dark:text-white">Built with</p><StackList project={project} /></div>
          <div className="space-y-3"><GitHubButton project={project} /><InstallLine project={project} /></div>
        </aside>

        <div>
          <div><Scene /></div>
          <p className="mt-10 rounded-lg border border-accent-200 bg-accent-50 px-6 py-5 text-lg text-surface-800 dark:border-accent-900 dark:bg-accent-900/20 dark:text-surface-100">
            <b className="text-accent-700 dark:text-accent-300">The problem.</b> {project.problem}
          </p>
          <section className="mt-14">
            <SectionTitle>How it works</SectionTitle>
            <ol className="relative ms-3 mt-8 space-y-8 border-s-2 border-surface-200 dark:border-surface-800">
              {project.steps.map((step, i) => (
                <li key={step.title} className="relative ps-8">
                  <span className="absolute -start-[13px] top-0 grid h-6 w-6 place-items-center rounded-full bg-primary-500 text-xs font-bold text-surface-950">{i + 1}</span>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-surface-600 dark:text-surface-400">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>
          <section className="mt-14"><SectionTitle>Why it’s built this way</SectionTitle><div className="mt-6"><WhyList project={project} /></div></section>
          <PrevNext prev={prev} next={next} />
        </div>
      </div>
    </>
  );
}

/* ---------- Walkthrough ---------- */
const STEP_MS = 3500;
const HOLD_MS = 8000;

/** Which of the 4 steps is shown: advances on its own, a pick holds it for a while. */
function useWalkthrough(count: number) {
  const reduced = useReducedMotion();
  const [state, setState] = useState({ active: 0, held: false });
  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(
      () => setState((s) => ({ active: (s.active + 1) % count, held: false })),
      state.held ? HOLD_MS : STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [state, count, reduced]);
  return { active: state.active, held: state.held, pick: (i: number) => setState({ active: i, held: true }), autoplay: !reduced };
}

export function WalkthroughLayout({ project, prev, next }: LayoutProps) {
  const Scene = SCENES[project.slug];
  const { active, held, pick, autoplay } = useWalkthrough(project.steps.length);
  return (
    <>
      <BackLink />
      <header className="mx-auto mt-12 max-w-3xl text-center">
        <Meta project={project} />
        <h1 className="mt-3 text-6xl font-bold tracking-tight text-surface-900 dark:text-white md:text-7xl">{project.title}</h1>
        <p className="mt-5 text-xl text-surface-700 dark:text-surface-300 md:text-2xl">{project.hook}</p>
        <p className="mt-4 text-surface-600 dark:text-surface-400">{project.problem}</p>
        <div className="mt-7 flex flex-col items-center gap-3"><GitHubButton project={project} /><InstallLine project={project} /></div>
      </header>

      <section className="mt-16 grid gap-8 lg:grid-cols-[22rem_1fr] lg:items-start" aria-label="How it works, step by step">
        <ol className="space-y-2">
          {project.steps.map((step, i) => {
            const on = i === active;
            return (
              <li key={step.title}>
                <button
                  onClick={() => pick(i)}
                  aria-current={on ? 'step' : undefined}
                  className={`relative w-full overflow-hidden rounded-lg border px-5 py-4 text-left transition-colors ${
                    on ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-surface-200 hover:border-primary-500/60 dark:border-surface-800'
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-sm text-primary-600 dark:text-primary-400">0{i + 1}</span>
                    <span className="text-lg font-semibold text-surface-900 dark:text-white">{step.title}</span>
                  </span>
                  {on && <span className="mt-1 block ps-8 text-sm text-surface-600 dark:text-surface-400">{step.text}</span>}
                  {on && autoplay && (
                    <span
                      key={`${active}-${held}`}
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary-500"
                      style={{ animation: `step-fill ${held ? HOLD_MS : STEP_MS}ms linear forwards` }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="lg:sticky lg:top-28">
          <Scene step={SCENE_STEP_OF[project.slug]?.[active]} />
          <p className="mt-3 text-center text-sm text-surface-500" aria-live="polite">
            Step {active + 1} of {project.steps.length} · {project.steps[active].title}
          </p>
        </div>
      </section>

      <section className="mt-20 grid gap-6 md:grid-cols-3">
        {project.facts.map((fact) => (
          <div key={fact.label} className="rounded-lg border border-surface-200 bg-cream px-6 py-6 dark:border-surface-800 dark:bg-surface-900/60">
            <p className="text-4xl font-bold tabular-nums text-accent-600 dark:text-accent-400">{fact.value}</p>
            <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">{fact.label}</p>
          </div>
        ))}
      </section>
      <section className="mt-16 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div><SectionTitle>Why it’s built this way</SectionTitle><div className="mt-6"><WhyList project={project} /></div></div>
        <div><SectionTitle>Built with</SectionTitle><div className="mt-6"><StackList project={project} /></div></div>
      </section>
      <PrevNext prev={prev} next={next} />
    </>
  );
}
