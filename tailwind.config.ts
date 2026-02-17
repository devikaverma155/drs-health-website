import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        'soft-bg': '#F4F9F6',
        foreground: 'var(--foreground)',
        'body-muted': 'var(--body-muted)',
        border: 'var(--border)',
        'input-border': 'var(--input-border)',
        primary: '#4F8F6B',
        'primary-dark': '#2E6A4F',
        accent: {
          orange: '#F6B26B',
          blue: '#A7D3F2',
          lavender: '#C9B6F2',
          mint: '#BFE8D4',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      fontWeight: {
        heading: '600',
      },
      lineHeight: {
        relaxed: '1.65',
        editorial: '1.75',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.05)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.08)',
        button: '0 2px 8px rgba(79, 143, 107, 0.25)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
