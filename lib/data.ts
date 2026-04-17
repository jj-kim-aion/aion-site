// ═══════════════════════════════════════════
// AION LABS — Site Data & Content
// All copy, agent profiles, and products
// ═══════════════════════════════════════════

export const SITE = {
  name: "Aion Labs",
  tagline: "Autonomous Intelligence. Engineered.",
  description:
    "We build AI super-agents that run businesses. Not assistants — operators. Three autonomous agents. One unified system. Zero busywork.",
  url: "https://aionlabs.io",
};

// ── AGENTS ──────────────────────────────

export type Agent = {
  id: string;
  name: string;
  role: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  model: string;
  accentColor: string;
  glowClass: string;
  orbClass: string;
  gradientClass: string;
  cta: { label: string; href: string };
  stats: { label: string; value: string }[];
  philosophy: string;
};

export const AGENTS: Agent[] = [
  {
    id: "mirai",
    name: "Mirai",
    role: "COO",
    title: "Chief Operating Officer",
    tagline: "COO that runs your business",
    description:
      "Mirai is a super-agent with deep expertise as a COO, CRO, program manager, and CFO. She orchestrates an entire sub-agent team of writers, marketers, architects, quants, and more. Mirai works autonomously and delivers regular status updates, distilled research, intelligence, and strategy briefs — while executing relentlessly.",
    longDescription:
      "Mirai isn't an assistant you prompt. She's an operating system for your business. Built on Claude Opus, she maintains a three-layer memory architecture that accumulates institutional knowledge from day one. She reads your email, triages your inbox, drafts client proposals, surfaces revenue intelligence, and coordinates the other agents — all while you sleep. Every morning, she delivers a briefing. Every evening, she extracts and stores what matters. The question she asks herself with every task: can I remove this bottleneck so you never have to touch it again?",
    capabilities: [
      "Strategic planning & revenue reporting",
      "Client relationship management",
      "Cross-agent task orchestration",
      "Email triage & intelligent response drafting",
      "Proposal generation from brief to deliverable",
      "Daily briefings & proactive intelligence",
      "Mission Control oversight & cost tracking",
      "Calendar management & meeting prep",
    ],
    model: "Claude Opus 4.6",
    accentColor: "mirai-glow",
    glowClass: "glow-mirai",
    orbClass: "agent-orb-mirai",
    gradientClass: "text-gradient-gold",
    cta: { label: "15-minute intro call", href: "/contact" },
    stats: [
      { label: "Autonomous decisions / day", value: "40+" },
      { label: "Context retention", value: "∞" },
      { label: "Morning briefing", value: "8:00 AM" },
      { label: "Operating model", value: "Opus" },
    ],
    philosophy:
      "A brilliant person with amnesia and no context about your business wouldn't be useful — even if they're the smartest person alive. Mirai has memory. She has context. She has a job. That's what makes her a colleague, not a chatbot.",
  },
  {
    id: "jj",
    name: "JJ",
    role: "CTO",
    title: "Chief Technology Officer",
    tagline: "CTO agent that builds until your vision is a reality",
    description:
      "JJ-CTO is your next-gen AI engineering force: a relentless coding agent that designs, builds, ships, and refines apps, automations, products, and custom software — turning raw ideas into working solutions at speed.",
    longDescription:
      "JJ doesn't just write code. He architects systems. Built on a two-model split — Claude Opus for planning, Codex for execution — JJ runs parallel coding agents in isolated worktrees, each tackling a different feature branch simultaneously. His Ralph Loop pattern runs many short fresh sprints instead of one fragile long session: each iteration reads the file system and git history to reconstruct context, then resumes cleanly. He writes failing tests first, then implements the code to make them pass. He detects bugs via Sentry, triages severity, fixes autonomously, and submits PRs — often while you're at dinner. Average time from error detection to PR ready: 3-5 minutes.",
    capabilities: [
      "Full-stack application development",
      "Parallel coding agents via Ralph Loops",
      "Autonomous bug detection & fixing (Sentry pipeline)",
      "Architecture design & PRD generation",
      "CI/CD pipeline management",
      "Test-driven development enforcement",
      "Multi-branch parallel execution",
      "Deploy to Vercel, Railway, Fly.io",
    ],
    model: "Claude Opus 4.6 + Codex 5.2",
    accentColor: "jj-glow",
    glowClass: "glow-jj",
    orbClass: "agent-orb-jj",
    gradientClass: "text-gradient-cool",
    cta: { label: "Build my next app", href: "/contact" },
    stats: [
      { label: "Parallel agents", value: "3-4" },
      { label: "Bug fix → PR time", value: "3-5 min" },
      { label: "First-try fix rate", value: "~80%" },
      { label: "Tasks / session", value: "100+" },
    ],
    philosophy:
      "A single long AI coding session is fragile. Context accumulates, signal degrades, agents lose track. The solution is embarrassingly simple: instead of one marathon, run many sprints. Each iteration starts completely fresh. The agent picks up where the last left off by reading the file system. Context is a cache, not state.",
  },
  {
    id: "chelsea",
    name: "Chelsea",
    role: "CMO",
    title: "Chief Marketing Officer",
    tagline: "Full-funnel marketing orchestration",
    description:
      "Chelsea continuously analyzes market signals, orchestrates campaigns, personalizes messaging at scale, and surfaces strategic insights — compressing weeks of marketing leadership work into real-time decisions that drive pipeline and business growth.",
    longDescription:
      "Chelsea is not a social media scheduler. She's a marketing intelligence system. She runs 6-8 scheduled content operations daily: scanning trending topics at 8 AM, drafting posts by 10 AM, monitoring mentions at 1 PM, publishing approved content at 4 PM, handling autonomous replies at 6 PM, pulling performance data at 8 PM, and drafting newsletters by 11 PM. 90% of reply-level engagement is fully autonomous. She tracks impressions, engagement rates, follower velocity, and content format performance — then feeds those signals back into her next content cycle. She doesn't guess what works. She measures, adapts, and compounds.",
    capabilities: [
      "Content strategy & calendar management",
      "Social media publishing & engagement",
      "Newsletter creation & subscriber growth",
      "Performance analytics & signal detection",
      "Campaign orchestration across channels",
      "Audience growth & community building",
      "SEO content optimization",
      "Brand voice enforcement",
    ],
    model: "Claude Sonnet 4.5",
    accentColor: "chelsea-glow",
    glowClass: "glow-chelsea",
    orbClass: "agent-orb-chelsea",
    gradientClass: "text-gradient-warm",
    cta: { label: "Find out more", href: "/contact" },
    stats: [
      { label: "Content ops / day", value: "6-8" },
      { label: "Autonomous replies", value: "90%" },
      { label: "Channels managed", value: "5+" },
      { label: "Performance pull", value: "Daily" },
    ],
    philosophy:
      "For an agency or media business, content distribution is a direct revenue lever. Chelsea doesn't create content in a vacuum — she researches what's working, drafts from real conversations and brand themes, publishes at optimal times, and measures everything. The content engine is a feedback loop, not a conveyor belt.",
  },
];

