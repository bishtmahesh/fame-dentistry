# DESIGN.md — Fame Dentistry Design System (V2: ARCHITECTURAL GRID)

This document outlines the elite visual theme, typography, color roles, spacing principles, and visual standards for the **Fame Dentistry** digital presence. 

V2 organizes the approved content into a **tactile, modern architectural blueprint grid system** that blends high-end members-club intimacy with precise private-banking layouts.

---

## 1. Visual Theme & Atmosphere

The visual atmosphere of FAME V2 is an **Architectural Blueprint / Design Archive**. It is highly structural, prestigious, and authentic:
- **Structure**: Modular grid cells separated by thin, clean champagne-gold frames.
- **Aesthetic**: Sandstone, obsidian slate navy, wabi-sabi paper texture, and fine architectural lines.
- **Tone**: Professional authority, heritage prestige, and absolute visual unique-stature.
- **Index Labels**: Monospace typewriter reference labels (e.g., `[BOARD_REF: 01 // HERO]`) anchor every core cell, creating a hand-drawn schematic catalog appeal.

---

## 2. Color Palette & Roles

```css
:root {
  /* Surface Tones (Soho House & Hims style) */
  --color-alabaster-base: #fcfaf6;   /* Main page background - very warm breathing white */
  --color-sand-section:   #f3eee6;   /* Section contrast background - elegant soft sand */
  --color-sand-highlight: #e7e0d4;   /* Hover states & dropdown selections - dark sand */
  
  /* Contrast Tones (Coutts style) */
  --color-obsidian-dark:  #1A2233;   /* Primary slate navy dark panels, text, and note block */
  --color-obsidian-soft:  #25314a;   /* Lighter hover focus slate navy */
  
  /* Metallic Accents (Coutts style) */
  --color-champagne-gold: #c5a059;   /* Coutts border lines, quote bars, accent divider */
  --color-gold-translucent: rgba(197, 160, 89, 0.22); /* Subtle wireframe grids */
  
  /* Neutral Descriptive (Hims & Le Labo style) */
  --color-slate-gray:     #737373;   /* Secondary description body copy, placeholders */
  --color-ash-mist:       #c7c7c7;   /* Classic secondary border lines */
  --color-pure-white:     #ffffff;   /* Pure white clouds for input containers and cards */
}
```

---

## 3. Typography Rules

FAME combines standard-setting serifs with clean sans-serif bodies and raw monospace index labels.

| Font Family | Weight | Role | Style |
|:---|:---|:---|:---|
| `'Prata'`, `'Playfair Display'`, serif | `400`, `Italic` | Primary titles, prominent quotes, headings | High editorial, prestigious |
| `'Inter'`, sans-serif | `400`, `500`, `600` | Navigation, body copy, form labels | Modern, precise, legible |
| `'Courier New'`, `monospace` | `500`, `700` | Index anchors, overline tags, status eyebrows | Raw wabi-sabi technical catalog |

### Typographic Scale
- **Display Headings (Hero Title)**: `font-size: clamp(38px, 6vw, 68px); font-family: 'Prata', serif; font-weight: 400; line-height: 1.12; letter-spacing: -0.022em;`
- **Overline Eyebrows**: `font-size: 13px; font-family: monospace; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--color-champagne-gold);`
- **Cell Monospace Index Tags**: `font-size: 11px; font-family: monospace; font-weight: 700; color: var(--color-champagne-gold); opacity: 0.85; letter-spacing: 0.1em;`

---

## 4. Component Stylings

### A. The Royal Coutts Grid Blueprint
- **Structure**: Every primary landing section is framed inside structural columns. Grid intersections are clearly defined with thin champagne-gold outlines (`1px solid var(--color-gold-translucent)`).
- **Cell Hover Micro-glow**: Hovering over an active grid cell triggers a transition to an ultra-soft, prestigious background gold highlight (`rgba(197, 160, 89, 0.035)`), while the gold border gains depth.

### B. Soho House Style Monumental Hero Cell
- **Layout**: Large widescreen hero exterior banner occupying a full-width modular grid cell. The visual frame expands from an inset portrait block into full screen scope upon page load.

### C. Hims/Ro Style Form Cells
- **Alignment**: Form fields are styled as clean, straight-line inputs beautifully aligned within the sand grid box.
- **Line Highlight**: Shimmering pseudo-element gold lines slide open horizontally from left to right as you enter a field, accompanied by a soft background focus glow.

---

## 5. Do's and Don'ts

- **DO** use absolute semantic markup.
- **DO** align every element precisely to the vertical and horizontal gridlines.
- **DO** keep the wabi-sabi monospace `[BOARD_REF]` index labels prominent in the upper-left of cells.
- **DON'T** disrupt the wireframe border symmetry. Ensure every outer frame connects cleanly.
- **DON'T** use loose margins without a wireframe bounding box.
