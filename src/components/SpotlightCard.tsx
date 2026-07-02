import { useRef, type ReactNode } from 'react';

/**
 * Wraps content with a subtle pointer-tracking radial glow (teal) that sits
 * BEHIND the content. The glow position follows --mx/--my set on mouse move.
 * Sober by default — hover-only, fades out on leave, hidden for reduced motion.
 */
export default function SpotlightCard({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight relative ${className}`}>
      <span className="spotlight-glow" aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
