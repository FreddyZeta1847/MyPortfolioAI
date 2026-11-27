/**
 * pageParts.tsx
 *
 * The building blocks shared by the three project-page layouts (layouts.tsx): back link,
 * kind · status line, GitHub button, install command with a copy button, "why it's built this
 * way" list, the tech stack with brand logos, section titles, and the previous / next project
 * cards. Each piece reads straight from a Project (data/projects.ts).
 */
import type { ReactNode } from 'react';
import { ArrowLeft, Check, Copy, Github } from 'lucide-react';
import toast from 'react-hot-toast';
import type { IconType } from 'react-icons';
import {
  SiClaude, SiDocker, SiFastapi, SiFlask, SiGooglecalendar, SiJavascript, SiMediapipe, SiNodedotjs,
  SiOpenai, SiPython, SiPytorch, SiRaspberrypi, SiReact, SiSqlite, SiSvg, SiTwilio, SiTypescript,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import type { Project } from '../../types';
import { followLink } from '../../utils/router';

export function BackLink() {
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

export function Meta({ project }: { project: Project }) {
  return <p className="text-sm text-surface-500 dark:text-surface-400">{project.kind} · {project.status}</p>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white md:text-3xl">{children}</h2>;
}

export function GitHubButton({ project }: { project: Project }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:scale-[0.98]"
    >
      <Github size={16} />View on GitHub
    </a>
  );
}

export function InstallLine({ project }: { project: Project }) {
  if (!project.install) return null;
  const command = project.install;
  const copy = () =>
    navigator.clipboard.writeText(command).then(
      () => toast.success('Command copied'),
      () => toast.error('Could not copy — select the text instead')
    );
  return (
    <div className="flex items-center gap-3 rounded-md border border-surface-800 bg-surface-950 py-2 pl-4 pr-2 font-mono text-[13px] text-surface-200">
      <span className="shrink-0 text-primary-500">$</span>
      <span className="min-w-0 flex-1 break-words">{command}</span>
      <button
        onClick={copy}
        aria-label="Copy the install command"
        className="shrink-0 rounded p-1.5 text-surface-400 transition-colors hover:bg-surface-800 hover:text-white"
      >
        <Copy size={14} />
      </button>
    </div>
  );
}

export function WhyList({ project }: { project: Project }) {
  return (
    <ul className="space-y-3">
      {project.methods.map((method) => (
        <li key={method} className="flex gap-3 text-surface-700 dark:text-surface-300">
          <Check size={20} className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-500" />
          {method}
        </li>
      ))}
    </ul>
  );
}

// Brand logo and colour per technology tag; tags missing here are shown as plain text.
const TECH_ICONS: Record<string, [IconType, string]> = {
  JavaScript: [SiJavascript, '#F7DF1E'],
  TypeScript: [SiTypescript, '#3178C6'],
  Python: [SiPython, '#3776AB'],
  React: [SiReact, '#61DAFB'],
  FastAPI: [SiFastapi, '#009688'],
  Flask: [SiFlask, 'currentColor'],
  'OpenAI API': [SiOpenai, 'currentColor'],
  Twilio: [SiTwilio, '#F22F46'],
  'Google Calendar': [SiGooglecalendar, '#4285F4'],
  SQLite: [SiSqlite, '#0F80CC'],
  Docker: [SiDocker, '#2496ED'],
  PyTorch: [SiPytorch, '#EE4C2C'],
  'Raspberry Pi': [SiRaspberrypi, '#C51A4A'],
  MediaPipe: [SiMediapipe, '#0097A7'],
  'Claude Code': [SiClaude, '#D97757'],
  'Node hooks': [SiNodedotjs, '#5FA04E'],
  SVG: [SiSvg, '#FFB13B'],
  'Azure OpenAI': [VscAzure, '#0078D4'],
  'Azure Speech': [VscAzure, '#0078D4'],
  'Azure CLI': [VscAzure, '#0078D4'],
  'Cosmos DB': [VscAzure, '#0078D4'],
};

function TechChip({ tech }: { tech: string }) {
  const [Icon, color] = TECH_ICONS[tech] ?? [];
  return (
    <li className="inline-flex items-center gap-2 rounded-md border border-surface-200 bg-white px-2.5 py-1.5 text-sm font-medium text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200">
      {Icon && <Icon size={16} color={color} aria-hidden="true" />}
      {tech}
    </li>
  );
}

export function StackList({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {project.technologies.map((tech) => <TechChip key={tech} tech={tech} />)}
    </ul>
  );
}

export function PrevNext({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav aria-label="Other projects" className="mt-20 grid gap-4 sm:grid-cols-2">
      {([[prev, 'Previous'], [next, 'Next']] as const).map(([project, label]) => {
        const path = `/projects/${project.slug}`;
        return (
          <a
            key={label}
            href={path}
            onClick={(e) => followLink(e, path)}
            className={`group rounded-lg border border-surface-200 p-5 transition-all hover:-translate-y-0.5 hover:border-primary-500/60 hover:shadow-glass dark:border-surface-800 ${label === 'Next' ? 'sm:text-right' : ''}`}
          >
            <span className="block text-sm text-surface-500">{label} project</span>
            <span className="mt-1 block text-xl font-bold text-surface-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-500">{project.title}</span>
            <span className="mt-1 block text-sm text-surface-600 dark:text-surface-400">{project.hook}</span>
          </a>
        );
      })}
    </nav>
  );
}
