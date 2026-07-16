# DESIGN.md — Fame Dentistry Design System (SOHO HOUSE HERO V2)

This document outlines the elite visual theme, typography, color roles, spacing principles, and visual standards for the **Fame Dentistry** digital presence. 

It synthesizes elements from four distinct design references:
- **Soho House**: Intimate editorial storytelling, organic cream/off-white canvas, large warm headings, and colossal wide-screen/full-bleed photography banners that command the first viewport.
- **Coutts**: Royal heritage structure, 1px champagne-gold borders, obsidian dark frames, ultimate luxury precision.
- **Hims & Ro**: Modern boutique healthcare elegance, highly readable sans-serif labels, clinical-yet-warm line-inputs.
- **Le Labo**: Wabi-sabi apothecary typewriter accents, tabular monospace metadata tags, raw authenticity.

---

## 1. Visual Theme & Atmosphere

The visual atmosphere of FAME is a **Private Dental Concierge**. It is a prestigious, intimate space for Glasgow's business community, rejecting clinical sterility in favor of wabi-sabi warmth and private-banking precision.
- **Density**: Spacious, deep margins, and breathing whitespace.
- **Aesthetic**: Sandstone, obsidian, champagne-gold accents, and raw typewritten details.
- **Tone**: Understated luxury, academic authority, and absolute prestige.
- **Hero Stature**: Inspired directly by `sohohouse.com`, the hero image occupies a colossal wide-frame presence, serving as an immersive window into the brand's physical presence.

---

## 2. Color Palette & Roles

```css
:root {
  /* Surface Tones (Soho House & Hims style) */
  --color-alabaster-base: #fcfaf6;   /* Main page background - very warm breathing white */
  --color-sand-section:   #f3eee6;   /* Section contrast background - elegant soft sand */
  --color-sand-highlight: #e7e0d4;   /* Hover states & dropdown selections - dark sand */
  
  /* Contrast Tones (Coutts style) */
  --color-obsidian-dark:  #1A2233;   /* Primary dark panels, text, buttons, and note block */
  --color-obsidian-soft:  #25314a;   /* Hover focus on dark buttons */
  
  /* Metallic Accents (Coutts style) */
  --color-champagne-gold: #c5a059;   /* Coutts border lines, quote bars, accent divider */
  --color-gold-translucent: rgba(197, 160, 89, 0.22); /* Subtle border grids */
  
  /* Neutral Descriptive (Hims & Le Labo style) */
  --color-slate-gray:     #737373;   /* Secondary description body copy, placeholders */
  --color-ash-mist:       #c7c7c7;   /* Classic secondary border lines */
  --color-pure-white:     #ffffff;   /* Pure white clouds for input containers and cards */
}
```

### Color Mappings & Functional Roles
- **Page Canvas**: `--color-alabaster-base` is the default background for standard sections.
- **Contrast Bands**: `--color-sand-section` hosts the header, hero, founder, and footer backgrounds.
- **Bespoke Callouts**: `--color-obsidian-dark` is used for high-impact buttons and the fully immersive dark note section.
- **Bespoke Grid Lines**: `--color-gold-translucent` is drawn as ultra-thin `1px` lines between adjacent layout columns to provide a structural heritage feel.

---

## 3. Typography Rules

FAME combines standard-setting editorial serifs with clean sans-serif bodies and raw monospace apothecary tags.

| Font Family | Weight | Role | Style |
|:---|:---|:---|:---|
| `'Prata'`, `'Playfair Display'`, serif | `400`, `500`, `Italic` | Primary titles, prominent quotes, headings | High editorial, prestigious |
| `'Inter'`, sans-serif | `400`, `500`, `600` | Navigation, body copy, form labels | Modern, precise, legible |
| `'Courier Prime'`, `monospace` | `400` | Subtitles, asset tags, apothecary captions | Wabi-sabi raw Le Labo feel |

### Typographic Scale
- **Display Headings (Hero Title)**: `font-size: clamp(36px, 5.5vw, 68px); font-family: 'Prata', serif; font-weight: 400; line-height: 1.1; letter-spacing: -0.02em;`
- **Section Titles (Dr. Ferhan Ahmed, etc.)**: `font-size: clamp(24px, 4vw, 40px); font-family: 'Prata', serif; font-weight: 400; line-height: 1.1; letter-spacing: -0.02em;`
- **Apothecary Metadata Tags (Eyebrows)**: `font-size: 11px; font-family: monospace; font-weight: 400; letter-spacing: 0.25em; text-transform: uppercase; color: var(--color-champagne-gold);`
- **Body copy**: `font-size: 18px; font-family: 'Inter', sans-serif; font-weight: 400; line-height: 1.65; color: var(--color-slate-gray);`

---

## 4. Component Stylings

### A. The Royal Coutts Navigation & Header
- **Structure**: Sand background (`#f3eee6`), bottom border (`1px solid var(--color-gold-translucent)`).
- **Navigation Links**: Clean sans-serif, uppercase with wide letter-spacing (`0.18em`). On hover, a bottom gold line (`1px solid var(--color-champagne-gold)`) slides open smoothly.

### B. Soho House Style Monumental Hero Panel
- **Layout**: Typography stands in full width on top of the fold, followed by a colossal, wide-frame photography banner spanning the full width of the container.
- **Hero Image Container**:
  - `height: 60vh; min-height: 520px; max-height: 700px;`
  - Floating wabi-sabi apothecary caption bar.
  - Generous row gap separating typography and image (`48px`).

### C. Hims/Ro Style Interactive Form
- **Form Card**: Elegant glassmorphic container (`background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px)`).
- **Line Inputs**: Bottom border only (`1px solid var(--color-ash-mist)`). On focus, the border turns to `var(--color-champagne-gold)`, and the thin label text slides up/changes color.

### D. Elite Obsidian Note Block (`section_note`)
- **Aesthetic**: Deep dark canvas (`#1A2233`) representing ultimate prestige.
- **Divider**: Thin gold header divider.
- **Typography**: Luxurious champagne-gold accent labels and warm white serif italic quotes.

---

## 5. Layout & Grid Principles

- **Fluid Grid**: Generous page paddings (`clamp(32px, 8vw, 120px)`) to mimic high-end magazine designs.
- **Asymmetric Dividers**: Column dividers drawn in ultra-thin `1px` translucent gold to ground adjacent columns (Soho House meeting Coutts).
- **Whitespace Ratio**: generous row-gaps (`120px` to `160px` between primary landing sections) to let the brand story breathe.

---

## 6. Depth & Elevation

- **Level 0 (Base)**: Page background (`#fcfaf6`).
- **Level 1 (Sections)**: Contrast sections (`#f3eee6`).
- **Level 2 (Cards)**: Glassmorphic cards with ultra-soft, wide-diffusion shadows: `box-shadow: 0 12px 40px rgba(0, 0, 0, 0.03)`.
- **Level 3 (Interactive Active States)**: High-glow shadows and gold outlines for inputs on focus.

---

## 7. Do's and Don'ts

- **DO** use absolute semantic markup (`<main>`, `<section>`, `<footer>`).
- **DO** keep the spacing extremely generous.
- **DO** use fluid clamp scaling for fonts and padding.
- **DON'T** introduce harsh high-contrast colors (e.g. bright blue, neon green). Accentuate only in Gold, Sand, and Obsidian.
- **DON'T** let elements feel cramped or cluttered. Give everything double the space.
- **DON'T** use default browser dropdowns, buttons, or scrollbars. Custom-style them to look bespoke.
