/**
 * projects.ts
 *
 * The featured projects: the six repositories pinned on the GitHub profile, in display order.
 * Each one is a cover in the Projects section and has its own page at /projects/<slug>
 * (see ProjectPage.tsx); its animated visual is the scene of the same slug in
 * components/projects/scenes.tsx. Copy is drafted from each repo's README — keep it short.
 *
 * Why it is hardcoded: pin state is only exposed through GitHub's GraphQL API, which needs an
 * auth token — unreachable from a static front-end. The live REST archive in MoreBuilds.tsx
 * derives its exclusion set from the `githubUrl` slugs below, so anything featured here drops
 * out of the archive automatically. Re-pinning repos on GitHub means editing this file by hand
 * (and bumping CACHE_KEY in MoreBuilds.tsx so cached visitors see the change).
 *
 * `slug` is part of a public URL: once a project page link is shared, never rename it.
 */
import { Project } from '../types';

const GH = 'https://github.com/FreddyZeta1847/';

export const projects: Project[] = [
  {
    slug: 'blueprint',
    title: 'blueprint',
    kind: 'Claude Code plugin',
    hook: 'Think it through before you build.',
    status: 'Active',
    problem: 'Claude Code forgets everything between sessions and starts building before it knows what matters.',
    how: 'It turns a request into a written context and a staged plan on disk. Every stage runs a fixed loop of phases, checked by hooks.',
    methods: ['Context-first planning', 'A fixed loop for each stage type', 'Deterministic Node hooks: no model, zero cost'],
    fact: { value: '4', label: 'stage types, each with its own loop' },
    technologies: ['JavaScript', 'Claude Code', 'AI Agents', 'Node hooks'],
    githubUrl: GH + 'blueprint',
  },
  {
    slug: 'jarvis',
    title: 'Jarvis',
    kind: 'Voice-first PWA',
    hook: 'One voice for expenses, calendar, mail and weather.',
    status: 'Deployed on Azure',
    problem: 'Expenses, calendar, email and weather live in four different apps.',
    how: 'An orchestrator agent on GPT-4o routes each spoken request to a specialist agent with its own tools. Speech runs in the browser, so the backend only ever sees text.',
    methods: ['Multi-agent orchestration (agents as tools)', 'Browser-side speech, no audio on the server', 'Stateless REST backend'],
    fact: { value: '4', label: 'specialist agents behind one orchestrator' },
    technologies: ['React', 'FastAPI', 'Azure OpenAI', 'Azure Speech', 'Cosmos DB'],
    githubUrl: GH + 'Jarvis',
  },
  {
    slug: 'ai-calendar-assistant',
    title: 'AI Calendar Assistant',
    kind: 'WhatsApp bot',
    hook: 'Scheduling that feels like texting a friend.',
    status: 'Complete',
    problem: 'Adding an event means opening an app and filling in a form.',
    how: 'You text the bot on WhatsApp. GPT pulls out the name, date, time and colour, and the event lands in Google Calendar.',
    methods: ['LLM parsing of free text', 'Relative dates: today, tomorrow, tonight', 'Colour words mapped to Google’s 11 colours'],
    fact: { value: '2', label: 'languages understood: Italian and English' },
    technologies: ['Python', 'Flask', 'OpenAI API', 'Twilio', 'Google Calendar'],
    githubUrl: GH + 'AI-calendar-assistant',
  },
  {
    slug: 'sift',
    title: 'sift',
    kind: 'Self-hosted pipeline',
    hook: 'RSS in, LinkedIn drafts out.',
    status: 'Active',
    problem: 'Keeping up with arXiv, Hacker News and security feeds to write about them takes hours.',
    how: 'Once a day it reads your feeds. An LLM keeps the top three stories and drafts three posts in your voice. You review them and post by hand.',
    methods: ['Human in the loop: it never posts for you', 'A different model for each step', 'A spending cap on every LLM call'],
    fact: { value: '0', label: 'config needed on first run, local models included' },
    technologies: ['TypeScript', 'SQLite', 'LLM routing', 'Docker'],
    githubUrl: GH + 'sift',
  },
  {
    slug: 'asl-live',
    title: 'ASL-live',
    kind: 'Edge ML on Raspberry Pi',
    hook: 'Sign a word, hear it spoken. No phone, no internet.',
    status: 'Phases 1–5 done, Pi hardware in progress',
    problem: 'Sign-language translation usually needs a phone and a connection.',
    how: 'A USB camera reads the hand. MediaPipe finds 21 points, a small classifier names the letter, letters become words, and the word is translated and spoken aloud.',
    methods: ['Hand landmarks as a 63-number vector', 'MLP classifier trained on Kaggle + own data', 'Offline translation (Argos) and voice (Piper)'],
    fact: { value: '0.988', label: 'macro-F1 on the letter classifier' },
    technologies: ['Python', 'MediaPipe', 'PyTorch', 'Raspberry Pi'],
    githubUrl: GH + 'ASL-live',
  },
  {
    slug: 'fcc-dashboard',
    title: 'fcc-dashboard',
    kind: 'Local dashboard',
    hook: 'See what your Claude Code proxy is actually doing.',
    status: 'Active',
    problem: 'With free-claude-code you can’t see which model really answers, or what you save.',
    how: 'It reads the proxy’s log without touching it, keeps the history in SQLite, and shows status, requests and savings against Anthropic’s prices.',
    methods: ['Money is never guessed: unknown, never $0', 'Bound to 127.0.0.1 only', 'Polls the log every 5 seconds'],
    fact: { value: '221', label: 'tests: 164 backend, 57 frontend' },
    technologies: ['Python', 'FastAPI', 'React', 'SQLite', 'Local-first'],
    githubUrl: GH + 'fcc-dashboard',
  },
];
