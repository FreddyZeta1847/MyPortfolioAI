/**
 * Minimal background: subtle dot grid with a single accent glow in the corner.
 */
export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-8">
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Single subtle accent glow (bottom right, very faint) */}
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-radial from-accent-500/15 to-transparent blur-3xl dark:from-accent-600/20" />
    </div>
  );
}
