import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { radar } from '../data/radar';

// ── Geometry ────────────────────────────────────────────────────────────────
const SIZE = 320;
const CX = SIZE / 2;
const CY = 150;
const R = 100;                       // outer radius
const RINGS = [0.25, 0.5, 0.75, 1];  // grid levels
const N = radar.length;

// Angle for axis i, starting at the top (−90°) and going clockwise.
const angleOf = (i: number) => (-90 + (360 / N) * i) * (Math.PI / 180);

const point = (i: number, radius: number) => {
  const a = angleOf(i);
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
};

const polygon = (radius: number | number[]) =>
  radar
    .map((_, i) => {
      const r = Array.isArray(radius) ? radius[i] : radius;
      const { x, y } = point(i, r);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

// Label placement: anchor + nudge based on the vertex's position on the circle.
const labelFor = (i: number) => {
  const a = angleOf(i);
  const cos = Math.cos(a);
  const x = CX + (R + 18) * cos;
  const y = CY + (R + 18) * Math.sin(a);
  const anchor = cos > 0.2 ? 'start' : cos < -0.2 ? 'end' : 'middle';
  const dy = Math.sin(a) > 0.5 ? 12 : Math.sin(a) < -0.5 ? -6 : 4;
  return { x, y, anchor, dy };
};

const dataValues = radar.map((ax) => (R * Math.max(0, Math.min(100, ax.value))) / 100);

export default function SkillRadar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto">
      <svg viewBox={`0 0 ${SIZE} ${SIZE - 20}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Grid rings */}
        {RINGS.map((level, idx) => (
          <motion.polygon
            key={level}
            points={polygon(R * level)}
            fill="none"
            strokeWidth={1}
            className="text-surface-300 dark:text-surface-700"
            stroke="currentColor"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
          />
        ))}

        {/* Axis spokes */}
        {radar.map((_, i) => {
          const { x, y } = point(i, R);
          return (
            <motion.line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              strokeWidth={1}
              className="text-surface-300 dark:text-surface-700"
              stroke="currentColor"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
            />
          );
        })}

        {/* Data shape — grows out of the centre */}
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: `${CX}px ${CY}px` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.34, 1.3, 0.64, 1] }}
        >
          {/* Faint echo pulsing behind the data shape */}
          <motion.polygon
            points={polygon(dataValues)}
            fill="url(#radarFill)"
            style={{ transformBox: 'view-box', transformOrigin: `${CX}px ${CY}px` }}
            initial={{ opacity: 0.08, scale: 1 }}
            animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <polygon
            points={polygon(dataValues)}
            fill="url(#radarFill)"
            fillOpacity={0.35}
            stroke="url(#radarFill)"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {radar.map((_, i) => {
            const { x, y } = point(i, dataValues[i]);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3.5}
                fill="#a78bfa"
                strokeWidth={1.5}
                className="stroke-white dark:stroke-surface-950"
              />
            );
          })}
        </motion.g>

        {/* Axis labels */}
        {radar.map((ax, i) => {
          const { x, y, anchor, dy } = labelFor(i);
          return (
            <motion.text
              key={ax.label}
              x={x}
              y={y}
              dy={dy}
              textAnchor={anchor as 'start' | 'middle' | 'end'}
              className="fill-surface-600 dark:fill-surface-300 font-display text-[11px] font-semibold"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
            >
              {ax.label}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
}
