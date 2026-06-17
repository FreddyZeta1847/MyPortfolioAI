import { Experience } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// 👉 FILL IN YOUR WORK EXPERIENCE HERE.
// Order them oldest → newest (the timeline reads left/start = first job,
// right/end = most recent). Add as many as you want; they auto-space evenly.
//
// logo: drop the agency image in /public/images/ and reference it as
//       '/images/your-file.png'. A placeholder shows if the file is missing.
// ─────────────────────────────────────────────────────────────────────────────
export const experience: Experience[] = [
  {
    company: 'PORINI',
    role: 'Full Stack Developer',
    period: 'apr 2024 – mag 2024',
    logo: '/images/PORINI.jpeg',
    description:
      'Developed a CRUD web applicaton operating on a SQL database conatinig Zanichelli books',
    competencies: ['HTML', 'CSS', 'Team Working', "Javascript", "Power BI"],
  },
  {
    company: 'expert.ai',
    role: 'AI Game Developer',
    period: 'mar 2026 – giu 2026',
    logo: '/images/expertAI.webp',
    description:
      'Created an escape room videogame in godot that uses local LLM as NPCs in the game',
    competencies: ['LLMs', 'Ollama', 'Godot', "Popochiu", "Claude Code"],
  },
];
