import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { scrollToElement } from '../utils/scrollTo';
import { navItems } from '../data/navItems';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-900 dark:bg-surface-950 text-white transition-colors duration-300">
      {/* Gradient top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2 className="font-display text-2xl font-bold gradient-text mb-3">
              Federico Santini
            </h2>
            <p className="text-surface-400 text-sm leading-relaxed max-w-xs">
              Computer Engineering student at Politecnico di Milano. Passionate about building scalable software and AI solutions.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-surface-400 mb-4">
              Navigation
            </h3>
            <div className="space-y-2.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToElement(item.id)}
                  className="block text-surface-400 hover:text-primary-400 text-sm transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-surface-400 mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/FreddyZeta1847"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-800 hover:bg-surface-700 transition-all duration-300 hover:scale-105"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/federico-santini"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0077B5] hover:bg-[#2283B7] transition-all duration-300 hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:santinifederico06@gmail.com"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-700 hover:bg-primary-600 transition-all duration-300 hover:scale-105"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="tel:+393393338159"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-600 hover:bg-accent-500 transition-all duration-300 hover:scale-105"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-800 pt-8 text-center text-surface-500 text-sm">
          <p>&copy; {currentYear} Federico Santini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
