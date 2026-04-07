"use client";

import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {NAV_ITEMS} from "@/lib/data";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    function isActive(href: string): boolean {
        const base = href.split("#")[0];
        if (base === "/" || base === "") return pathname === "/";
        return pathname.startsWith(base);
    }

  return (
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-void/85 border-b border-white/[0.05]">
      <div className="px-edge flex items-center justify-between h-16">
        {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
              <div
                  className="relative w-7 h-7 rounded-full border border-mirai-glow/40 flex items-center justify-center group-hover:border-mirai-glow/70 transition-colors duration-500">
                  <div
                      className="w-2 h-2 rounded-full bg-mirai-glow/60 group-hover:bg-mirai-glow transition-all duration-500"/>
                  <div
                      className="absolute inset-[-3px] rounded-full border border-mirai-glow/0 group-hover:border-mirai-glow/15 scale-100 group-hover:scale-110 transition-all duration-700"/>
          </div>
          <span className="font-mono text-caption uppercase tracking-[0.15em] text-ash group-hover:text-bone transition-colors duration-500">
            Aion Labs
          </span>
        </Link>

        {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors duration-300 py-1 ${
                  isActive(item.href) ? "text-bone" : "text-ash hover:text-bone"
              }`}
            >
              {item.label}
                {isActive(item.href) && <span className="nav-active-line"/>}
            </Link>
          ))}
              <Link href="/store" className="btn-primary text-[0.65rem] py-2 px-5 ml-1">
                  <span>Get Started</span>
              </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
            <div className="flex flex-col gap-[5px] w-5">
            <span
                className={`block h-px bg-ash origin-center transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
            />
                <span
                    className={`block h-px bg-ash origin-center transition-all duration-300 ${
                        isOpen ? "-rotate-45 -translate-y-[3px]" : ""
                    }`}
                />
            </div>
        </button>
      </div>

          {/* Mobile Menu — animated via max-height */}
          <div
              className={`md:hidden border-t border-white/[0.04] bg-void/98 backdrop-blur-xl overflow-hidden transition-all duration-500 ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"}}
          >
              <div className="px-edge py-8 flex flex-col gap-5">
                  {NAV_ITEMS.map((item) => (
                      <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`font-mono text-sm uppercase tracking-[0.1em] transition-colors ${
                              isActive(item.href) ? "text-bone" : "text-ash hover:text-bone"
                          }`}
                      >
                          {item.label}
                      </Link>
                  ))}
                  <Link
                      href="/store"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary text-[0.65rem] py-2.5 px-5 w-fit mt-2"
                  >
                      <span>Get Started</span>
                  </Link>
              </div>
          </div>
    </nav>
  );
}
