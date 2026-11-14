/*
 * experience.ts
 *
 * Static data for the work-experience timeline shown by components/Experience.tsx.
 * Each entry follows the `Experience` interface in ../types. To add a job, append
 * an object to the `experience` array (oldest first, newest last): the timeline
 * shows them newest first, like `git log`.
 *
 * logo:    image in /public/images/, referenced as '/images/your-file.png'. The company's
 *          initial shows instead if the file is missing.
 * current: true for roles that are still going (glowing dot and "in corso" marker).
 * branch:  leave out for normal jobs. Use another name (e.g. 'freelance') for work that
 *          runs in parallel: it gets its own lane, forking off the main one.
 */
import { Experience } from '../types';

export const experience: Experience[] = [
  {
    company: 'PORINI',
    role: 'Full Stack Developer',
    period: 'apr 2024 – mag 2024',
    logo: '/images/PORINI.jpeg',
    description:
      'Developed a CRUD web application operating on a SQL database containing Zanichelli books.',
    competencies: ['HTML', 'CSS', 'Team Working', 'Javascript', 'Power BI'],
  },
  {
    company: 'expert.ai',
    role: 'AI Game Developer',
    period: 'mar 2026 – giu 2026',
    logo: '/images/expertAI.webp',
    description:
      'Created an escape room videogame in Godot that uses local LLMs as NPCs in the game.',
    competencies: ['LLMs', 'Ollama', 'Godot', 'Popochiu', 'Claude Code'],
  },
  {
    company: 'Payglobe',
    role: 'Web Developer',
    period: 'set 2026 – dic 2026',
    logo: '/images/payglobe.png',
    description:
      'Redesign, SEO optimization and CMS work on the MoneyNet and Payglobe websites.',
    competencies: ['Web Design', 'SEO', 'CMS', 'Team Working'],
    current: true,
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: 'set 2026 – presente',
    logo: '/images/freelance.png',
    description:
      'Design and build websites for private clients, friends and colleagues, from first sketch to deployment.',
    competencies: ['React', 'TypeScript', 'Tailwind CSS', 'Azure', 'Client Work'],
    current: true,
    branch: 'freelance',
  },
];
