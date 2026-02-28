import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.3);

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={className}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={className} aria-label={ariaLabel}>
          {children}
        </button>
      )}
    </div>
  );

  return content;
}
