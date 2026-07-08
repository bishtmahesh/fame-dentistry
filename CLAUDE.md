# FAME Dentistry — Design & Content Guidelines

Source: "FAME Dentistry · Website Design Proposal · V11" (Remedo, June 2026). Approved direction: **03 — The Clinical Authority** (references: Mayo Clinic, Hims/Ro).

## Positioning

Not a dental website — a trust-architecture problem, serving three audiences from one site:
- **Business leaders** (e.g. Concierge patients) — must feel "This is my kind of place."
- **Implant/cosmetic patients** — must feel "These people are actually good."
- **Referring dentists** — must feel "My patient will come back to me."

Core claim: "The dentists other dentists refer to." NPS is a live, dated, verifiable brand metric — not a tagline.

## Brand palette

| Token | Hex | Use |
|---|---|---|
| Off-White | `#F8F6F2` | Primary surface, body pages |
| Cream | `#E8E0D0` | Secondary surface, contrast bands |
| Warm Gold | `#C9A96E` | Primary accent, logo, hairlines |
| Ink Navy | `#1A2233` | Headlines, navigation type |
| Stone | `#8A8478` | Body text, captions |
| Teal | `#2E6E7B` | Patient audience tag (currently unused on live site) |
| Green | `#37855F` | NPS / success / search-found content (currently unused on live site) |
| Rule | `#D9D2C4` | Hairlines, dividers |

## Typography

- **Display/headlines**: Cormorant Garamond, 36–96pt, weight 300/400, line-height 1.05. *(Live site currently ships Prata instead — flagged as an open deviation, not yet reconciled with the client.)*
- **Body/interface**: Inter, 16–22pt, weight 300/400, line-height 1.6.

## Tone by audience (never mix within a page)

| Audience | Register | Use | Avoid |
|---|---|---|---|
| Business Leader (Concierge pages) | Editorial, restrained, peer-to-peer — closer to a private bank than a clinic | "Designed around the demands of your week." "A relationship, not a transaction." | "Book your appointment today!" "Luxury dentistry experience" "Premier provider" |
| Implant Patient (Treatment pages) | Warm but authoritative, explanatory | "Most of our complex implant patients are referred by other dentists." "Here is what to ask." | "Transform your smile" "Life-changing results" "Award-winning" "Hollywood smile" |
| Referring Dentist (For Dentists hub) | Peer-professional, technical without coldness | "Your patient remains your patient." "We will write to you at each stage." | Consumer marketing language, sales-tier framing, anything implying retention plays |

## Hard design guardrails (do not do these)

- ✕ Stock smile photography, model teeth, isolated mouths — commissioned imagery only.
- ✕ **Faces in hero imagery** — architectural/building photography only, never a face, never a tooth. *(Live site currently uses doctor photos in the About and homepage Concierge heroes — a known, flagged deviation pending sign-off, not a default to repeat elsewhere.)*
- ✕ Floating "Book Now" CTAs / sticky bottom-right buttons — use "Enquire", never "Book Now".
- ✕ Live chat widgets — use a PA contact flow, not a bot.
- ✕ Anonymous testimonials ("Sarah, 52") — always named, with role + company where consented.
- ✕ Trust-badge clutter (GDC/CQC/BDA) in the hero — these belong in the **footer only**.
- ✕ Soft-pastel palette (baby blue, lilac, blush pink).
- ✕ "Award winner" badges, industry-body shields outside the footer.
- ✕ Alliance/press logos in brand colour — **greyscale/stone only**, to stay editorial not a sponsor wall. *(Live site currently renders these in colour — a known, flagged deviation.)*
- ✕ The word "luxury", pricing tiers, "VIP", "membership" — especially on Concierge pages.
- ✕ Carousels, autoplay, star ratings, persona names/age ranges in UI copy.

## Site structure (Phase 1, live)

Homepage · Implants · Cosmetic · Pre-Surgical · Restorative · Concierge · About (→ founder depth pages) · For Dentists · Insights/Journal (never "Blog") · Contact.

**Phase 2 (designed for, not yet built):** Referrals portal, Training platform.

## Homepage section order (12 sections, per wireframe)

1. Hero (editorial headline ≤12 words + building image, never a face)
2. Signal Bar (peer-referral stat, one line, full-bleed)
3. Three Doors (audience self-selection, editorial framing — not toggles/switches)
4. Strategic 4 Treatments (equal weight, no "featured" treatment)
5. Concierge (own section, not a treatment card)
6. Founders Introduction (paired credit, not hero placement)
7. NPS Live Display (score + trend chart + verbatims)
8. Named Testimonials
9. Book Lead Magnet (postal address capture, not email — qualifies intent)
10. Insights Preview
11. Alliance Strip (press/partnership logos, near the **end** of the page, before the footer)
12. Footer (GDC/CQC, newsletter, secondary nav)

*(Note: the Alliance Strip currently sits near position 4 on the live homepage — a known reordering from this spec, flagged for review.)*

## Session blueprint — done vs. missing (updated continuously, read this first)

**Pages that exist (12 total):** index.html, about.html, implants.html, cosmetic.html, restorative.html, pre-surgical.html, concierge.html, for-dentists.html, insights.html, contact.html, nps-methodology.html (new), press.html (new).

