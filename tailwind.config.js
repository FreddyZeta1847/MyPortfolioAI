/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          // Deep teal-green inspired by Milan tech scene
          50: '#f0f9f8',
          100: '#d9eff0',
          200: '#b3dfe1',
          300: '#8ccfd2',
          400: '#5ebab5',
          500: '#2fa89f',
          600: '#1f8b84',
          700: '#15736f',
          800: '#0f5b5a',
          900: '#0a4342',
        },
        accent: {
          // Warm rust/terracotta Italian earth tones
          50: '#fef6f3',
          100: '#fce8e1',
          200: '#f8d4c5',
          300: '#f4b8a0',
          400: '#e89875',
          500: '#d97546',
          600: '#c85c2e',
          700: '#a83d1e',
          800: '#8a2f17',
          900: '#6b1e0f',
        },
        surface: {
          50: '#e9e7f1',
          100: '#f4f4f8',
          200: '#d9d7e6',
          300: '#c9c9d9',
          400: '#9d9daf',
          500: '#75758c',
          600: '#55556e',
          700: '#3a3a52',
          800: '#1e1e2e',
          900: '#12121d',
          950: '#08080f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'glass': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'accent-glow': '0 0 16px rgba(217, 117, 70, 0.25)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-25%)' },
        },
      },
    },
  },
  plugins: [],
};
