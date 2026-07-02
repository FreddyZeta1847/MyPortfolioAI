import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Move } from 'lucide-react';
import { toolboxChips } from '../data/about';
import { skillIconMap } from '../data/skillIcons';

/**
 * A "toolbox" of tech chips you can grab, drag and toss within the tile.
 * Uses framer-motion drag with elastic constraints + momentum (no physics lib).
 */
export default function DraggableChips() {
  const constraints = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold text-surface-800 dark:text-white">Toolbox</span>
        <span className="inline-flex items-center gap-1 text-xs text-surface-400">
          <Move size={12} />
          drag the chips
        </span>
      </div>

      <div
        ref={constraints}
        className="relative flex flex-1 flex-wrap content-start gap-2 overflow-hidden rounded-lg"
      >
        {toolboxChips.map((chip, i) => {
          const Icon = skillIconMap[chip.key];
          return (
            <motion.div
              key={chip.label}
              drag
              dragConstraints={constraints}
              dragElastic={0.45}
              dragMomentum
              whileDrag={{ scale: 1.12, zIndex: 20 }}
              whileHover={reduce ? undefined : { scale: 1.05 }}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
              className="glass inline-flex cursor-grab select-none items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-surface-700 shadow-soft active:cursor-grabbing dark:text-surface-200"
            >
              {Icon && <Icon className="text-[0.95em] text-primary-500" />}
              {chip.label}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
