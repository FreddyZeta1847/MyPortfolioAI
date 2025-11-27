import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-28 pb-20 md:min-h-screen flex items-center bg-warm-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:space-x-16">
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full blur-2xl opacity-20 scale-110"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-1.5 rounded-full shadow-warm">
                <div className="bg-white p-2 rounded-full">
                  <img
                    src="/images/profile_pic.jpg"
                    alt="Federico Santini"
                    className="w-52 h-52 md:w-64 md:h-64 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Hello! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">Federico Santini</span>.
            </h1>

            <p className="text-lg text-slate-600 mb-5 leading-relaxed">
              Computer Engineering student at Politecnico di Milano with a strong foundation in software development. My interests span game development, AI research, and cybersecurity—I love building scalable applications and exploring cutting-edge technologies.
            </p>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              A curious problem-solver who thrives in challenging environments. Competitive sports taught me discipline and teamwork—qualities I bring to every project. Always learning, always building.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="mailto:santinifederico06@gmail.com"
                className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-3 rounded-xl font-medium shadow-soft hover:shadow-warm transition-all duration-300"
              >
                <Mail size={20} />
                Contact Me
              </a>
              <div className="flex gap-3">
                <a
                  href="https://github.com/FreddyZeta1847"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/federico-santini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="tel:+393393338159"
                  className="flex items-center justify-center w-11 h-11 bg-accent-500 hover:bg-accent-600 text-white rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;