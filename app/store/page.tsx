"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import { PRODUCTS } from "@/lib/data";
import { EmailModal } from "@/app/components/EmailModal";

/** Map product IDs to their download API routes */
const DOWNLOAD_ROUTES: Record<string, string> = {
  "super-agent-playbook": "/api/download/super-agent-playbook",
};

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const [showEmailModal, setShowEmailModal] = useState(false);

  const downloadRoute = DOWNLOAD_ROUTES[product.id];

  function handleDownloadClick() {
    if (!downloadRoute) return;
    setShowEmailModal(true);
  }
  const categoryLabels: Record<string, string> = {
    playbook: "Playbook",
    config: "Configuration",
    toolkit: "Toolkit",
    bundle: "Bundle",
  };

  return (
    <>
      <div
        id={product.id}
        className="rounded-2xl bg-carbon p-8 md:p-10 flex flex-col h-full relative ring-1 ring-white/5 hover:bg-graphite hover:ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden"
      >
        {/* Subtle glass effect gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-caption text-ash uppercase">
            {categoryLabels[product.category]}
          </span>
          {product.badge && (
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-mirai-glow border border-mirai-glow/20 px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-display-sm font-light mb-4">{product.name}</h3>

        {/* Description */}
        <p className="text-body-sm text-ash leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-8 flex-1">
          <p className="font-mono text-caption text-ash/60 uppercase mb-3">
            Includes
          </p>
          <div className="space-y-2">
            {product.features.slice(0, 6).map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-mirai-glow/50 mt-1 text-xs">◆</span>
                <span className="text-body-sm text-ash/80">{f}</span>
              </div>
            ))}
            {product.features.length > 6 && (
              <p className="text-body-sm text-ash/50 pl-5">
                + {product.features.length - 6} more
              </p>
            )}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-8">
          <p className="font-mono text-caption text-ash/60 uppercase mb-3">
            You receive
          </p>
          <div className="space-y-1.5">
            {product.deliverables.slice(0, 4).map((d, i) => (
              <p key={i} className="text-body-sm text-ash/70">
                → {d}
              </p>
            ))}
            {product.deliverables.length > 4 && (
              <p className="text-body-sm text-ash/50">
                + {product.deliverables.length - 4} more items
              </p>
            )}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="border-t border-white/[0.04] pt-6 mt-auto">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-display-sm font-light text-bone">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-body-sm text-ash/50 line-through ml-3">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button
              className="btn-primary text-[0.75rem] py-3 px-6"
              onClick={downloadRoute ? handleDownloadClick : undefined}
            >
              <span>{product.cta}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {downloadRoute && (
        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          productId={product.id}
          productName={product.name}
        />
      )}
    </>
  );
}

