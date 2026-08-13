import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gruv: {
          'bg-hard': 'rgb(var(--gruv-bg-hard) / <alpha-value>)',
          bg: 'rgb(var(--gruv-bg) / <alpha-value>)',
          'bg-soft': 'rgb(var(--gruv-bg-soft) / <alpha-value>)',
          'bg-hover': 'rgb(var(--gruv-bg-hover) / <alpha-value>)',
          fg: 'rgb(var(--gruv-fg) / <alpha-value>)',
          'fg-body': 'rgb(var(--gruv-fg-body) / <alpha-value>)',
          'fg-muted': 'rgb(var(--gruv-fg-muted) / <alpha-value>)',
          'fg-dark': 'rgb(var(--gruv-fg-dark) / <alpha-value>)',
          border: 'rgb(var(--gruv-border) / <alpha-value>)',
          accent: 'rgb(var(--gruv-accent) / <alpha-value>)',
          'accent-deep': 'rgb(var(--gruv-accent-deep) / <alpha-value>)',
          yellow: 'rgb(var(--gruv-accent) / <alpha-value>)',
          green: 'rgb(var(--gruv-green) / <alpha-value>)',
          red: 'rgb(var(--gruv-red) / <alpha-value>)',
          blue: 'rgb(var(--gruv-blue) / <alpha-value>)',
          purple: 'rgb(var(--gruv-purple) / <alpha-value>)',
          aqua: 'rgb(var(--gruv-aqua) / <alpha-value>)',
          orange: 'rgb(var(--gruv-orange) / <alpha-value>)',
          scrim: 'rgb(var(--gruv-scrim) / <alpha-value>)',
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
        mono: [
          'var(--font-jetbrains)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        frame: 'var(--shadow-frame)',
        glow: 'var(--shadow-glow)',
        ledge: '0 3px 0 0 rgb(var(--gruv-accent-deep))',
        'ledge-pressed': '0 0 0 0 rgb(var(--gruv-accent-deep))',
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
