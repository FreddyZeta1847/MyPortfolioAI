import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import TypingEffect from './TypingEffect';
import HeroBackground from './HeroBackground';
import MagneticButton from './MagneticButton';
import { scrollToElement } from '../utils/scrollTo';

const typingWords = [
  'Cloud Infrastructures',
  'Scalable Software',
  'AI Solutions',
  'Game Prototypes',
];

const wordAnimation = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const nameWords = ['Federico', 'Santini'];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-surface-50 dark:bg-surface-950 transition-colors duration-300"
    >
      {/* Animated background */}
      <HeroBackground />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center pt-20">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm font-medium text-surface-600 dark:text-surface-300">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name with staggered animation */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            variants={wordAnimation}
            initial="hidden"
            animate="visible"
          >
            {nameWords.map((word, wi) => (
              <span key={wi} className="inline-block mr-4">
                {word.split('').map((letter, li) => (
                  <motion.span
                    key={li}
                    variants={letterAnimation}
                    className={
                      wi === 1
                        ? 'gradient-text'
                        : 'text-surface-800 dark:text-white'
                    }
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Typing effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-surface-500 dark:text-surface-400 mb-6"
          >
            I build{' '}
            <TypingEffect
              words={typingWords}
              className="text-primary-600 dark:text-primary-400 font-semibold"
            />
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Computer Engineering student at Politecnico di Milano with a passion for
            software development, AI research, and building scalable applications.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <a
              href="mailto:santinifederico06@gmail.com"
              className="shimmer-btn inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-8 py-3.5 rounded-xl font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              <Mail size={18} />
              Get in Touch
            </a>
            <a
              href="/Federico_Santini_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium border-2 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center justify-center gap-4"
          >
            <MagneticButton
              href="https://github.com/FreddyZeta1847"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-800 dark:hover:bg-surface-700 text-surface-600 hover:text-white dark:text-surface-300 transition-all duration-300"
            >
              <Github size={20} />
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/federico-santini"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-[#0077B5] text-surface-600 hover:text-white dark:text-surface-300 transition-all duration-300"
            >
              <Linkedin size={20} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => scrollToElement('education')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-surface-400 dark:text-surface-500 hover:text-primary-500 transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
