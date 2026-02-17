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
        background: 'var(--background)',
        'soft-bg': 'var(--background)',
        foreground: 'var(--foreground)',
        'body-muted': 'var(--body-muted)',
        border: 'var(--border)',
        'input-border': 'var(--input-border)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        accent: {
          lime: 'var(--accent-lime)',
          green: 'var(--accent-green)',
          blue: 'var(--accent-blue)',
          navy: 'var(--accent-navy)',
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
        card: '0 8px 30px rgba(0, 31, 63, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 31, 63, 0.12)',
        button: '0 2px 8px rgba(0, 128, 76, 0.25)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
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
