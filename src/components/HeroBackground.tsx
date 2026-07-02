import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    // Pointer in canvas coordinates (canvas covers the viewport via inset-0).
    const mouse = { x: -9999, y: -9999 };
    const INFLUENCE = 170;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.min(60, Math.floor(canvas.width / 25));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      const color = isDark ? '167, 139, 250' : '124, 58, 237';
      const accent = isDark ? '34, 211, 238' : '6, 182, 212';

      const rendered = particles.map((p) => {
        // Drift + wrap (base position)
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Cursor influence — render-time offset (non-destructive) + brighten
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const f = dist < INFLUENCE ? 1 - dist / INFLUENCE : 0;
        const ang = Math.atan2(dy, dx);
        const push = f * 26;
        const rx = p.x + Math.cos(ang) * push;
        const ry = p.y + Math.sin(ang) * push;

        // Particle (shifts toward accent + grows near the cursor)
        ctx.beginPath();
        ctx.arc(rx, ry, p.radius + f * 1.6, 0, Math.PI * 2);
        ctx.fillStyle =
          f > 0.05
            ? `rgba(${accent}, ${Math.min(1, p.opacity + f * 0.6)})`
            : `rgba(${color}, ${p.opacity})`;
        ctx.fill();

        // Line to the cursor when close
        if (f > 0) {
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${accent}, ${f * 0.28})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        return { x: rx, y: ry };
      });

      // Connect nearby particles (using rendered positions)
      for (let i = 0; i < rendered.length; i++) {
        for (let j = i + 1; j < rendered.length; j++) {
          const dx = rendered[i].x - rendered[j].x;
          const dy = rendered[i].y - rendered[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(rendered[i].x, rendered[i].y);
            ctx.lineTo(rendered[j].x, rendered[j].y);
            ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      resize();
      createParticles();
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', onResize);
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseout', onLeave);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}
