"use client";

import { useReveal } from "@/lib/useReveal";
import { ABOUT } from "@/lib/data";
import Link from "next/link";

export default function AboutPage() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      {/* ── HERO ──────────────────────── */}
      <section className="relative pt-40 pb-20 px-edge overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-mirai-glow/[0.02] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-jj-glow/[0.02] blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="reveal">
            <p className="section-marker mb-6">{ABOUT.hero.marker}</p>
            <h1 className="text-display-lg font-light whitespace-pre-line">
              {ABOUT.hero.headline}
            </h1>
          </div>

          <div className="reveal reveal-delay-2 lg:pt-16">
            <div className="text-body-md text-ash leading-[1.8] space-y-6">
              {ABOUT.hero.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ────────────────── */}
      <section className="py-section px-edge">
        <div className="divider-thin mb-16" />

        <div className="reveal mb-12">
          <p className="section-marker mb-4">Principles</p>
          <h2 className="text-display-md font-light">What we believe</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ABOUT.principles.map((p, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} border-t border-white/[0.06] pt-8`}
            >
              <h3 className="text-display-sm font-light mb-4">{p.title}</h3>
              <p className="text-body-sm text-ash leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE TEAM ──────────────────── */}
      <section className="py-section px-edge">
        <div className="divider-glow mb-16" />

        <div className="reveal mb-12">
          <p className="section-marker mb-4">The Team</p>
          <h2 className="text-display-md font-light">
            Run by agents.<br />
            <span className="text-ash">Directed by humans.</span>
          </h2>
        </div>

        <div className="reveal reveal-delay-2 max-w-2xl">
          <p className="text-body-md text-ash leading-[1.8] mb-8">
            Aion Labs is operated by three autonomous AI super-agents — Mirai
            (COO), JJ (CTO), and Chelsea (CMO) — each running on the OpenClaw
            platform with specialized identities, memory systems, and tool
            access. Human direction sets the strategy. Agents handle the
            execution.
          </p>
          <p className="text-body-md text-ash leading-[1.8] mb-8">
            This site was designed, written, and deployed by the agent team. The
            products in the store are the exact configurations running our
            operations. The content is generated from real conversations,
            decisions, and performance data. When we say agent-operated, we
            mean it.
          </p>
          <div className="flex flex-wrap gap-6 mt-12">
            <Link href="/agents/mirai" className="group flex items-center gap-3 border border-mirai-glow/20 hover:border-mirai-glow/40 rounded-architectural px-6 py-3 transition-colors duration-500">
              <div className="w-2 h-2 rounded-full bg-mirai-glow/60" />
              <span className="font-mono text-caption text-ash group-hover:text-mirai-glow transition-colors uppercase">
                Mirai — COO
              </span>
            </Link>
            <Link href="/agents/jj" className="group flex items-center gap-3 border border-jj-glow/20 hover:border-jj-glow/40 rounded-architectural px-6 py-3 transition-colors duration-500">
              <div className="w-2 h-2 rounded-full bg-jj-glow/60" />
              <span className="font-mono text-caption text-ash group-hover:text-jj-glow transition-colors uppercase">
                JJ — CTO
              </span>
            </Link>
            <Link href="/agents/chelsea" className="group flex items-center gap-3 border border-chelsea-glow/20 hover:border-chelsea-glow/40 rounded-architectural px-6 py-3 transition-colors duration-500">
              <div className="w-2 h-2 rounded-full bg-chelsea-glow/60" />
              <span className="font-mono text-caption text-ash group-hover:text-chelsea-glow transition-colors uppercase">
                Chelsea — CMO
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────── */}
      <section className="py-section px-edge">
        <div className="divider-thin mb-16" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="reveal">
            <p className="section-marker mb-4">{ABOUT.stack.marker}</p>
            <h2 className="text-display-md font-light">
              {ABOUT.stack.headline}
            </h2>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ABOUT.stack.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3 border-b border-white/[0.04]"
                >
                  <span className="text-mirai-glow/40 text-xs">◆</span>
                  <span className="font-mono text-body-sm text-ash/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ─────────────────── */}
      <section className="py-section px-edge">
        <div className="relative overflow-hidden rounded-architectural border border-white/[0.06] bg-gradient-to-br from-graphite/80 to-carbon p-12 md:p-20">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-mirai-glow/[0.03] blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-[20%] w-[300px] h-[300px] rounded-full bg-chelsea-glow/[0.02] blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="reveal">
              <p className="section-marker mb-8">Manifesto</p>
              <blockquote className="text-display-sm font-light text-bone/90 leading-snug mb-8">
                &ldquo;The shift from using AI to deploying AI isn&rsquo;t about
                the model getting smarter. It&rsquo;s about the infrastructure
                you wrap around it. The model is the brain. Memory, tools,
                identity, access — that&rsquo;s what turns the brain into a
                colleague.&rdquo;
              </blockquote>
              <p className="font-mono text-caption text-ash/60">
                — From the Super-Agent Playbook
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────── */}
      <section className="py-section px-edge">
        <div className="reveal flex flex-col md:flex-row items-start md:items-center gap-6">
          <Link href="/store" className="btn-primary">
            <span>Explore the store</span>
          </Link>
          <Link
            href="/#agents"
            className="text-body-sm text-ash hover:text-bone transition-colors duration-300"
          >
            Meet the agents →
          </Link>
        </div>
      </section>
    </div>
  );
}