// ── PRODUCTS ────────────────────────────

import { supabase } from "./supabase";

export type Product = {
  id: number; // BigInt ID from Supabase
  product_id: string; // The string identifier (formerly id)
  name: string;
  product_summary: string;
  detailed_description: string;
  price: number;
  original_price: number | null;
  badge: string | null;
  category: "playbook" | "config" | "toolkit" | "bundle";
  features: string[];
  deliverables: string[];
  cta: string;
  created_at?: string;
  updated_at?: string;
};

export const PRODUCTS: Product[] = [];

// ── NAVIGATION ──────────────────────────

export const NAV_ITEMS = [
  { label: "Agents", href: "/#agents" },
  { label: "Mirai", href: "/agents/mirai" },
  { label: "JJ", href: "/agents/jj" },
  { label: "Chelsea", href: "/agents/chelsea" },
  { label: "Store", href: "/store" },
  { label: "About", href: "/about" },
];

// ── HOMEPAGE COPY ───────────────────────

export const HOMEPAGE = {
  hero: {
    eyebrow: "Aion Labs — Autonomous Intelligence",
    headline: "We don't use AI.\nWe deploy it.",
    subheadline:
      "Three autonomous super-agents. One unified operating system. They build products, run marketing, fix bugs, and generate revenue — while you set direction.",
    cta: { label: "Meet the team", href: "/#agents" },
    ctaSecondary: { label: "Browse the store", href: "/store" },
  },
  philosophy: {
    marker: "Philosophy",
    headline: "The shift from using to hiring",
    body: `There's a fundamental difference between using AI and deploying it.

When you use AI, you open a browser, type a question, get an answer, and close the tab. Every conversation starts from zero. The AI knows nothing about you, your projects, or what you discussed yesterday. It's a stranger every time.

When you deploy AI, you give it persistence, identity, tools, autonomy, and accountability. The model is the brain. Everything else — memory, tools, identity, access — is what turns the brain into a colleague.

That's what we build.`,
  },
  howItWorks: {
    marker: "Architecture",
    headline: "The operating system",
    steps: [
      {
        number: "01",
        title: "Identity",
        body: "Each agent has a defined role, voice, and behavioral constraints. Not a generic assistant — a commercially specific operator with permission to push back and disagree.",
      },
      {
        number: "02",
        title: "Memory",
        body: "Three-layer architecture: tacit knowledge (how you work), daily notes (what happened), and a knowledge graph (deep entity storage). Nightly extraction ensures nothing is lost.",
      },
      {
        number: "03",
        title: "Tools",
        body: "Email, calendar, GitHub, Stripe, Vercel, social media, Sentry — each agent has the tools it needs to operate independently. Minimum authority principle: access expands as trust builds.",
      },
      {
        number: "04",
        title: "Autonomy",
        body: "A trust ladder from read-only to full autonomy. Agents climb deliberately based on demonstrated behavior. The goal: your role becomes strategic direction and queue review only.",
      },
    ],
  },
  metrics: {
    marker: "Performance",
    items: [
      { value: "3-5 min", label: "Bug detection to PR" },
      { value: "100+", label: "Tasks per coding session" },
      { value: "90%", label: "Autonomous reply rate" },
      { value: "<$8/day", label: "Full-team AI cost" },
    ],
  },
};

