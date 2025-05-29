import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Mappa Interattiva delle Energie Rinnovabili',
    description: 'Una mappa interattiva che mostra la distribuzione delle fonti rinnovabili in Italia, realizzata con Folium (Python). Integra dati georeferenziati con informazioni utili sul tipo di energia ricavate da Overpass API.',
    technologies: ['Python', 'Folium', 'Data Visualization', "Plotly", "Flask", "Overpass API"],
    imageUrl: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/FreddyZeta1847/EnergyPro'
  },
  {
    id: 2,
    title: 'Chat-App Web',
    description: 'Applicazione di chat web sviluppata con Node.js e Socket.io. Offre un\'interfaccia semplice, messaggistica in tempo reale e supporto a più utenti. Deployata sia in locale che su server remoto.',
    technologies: ['Node.js', 'Socket.io', 'JavaScript', 'React.js', 'MongoDB', "Express"],
    imageUrl: 'https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/FreddyZeta1847/fullstack-chat-app'
  },
  {
    id: 3,
    title: 'Social Network Web',
    description: 'Una piattaforma social network con frontend in React e backend in Node.js con MongoDB. Implementa funzionalità di registrazione, login, creazione post, commenti e profili utente.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: 'https://github.com/FreddyZeta1847/Social-Application'
  }
];