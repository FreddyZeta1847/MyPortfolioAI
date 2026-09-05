import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Phone, Github, Linkedin, MapPin, Copy } from 'lucide-react';

const EMAIL = 'santinifederico06@gmail.com';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
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
          <motion.p
            variants={reveal}
            custom={0}
            className="relative text-xs tracking-widest uppercase text-primary-600 dark:text-primary-500 mb-4"
          >
            Contact
          </motion.p>

          <motion.h2
            variants={reveal}
            custom={0.1}
            className="relative text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-6 leading-tight"
          >
            Got a <span className="text-primary-600 dark:text-primary-500">project</span> — or just a question?
          </motion.h2>

          <motion.p
            variants={reveal}
            custom={0.2}
            className="relative text-surface-600 dark:text-surface-400 max-w-xl mx-auto mb-10"
          >
            Whether it&apos;s an internship, a project, or a technical question — my inbox is open.
          </motion.p>

          {/* Email CTA + copy */}
          <motion.div
            variants={reveal}
            custom={0.3}
            className="relative flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg shadow-soft hover:shadow-accent-glow transition-all duration-200"
            >
              <Mail size={18} />
              {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 px-4 py-3 border border-surface-300 dark:border-surface-700 rounded-lg text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
            >
              <Copy size={18} />
            </button>
          </motion.div>

          {/* Detail chips */}
          <motion.div
            variants={reveal}
            custom={0.4}
            className="relative flex flex-wrap items-center justify-center gap-2"
          >
            {detailChips.map(({ icon: Icon, label, href }) => {
              const content = (
                <>
                  <Icon size={14} className="text-primary-600 dark:text-primary-500" />
                  <span className="text-sm font-medium">{label}</span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-surface-300 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300 hover:border-primary-600 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-500 transition-all duration-200"
                >
                  {content}
                </a>
              ) : (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-2 border border-surface-300 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300"
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
