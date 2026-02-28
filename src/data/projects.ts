import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Interactive Renewable Energy Map',
    description: 'An interactive map displaying the distribution of renewable energy sources across Italy, built with Folium (Python). Integrates georeferenced data with detailed energy type information retrieved from the Overpass API.',
    technologies: ['Python', 'Folium', 'Data Visualization', 'Plotly', 'Flask', 'Overpass API', 'Claude 4 Sonnet'],
    imageUrl: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/FreddyZeta1847/EnergyPro',
    gifs: [],
  },
  {
    id: 2,
    title: 'Real-Time Chat Application',
    description: 'A full-stack web chat application built with Node.js and Socket.io. Features a clean interface, real-time messaging, and multi-user support. Deployed both locally and on remote servers.',
    technologies: ['Node.js', 'Socket.io', 'JavaScript', 'React.js', 'MongoDB', 'Express'],
    imageUrl: '/images/ChatApplication.png',
    githubUrl: 'https://github.com/FreddyZeta1847/fullstack-chat-app',
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