### Done this session
- **Footer** rebuilt site-wide (all 12 pages): 3 nav columns (Practice / Treatments / Resources per the proposal spec) + a 4th Newsletter column (functional-looking email+subscribe UI, client-side "Subscribed" confirmation only — **needs real email-list backend wiring, e.g. Mailchimp/Klaviyo, before launch**). GDC/CQC/BDA compliance line merged into the copyright row, small font, centered. Column gap tightened. "First Impressions Book" footer link removed per user request.
- **New page:** `nps-methodology.html` — score, response count/rate/frequency, methodology explanation. Uses illustrative figures (142 responses, 89% rate) ported from the design deck's own example — **swap for real Customer Thermometer numbers before launch**.
- **New page:** `press.html` — press/media page, replacing the old `index.html#press` anchor. Footer links across all pages now point here.
- **SEO:** description, keywords, canonical, OG tags, Twitter card added to **all 12 pages**. All reuse the existing `assets/og-image.jpg` (1200×630) — no new image was generated.
- **NPS display:** globally changed from "87 NPS" to "9.4/10" across index.html, about.html, and a stale "NPS of 87" reference caught and fixed on insights.html. Label reads "NPS Rating" everywhere.
- **Homepage door cards:** replaced generic quote-style headlines ("This Is My Kind Of Place.", etc. — these were lifted from the proposal's internal "Five-Second Test" audience-feeling guidance, not real headline copy) with concrete alternatives: "Dentistry that works around you." / "Complex cases, explained plainly." / "Your patient, returned every time." Audience labels turned into small gold pill badges.
- **Clinicians section (homepage):** added a "Read Dr Ahmed's/Bashir's story →" CTA on both founder cards, linking to `about.html#ferhan` / `#tariq`.
- **Typography:** h1/h2/h3 line-height increased (1.05→1.18, 1.15→1.28, 1.1→1.25) for breathing room; insight/blog card title line-height 1.2→1.4; door card headline font-size reduced to 22px (was inheriting h3's 32px).
- **Motion pass (in progress — see below):** `.scroll-reveal` + staggered `delay-100…500` classes added to previously-static card grids and sections across index.html, implants/cosmetic/restorative/pre-surgical/concierge, insights.html, nps-methodology.html, press.html, contact.html.
- **CLAUDE.md** created (this file) as persistent design-guideline + status memory.
- Earlier in session (see chat history for full detail): about.html hero/story photo, implants.html section reorder + card rounding, JetBrains Mono removed sitewide, "Scotland Street · Glasgow" replaced with contextual per-section text, testimonial video/audio/text card variants, alliance marquee animation.

### Explicitly deferred / declined by user
- **Founder bio pages** (`/founders/ferhan`, `/founders/tariq`) — user clarified these should **not** be built as separate pages. The content already lives as cards on `about.html` (id="ferhan"/"tariq"); the nav dropdown links stay disabled until the client sends Dr Tariq Bashir's real portrait photo. Do not build separate founder pages unless the user asks again.
- **Nav dropdown "Dr Ferhan Ahmed"/"Dr Tariq Bashir" links** — user said "leave both as-is for now," pending Tariq's photo.

### Still missing / open
- **"7 Costly Mistakes" lead magnet gating** — the article exists (`insights.html` featured article + homepage footer link), but has no email-capture/PDF-delivery flow yet. This was queued but not reached this session.
- **Enquiry-form custom dropdown bug** — user reported "opens but selecting an option doesn't work" on index.html's `#custom-select-wrapper-block`. Static code trace (HTML/CSS/JS in app.js) found no logical bug; live browser testing was blocked by a disconnected extension all session. **Needs either live reproduction + console error text, or a fresh look next session.**
- **Privacy Policy / Terms & Conditions footer links** — requested but not yet built (no pages exist for these).
- **Teal (#2E6E7B) and Green (#37855F) palette tokens** — now declared in CSS (`--color-teal`, `--color-green`) but still unused in any live markup (door badges ended up gold-only per user direction, reversing an earlier teal/green attempt).
- **Motion pass completeness** — apply the same `.scroll-reveal`/stagger treatment to any remaining un-animated sections on about.html and for-dentists.html (not yet audited this session — check those two specifically next).
- **Hero images show faces** (about.html, homepage Concierge section) and **Alliance strip in colour + repositioned near the top of the homepage** — both are known deviations from the approved proposal (which specifies building-only hero photography and greyscale press logos positioned near the footer). These were done at explicit user request; flagged for awareness, not reverted.

## Mobile-first principles

- Design the phone view first, then scale up — most of this audience (business leaders, referring dentists) opens the site on mobile between meetings.
- "Enquire" stays visible at the top of the screen on every scroll.
- Every tap target sized for thumbs, not cursors.
- One column, no carousels/sliders/horizontal swipes.
- Homepage must appear in under 2 seconds even on poor signal.
- A dismissable "Enquire" pill may appear after the reader scrolls most of the page (not yet built).
- WhatsApp tap-to-message only on the Concierge mobile surface, as a secondary route — never the primary CTA.
- No app-install pop-ups, no cookie banner blocking first view.
