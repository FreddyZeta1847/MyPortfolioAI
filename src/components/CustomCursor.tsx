import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only show on desktop with fine pointer
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktop || prefersReducedMotion) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = (e.target as HTMLElement)?.closest('a, button, [data-hover], input, textarea, select');
      setHovering(!!target);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: clicking ? 0.5 : hovering ? 0.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Outer ring — swells and tints over interactive elements */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: pos.x - (hovering ? 24 : 16),
          y: pos.y - (hovering ? 24 : 16),
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          scale: clicking ? 0.8 : 1,
          borderColor: hovering ? 'rgba(20,184,166,0.9)' : 'rgba(20,184,166,0.5)',
          backgroundColor: hovering ? 'rgba(20,184,166,0.08)' : 'rgba(20,184,166,0)',
        }}
        style={{ borderWidth: 1, borderStyle: 'solid' }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
      />
    </>
  );
}
