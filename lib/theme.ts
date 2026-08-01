/**
 * Gruvbox palette — single source of truth for contexts that cannot read
 * CSS variables (static image generation: favicon, OG image).
 * The runtime theme lives in app/globals.css as CSS-variable channel tokens;
 * keep these hex values in sync with the tables there.
 */
export const gruvboxLight = {
  bgHard: '#f9f5d7',
  bg: '#fbf1c7',
  bgSoft: '#f2e5bc',
  fg: '#282828',
  fgBody: '#504945',
  fgMuted: '#6f6357',
  border: '#d5c4a1',
  accent: '#d79921',
  accentDeep: '#95610f',
} as const;

export const gruvboxDark = {
  bgHard: '#141617',
  bg: '#1d2021',
  bgSoft: '#282828',
  fg: '#fbf1c7',
  fgBody: '#a89984',
  fgMuted: '#928374',
  border: '#504945',
  accent: '#fabd2f',
  accentDeep: '#b57614',
} as const;
