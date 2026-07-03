import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'What-IF',
    description: 'Early-stage AI simulation project — in active development.',
    technologies: ['Agentic AI', 'LLMs', 'Claude Code'],
    imageUrl: 'https://opengraph.githubassets.com/1/FreddyZeta1847/What-IF',
    githubUrl: 'https://github.com/FreddyZeta1847/What-IF',
    gifs: [],
  },
  {
    id: 2,
    title: 'ASL-live',
    description: 'Offline ASL-to-speech on a Raspberry Pi: sign ASL letters into a USB camera and hear the translated word spoken back in your chosen language — fully phone-free and internet-free. Hand landmarks from MediaPipe feed a custom-trained classifier (macro-F1 0.988) running on ONNX.',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'PyTorch', 'ONNX Runtime', 'Argos Translate', 'Piper TTS', 'Raspberry Pi'],
    imageUrl: 'https://opengraph.githubassets.com/1/FreddyZeta1847/ASL-live',
    githubUrl: 'https://github.com/FreddyZeta1847/ASL-live',
    gifs: [],
  },
  {
    id: 3,
    title: 'Jarvis',
    description: 'A personal voice-first AI assistant web app with multi-agent orchestration, expense tracking, calendar management, and email integration. Features browser-direct speech recognition, a mobile-first PWA interface, and glassmorphism-themed UI with customizable themes.',
    technologies: ['Claude Code', 'Agentic Workflow', 'Python', 'React', 'Agentic AI', 'Azure DevOps', 'Cloud', 'TTS-STT'],
    imageUrl: '/images/Jarvis.png',
    githubUrl: 'https://github.com/FreddyZeta1847/Jarvis',
    gifs: [],
  },
];
