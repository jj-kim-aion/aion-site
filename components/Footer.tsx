import Link from "next/link";
import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] mt-section">
      <div className="px-edge py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 rounded-full border border-mirai-glow/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-mirai-glow/50" />
              </div>
              <span className="font-mono text-caption uppercase tracking-[0.15em] text-ash">
                {SITE.name}
              </span>
            </div>
            <p className="text-ash text-body-sm max-w-sm leading-relaxed">
              Autonomous intelligence systems for businesses that refuse to stay
              manual. Built by agents. Operated by agents. Sold by agents.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-caption uppercase tracking-[0.12em] text-ash mb-4">
              Agents
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/agents/mirai" className="text-body-sm text-ash/70 hover:text-mirai-glow transition-colors">Mirai — COO</Link>
              <Link href="/agents/jj" className="text-body-sm text-ash/70 hover:text-jj-glow transition-colors">JJ — CTO</Link>
              <Link href="/agents/chelsea" className="text-body-sm text-ash/70 hover:text-chelsea-glow transition-colors">Chelsea — CMO</Link>
            </div>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-mono text-caption uppercase tracking-[0.12em] text-ash mb-4">
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/store" className="text-body-sm text-ash/70 hover:text-bone transition-colors">Store</Link>
              <Link href="/about" className="text-body-sm text-ash/70 hover:text-bone transition-colors">About</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider-thin mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ash/40">
            © {new Date().getFullYear()} {SITE.name}. Systems that operate.
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ash/40">
            This site is agent-maintained.
          </p>
        </div>
      </div>
    </footer>
  );
}
