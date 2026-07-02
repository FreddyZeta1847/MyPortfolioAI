import { motion } from 'framer-motion';
import TypingEffect from './TypingEffect';

const lines = [
  { prompt: '~$', cmd: 'whoami', out: 'federico.santini' },
  { prompt: '~$', cmd: 'location', out: 'Milan, Italy — PoliMi' },
];

const statusWords = ['AI solutions', 'scalable software', 'cloud infra', 'game prototypes'];

/**
 * Decorative glass terminal shown beside the hero copy on large screens.
 * Lines reveal in sequence after the name animation settles.
 */
export default function HeroTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass rounded-2xl overflow-hidden w-[340px] shadow-glass"
      aria-hidden="true"
    >
      {/* Window bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface-200/60 dark:border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-surface-300 dark:bg-surface-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-surface-300 dark:bg-surface-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent-400/70" />
        <span className="ml-2 font-mono text-[11px] text-surface-400">fs — zsh</span>
      </div>

      <div className="p-4 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={line.cmd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 + i * 0.45 }}
          >
            <p>
              <span className="text-accent-500 dark:text-accent-400">{line.prompt}</span>{' '}
              <span className="text-surface-700 dark:text-surface-200">{line.cmd}</span>
            </p>
            <p className="text-surface-500 dark:text-surface-400 mb-2">{line.out}</p>
          </motion.div>
        ))}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
          <span className="text-accent-500 dark:text-accent-400">~$</span>{' '}
          <span className="text-surface-700 dark:text-surface-200">building</span>{' '}
          <TypingEffect words={statusWords} className="text-primary-600 dark:text-primary-400" />
        </motion.p>
      </div>
    </motion.div>
  );
}
