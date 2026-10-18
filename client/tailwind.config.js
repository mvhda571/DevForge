const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        sunken: token('sunken'),
        line: token('line'),
        ink: token('ink'),
        muted: token('muted'),
        primary: { DEFAULT: token('primary'), soft: token('primary-soft'), ink: token('primary-ink') },
        signal: { DEFAULT: token('signal'), soft: token('signal-soft') },
        success: { DEFAULT: token('success'), soft: token('success-soft') },
        warning: { DEFAULT: token('warning'), soft: token('warning-soft') },
        danger: { DEFAULT: token('danger'), soft: token('danger-soft') },
        navy: { DEFAULT: '#0E1A33', 900: '#0A1222', 800: '#13213F', 700: '#1C2C50', 600: '#2A3B63' }
      },
      fontFamily: {
        display: ['Unbounded', 'Onest', 'system-ui', 'sans-serif'],
        sans: ['Onest', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      borderRadius: { panel: '16px', control: '10px' },
      maxWidth: { content: '1200px', prose: '68ch' },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'rise-in': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } }
      },
      animation: { 'fade-in': 'fade-in .18s ease-out', 'rise-in': 'rise-in .22s ease-out' }
    }
  },
  plugins: []
};
