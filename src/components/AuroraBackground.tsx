/**
 * Fixed full-viewport aurora mesh: three giant blurred orbs drifting on
 * transform-only keyframes. Sits behind every section (sections use
 * semi-transparent backgrounds so the glow bleeds through).
 */
export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="aurora-glow w-[60vw] h-[60vw] -top-[15vw] -left-[10vw] bg-primary-600/10 dark:bg-primary-600/25 animate-aurora will-change-transform" />
      <div className="aurora-glow w-[50vw] h-[50vw] -bottom-[10vw] -right-[10vw] bg-accent-500/[0.07] dark:bg-accent-500/15 animate-aurora-slow will-change-transform" />
      <div className="aurora-glow w-[45vw] h-[45vw] top-[30%] left-[25%] bg-primary-900/5 dark:bg-primary-900/30" />
    </div>
  );
}
