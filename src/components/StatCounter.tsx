import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from 'framer-motion';

/**
 * Counts 0 → value with an ease-out curve when scrolled into view.
 * Reduced motion shows the final value immediately.
 */
export default function StatCounter({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const duration = 1400;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="flex h-full flex-col justify-center">
      <span className="gradient-text font-display text-4xl font-bold md:text-5xl">
        {n}
        {suffix}
      </span>
      <span className="mt-1 text-sm font-medium text-surface-500 dark:text-surface-400">{label}</span>
    </div>
  );
}