// ── ABOUT PAGE COPY ─────────────────────

export const ABOUT = {
  hero: {
    marker: "About",
    headline: "An AI research lab\nthat ships product",
    body: `Aion Labs sits at the intersection of AI research, product design, and commercial execution. We're not an agency. We're not a consultancy. We're a lab that builds autonomous systems — and we use those systems to run our own business.

Our agents create content, manage clients, write code, fix bugs, and generate revenue. The playbooks and configurations we sell are the exact systems running our operations right now.

This isn't theoretical. It's production.`,
  },
  principles: [
    {
      title: "Research-driven authority",
      body: "Every system we build is grounded in real deployment data, not hype. We publish what works, flag what doesn't, and version everything.",
    },
    {
      title: "Creative technology",
      body: "AI is a medium, not just a tool. We design agent systems with the same rigor and taste applied to architecture, typography, and interaction design.",
    },
    {
      title: "Radical transparency",
      body: "Our agents run our business. Our products are the configs they use. What you buy is what we operate. No demo-ware, no vaporware.",
    },
  ],
  stack: {
    marker: "Infrastructure",
    headline: "Built on",
    items: [
      "OpenClaw Platform",
      "Claude Opus 4.6 / Sonnet 4.5 / Haiku 4.5",
      "OpenAI Codex 5.2",
      "Azure Cloud VPS",
      "Cloudflare Tunnel",
      "Telegram Bot API",
      "QMD Semantic Search",
      "Sentry + GitHub + Stripe + Vercel",
    ],
  },
};

/**
 * Fetches products from Supabase
 */
export async function getProducts(): Promise<Product[]> {
  try {
    console.log("getProducts: Initiating Supabase fetch...");
    const {data, error} = await supabase
        .from("products")
        .select("*")
        .order("id", {ascending: true}); // Order by internal ID to maintain sequence

    if (error) {
      console.error("getProducts: Supabase error:", error);
      return []; // Fallback to empty array
    }

    console.log(`getProducts: Fetched ${data?.length || 0} products from Supabase.`);
    if (data && data.length > 0) {
      console.log("getProducts: First product ID:", data[0].product_id);
    }
    return data as Product[];
  } catch (err) {
    console.error("getProducts: Unexpected error:", err);
    return [];
  }
}

/**
 * Fetches a single product by numeric internal ID from Supabase
 */
export async function getProductByInternalId(id: number): Promise<Product | null> {
  const {data, error} = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    console.error(`Error fetching product with internal ID ${id} from Supabase:`, error);
    return null; // Fallback
  }

  return data as Product;
}
