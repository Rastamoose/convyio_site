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
          bg: '#1d2021',
          'bg-soft': '#282828',
          'bg-hover': '#3c3836',
          fg: '#fbf1c7',
          'fg-muted': '#928374',
          'fg-dark': '#665c54',
          border: '#504945',
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
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
