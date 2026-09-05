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
import HeroBackground from './HeroBackground';
import HeroTerminal from './HeroTerminal';
import { scrollToElement } from '../utils/scrollTo';

const PRIMARY_BTN =
  'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3.5 rounded-lg font-medium shadow-soft hover:shadow-accent-glow transition-all duration-200';

const OUTLINE_BTN =
  'inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:border-primary-600 dark:hover:border-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200';

const nameAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
};

export default function Hero() {
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
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-500/30 bg-accent-500/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            <span className="text-sm font-medium text-surface-600 dark:text-surface-300">
              Open to collaborate
            </span>
          </motion.div>

          {/* Name */}
          <div className="mb-6 flex flex-wrap gap-x-4">
            <motion.h1
              custom={0}
              variants={nameAnimation}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-surface-900 dark:text-white"
            >
              Federico
            </motion.h1>
            <motion.h1
              custom={0.15}
              variants={nameAnimation}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-600 dark:text-primary-500"
            >
              Santini
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-surface-600 dark:text-surface-400 mb-6"
          >
            I build{' '}
            <span className="text-primary-600 dark:text-primary-500 font-semibold">
              scalable cloud solutions
            </span>
            {' '}— from AI research to production infrastructure.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base text-surface-600 dark:text-surface-400 max-w-2xl mb-12 leading-relaxed"
          >
            Computer Engineering student at Politecnico di Milano. Passionate about software architecture,
            distributed systems, and leveraging AI to solve real problems.
          </motion.p>

          {/* CTAs -- desktop only; mobile promotes the social links instead */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
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
            transition={{ delay: 0.8, duration: 0.6 }}
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
            transition={{ delay: 1, duration: 0.6 }}
            className="hidden md:flex items-center justify-start gap-4"
          >
            <a
              href="https://github.com/FreddyZeta1847"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-primary-600 dark:hover:text-primary-500 transition-all duration-200"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/federico-santini"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-primary-600 dark:hover:text-primary-500 transition-all duration-200"
            >
              <Linkedin size={18} />
            </a>
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
