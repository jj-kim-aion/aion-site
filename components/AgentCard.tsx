import Link from "next/link";
import type {Agent} from "@/lib/data";

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
      "mirai-glow": "bg-mirai-glow/[0.05]",
      "jj-glow": "bg-jj-glow/[0.05]",
      "chelsea-glow": "bg-chelsea-glow/[0.05]",
  };

    const accentCssClass: Record<string, string> = {
        "mirai-glow": "accent-top-mirai",
        "jj-glow": "accent-top-jj",
        "chelsea-glow": "accent-top-chelsea",
  };

  return (
      <Link href={`/agents/${agent.id}`} className="block group h-full">
      <div
          className={`metal-card relative overflow-hidden rounded-2xl border p-8 md:p-10 min-h-[460px] h-full flex flex-col ${colorMap[agent.accentColor]} ${accentCssClass[agent.accentColor]}`}
      >
          {/* Ambient glow on hover */}
        <div
            className={`absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full ${bgGlow[agent.accentColor]} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Tagline */}
        <p
            className={`font-mono text-[0.65rem] tracking-[0.12em] uppercase ${textColorMap[agent.accentColor]} mb-6 opacity-75`}
        >
          {agent.tagline}
        </p>

        {/* Name */}
          <h3 className="text-display-md font-normal leading-none mb-1.5 tracking-tight">
              {agent.name}
        </h3>

          {/* Role */}
          <p className="font-mono text-caption text-ash/60 uppercase tracking-[0.1em] mb-6">
              {agent.role} · {agent.title}
          </p>

        {/* Description */}
          <p className="text-body-sm text-ash/80 leading-relaxed mb-auto">
          {agent.description}
        </p>

          {/* Stats strip */}
          <div className="mt-8 pt-5 border-t border-white/[0.08] grid grid-cols-2 gap-4 mb-5">
              {agent.stats.slice(0, 2).map((stat) => (
                  <div key={stat.label}>
                      <p
                          className={`text-lg font-medium metric-value ${textColorMap[agent.accentColor]} mb-0.5 tabular-nums`}
                      >
                          {stat.value}
                      </p>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ash/50 leading-tight">
                          {stat.label}
                      </p>
                  </div>
              ))}
          </div>

        {/* CTA */}
          <div>
          <span
              className="inline-flex items-center gap-2 text-body-sm text-ash/55 group-hover:text-bone transition-colors duration-300">
            {agent.cta.label}
            <svg
                width="13"
                height="13"
              viewBox="0 0 14 14"
              fill="none"
                className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300"
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
