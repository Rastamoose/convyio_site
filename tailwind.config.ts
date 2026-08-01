import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gruv: {
          'bg-hard': '#141617',
          bg: '#1d2021',
          'bg-soft': '#282828',
          'bg-hover': '#3c3836',
          fg: '#fbf1c7',
          'fg-body': '#a89984',
          'fg-muted': '#928374',
          'fg-dark': '#665c54',
          border: '#504945',
          accent: '#fabd2f',
          'accent-deep': '#b57614',
          yellow: '#fabd2f',
          green: '#b8bb26',
          red: '#fb4934',
          blue: '#83a598',
          purple: '#d3869b',
          aqua: '#8ec07c',
          orange: '#fe8019',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        frame:
          '0 0 0 1px rgba(251, 241, 199, 0.06), 0 4px 12px rgba(0, 0, 0, 0.35), 0 24px 64px -12px rgba(0, 0, 0, 0.5)',
        glow: '0 0 24px rgba(250, 189, 47, 0.35)',
        ledge: '0 3px 0 0 #b57614',
        'ledge-pressed': '0 0 0 0 #b57614',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
