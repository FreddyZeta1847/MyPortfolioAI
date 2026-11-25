/*
 * index.ts (types)
 *
 * Shared TypeScript interfaces for the portfolio's static data (navigation, projects,
 * skills, experience, radar axes, GitHub repos). The files in src/data/ are typed with these.
 */
export interface NavItem {
  id: string;
  title: string;
}

export interface Project {
  slug: string;            // URL part of its page: /projects/<slug> — shared links depend on it, never rename
  title: string;
  kind: string;            // what it is, in a few words ("WhatsApp bot")
  hook: string;            // one-line pitch shown on the cover
  status: string;
  problem: string;
  how: string;
  methods: string[];       // 3 short lines
  fact: { value: string; label: string };  // one hard, true number
  technologies: string[];
  githubUrl: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  period: string;
  institution: string;
  degree: string;
  description?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  logo: string;            // path under /public, e.g. '/images/company1.png'
  description: string;
  competencies: string[];  // shown as LinkedIn-style tags
  current?: boolean;       // role is still going: glowing dot + "in corso" marker
  branch?: string;         // timeline lane; omitted = main "work" lane, any other name = side lane
}

export interface RadarAxis {
  label: string;
  value: number;           // 0–100, your proficiency / weight in your toolkit
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  updatedAt: string;
}