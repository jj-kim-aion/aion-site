"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import { HOMEPAGE, AGENTS } from "@/lib/data";
import { AgentCard } from "@/components/AgentCard";
import ShaderBackground from "@/components/ShaderBackground";

export default function Home() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      {/* ═══════════════════════════════════
          HERO SECTION WITH WEBGL SHADER ANIMATION
          ═══════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Premium WebGL animated background */}
        <ShaderBackground />

        {/* Architectural line */}
        <div className="absolute left-[clamp(1.5rem,5vw,6rem)] top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

        <div className="px-edge pt-32 pb-20 w-full relative z-10">
          {/* Eyebrow */}
          <div className="reveal">
            <p className="section-marker mb-8">
              {HOMEPAGE.hero.eyebrow}
            </p>
          </div>

          {/* Headline */}
          <div className="reveal reveal-delay-1">
            <h1 className="text-display-xl font-light max-w-[900px] mb-8 whitespace-pre-line">
              {HOMEPAGE.hero.headline}
            </h1>
          </div>

          {/* Subheadline */}
          <div className="reveal reveal-delay-2">
            <p className="text-body-lg text-ash max-w-[600px] mb-12 leading-relaxed">
              {HOMEPAGE.hero.subheadline}
            </p>
          </div>

          {/* CTAs */}
          <div className="reveal reveal-delay-3 flex flex-wrap gap-4">
            <Link href={HOMEPAGE.hero.cta.href} className="btn-primary">
              <span>{HOMEPAGE.hero.cta.label}</span>
            </Link>
            <Link
              href={HOMEPAGE.hero.ctaSecondary.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-body-sm tracking-wide text-ash hover:text-bone transition-colors duration-300"
            >
              {HOMEPAGE.hero.ctaSecondary.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="translate-y-px">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-ash" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          AGENTS SECTION
          ═══════════════════════════════════ */}
      <section id="agents" className="py-section px-edge">
        <div className="reveal mb-16">
          <p className="section-marker mb-4">The Team</p>
          <h2 className="text-display-lg font-light max-w-[700px]">
            Three agents.<br />
            Three disciplines.<br />
            <span className="text-ash">One system.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => (
            <div key={agent.id} className={`reveal reveal-delay-${i + 1}`}>
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          PHILOSOPHY SECTION
          ═══════════════════════════════════ */}
      <section className="py-section px-edge">
        <div className="divider-glow mb-section" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="reveal">
            <p className="section-marker mb-4">{HOMEPAGE.philosophy.marker}</p>
            <h2 className="text-display-md font-light">
              {HOMEPAGE.philosophy.headline}
            </h2>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="text-body-md text-ash leading-[1.8] space-y-6">
              {HOMEPAGE.philosophy.body.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════ */}
      <section className="py-section px-edge">
        <div className="reveal mb-16">
          <p className="section-marker mb-4">{HOMEPAGE.howItWorks.marker}</p>
          <h2 className="text-display-md font-light">
            {HOMEPAGE.howItWorks.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOMEPAGE.howItWorks.steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${i + 1} group`}
            >
              <div className="border-t border-white/[0.06] pt-8 group-hover:border-mirai-glow/20 transition-colors duration-700">
                <span className="font-mono text-caption text-mirai-glow/60 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-display-sm font-light mb-4">
                  {step.title}
                </h3>
                <p className="text-body-sm text-ash leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          METRICS BAR
          ═══════════════════════════════════ */}
      <section className="py-section px-edge">
        <div className="divider-thin mb-16" />

        <div className="reveal">
          <p className="section-marker mb-12">{HOMEPAGE.metrics.marker}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {HOMEPAGE.metrics.items.map((metric, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`}>
              <p className="text-display-md font-light text-gradient-gold mb-2">
                {metric.value}
              </p>
              <p className="font-mono text-caption text-ash">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════ */}
      <section className="py-section px-edge">
        <div className="relative overflow-hidden rounded-architectural border border-white/[0.06] bg-gradient-to-br from-graphite to-carbon p-12 md:p-20">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-mirai-glow/[0.04] blur-[150px] pointer-events-none" />

          <div className="relative z-10">
            <div className="reveal">
              <p className="section-marker mb-6">Get Started</p>
              <h2 className="text-display-md font-light max-w-[600px] mb-6">
                Deploy your first agent today
              </h2>
              <p className="text-body-md text-ash max-w-[500px] mb-10">
                The Super-Agent Playbook has everything: identity templates,
                memory configs, safety frameworks, and a 3-week sprint plan.
                Production-tested. Copy-paste ready.
              </p>
            </div>
            <div className="reveal reveal-delay-2 flex flex-wrap gap-4">
              <Link href="/store" className="btn-primary">
                <span>Browse the store</span>
              </Link>
              <Link
                href="/store#super-agent-playbook"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-body-sm text-ash hover:text-mirai-glow transition-colors duration-300"
              >
                The Playbook — $199
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
