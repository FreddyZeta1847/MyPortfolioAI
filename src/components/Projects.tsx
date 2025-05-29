import React, { useState } from 'react';
import { ExternalLink, Code, Github } from 'lucide-react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const toggleProject = (id: number) => {
    if (activeProject === id) {
      setActiveProject(null);
    } else {
      setActiveProject(id);
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Progetti Personali</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Ecco alcuni progetti che ho realizzato recentemente, mettendo in pratica le mie conoscenze e imparando nuove tecnologie.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <button 
                      onClick={() => toggleProject(project.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Visualizza Dettagli
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                {activeProject !== project.id && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                )}
                
                {activeProject === project.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center mb-3">
                      <Code size={18} className="text-blue-600 mr-2" />
                      <span className="text-gray-700 font-medium">Tecnologie utilizzate:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {project.githubUrl && (
                      <div className="mt-3">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
                        >
                          <Github size={18} className="mr-2" />
                          Visualizza su GitHub
                        </a>
                      </div>
                    )}
                  </div>
                )}
                
                <button 
                  onClick={() => toggleProject(project.id)}
                  className={`mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none transition-colors duration-300 ${activeProject === project.id ? 'flex items-center' : ''}`}
                >
                  {activeProject === project.id ? 'Nascondi dettagli' : 'Mostra dettagli'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;