# AION LABS — Design System & Enhancement Brief

> For JJ-CTO and sub-agents using UI/UX Pro, Nano Banana, and 21st.dev skills.
> This document is the visual specification and upgrade roadmap.

---

## 1. AESTHETIC DIRECTION

**Concept:** Architectural Futurism
**Reference:** Walking through MOMA. A Zaha Hadid building at night. Stripe's documentation with the restraint of Monocle magazine.

### Core Principles

- **Void-first.** The background is not "dark mode" — it's a void. Content emerges from darkness like light installations in a museum.
- **Typographic authority.** Headlines carry the entire visual weight. No decorative imagery competing with the text.
- **Controlled density.** Generous negative space between sections. Dense, precise information within sections.
- **Glow as emotion.** Agent accent colors (gold, ice blue, warm copper) appear only as ambient glows, orbs, and subtle borders — never as solid fills or backgrounds.
- **Grain as texture.** The film grain overlay adds analog warmth to the digital void. It should be subtle (opacity 0.4 or lower).
- **Architectural grid.** The faint 80px grid lines reinforce the sense of structure without competing for attention.

### Prohibited Patterns

- Purple gradients on white backgrounds
- Inter, Roboto, Arial, or system fonts as display type
- Stock photography of any kind
- Cluttered above-the-fold layouts
- Multiple competing CTAs on the same viewport
- Neon/cyberpunk aesthetics (we're architectural, not retro-futurist)
- Rounded corners larger than 4px
- Emoji in body copy (mono marker elements only)

---

## 2. COLOR SYSTEM

```
VOID SPECTRUM (backgrounds)
──────────────────────────
#050505  void        — Page background
#0a0a0a  obsidian    — Elevated surfaces
#111111  carbon      — Card backgrounds
#1a1a1a  graphite    — Hover states, secondary surfaces
#2a2a2a  slate       — Borders, dividers (at low opacity)

TEXT
──────────────────────────
#e8e4df  bone        — Primary text
#f5f2ed  ivory       — Emphasized text
#8a8a8a  ash         — Secondary text, captions

AGENT ACCENTS
──────────────────────────
Mirai (COO) — Gold spectrum
  #c9a84c  mirai-glow  — Primary accent
  #e8d5a0  mirai-soft  — Hover/expanded states
  #7a6930  mirai-dim   — Subtle references

JJ (CTO) — Ice Blue spectrum
  #7ec8e3  jj-glow     — Primary accent
  #b8dff0  jj-soft     — Hover/expanded states
  #4a7a8c  jj-dim      — Subtle references

Chelsea (CMO) — Warm Copper spectrum
  #d4956a  chelsea-glow — Primary accent
  #e8c4a8  chelsea-soft — Hover/expanded states
  #8a6040  chelsea-dim  — Subtle references
```

### Usage Rules

- Agent colors appear ONLY as: text accents, border colors (low opacity), ambient glow blurs, gradient text fills
- NEVER use agent colors as solid background fills
- Glows are always blurred (80-150px blur radius) and low opacity (0.03-0.06)
- The `section-marker` component uses mirai-glow for the `//` prefix — this is the only place gold appears in body UI

---

## 3. TYPOGRAPHY

### Current (System Fallbacks)
The codebase uses font family definitions with system fallbacks. The first enhancement pass should load premium typefaces.

### Target Font Stack

**Display (Headlines):**
- Primary: PP Neue Montreal (variable weight)
- Fallback: Neue Haas Grotesk Display → Helvetica Neue
- Weight: 300 (light) for all display sizes
- Tracking: tight (-0.02em to -0.04em)

**Body:**
- Primary: Suisse Intl
- Fallback: Helvetica Neue → system-ui
- Weight: 400 (regular)
- Line height: 1.6 for body, 1.8 for long-form

**Mono (Markers, Code, Captions):**
- Primary: JetBrains Mono (already loaded via Google Fonts)
- Weight: 300-400
- Used for: section markers, captions, metadata, code blocks

### Type Scale (clamp-based for fluid sizing)

```
display-xl:  clamp(3.5rem, 8vw, 9rem)    — Hero headlines only
display-lg:  clamp(2.5rem, 5vw, 5.5rem)  — Section headlines
display-md:  clamp(1.8rem, 3.5vw, 3.5rem) — Sub-headlines
display-sm:  clamp(1.3rem, 2.5vw, 2rem)  — Card titles, stats
body-lg:     1.125rem                      — Lead paragraphs
body-md:     1rem                          — Standard body
body-sm:     0.875rem                      — Secondary text
caption:     0.75rem                       — Mono markers, metadata
```

---

## 4. ANIMATION SYSTEM

### Current Implementation
CSS-based with IntersectionObserver scroll triggers (`useReveal` hook).

### Enhancement Roadmap (Framer Motion)

**Phase 1 — Staggered Reveals:**
Replace CSS `.reveal` classes with `motion.div` components. Use `whileInView` with stagger children for section-level orchestration. Target: one well-orchestrated page load with staggered reveals creates more impact than scattered micro-interactions.

**Phase 2 — Agent Orbs:**
Interactive ambient particle systems on agent detail pages. Options:
- Three.js with custom shader for organic particle movement
- Canvas 2D with simplex noise for flowing orb movement
- CSS-only with multiple layered radial gradients and keyframe offsets

The orbs should respond subtly to scroll position (parallax) and mouse proximity (magnetic repulsion on desktop).

**Phase 3 — Page Transitions:**
Use Next.js App Router layout transitions or `framer-motion`'s `AnimatePresence` for cross-page fade/slide transitions.

**Phase 4 — Micro-interactions:**
- Button hover: subtle scale + border glow transition
- Card hover: lift (translateY -4px) + shadow expansion + border color shift
- Navigation: underline slide-in on hover
- Agent stats: number count-up animation on scroll-into-view
- Product price: subtle pulse on first viewport appearance

### Animation Timing Reference

```
Fast UI feedback:    200-300ms  cubic-bezier(0.16, 1, 0.3, 1)
Content reveals:     600-800ms  cubic-bezier(0.16, 1, 0.3, 1)
Ambient movement:    4-8s       ease-in-out (infinite)
Page transitions:    400-500ms  cubic-bezier(0.65, 0, 0.35, 1)
```

---

## 5. COMPONENT PATTERNS

### Section Marker
```
// Philosophy
```
Mono, uppercase, 0.7rem, ash color, with `//` prefix in mirai-glow. Used to label every major section.

### Divider (Thin)
Full-width 1px line with gradient fade: `transparent → white/8% → transparent`. Used between sections.

### Divider (Glow)
Full-width 1px line with gradient fade: `transparent → mirai-glow → transparent` at 30% opacity. Used before premium sections.

### Product Card
Gradient background (graphite → carbon), 1px white/6% border, hover state shifts border to mirai-glow/20% with ambient box-shadow. Internal structure: badge → title → description → features → deliverables → price/CTA.

### Agent Card
Same base as product card but with agent-specific accent colors. Ambient glow orb appears on hover (positioned top-right, 250px, blurred).

### Button (Primary)
Graphite background, 1px white/10% border, uppercase mono text. Hover: border shifts to mirai-glow/40%, internal gradient overlay fades in at 15% opacity. Always wraps text in `<span>` for z-index layering over the `::before` pseudo-element.

### Stats Block
Display-size value (gradient text fill per agent color) with mono caption label below. Grid of 2-4 items.

---

## 6. RESPONSIVE BREAKPOINTS

```
Mobile:    < 768px   — Single column, reduced type scale, hamburger nav
Tablet:    768-1024px — 2-column grids, reduced spacing
Desktop:   1024px+    — Full layout, all effects active
Wide:      1440px+    — Content max-width caps, generous edge padding
```

### Edge Padding
Uses `clamp(1.5rem, 5vw, 6rem)` — narrow on mobile, generous on desktop. Applied via `.px-edge` utility class.

---

## 7. ENHANCEMENT TASKS FOR AGENTS

### Priority 1 — Visual Polish (UI/UX Pro skill)
- [ ] Load PP Neue Montreal or equivalent premium display font via `@font-face`
- [ ] Load Suisse Intl or equivalent premium body font
- [ ] Add smooth scroll progress indicator (thin line at top of viewport)
- [ ] Implement cursor-following glow effect on desktop (track mouse position, apply to card `::after`)
- [ ] Add page-level transition animation between routes

### Priority 2 — Rich Visuals (Nano Banana skill)
- [ ] Create SVG logo mark for Aion Labs (geometric, minimal, inspired by the circular dot-in-ring used in nav)
- [ ] Generate ambient background textures for agent detail pages (unique per agent)
- [ ] Create product mockup images (ebook cover, config file preview, pipeline diagram)
- [ ] Design OpenGraph image template (1200x630) for social sharing

### Priority 3 — Modern Components (21st.dev skill)
- [ ] Replace static agent stats with animated count-up numbers
- [ ] Add animated terminal/code block component for the "Architecture" section showing live config
- [ ] Build interactive trust ladder visualization (4 rungs, scroll-activated)
- [ ] Create animated agent architecture diagram (3 agents → mission control → human)
- [ ] Add testimonial/social proof section with quote cards

### Priority 4 — Commerce Integration
- [ ] Integrate Lemon Squeezy or Stripe checkout for product purchases
- [ ] Add cart functionality (or simple direct-checkout per product)
- [ ] Implement post-purchase thank-you page with download links
- [ ] Add email capture component (newsletter signup → ConvertKit/Resend)

### Priority 5 — SEO & Performance
- [ ] Generate per-page metadata with unique descriptions
- [ ] Add JSON-LD structured data (Organization, Product, WebSite)
- [ ] Create sitemap.xml and robots.txt
- [ ] Optimize LCP: preload fonts, inline critical CSS
- [ ] Add Plausible or PostHog analytics script

---

## 8. CONTENT EXPANSION TASKS FOR CHELSEA (CMO)

- [ ] Write 3 launch blog posts for `/blog/` route:
  1. "Why We Deployed AI Agents Instead of Hiring" (thought leadership)
  2. "The Three-Layer Memory Architecture Explained" (technical authority)
  3. "From Zero to Revenue in 3 Weeks: Our Deployment Sprint" (case study)
- [ ] Create social launch content (5 X/Twitter posts, 3 LinkedIn posts)
- [ ] Draft welcome email sequence (3-step nurture → product offer)
- [ ] Write SEO-optimized product descriptions for each store item
- [ ] Create lead magnet: "The Agent Identity Starter Kit" (free SOUL.md + MEMORY.md templates)

---

## 9. FILE NAMING CONVENTIONS

```
Components:     PascalCase.tsx     (AgentCard.tsx)
Pages:          page.tsx           (Next.js App Router convention)
Data/Utils:     camelCase.ts       (useReveal.ts, data.ts)
Styles:         globals.css        (single global stylesheet)
Images:         kebab-case.ext     (agent-mirai-og.png)
```

---

*This document is maintained by the agent team. Last updated: auto on commit.*
