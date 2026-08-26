/**
 * projects.ts
 *
 * The featured ("top") projects rendered as cards in the Projects section.
 * This list mirrors the six repositories pinned on the GitHub profile.
 *
 * Why it is hardcoded: pin state is only exposed through GitHub's GraphQL API,
 * which needs an auth token — unreachable from a static front-end. The live
 * REST archive in MoreBuilds.tsx therefore derives its exclusion set from the
 * `githubUrl` slugs below, so anything featured here drops out of the archive
 * automatically. Re-pinning repos on GitHub means editing this file by hand
 * (and bumping CACHE_KEY in MoreBuilds.tsx so cached visitors see the change).
 *
 * Card layout keeps descriptions to ~2 lines and technologies to 4-5 entries;
 * longer values make the 3-across grid ragged.
 */
import { Project } from '../types';

const ogCard = (repo: string) => `https://opengraph.githubassets.com/1/FreddyZeta1847/${repo}`;

export const projects: Project[] = [
  {
    id: 1,
    title: 'Jarvis',
    description:
      'Voice-first personal AI assistant. A multi-agent backend orchestrates expense tracking, Google Calendar, Gmail and weather, all driven by natural speech in a mobile-first PWA.',
    technologies: ['React', 'FastAPI', 'Azure OpenAI', 'Agentic AI', 'TTS-STT'],
    imageUrl: ogCard('Jarvis'),
    githubUrl: 'https://github.com/FreddyZeta1847/Jarvis',
  },
  {
    id: 2,
    title: 'NEOLED',
    description:
      'LED control by hand gesture. MediaPipe tracks your fingers through a webcam and streams the count over USB serial to an ESP32, which lights one LED per raised finger.',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'ESP32'],
    imageUrl: ogCard('NEOLED'),
    githubUrl: 'https://github.com/FreddyZeta1847/NEOLED',
  },
  {
    id: 3,
    title: 'AI Calendar Assistant',
    description:
      'Scheduling that feels like texting a friend. Twilio carries the conversation and the OpenAI API turns it into real calendar actions, so plans get booked without opening an app.',
    technologies: ['Python', 'OpenAI API', 'Twilio', 'Google Calendar'],
    imageUrl: ogCard('AI-calendar-assistant'),
    githubUrl: 'https://github.com/FreddyZeta1847/AI-calendar-assistant',
  },
  {
    id: 4,
    title: 'sift',
    description:
      'Human-in-the-loop content pipeline. Monitors AI, ML, cybersecurity and robotics feeds, drafts LinkedIn posts into a local SQLite database, and routes prompts across any LLM provider.',
    technologies: ['TypeScript', 'SQLite', 'LLM Routing', 'Automation'],
    imageUrl: ogCard('sift'),
    githubUrl: 'https://github.com/FreddyZeta1847/sift',
  },
  {
    id: 5,
    title: 'ASL-live',
    description:
      'Offline ASL-to-speech on a Raspberry Pi. MediaPipe hand landmarks feed a custom classifier (macro-F1 0.988) on ONNX Runtime, which speaks the translated word back — no phone, no internet.',
    technologies: ['Python', 'MediaPipe', 'PyTorch', 'ONNX Runtime', 'Raspberry Pi'],
    imageUrl: ogCard('ASL-live'),
    githubUrl: 'https://github.com/FreddyZeta1847/ASL-live',
  },
  {
    id: 6,
    title: 'fcc-dashboard',
    description:
      'Local dashboard for free-claude-code. Tracks live requests, real cost savings against Anthropic pricing and usage trends over time — entirely on your machine, no cloud, no accounts.',
    technologies: ['Python', 'SQLite', 'Analytics', 'Local-first'],
    imageUrl: ogCard('fcc-dashboard'),
    githubUrl: 'https://github.com/FreddyZeta1847/fcc-dashboard',
  },
];
