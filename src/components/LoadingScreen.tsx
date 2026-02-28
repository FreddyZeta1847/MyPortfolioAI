import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [show, setShow] = useState(() => {
    return !sessionStorage.getItem('portfolio-loaded');
  });

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('portfolio-loaded', '1');
    }, 1800);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[200] bg-surface-50 dark:bg-surface-950 flex items-center justify-center"
        >
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="text-primary-600 dark:text-primary-400"
          >
            {/* F */}
            <motion.path
              d="M 15 65 L 15 15 L 35 15 L 35 20 L 20 20 L 20 37 L 32 37 L 32 42 L 20 42 L 20 65 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            {/* S */}
            <motion.path
              d="M 55 25 C 55 19 49 15 43 15 C 37 15 43 15 43 15 C 37 15 33 19 33 25 C 33 31 37 33 43 35 C 49 37 55 39 55 45 C 55 51 49 55 43 55 C 37 55 33 51 33 45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
