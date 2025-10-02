import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Interactive Renewable Energy Map',
    description: 'An interactive map displaying the distribution of renewable energy sources across Italy, built with Folium (Python). Integrates georeferenced data with detailed energy type information retrieved from the Overpass API.',
    technologies: ['Python', 'Folium', 'Data Visualization', "Plotly", "Flask", "Overpass API", "Claude 4 Sonnet"],
    imageUrl: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/FreddyZeta1847/EnergyPro'
  },
  {
    id: 2,
    title: 'Real-Time Chat Application',
    description: 'A full-stack web chat application built with Node.js and Socket.io. Features a clean interface, real-time messaging, and multi-user support. Deployed both locally and on remote servers.',
    technologies: ['Node.js', 'Socket.io', 'JavaScript', 'React.js', 'MongoDB', "Express"],
    imageUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/FreddyZeta1847/fullstack-chat-app'
  },
  {
    id: 3,
    title: 'ScrapeMind AI',
    description: 'A powerful web scraping application designed to extract and process data from websites efficiently. Features automated data collection, parsing, and storage capabilities with a user-friendly interface.',
    technologies: ['Ollama', 'Nodejs', 'Mongodb', 'Claude Code', "Express"],
    imageUrl: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/FreddyZeta1847/Web-Scraping-App'
  }
];