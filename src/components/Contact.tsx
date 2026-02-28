import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import SectionHeader from './SectionHeader';
import ContactForm from './ContactForm';

const infoCards = [
  {
    icon: Mail,
    label: 'Email',
    value: 'santinifederico06@gmail.com',
    href: 'mailto:santinifederico06@gmail.com',
    color: 'from-primary-500 to-primary-700',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+39 339 333 8159',
    href: 'tel:+393393338159',
    color: 'from-accent-500 to-accent-700',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Italy',
    color: 'from-surface-500 to-surface-700',
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="section-padding bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Get In Touch"
          subtitle="Whether you'd like to collaborate, discuss an opportunity, or simply connect about technology, feel free to reach out!"
        />

        <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Contact form — left (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <ContactForm />
          </motion.div>

          {/* Info cards — right (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            {infoCards.map((card, i) => {
              const Icon = card.icon;
              const Wrapper = card.href ? 'a' : 'div';
              const linkProps = card.href
                ? { href: card.href, target: card.href.startsWith('mailto') ? undefined : '_blank', rel: 'noopener noreferrer' }
                : {};

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Wrapper
                    {...linkProps}
                    className="flex items-center gap-4 glass rounded-xl p-5 group hover:shadow-glass transition-all duration-300"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-sm`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-surface-400 uppercase tracking-wider">
                        {card.label}
                      </p>
                      <p className="text-surface-800 dark:text-white font-medium text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {card.value}
                      </p>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-xl p-5"
            >
              <p className="text-xs font-medium text-surface-400 uppercase tracking-wider mb-3">
                Social
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/FreddyZeta1847"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-800 hover:bg-surface-900 dark:bg-surface-700 dark:hover:bg-surface-600 text-white transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/federico-santini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#0077B5] hover:bg-[#006396] text-white transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
