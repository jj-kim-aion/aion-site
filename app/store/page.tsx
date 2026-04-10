"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useReveal } from "@/lib/useReveal";
import { getProducts, Product } from "@/lib/data";
import { EmailModal } from "@/app/components/EmailModal";

/** Map product IDs to their download API routes */
const DOWNLOAD_ROUTES: Record<string, string> = {
  "super-agent-playbook": "/api/download/super-agent-playbook",
};

function StatusNotification() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";
  
  if (!success && !canceled) return null;

  const handleClose = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("success");
    url.searchParams.delete("canceled");
    url.searchParams.delete("session_id");
    window.history.replaceState({}, '', url);
  };

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
      <div className={`backdrop-blur-md rounded-xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 border ${
        success 
          ? "bg-mirai-glow/10 border-mirai-glow/20 shadow-[0_0_30px_rgba(139,92,246,0.1)]" 
          : "bg-red-500/10 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
      }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          success ? "bg-mirai-glow/20" : "bg-red-500/20"
        }`}>
          {success ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-mirai-glow"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-400"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <div>
          <h4 className="text-bone font-medium text-sm">
            {success ? "Payment Successful" : "Payment Canceled"}
          </h4>
          <p className="text-ash text-xs">
            {success 
              ? "We've sent the download link to your email. Please check your inbox (and spam)." 
              : "No charges were made. If you had trouble with the checkout, please contact us."
            }
          </p>
          {success && (
            <p className="text-[10px] text-ash/40 mt-1">
              Didn't receive it? Check spam or contact support at <span className="text-bone/60">hello@aion.research</span>
            </p>
          )}
        </div>
        <button 
          onClick={handleClose}
          className="ml-auto text-ash/40 hover:text-bone transition-colors self-start"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ProductCard({
                         product,
                         onDownloadClick
                     }: {
  product: Product;
  onDownloadClick: (product: Product) => void;
}) {
  const downloadRoute = DOWNLOAD_ROUTES[product.product_id];

  const categoryLabels: Record<string, string> = {
    playbook: "Playbook",
    config: "Configuration",
    toolkit: "Toolkit",
    bundle: "Bundle",
  };

  const accentTopClass: Record<string, string> = {
    playbook: "accent-top-mirai",
    config: "accent-top-jj",
    toolkit: "accent-top-chelsea",
    bundle: "accent-top-mirai",
  };

  const categoryLabel = categoryLabels[product.category] || "Product";
  const accentClass = accentTopClass[product.category] || "accent-top-mirai";

  return (
    <>
      <div
          id={product.product_id}
          className={`rounded-xl bg-carbon p-8 md:p-10 flex flex-col h-full relative ring-1 ring-white/5 hover:bg-graphite hover:ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group overflow-hidden ${accentClass}`}
      >
        {/* Subtle glass effect gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-caption text-ash uppercase">
            {categoryLabel}
          </span>
          {product.badge && (
              <span
                  className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-mirai-glow border border-mirai-glow/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-display-sm font-light mb-4">{product.name}</h3>

        {/* Description */}
        <p className="text-body-sm text-ash leading-relaxed mb-8">
          {product.product_summary}
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
              {product.original_price && (
                <span className="text-body-sm text-ash/50 line-through ml-3">
                  ${product.original_price}
                </span>
              )}
            </div>
            <button
              className="btn-primary text-[0.75rem] py-3 px-6"
              onClick={() => onDownloadClick(product)}
            >
              <span>{product.cta}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function StorePage() {
  const revealRef = useReveal();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("default");

  useEffect(() => {
    // When filters change, we need to ensure they are visible
    // since the reveal animation might not trigger if they are already in viewport
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
      const hidden = document.querySelectorAll(".reveal:not(.visible)");
      if (hidden.length > 0) {
        hidden.forEach(el => el.classList.add("visible"));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter, activeSort, searchQuery]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    console.log("StorePage: Fetching products...");
    getProducts().then(data => {
      console.log("StorePage: Received products:", data);
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        console.warn("StorePage: No products returned from Supabase.");
      }
      setLoading(false);
      // Force an extra check for reveal elements after state update
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
        console.log("StorePage: Triggered scroll event for reveal animations.");

        // Final fallback: just mark everything visible if it's still hidden
        const hidden = document.querySelectorAll(".reveal:not(.visible)");
        if (hidden.length > 0) {
          console.log(`StorePage: Forcing visibility for ${hidden.length} elements.`);
          hidden.forEach(el => el.classList.add("visible"));
        }
      }, 500); // Increased timeout to ensure DOM is fully ready
    }).catch(err => {
      console.error("StorePage: Error in useEffect:", err);
      setLoading(false);
    });
  }, []);

  function handleDownloadClick(product: Product) {
    setSelectedProduct(product);
    setShowEmailModal(true);
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (activeSort === "price-asc") return a.price - b.price;
    if (activeSort === "price-desc") return b.price - a.price;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((p) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = p.name.toLowerCase().includes(query);
    const summaryMatch = p.product_summary.toLowerCase().includes(query);
    const categoryMatch = p.category.toLowerCase().includes(query);
    const searchMatch = nameMatch || summaryMatch || categoryMatch;
    
    if (activeFilter === "all") return searchMatch;
    return searchMatch && p.category === activeFilter;
  });

  console.log("StorePage: Filtered products count:", filteredProducts.length, {
    total: products.length,
    searchQuery,
    activeFilter,
    activeSort,
    firstProduct: filteredProducts[0]?.name
  });

  const flagship = filteredProducts.filter((p) => p.category === "playbook");
  const configs = filteredProducts.filter((p) => p.category === "config");
  const toolkits = filteredProducts.filter((p) => p.category === "toolkit");
  const bundles = filteredProducts.filter((p) => p.category === "bundle");

  const unclassified = filteredProducts.filter((p) => !["playbook", "config", "toolkit", "bundle"].includes(p.category));

  console.log("StorePage: Categories counts:", {
    flagship: flagship.length,
    configs: configs.length,
    toolkits: toolkits.length,
    bundles: bundles.length,
    unclassified: unclassified.length
  });
  
  const hasResults = filteredProducts.length > 0;

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-void">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-mirai-glow"/>
        </div>
    );
  }

  return (
    <div ref={revealRef}>
      <Suspense fallback={null}>
        <StatusNotification />
      </Suspense>
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
              placeholder={`Search ${products.length} products, toolkits, playbooks...`}
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
                <div key={p.product_id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                <ProductCard product={p} onDownloadClick={handleDownloadClick} />
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
                    <ProductCard key={p.product_id} product={p} onDownloadClick={handleDownloadClick}/>
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
                    <div key={p.product_id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                    <ProductCard product={p} onDownloadClick={handleDownloadClick} />
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
                    <div key={p.product_id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                    <ProductCard product={p} onDownloadClick={handleDownloadClick} />
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
                    <ProductCard key={p.product_id} product={p} onDownloadClick={handleDownloadClick}/>
                ))}
              </div>
            </section>
          )}

          {/* ── UNCLASSIFIED ────────────────── */}
          {unclassified.length > 0 && (
              <section className="px-edge pb-section">
                {(flagship.length > 0 || configs.length > 0 || toolkits.length > 0 || bundles.length > 0) &&
                    <div className="divider-thin mb-16"/>}
                <div className="reveal mb-8">
                  <p className="section-marker mb-2">Other Products</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unclassified.map((p, i) => (
                      <div key={p.product_id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                        <ProductCard product={p} onDownloadClick={handleDownloadClick}/>
                      </div>
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

      {/* Global Email Modal */}
      {selectedProduct && (
        <EmailModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
}
