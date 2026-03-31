"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import type { Agent } from "@/lib/data";

const colorClasses: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  "mirai-glow": {
    text: "text-mirai-glow",
    border: "border-mirai-glow/20",
    bg: "bg-mirai-glow/[0.04]",
    glow: "bg-mirai-glow/[0.03]",
  },
  "jj-glow": {
    text: "text-jj-glow",
    border: "border-jj-glow/20",
    bg: "bg-jj-glow/[0.04]",
    glow: "bg-jj-glow/[0.03]",
  },
  "chelsea-glow": {
    text: "text-chelsea-glow",
    border: "border-chelsea-glow/20",
    bg: "bg-chelsea-glow/[0.04]",
    glow: "bg-chelsea-glow/[0.03]",
  },
};

export function AgentDetailClient({ agent }: { agent: Agent }) {
  const revealRef = useReveal();
  const colors = colorClasses[agent.accentColor];

  return (
    <div ref={revealRef}>
      {/* ── HERO ──────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Ambient glow */}
        <div
          className={`absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full ${colors.glow} blur-[150px] pointer-events-none`}
        />
        <div className="absolute left-[clamp(1.5rem,5vw,6rem)] top-32 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

        <div className="px-edge pb-16 pt-40 w-full relative z-10">
          <div className="reveal">
            <p className={`font-mono text-[0.7rem] tracking-[0.12em] uppercase ${colors.text} mb-6`}>
              {agent.tagline}
            </p>
          </div>

          <div className="reveal reveal-delay-1">
            <h1 className="text-display-xl font-light mb-4">
              {agent.name}
              <span className="text-ash"> — {agent.role}</span>
            </h1>
          </div>

          <div className="reveal reveal-delay-2">
            <p className="text-body-lg text-ash max-w-[650px] leading-relaxed">
              {agent.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────── */}
      <section className="px-edge py-12 border-y border-white/[0.04]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {agent.stats.map((stat, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`}>
              <p className={`text-display-sm font-light ${agent.gradientClass} mb-1`}>
                {stat.value}
              </p>
              <p className="font-mono text-caption text-ash">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LONG DESCRIPTION ──────────── */}
      <section className="py-section px-edge">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="reveal">
            <p className="section-marker mb-4">Deep Dive</p>
            <h2 className="text-display-md font-light">
              How {agent.name} operates
            </h2>
          </div>

          <div className="reveal reveal-delay-2">
            <p className="text-body-md text-ash leading-[1.8]">
              {agent.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ──────────────── */}
      <section className="py-section px-edge">
        <div className="divider-thin mb-16" />
        <div className="reveal mb-12">
          <p className="section-marker mb-4">Capabilities</p>
          <h2 className="text-display-md font-light">
            What {agent.name} does
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {agent.capabilities.map((cap, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 4) + 1} border-l ${colors.border} pl-6 py-4`}
            >
              <p className="text-body-md text-bone/80">{cap}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────── */}
      <section className="py-section px-edge">
        <div className={`relative overflow-hidden rounded-architectural border ${colors.border} bg-gradient-to-br from-graphite/80 to-carbon p-12 md:p-16`}>
          <div className={`absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full ${colors.glow} blur-[100px] pointer-events-none`} />

          <div className="relative z-10 reveal">
            <p className="section-marker mb-6">Philosophy</p>
            <blockquote className="text-display-sm font-light text-bone/90 max-w-[700px] leading-snug">
              &ldquo;{agent.philosophy}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── MODEL INFO ────────────────── */}
      <section className="py-block px-edge">
        <div className="reveal flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${colors.bg} border ${colors.border}`} />
            <span className="font-mono text-caption text-ash">
              Model: {agent.model}
            </span>
          </div>
          <div className="font-mono text-caption text-ash/40">|</div>
          <span className="font-mono text-caption text-ash">
            Runtime: OpenClaw on Azure VPS
          </span>
          <div className="font-mono text-caption text-ash/40">|</div>
          <span className="font-mono text-caption text-ash">
            Memory: QMD Semantic Search
          </span>
        </div>
      </section>

      {/* ── CTA ───────────────────────── */}
      <section className="py-section px-edge">
        <div className="reveal flex flex-col md:flex-row items-start md:items-center gap-6">
          <Link href="/store" className="btn-primary">
            <span>Get the deployment configs</span>
          </Link>
          <Link
            href="/#agents"
            className="text-body-sm text-ash hover:text-bone transition-colors duration-300"
          >
            ← Back to all agents
          </Link>
        </div>
      </section>
    </div>
  );
}
