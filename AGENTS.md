# Project Rules — convyio site

## Form controls theme together

Inputs and option chips/pills in forms share the `.input-inset` / `.form-chip` classes in `app/globals.css`. Any theming change (surface color, border, radius) must be made there so both stay in sync — never restyle chips separately from inputs.

## Visual design: flat, solid Gruvbox colors only

Do not use translucent/alpha-tone utility classes for background fills, borders, or text colors (the "vibecoded glassmorphism" look). Everything should read as flat color against flat color.

### What to do instead

- Use solid colors from the Gruvbox palette defined in `app/globals.css` and `tailwind.config.ts`.
- Success states: solid `bg-gruv-green` with contrasting `text-gruv-bg-hard`.
- Error states: solid `bg-gruv-red` with contrasting `text-gruv-bg-hard`.
- Informational highlights: pick a solid surface token (`gruv-bg`, `gruv-bg-soft`, `gruv-bg-hover`) rather than `bg-<color>/<opacity>`.

### Examples

| Instead of | Use |
|------------|-----|
| `bg-gruv-green/10 border-gruv-green/30 text-gruv-green` | `bg-gruv-green border-gruv-green text-gruv-bg-hard` |
| `bg-gruv-accent/40` | `bg-gruv-accent` |
| `bg-gruv-fg/15` | `bg-gruv-fg-dark` or `bg-gruv-border` |
| `bg-gruv-scrim/80 backdrop-blur-sm` | `bg-gruv-scrim` |

### Allowed exceptions

- Focus rings (`focus-visible:ring-gruv-accent/50`) may use low opacity because they are overlays, not content surfaces.
- Shadows and scrim/backdrop layers may use alpha where the literal purpose is translucency.
- Decorative gradients in hero backgrounds are allowed if they are part of the scene, not a UI surface.

### Why

The site is built around a paper-like Gruvbox palette. Transparent tints look out of place and reduce contrast consistency across light/dark modes.

## Typography: no mono font

Do not use `font-mono` anywhere on the site — no mono micro-labels, chips, or numerals (it reads as vibecodey here). Micro-labels are sans: `text-[11px]/text-xs font-semibold uppercase tracking-[0.14em]`. Numerals use `tabular-nums` in sans. (The app repo's `AGENTS/DESIGN.md` mono rules govern the client, not this site.)

## Surfaces vs pressables

Flat means no border and no shadow. Panes (menus, dropdowns, panels, content cards) separate by tonal step only — `bg-gruv-bg` / `bg-gruv-bg-soft` against the page, hover by fill-step. The 3D block (`border-2` + ledge shadow + translate-on-press) is reserved for actions: `btn-3d`, `btn-raised`, and established pressables like the FAQ accordion. Do not put it on nav cards, menus, or content panels — if everything is a 3D block, nothing is.
