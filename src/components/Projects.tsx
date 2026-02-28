import React, { useState, useEffect, useCallback } from 'react';
import { Github, X, Eye } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Projects: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedProject, closeModal]);

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

        {/* Project Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white dark:bg-slate-700 rounded-xl shadow-soft border-t-4 border-primary-500 overflow-hidden flex flex-col hover:shadow-warm hover:-translate-y-1 transition-all duration-300 animate-on-scroll-scale ${gridVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 px-2.5 py-1 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="bg-slate-100 text-slate-500 dark:bg-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg text-xs font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* View More Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Eye size={16} />
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-modal-content">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="h-64 md:h-80 overflow-hidden rounded-t-2xl">
              <img
                src={selectedProject.gifUrl || selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                {selectedProject.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {selectedProject.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub Button */}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  <Github size={18} />
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
