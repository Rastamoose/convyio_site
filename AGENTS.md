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
