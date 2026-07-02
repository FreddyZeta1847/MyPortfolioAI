import { skills } from './skills';
import { projects } from './projects';
import { experience } from './experience';

export const githubUsername = 'FreddyZeta1847';
export const githubUrl = `https://github.com/${githubUsername}`;

// Unique technologies across every skill group (case-insensitive).
const uniqueTech = new Set(
  skills.flatMap((g) => g.items.map((i) => i.trim().toLowerCase()))
).size;

const languageCount =
  skills.find((g) => g.category === 'Programming Languages')?.items.length ?? 0;

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

// Values derived from the data so they never drift out of sync.
export const stats: Stat[] = [
  { value: languageCount, label: 'Languages' },
  { value: uniqueTech, suffix: '+', label: 'Technologies & tools' },
  { value: projects.length, label: 'Featured projects' },
  { value: experience.length, label: 'Work experiences' },
];

// Draggable "toolbox" chips. `key` maps to skillIconMap for an icon; `label`
// is the friendly text shown on the chip.
export interface ToolChip {
  label: string;
  key: string;
}

export const toolboxChips: ToolChip[] = [
  { label: 'Python', key: 'Python' },
  { label: 'React', key: 'React.js' },
  { label: 'TypeScript', key: 'Typescript' },
  { label: 'Node.js', key: 'Node.js (express)' },
  { label: 'JavaScript', key: 'JavaScript' },
  { label: 'Docker', key: 'Docker' },
  { label: 'MongoDB', key: 'MongoDB' },
  { label: 'C++', key: 'C++' },
  { label: 'Flask', key: 'Flask (python)' },
  { label: 'PHP', key: 'PHP' },
  { label: 'Java', key: 'Java' },
  { label: 'GitHub', key: 'GitHub' },
];
