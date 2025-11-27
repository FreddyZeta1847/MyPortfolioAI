import React, { useState } from 'react';
import { ExternalLink, Code, Github, ChevronDown, ChevronUp } from 'lucide-react';
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
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">Personal Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Here are some projects I've recently developed, applying my knowledge and learning new technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-soft overflow-hidden group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 border border-slate-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <button
                      onClick={() => toggleProject(project.id)}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{project.title}</h3>
                {activeProject !== project.id && (
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                )}

                {activeProject === project.id && (
                  <div className="mt-4 p-4 bg-primary-50/50 rounded-xl animate-fadeIn border border-primary-100">
                    <p className="text-slate-600 mb-4">
                      {project.description}
                    </p>

                    <div className="flex items-center mb-3">
                      <Code size={18} className="text-primary-600 mr-2" />
                      <span className="text-slate-700 font-medium">Technologies used:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-100 text-primary-700 px-2.5 py-1 rounded-lg text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-slate-700 hover:text-primary-600 transition-colors duration-300 bg-white px-3 py-2 rounded-lg border border-slate-200 hover:border-primary-300"
                      >
                        <Github size={18} className="mr-2" />
                        View on GitHub
                      </a>
                    )}
                  </div>
                )}

                <button
                  onClick={() => toggleProject(project.id)}
                  className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium focus:outline-none transition-colors duration-300 flex items-center gap-1"
                >
                  {activeProject === project.id ? (
                    <>
                      Hide details
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Show details
                      <ChevronDown size={16} />
                    </>
                  )}
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