export default function StorePage() {
  const revealRef = useReveal();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("default");

  const sortedProducts = [...PRODUCTS].sort((a, b) => {
    if (activeSort === "price-asc") return a.price - b.price;
    if (activeSort === "price-desc") return b.price - a.price;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((p) => {
    const query = searchQuery.toLowerCase();
    const searchMatch = 
      p.name.toLowerCase().includes(query);
    
    if (activeFilter === "all") return searchMatch;
    return searchMatch && p.category === activeFilter;
  });

  const flagship = filteredProducts.filter((p) => p.category === "playbook");
  const configs = filteredProducts.filter((p) => p.category === "config");
  const toolkits = filteredProducts.filter((p) => p.category === "toolkit");
  const bundles = filteredProducts.filter((p) => p.category === "bundle");
  
  const hasResults = filteredProducts.length > 0;

  return (
    <div ref={revealRef}>
      {/* ── HERO ──────────────────────── */}
      <section className="relative pt-40 pb-20 px-edge overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-mirai-glow/[0.03] blur-[120px] pointer-events-none" />

        <div className="reveal">
          <p className="section-marker mb-6">Store</p>
          <h1 className="text-display-lg font-light max-w-[700px] mb-6">
            The systems we run.<br />
            <span className="text-ash">Packaged for you.</span>
          </h1>
          <p className="text-body-lg text-ash max-w-[550px] leading-relaxed">
            Every product is a production-tested configuration from our live
            deployment. No demo-ware. No theory. These are the actual files and
            playbooks running Mirai, JJ, and Chelsea right now.
          </p>
        </div>
      </section>

      {/* ── SEARCH BAR (PINNED) ───────── */}
      <div className="sticky top-0 z-50 px-edge py-6 bg-void/90 backdrop-blur-md border-b border-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-12 translate-y-[-1px]">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-ash group-focus-within:text-mirai-glow transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products, toolkits, playbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-carbon/50 hover:bg-carbon text-bone focus:outline-none ring-1 ring-white/10 focus:ring-mirai-glow/80 focus:bg-carbon pl-14 pr-6 py-4 rounded-xl transition-all font-body text-body-md shadow-inner"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Products" },
                { id: "playbook", label: "Playbooks" },
                { id: "config", label: "Configurations" },
                { id: "toolkit", label: "Toolkits" },
                { id: "bundle", label: "Bundles" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === f.id
                      ? "bg-bone text-void shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      : "bg-carbon/40 text-ash ring-1 ring-white/10 hover:bg-carbon hover:text-bone hover:ring-white/20"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[0.65rem] font-mono uppercase tracking-widest text-ash/40">Sort:</span>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="bg-carbon/40 text-ash text-xs font-mono uppercase tracking-wider px-3 py-2 rounded-lg ring-1 ring-white/10 focus:outline-none focus:ring-mirai-glow/50 appearance-none cursor-pointer hover:bg-carbon hover:text-bone transition-all"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {!hasResults && (
        <section className="px-edge py-section flex flex-col items-center justify-center text-center">
          <p className="text-body-lg text-ash mb-4">No assets match the criteria</p>
          <button onClick={() => { setSearchQuery(""); setActiveFilter("all"); setActiveSort("default"); }} className="text-mirai-glow hover:text-mirai-soft underline underline-offset-4 text-sm font-mono tracking-wide">
            Clear All Filters
          </button>
        </section>
      )}

      {/* ── SEARCH RESULTS (UNIFIED) ─────── */}
      {(searchQuery || activeSort !== "default") && hasResults && (
        <section className="px-edge pb-section">
          <div className="reveal mb-8">
            <p className="section-marker mb-2">
              {searchQuery ? "Search Results" : "All Products"}
            </p>
            <p className="text-ash text-sm">
              {searchQuery 
                ? `Showing ${filteredProducts.length} items for "${searchQuery}"`
                : `Showing ${filteredProducts.length} items sorted by ${activeSort.replace(/-/g, ' ')}`
              }
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── GROUPED VIEW (ONLY IF NO SEARCH AND NO SORT) ── */}
      {!searchQuery && activeSort === "default" && (
        <>
          {/* ── FLAGSHIP ──────────────────── */}
          {flagship.length > 0 && (
            <section className="px-edge pb-section">
              <div className="reveal mb-8">
                <p className="section-marker mb-2">Flagship</p>
              </div>
              <div className="reveal reveal-delay-1">
                {flagship.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* ── CONFIGURATIONS ────────────── */}
          {configs.length > 0 && (
            <section className="px-edge pb-section">
              {flagship.length > 0 && <div className="divider-thin mb-16" />}
              <div className="reveal mb-8">
                <p className="section-marker mb-2">Configurations</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {configs.map((p, i) => (
                  <div key={p.id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── TOOLKITS ──────────────────── */}
          {toolkits.length > 0 && (
            <section className="px-edge pb-section">
              {(flagship.length > 0 || configs.length > 0) && <div className="divider-thin mb-16" />}
              <div className="reveal mb-8">
                <p className="section-marker mb-2">Toolkits</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {toolkits.map((p, i) => (
                  <div key={p.id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── BUNDLE ────────────────────── */}
          {bundles.length > 0 && (
            <section className="px-edge pb-section">
              {(flagship.length > 0 || configs.length > 0 || toolkits.length > 0) && <div className="divider-glow mb-16" />}
              <div className="reveal mb-8">
                <p className="section-marker mb-2">The Full System</p>
              </div>
              <div className="reveal reveal-delay-1 max-w-3xl">
                {bundles.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* ── FAQ (ONLY IF NO SEARCH AND NO SORT) ─────── */}
      {!searchQuery && activeSort === "default" && (
        <section className="px-edge pb-section">
          <div className="divider-thin mb-16" />
          <div className="reveal mb-12">
            <p className="section-marker mb-4">Questions</p>
            <h2 className="text-display-md font-light">Before you buy</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {[
              {
                q: "What platform do I need?",
                a: "All configs are built for OpenClaw, the open-source agent platform. You'll need a Mac, Linux machine, or cloud VPS (Azure recommended). The playbook covers full setup from scratch.",
              },
              {
                q: "Are these the actual production configs?",
                a: "Yes. Sanitized for security (API keys removed, personal data stripped), but structurally identical to what runs our live deployment.",
              },
              {
                q: "Do I need coding experience?",
                a: "You need to be comfortable editing config files and running terminal commands. The playbook is detailed enough for technical non-developers, but this isn't a no-code solution.",
              },
              {
                q: "What models are required?",
                a: "The system is designed for Anthropic Claude (Opus, Sonnet, Haiku) and OpenAI Codex. You'll need API keys from both providers. Model tiering keeps costs under $8/day at full scale.",
              },
              {
                q: "Is there a refund policy?",
                a: "Yes. If the configs don't work as documented within 14 days of purchase, we'll refund in full. Digital products — no questions asked.",
              },
              {
                q: "Do you offer consulting?",
                a: "Custom deployments and strategy sprints are available. Contact us through the site for scoping and pricing.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1} border-t border-white/[0.06] pt-6`}
              >
                <h3 className="text-body-md font-medium text-bone mb-2">
                  {faq.q}
                </h3>
                <p className="text-body-sm text-ash leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
