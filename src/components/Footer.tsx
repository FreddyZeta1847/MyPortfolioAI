import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mb-2">
              Federico Santini
            </h2>
            <p className="text-slate-400">Computer Engineering Student</p>
          </div>

          <div className="flex space-x-3">
            <a
              href="https://github.com/FreddyZeta1847"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/federico-santini"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-600 hover:bg-primary-500 p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:santinifederico06@gmail.com"
              className="bg-primary-700 hover:bg-primary-600 p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:+393393338159"
              className="bg-accent-500 hover:bg-accent-400 p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
              aria-label="Phone"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; {currentYear} Federico Santini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;