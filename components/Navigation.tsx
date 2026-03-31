"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/data";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-void/80 border-b border-white/[0.04]">
      <div className="px-edge flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-7 h-7 rounded-full border border-mirai-glow/40 flex items-center justify-center group-hover:border-mirai-glow/80 transition-colors duration-500">
            <div className="w-2 h-2 rounded-full bg-mirai-glow/60 group-hover:bg-mirai-glow transition-colors duration-500" />
          </div>
          <span className="font-mono text-caption uppercase tracking-[0.15em] text-ash group-hover:text-bone transition-colors duration-500">
            Aion Labs
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ash hover:text-bone transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 w-6"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px bg-ash transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block h-px bg-ash transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/[0.04] bg-void/95 backdrop-blur-xl">
          <div className="px-edge py-8 flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.1em] text-ash hover:text-bone transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
