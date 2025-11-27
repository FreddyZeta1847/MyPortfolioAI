import React from 'react';
import { Github } from 'lucide-react';
import { projects } from '../data/projects';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Projects: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Top Personal Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Here are some projects I've recently developed, applying my knowledge and learning new technologies.
          </p>
        </div>

        <div ref={projectsRef} className="flex flex-col gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white dark:bg-slate-700 rounded-2xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-300 border border-slate-100 dark:border-slate-600 ${index % 2 === 0 ? 'animate-on-scroll-left' : 'animate-on-scroll-right'} ${projectsVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-200 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {project.githubUrl && (
                  <div className="flex gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
