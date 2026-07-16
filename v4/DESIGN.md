# DESIGN.md — Fame Dentistry Design System (V3: MODERN ASYMMETRIC EDITORIAL)

This document outlines the elite visual theme, typography, color roles, spacing principles, and visual standards for the **Fame Dentistry** digital presence. 

V3 establishes an **ultra-modern, asymmetric editorial lookbook** layout. It blends spacious asymmetrical frames with sophisticated overlapping depth layers, gold keyline borders, and organic micro-interactions.

---

## 1. Visual Theme & Atmosphere

The visual atmosphere of FAME V3 is a **Bespoke Editorial Lookbook / Premium Private Gallery**. It is a prestigious, intimate space for Glasgow's business community:
- **Asymmetry**: Unconventional column splits (e.g., 55% / 45% or 40% / 60%) create dynamic, natural pacing that stands out from default template grids.
* **Overlapping Layering**: Text banners and cards subtly overlap image margins using negative offsets, creating physical depth and a highly curated, premium lookbook feel.
- **Density**: Spacious, deep margins, breathing whitespace, and elegant golden hairline borders.
- **Aesthetic**: Warm alabaster sandstone, deep slate obsidian, champagne-gold accents, and clean modern typography.
- **Tone**: Understated luxury, academic authority, and absolute prestige.

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
  --color-gold-translucent: rgba(197, 160, 89, 0.22); /* Subtle gold hairline borders */
  
  /* Neutral Descriptive (Hims & Le Labo style) */
  --color-slate-gray:     #737373;   /* Secondary description body copy, placeholders */
  --color-ash-mist:       #c7c7c7;   /* Classic secondary border lines */
  --color-pure-white:     #ffffff;   /* Pure white clouds for input containers and cards */
}
```

### Color Mappings & Functional Roles
- **Page Canvas**: `--color-alabaster-base` is the default background for standard sections.
- **Contrast Bands**: `--color-sand-section` hosts the header, alternate sections, and footer backgrounds.
- **Bespoke Callouts**: `--color-obsidian-dark` is used for high-impact buttons and the fully immersive dark note section.
- **Gold Accents**: `--color-champagne-gold` is drawn as thin lines, quote indicators, and active borders to provide a heritage private-banking touch.

---

## 3. Typography Rules

FAME combines standard-setting editorial serifs with clean sans-serif bodies and monospace subtitles.

| Font Family | Weight | Role | Style |
|:---|:---|:---|:---|
| `'Prata'`, serif | `400` | Primary display titles, prominent quotes, headings | High editorial, prestigious |
| `'Inter'`, sans-serif | `400`, `500`, `600`, `700` | Navigation, body copy, form labels | Modern, precise, legible |
| `'JetBrains Mono'`, `monospace` | `500`, `700` | Overline eyebrows, metadata tags, credentials | Contemporary technical |

### Typographic Scale
- **Display Headings (Hero Title)**: `font-size: clamp(38px, 6vw, 68px); font-family: 'Prata', serif; font-weight: 400; line-height: 1.12; letter-spacing: -0.022em;`
- **Section Titles (Dr. Ferhan Ahmed, etc.)**: `font-size: clamp(28px, 4.5vw, 48px); font-family: 'Prata', serif; font-weight: 400; line-height: 1.15; letter-spacing: -0.019em;`
- **Overline Eyebrows**: `font-size: 13px; font-family: 'JetBrains Mono', monospace; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--color-champagne-gold);`
- **Body Copy**: `font-size: clamp(17px, 1.9vw, 19px); font-family: 'Inter', sans-serif; font-weight: 400; line-height: 1.75; color: var(--color-slate-gray);`

---

## 4. Component Stylings

### A. Dynamic Asymmetric Hero Section
- **Layout**: Left column spans 55% containing the elegant title, description, and primary CTA. The right column (45%) features the Scottish facade long shot offset slightly down, creating an active visual balance.
- **Cinematic Entrance**: The hero image card starts slightly offset and expands on load into its frame for a high-end feel.

### B. Floating Apothecary Form Card
- **Structure**: Styled as a clean floating card with a very soft ambient shadow (`box-shadow: 0 30px 80px rgba(197, 160, 89, 0.08)`) and thin gold borders.
- **Inputs**: Straight-line bottom borders with floating label text. On focus, the gold border expands horizontally and the label transitions to a gold highlight.

### C. Overlapping Editorial Founder Layout
- **Structure**: A staggered split with Dr. Ferhan's portrait on the left and credentials on the right. The quote block overlaps the bottom edge of the section, anchored by a vertical gold timeline bar.

### D. Immersive Obsidian Note Block
- **Aesthetic**: Deep obsidian slate navy background with subtle gold rules. Creates an intimate, premium lookbook transition as the user scrolls.

---

## 5. Spacing & Overlap Guidelines

- **Asymmetric Splits**: Split grids using CSS flexbox or grid setups with distinct child widths (e.g., `flex: 1.1` and `flex: 0.9`).
- **Overlaps**: Apply negative margins (`margin-top: -60px`, etc.) and `position: relative; z-index: 2;` on text blocks or quotes to slide them over adjacent image bounds.
- **Whitespace Ratio**: Keep sections breathing with generous padding (`clamp(80px, 10vw, 180px)` top and bottom).
