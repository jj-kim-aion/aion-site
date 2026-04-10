"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {HeroAnimation} from "@/components/HeroAnimation";

export default function NotFound() {
  return (
    <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <HeroAnimation />
      <div className="hero-scanline" />
      
      {/* Architectural line */}
      <div className="absolute left-[clamp(1.5rem,5vw,6rem)] top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      <div className="px-edge py-20 w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-6">
            <p className="section-marker">
              // ERROR_404
            </p>
          </div>
          
          <h1 className="text-display-lg font-semibold mb-6 tracking-tight leading-tight">
            <span className="block text-bone/90">Signal lost.</span>
            <span className="block text-shimmer">Path undefined.</span>
          </h1>
          
          <p className="text-body-lg text-ash max-w-[500px] mx-auto mb-12 leading-relaxed">
            The requested coordinates do not correspond to any known sector in our deployment.
          </p>
          
          <div className="flex justify-center">
            <Link href="/" className="btn-primary">
              <span>Return to Base</span>
            </Link>
          </div>
        </motion.div>

        {/* Status indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-ash" />
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-ash">
            AION_LABS // HQ
          </span>
        </div>
      </div>
    </div>
  );
}
