# AION LABS — Website

> Autonomous Intelligence. Engineered.

## Quick Deploy to Vercel

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Deploy to Vercel
npx vercel --prod
```

Or connect the repo to Vercel via GitHub for auto-deploys on push.

---

## Site Architecture

```
aion-site/
├── app/
│   ├── layout.tsx              ← Root layout (nav, footer, fonts, grain)
│   ├── page.tsx                ← Homepage (hero, agents, philosophy, metrics, CTA)
│   ├── globals.css             ← Design system (grain, glows, animations, cards)
│   ├── not-found.tsx           ← 404 page
│   ├── agents/
│   │   └── [slug]/
│   │       ├── page.tsx        ← Agent detail (SSG for mirai, jj, chelsea)
│   │       └── AgentDetailClient.tsx
│   ├── store/
│   │   └── page.tsx            ← Digital product store (5 products)
│   └── about/
│       └── page.tsx            ← Brand story, principles, stack, manifesto
├── components/
│   ├── Navigation.tsx          ← Fixed nav, mobile menu
│   ├── Footer.tsx              ← Footer with links
│   └── AgentCard.tsx           ← Agent card for homepage grid
├── lib/
│   ├── data.ts                 ← ALL site copy, agent profiles, products, nav
│   └── useReveal.ts            ← Intersection Observer scroll animation hook
├── tailwind.config.js          ← Design tokens, colors, fonts, animations
├── package.json
├── tsconfig.json
├── postcss.config.js
├── next.config.js
├── DESIGN_SYSTEM.md            ← Full design brief for agent enhancement
└── README.md                   ← This file
```

---

## Pages & Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Homepage | Hero, agent grid, philosophy, architecture, metrics, CTA |
| `/agents/mirai` | Mirai Detail | COO agent profile, stats, capabilities, philosophy |
| `/agents/jj` | JJ Detail | CTO agent profile, stats, capabilities, philosophy |
| `/agents/chelsea` | Chelsea Detail | CMO agent profile, stats, capabilities, philosophy |
| `/store` | Digital Store | 5 products: playbook, 2 configs, toolkit, bundle + FAQ |
| `/about` | About | Brand story, principles, team, tech stack, manifesto |

---

## Product Catalog (Store)

| Product | Price | Category |
|---|---|---|
| The Super-Agent Playbook | $199 | Flagship playbook |
| OpenClaw Starter Config | $79 | Single-agent config |
| Multi-Agent Pro Config | $149 | 4-agent team config |
| Sentry Auto-Fix Pipeline | $99 | Toolkit |
| Full Deployment Bundle | $349 (was $447) | Everything + updates |

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Animations:** CSS + scroll-based reveals (IntersectionObserver)
- **Typography:** JetBrains Mono (mono), system fallbacks for display/body
- **Deploy target:** Vercel (zero-config)

---

## Design Philosophy

**Aesthetic:** Architectural Futurism — MOMA meets Zaha Hadid meets Stripe

- Dark void background (#050505) with architectural grid lines
- Film grain overlay for texture
- Agent-specific accent colors (gold, ice blue, warm copper)
- Typographic-led design — headlines carry the weight
- Minimal navigation, singular CTAs per viewport
- No stock photos, no purple gradients, no generic AI aesthetics
- Generous negative space with controlled density in content areas

See `DESIGN_SYSTEM.md` for the full visual specification.

---

## Agent Enhancement Instructions

This codebase is designed to be enhanced by JJ (CTO agent) using UI/UX Pro, Nano Banana, and 21st.dev skills. The `DESIGN_SYSTEM.md` file contains detailed instructions for:

1. **Premium font loading** — Replace system fallbacks with PP Neue Montreal + Suisse Intl (or equivalent distinctive display/body pair)
2. **Framer Motion integration** — Replace CSS reveals with staggered motion sequences
3. **Interactive agent orbs** — WebGL or canvas-based ambient particle systems on agent pages
4. **Stripe/Lemon Squeezy integration** — Wire product CTAs to real checkout flows
5. **Analytics integration** — Plausible or PostHog event tracking
6. **SEO metadata** — Per-page OpenGraph images, structured data
7. **Performance optimization** — Static generation, image optimization, preloading

---

## Content Management

All site copy lives in `lib/data.ts`. This is intentional — no CMS dependency means:

- Agents can update copy by editing a single file
- No API latency or external service dependency
- Full version control via git
- Easy to extend with new products or agents

To add a new agent: add an entry to `AGENTS` array in `lib/data.ts` and it automatically gets a card on the homepage and a detail page at `/agents/[id]`.

To add a new product: add an entry to `PRODUCTS` array and it renders in the store.

---

## Environment Variables

```env
# Required for payments (add when integrating)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Required for analytics (add when integrating)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=aionlabs.io

# Optional
NEXT_PUBLIC_SITE_URL=https://aionlabs.io
```

---

## Deployment Checklist

- [ ] `npm install` succeeds
- [ ] `npm run build` passes with zero errors
- [ ] All 6 routes render correctly
- [ ] Mobile responsive at 375px, 768px, 1280px
- [ ] Grain overlay renders without performance issues
- [ ] Scroll reveal animations fire on all sections
- [ ] Product cards display correct prices and features
- [ ] Agent detail pages load for all 3 slugs
- [ ] Navigation links work (including anchor `/#agents`)
- [ ] Footer links resolve correctly
- [ ] 404 page renders for invalid routes
- [ ] Vercel deployment succeeds with `npx vercel --prod`
