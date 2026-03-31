import Link from "next/link";
import type { Agent } from "@/lib/data";

export function AgentCard({ agent }: { agent: Agent }) {
  const colorMap: Record<string, string> = {
    "mirai-glow": "border-mirai-glow/20 hover:border-mirai-glow/40",
    "jj-glow": "border-jj-glow/20 hover:border-jj-glow/40",
    "chelsea-glow": "border-chelsea-glow/20 hover:border-chelsea-glow/40",
  };

  const textColorMap: Record<string, string> = {
    "mirai-glow": "text-mirai-glow",
    "jj-glow": "text-jj-glow",
    "chelsea-glow": "text-chelsea-glow",
  };

  const bgGlow: Record<string, string> = {
    "mirai-glow": "bg-mirai-glow/[0.04]",
    "jj-glow": "bg-jj-glow/[0.04]",
    "chelsea-glow": "bg-chelsea-glow/[0.04]",
  };

  return (
    <Link href={`/agents/${agent.id}`} className="block group">
      <div
        className={`relative overflow-hidden rounded-architectural border bg-gradient-to-br from-graphite/80 to-carbon p-8 md:p-10 min-h-[420px] flex flex-col transition-all duration-700 hover-lift ${
          colorMap[agent.accentColor]
        }`}
      >
        {/* Ambient glow */}
        <div
          className={`absolute -top-20 -right-20 w-[250px] h-[250px] rounded-full ${bgGlow[agent.accentColor]} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`}
        />

        {/* Tagline */}
        <p
          className={`font-mono text-[0.7rem] tracking-[0.1em] uppercase ${textColorMap[agent.accentColor]} mb-6`}
        >
          {agent.tagline}
        </p>

        {/* Name */}
        <h3 className="text-display-md font-light mb-4">
          {agent.name}{" "}
          <span className="text-ash">— {agent.role}</span>
        </h3>

        {/* Description */}
        <p className="text-body-sm text-ash leading-relaxed mb-auto">
          {agent.description}
        </p>

        {/* CTA */}
        <div className="mt-8 pt-6 border-t border-white/[0.04]">
          <span className="inline-flex items-center gap-2 text-body-sm text-ash group-hover:text-bone transition-colors duration-300">
            {agent.cta.label}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
