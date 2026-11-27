/**
 * projects.ts
 *
 * The featured projects, in display order: the six repositories pinned on GitHub plus az-mod
 * and gameclaude. Each one is a cover in the Projects section and has its own page at
 * /projects/<slug> (ProjectPage.tsx), laid out as `layout` says; its animated visual is the
 * scene of the same slug in components/projects/scenes.tsx. Copy is drafted from each repo's
 * README — keep it short, and every number true.
 *
 * Why it is hardcoded: pin state is only exposed through GitHub's GraphQL API, which needs an
 * auth token — unreachable from a static front-end. The live REST archive in MoreBuilds.tsx
 * derives its exclusion set from the `githubUrl` slugs below, so anything featured here drops
 * out of the archive automatically. Changing this list means bumping CACHE_KEY in
 * MoreBuilds.tsx so cached visitors see the change.
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
    steps: [
      { title: 'Context', text: 'Works out what matters from the repo and the chat, asks only the gaps.' },
      { title: 'Plan', text: 'Stages with one-line topics, written to plan.json after your OK.' },
      { title: 'Stages', text: 'Each stage runs the fixed loop of its type: discuss, build, deliver.' },
      { title: 'Hooks', text: 'Node scripts check every write. No model, no cost.' },
    ],
    facts: [{ value: '4', label: 'stage types' }, { value: '10', label: 'context points, asked only if unknown' }, { value: '$0', label: 'to run the checks' }],
    technologies: ['JavaScript', 'Claude Code', 'AI Agents', 'Node hooks'],
    install: '/plugin marketplace add FreddyZeta1847/blueprint',
    layout: 'caseStudy',
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
    steps: [
      { title: 'Speak', text: 'Azure Speech turns your voice into text, right in the browser.' },
      { title: 'Route', text: 'An orchestrator on GPT-4o picks the right specialist.' },
      { title: 'Act', text: 'The agent uses its tools: Cosmos DB, Google Calendar, Gmail, weather.' },
      { title: 'Answer', text: 'The reply is spoken back. The backend only ever sees text.' },
    ],
    facts: [{ value: '4', label: 'specialist agents' }, { value: '32', label: 'colour themes' }, { value: 'PWA', label: 'installable on any phone' }],
    technologies: ['React', 'FastAPI', 'Azure OpenAI', 'Azure Speech', 'Cosmos DB'],
    layout: 'walkthrough',
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
    steps: [
      { title: 'Text', text: 'You write the plan on WhatsApp; Twilio forwards it to a Flask webhook.' },
      { title: 'Parse', text: 'GPT extracts the name, date, time and colour.' },
      { title: 'Create', text: 'The event is written to Google Calendar with a service account.' },
      { title: 'Confirm', text: 'The bot answers with what it booked.' },
    ],
    facts: [{ value: '2', label: 'languages: Italian, English' }, { value: '11', label: 'Google Calendar colours mapped' }, { value: '1 h', label: 'default length when no end is given' }],
    technologies: ['Python', 'Flask', 'OpenAI API', 'Twilio', 'Google Calendar'],
    layout: 'caseStudy',
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
    steps: [
      { title: 'Ingest', text: 'Pulls new items from your RSS feeds once a day.' },
      { title: 'Curate', text: 'An LLM ranks them and keeps the top three.' },
      { title: 'Draft', text: 'Three LinkedIn posts in your voice, each with an image prompt.' },
      { title: 'Review', text: 'You edit, translate or discard, then post by hand.' },
    ],
    facts: [{ value: '3', label: 'drafts a day' }, { value: '8', label: 'LLM providers, local ones included' }, { value: '0', label: 'config to boot' }],
    technologies: ['TypeScript', 'SQLite', 'LLM routing', 'Docker'],
    install: 'docker compose up -d',
    layout: 'walkthrough',
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
    steps: [
      { title: 'See', text: 'A USB camera reads the hand; MediaPipe finds 21 landmarks.' },
      { title: 'Classify', text: 'A small MLP names the letter from 63 numbers.' },
      { title: 'Spell', text: 'Letters are debounced into words.' },
      { title: 'Speak', text: 'Argos translates, Piper speaks. All offline.' },
    ],
    facts: [{ value: '0.988', label: 'macro-F1' }, { value: '21', label: 'hand landmarks' }, { value: '0', label: 'internet needed' }],
    technologies: ['Python', 'MediaPipe', 'PyTorch', 'Raspberry Pi'],
    layout: 'walkthrough',
    githubUrl: GH + 'ASL-live',
  },
  {
    slug: 'az-mod',
    title: 'az-mod',
    kind: 'Claude Code mod',
    hook: 'Your project’s Azure resources, live beside the chat.',
    status: 'Active',
    problem: 'Checking whether an Azure deploy worked means leaving the editor for the portal.',
    how: 'It finds the project’s resource group, shows every resource in a side pane and keeps it fresh with read-only Azure CLI calls.',
    methods: ['Read-only az calls, no secrets stored', 'Refreshes right after Claude’s own az writes', 'Rules file shared safely across sessions'],
    steps: [
      { title: 'Scan', text: 'Adopts rg-<folder> and proposes related resources, with the reason.' },
      { title: 'Watch', text: 'Read-only az calls every 2 minutes, with backoff on errors.' },
      { title: 'Cost', text: 'Month so far against last month, per resource.' },
      { title: 'Warn', text: 'At most four warnings, each with its cause and fix.' },
    ],
    facts: [{ value: '2 min', label: 'refresh interval' }, { value: '4', label: 'warnings at most' }, { value: '0', label: 'write calls to Azure' }],
    technologies: ['TypeScript', 'Claude Code', 'Azure CLI', 'Node hooks'],
    install: '/plugin install az-mod --marketplace FreddyZeta1847/az-mod',
    layout: 'spec',
    githubUrl: GH + 'az-mod',
  },
  {
    slug: 'gameclaude',
    title: 'gameclaude',
    kind: 'Claude Code mod',
    hook: 'Three quick games while Claude thinks.',
    status: 'Active',
    problem: 'A long Claude run means staring at a spinner.',
    how: '/game opens a side pane with Parola, Campo minato and Raddoppia. Boards are SVG, redrawn only when you move.',
    methods: ['Nothing animates on its own: near-zero cost while waiting', 'Keyboard-first play, hotkeys 1-2-3', 'Saved after every move, no network'],
    steps: [
      { title: 'Open', text: 'Type /game: a side pane opens next to the chat.' },
      { title: 'Pick', text: 'Parola, Campo minato or Raddoppia, on keys 1, 2, 3.' },
      { title: 'Play', text: 'Keyboard only; the board redraws only when you move.' },
      { title: 'Keep', text: 'Saved after every move. Nothing leaves your computer.' },
    ],
    facts: [{ value: '3', label: 'games' }, { value: '768', label: 'words for Parola' }, { value: '14', label: 'tests on the game logic' }],
    technologies: ['TypeScript', 'SVG', 'Claude Code'],
    install: '/plugin install gameclaude --marketplace FreddyZeta1847/gameclaude',
    layout: 'spec',
    githubUrl: GH + 'gameclaude',
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
    steps: [
      { title: 'Read', text: 'Tails the proxy log every 5 seconds, read-only.' },
      { title: 'Store', text: 'Keeps the request history in SQLite.' },
      { title: 'Price', text: 'Compares each call with Anthropic’s price; unknown stays unknown.' },
      { title: 'Show', text: 'A local dashboard on 127.0.0.1 that refreshes itself.' },
    ],
    facts: [{ value: '221', label: 'tests' }, { value: '5 s', label: 'log polling' }, { value: '0', label: 'prices guessed' }],
    technologies: ['Python', 'FastAPI', 'React', 'SQLite', 'Local-first'],
    layout: 'spec',
    githubUrl: GH + 'fcc-dashboard',
  },
];
