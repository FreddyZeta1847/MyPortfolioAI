import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Phone, Github, Linkedin, MapPin, Copy } from 'lucide-react';
import MagneticButton from './MagneticButton';

const EMAIL = 'santinifederico06@gmail.com';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const detailChips = [
  { icon: Phone, label: '+39 339 333 8159', href: 'tel:+393393338159' },
  { icon: MapPin, label: 'Italy', href: undefined },
  { icon: Github, label: 'GitHub', href: 'https://github.com/FreddyZeta1847' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/federico-santini' },
];

export default function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success('Email copied to clipboard');
    } catch {
      toast.error('Could not copy — please copy it manually');
    }
  };

  return (
    <section id="contact" className="section-padding bg-primary-100/40 dark:bg-surface-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          {/* Ambient glow */}
          <div className="aurora-glow w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500/10 dark:bg-primary-600/20" />

          <motion.p
            variants={reveal}
            custom={0}
            className="relative font-mono text-xs tracking-[0.3em] text-accent-600 dark:text-accent-400 uppercase mb-6"
          >
            05 / Contact
          </motion.p>

          <motion.h2
            variants={reveal}
            custom={0.1}
            className="relative font-display text-4xl md:text-6xl font-bold text-surface-800 dark:text-white mb-6 leading-tight"
          >
            Let&apos;s build <span className="gradient-text">something.</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            custom={0.2}
            className="relative text-surface-600 dark:text-surface-400 max-w-xl mx-auto mb-10 text-lg"
          >
            Whether you&apos;d like to collaborate, discuss an opportunity, or simply connect about
            technology, feel free to reach out!
          </motion.p>

          {/* Email CTA + copy */}
          <motion.div
            variants={reveal}
            custom={0.3}
            className="relative flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <MagneticButton
              href={`mailto:${EMAIL}`}
              className="shimmer-btn inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white font-medium rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-lg"
            >
              <Mail size={20} />
              {EMAIL}
            </MagneticButton>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 px-4 py-4 glass rounded-xl text-surface-600 dark:text-surface-300 hover:text-accent-600 dark:hover:text-accent-400 hover:shadow-glow-cyan transition-all duration-300"
            >
              <Copy size={18} />
            </button>
          </motion.div>

          {/* Detail chips */}
          <motion.div
            variants={reveal}
            custom={0.4}
            className="relative flex flex-wrap items-center justify-center gap-3"
          >
            {detailChips.map(({ icon: Icon, label, href }) => {
              const content = (
                <>
                  <Icon size={15} className="text-primary-500 dark:text-primary-400" />
                  <span className="text-sm font-medium">{label}</span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 glass px-4 py-2.5 rounded-full text-surface-700 dark:text-surface-200 hover:shadow-glow hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                >
                  {content}
                </a>
              ) : (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 glass px-4 py-2.5 rounded-full text-surface-700 dark:text-surface-200"
                >
                  {content}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
