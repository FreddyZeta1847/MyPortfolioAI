/**
 * Hero.tsx
 *
 * Landing section: animated name/title, typing effect, CTAs, and social
 * links, plus a decorative terminal card shown on large screens.
 *
 * The action row is responsive by design: desktop shows the two text CTAs
 * ("Get in Touch" / "Download CV") above small icon-only social buttons, while
 * mobile drops those CTAs and promotes GitHub + LinkedIn to full labelled
 * buttons, because the 48px icons were too easy to miss on a phone. The CV
 * stays reachable there via a quiet text link -- Hero is the only place in the
 * app that links /CV.pdf.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Download } from 'lucide-react';
import TypingEffect from './TypingEffect';
import HeroBackground from './HeroBackground';
import HeroTerminal from './HeroTerminal';
import MagneticButton from './MagneticButton';
import { scrollToElement } from '../utils/scrollTo';

// Shared so the desktop CTAs and the mobile social buttons keep identical
// weight without duplicating ~200-character class strings.
const PRIMARY_BTN =
  'shimmer-btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white px-8 py-3.5 rounded-xl font-medium shadow-glow hover:shadow-glow-lg transition-all duration-300';

const OUTLINE_BTN =
  'inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium border-2 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300';

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
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '38%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated background */}
      <HeroBackground />

      <div className="mx-auto w-full max-w-[1800px] px-4 md:pl-6 md:pr-6 relative z-10">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex items-center justify-between gap-12 pt-20"
        >
        <div className="max-w-4xl text-left">
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
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 flex flex-wrap gap-x-4"
            variants={wordAnimation}
            initial="hidden"
            animate="visible"
          >
            {nameWords.map((word, wi) => (
              <span key={wi} className="inline-block">
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
              className="text-accent-500 dark:text-accent-400 font-semibold"
            />
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-lg text-surface-500 dark:text-surface-400 max-w-2xl mb-10 leading-relaxed"
          >
            Computer Engineering student at Politecnico di Milano with a passion for
            software development, AI research, and building scalable applications.
          </motion.p>

          {/* CTAs -- desktop only; mobile promotes the social links instead */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="hidden md:flex flex-wrap items-center justify-start gap-4 mb-10"
          >
            <a href="mailto:santinifederico06@gmail.com" className={PRIMARY_BTN}>
              <Mail size={18} />
              Get in Touch
            </a>
            <a href="/CV.pdf" download className={OUTLINE_BTN}>
              <Download size={18} />
              Download CV
            </a>
          </motion.div>

          {/* Mobile action row -- GitHub and LinkedIn as the primary buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-stretch gap-3 md:hidden"
          >
            <a
              href="https://github.com/FreddyZeta1847"
              target="_blank"
              rel="noopener noreferrer"
              className={PRIMARY_BTN}
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/federico-santini"
              target="_blank"
              rel="noopener noreferrer"
              className={OUTLINE_BTN}
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            {/* Hero is the app's only /CV.pdf link, so keep a quiet way in. */}
            <a
              href="/CV.pdf"
              download
              className="inline-flex items-center justify-center gap-1.5 pt-1 text-sm text-surface-500 underline underline-offset-4 dark:text-surface-400"
            >
              <Download size={14} />
              Download CV
            </a>
          </motion.div>

          {/* Social links -- desktop only (mobile uses the labelled row above) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="hidden md:flex items-center justify-start gap-4"
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

        {/* Terminal card (decorative, lg+ only) */}
        <div className="hidden lg:block shrink-0 pr-4">
          <HeroTerminal />
        </div>
        </motion.div>
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
