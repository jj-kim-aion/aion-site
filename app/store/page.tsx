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

/* ─── Status Notification ───────────────────────────────── */

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
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
      <div
          className={`backdrop-blur-md rounded-xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 border ${
              success
                  ? "bg-mirai-glow/10 border-mirai-glow/20 shadow-[0_0_30px_rgba(201,168,76,0.1)]"
                  : "bg-red-500/10 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
          }`}
      >
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                success ? "bg-mirai-glow/20" : "bg-red-500/20"
            }`}
        >
          {success ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" className="text-mirai-glow">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
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
                : "No charges were made. If you had trouble with the checkout, please contact us."}
          </p>
          {success && (
            <p className="text-[10px] text-ash/40 mt-1">
              Didn't receive it? Check spam or contact support at{" "}
              <span className="text-bone/60">hello@aion.research</span>
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

/* ─── Product Modal ─────────────────────────────────────── */

function ProductModal({
                        product,
                        isOpen,
                        onClose,
                        onBuyClick,
                      }: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onBuyClick: (product: Product) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categoryLabels: Record<string, string> = {
    playbook: "Playbook",
    config: "Configuration",
    toolkit: "Toolkit",
    bundle: "Bundle",
  };

  const categoryLabel = categoryLabels[product.category] || "Product";

  return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"/>

        {/* Modal */}
        <div
            className="relative bg-carbon border border-white/[0.08] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 15px rgba(201,168,76,0.05)"}}
        >
        {/* Header */}
          <div
              className="flex items-center justify-between p-6 border-b border-white/[0.04] bg-void/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
            <span
                className="font-mono text-[0.65rem] uppercase tracking-widest text-ash px-2 py-1 rounded bg-white/5 border border-white/10">
              {categoryLabel}
            </span>
              {product.badge && (
                  <span
                      className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-mirai-glow border border-mirai-glow/20 px-3 py-1 rounded-full">
                {product.badge}
              </span>
              )}
            </div>
            <button
                onClick={onClose}
                className="text-ash/60 hover:text-bone transition-colors p-2 hover:bg-white/5 rounded-full"
                aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
        </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12">
              <div>
                <h2 className="text-display-md font-light mb-6">{product.name}</h2>
                <p className="text-body-lg text-bone/90 leading-relaxed mb-8 font-medium">
                  {product.product_summary}
                </p>
                <div className="prose prose-invert max-w-none">
                  <p className="text-ash leading-relaxed whitespace-pre-wrap">
                    {product.detailed_description}
                  </p>
              </div>
              </div>

              <div className="space-y-10">
                {/* Features */}
                <div>
                  <p className="font-mono text-caption text-ash uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                    Key Features
                  </p>
                  <div className="space-y-3">
                    {product.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <span
                              className="text-mirai-glow mt-1 text-xs shrink-0 group-hover:scale-125 transition-transform duration-300">◆</span>
                          <span className="text-body-sm text-ash/90 leading-snug">{f}</span>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <p className="font-mono text-caption text-ash uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                    Technical Deliverables
                  </p>
                  <div className="space-y-3">
                    {product.deliverables.map((d, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-mirai-glow/70 mt-1 text-xs shrink-0">→</span>
                          <span className="text-body-sm text-ash/80 leading-snug font-mono">{d}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>

          {/* Footer */}
          <div
              className="p-6 border-t border-white/[0.04] bg-void/50 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-6 sticky bottom-0">
            <div className="flex items-baseline gap-3">
              <span className="text-display-sm font-light text-bone">${product.price}</span>
              {product.original_price && (
                  <span className="text-body-md text-ash/50 line-through">${product.original_price}</span>
              )}
            </div>
            <button
                className="btn-primary w-full sm:w-auto px-12 py-4 text-sm group relative overflow-hidden"
                onClick={() => onBuyClick(product)}
            >
            <span className="relative z-10 flex items-center gap-2">
              <span>{product.cta}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                   strokeLinecap="round" strokeLinejoin="round"
                   className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
            </button>
          </div>
        </div>
      </div>
  );
}

/* ─── Category Badge ────────────────────────────────────── */

function CategoryBadge({category}: { category: string }) {
  const styles: Record<string, string> = {
    playbook: "bg-mirai-glow/10 border-mirai-glow/20 text-mirai-glow",
    config: "bg-jj-glow/10 border-jj-glow/20 text-jj-glow",
    toolkit: "bg-chelsea-glow/10 border-chelsea-glow/20 text-chelsea-glow",
    bundle: "bg-mirai-glow/10 border-mirai-glow/20 text-mirai-glow",
  };
  const labels: Record<string, string> = {
    playbook: "Playbook",
    config: "Config",
    toolkit: "Toolkit",
    bundle: "Bundle",
  };

  return (
      <span
          className={`px-2 py-1 border rounded font-mono text-[0.55rem] uppercase tracking-[0.2em] backdrop-blur-md ${
              styles[category] ?? "bg-white/5 border-white/10 text-ash"
          }`}
      >
      {labels[category] ?? "Product"}
    </span>
  );
}

/* ─── Featured Card (bundle / first result) ─────────────── */

function FeaturedCard({
                        product,
                        onViewClick,
                      }: {
  product: Product;
  onViewClick: (p: Product) => void;
}) {
  return (
      <section
          className="group relative overflow-hidden rounded-2xl transition-all duration-500"
          style={{
            background: "rgba(17,17,17,0.4)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(201,168,76,0.08)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
                "0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(201,168,76,0.12)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.08)";
          }}
      >
        <div className="grid md:grid-cols-2 gap-0 min-h-[380px]">
          {/* Visual side */}
          <div className="relative overflow-hidden bg-obsidian min-h-[220px]">
            {/* Abstract circuit pattern background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                linear-gradient(rgba(201,168,76,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(201,168,76,0.15) 1px, transparent 1px)
              `,
                  backgroundSize: "40px 40px",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-mirai-glow/5 via-transparent to-transparent"/>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/60 md:hidden"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 to-transparent hidden md:block"/>

            {/* Decorative orb */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full opacity-20 group-hover:opacity-35 transition-opacity duration-700"
                style={{background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)"}}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-mirai-glow/20 group-hover:scale-150 transition-transform duration-1000"/>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border border-mirai-glow/30 group-hover:scale-125 transition-transform duration-700"/>
          </div>

          {/* Info side */}
          <div className="p-10 lg:p-14 flex flex-col justify-center relative z-10">
            <div
                className="inline-flex items-center px-3 py-1.5 bg-mirai-glow/10 border border-mirai-glow/20 rounded-full mb-6 w-fit">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-mirai-glow">
              Premium Collection
            </span>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl font-bold text-bone mb-5 uppercase tracking-tight leading-tight">
              {product.name}
            </h2>

            <p className="text-ash/70 mb-10 text-base leading-relaxed">
              {product.product_summary}
            </p>

            <div className="flex items-center gap-10 mb-10">
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ash mb-1.5">
                  Acquisition
                </p>
                <p className="text-3xl font-bold text-mirai-glow">${product.price}</p>
              </div>
              <div className="h-10 w-px bg-white/10"/>
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ash mb-1.5">
                  Status
                </p>
                <p className="text-[0.65rem] font-mono text-jj-glow uppercase tracking-widest">
                  Active Link
                </p>
              </div>
            </div>

            <button
                onClick={() => onViewClick(product)}
                className="w-full md:w-fit px-10 py-3.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-void rounded transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                style={{background: "linear-gradient(135deg, #c9a84c 0%, #7a6930 100%)"}}
            >
              View Details
            </button>
          </div>
        </div>
      </section>
  );
}

/* ─── Standard Product Card ─────────────────────────────── */

function ProductCard({
                       product,
                       onViewClick,
                     }: {
  product: Product;
  onViewClick: (p: Product) => void;
}) {
  const isBundle = product.category === "bundle";
  const glowColor = isBundle
      ? "rgba(201,168,76,0.15)"
      : product.category === "config"
          ? "rgba(126,200,227,0.15)"
          : product.category === "toolkit"
              ? "rgba(212,149,106,0.15)"
              : "rgba(201,168,76,0.15)";

  const borderHoverColor = isBundle
      ? "rgba(201,168,76,0.3)"
      : product.category === "config"
          ? "rgba(126,200,227,0.3)"
          : product.category === "toolkit"
              ? "rgba(212,149,106,0.3)"
              : "rgba(201,168,76,0.3)";

  return (
      <article
          id={product.product_id}
          className="group relative flex flex-col h-full rounded-2xl p-6 transition-all duration-500 cursor-pointer"
          style={{
            background: "rgba(17,17,17,0.4)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(142,145,146,0.08)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = `0 20px 40px rgba(0,0,0,0.8), 0 0 15px ${glowColor}`;
            el.style.borderColor = borderHoverColor;
            el.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = "none";
            el.style.borderColor = "rgba(142,145,146,0.08)";
            el.style.transform = "translateY(0)";
          }}
          onClick={() => onViewClick(product)}
      >
        {/* Image thumbnail area */}
        <div className="relative aspect-square mb-7 rounded-xl overflow-hidden bg-carbon">
          {/* Abstract visual based on category */}
          <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
                backgroundSize: "30px 30px",
              }}
          />
          <div
              className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${
                    product.category === "config"
                        ? "rgba(126,200,227,0.3)"
                        : product.category === "toolkit"
                            ? "rgba(212,149,106,0.3)"
                            : "rgba(201,168,76,0.3)"
                } 0%, transparent 70%)`,
              }}
          />
          {/* Animated ring */}
          <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/10 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"/>
          <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/20"/>

          {/* Category badge overlay */}
          <div className="absolute top-4 left-4">
            <CategoryBadge category={product.category}/>
          </div>

          {/* Product badge */}
          {product.badge && (
              <div className="absolute top-4 right-4">
            <span
                className="px-2 py-1 bg-mirai-glow/10 border border-mirai-glow/25 rounded font-mono text-[0.5rem] uppercase tracking-[0.2em] text-mirai-glow">
              {product.badge}
            </span>
              </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-base font-bold text-bone mb-2.5 uppercase tracking-tight group-hover:text-ivory transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-ash/70 mb-8 leading-relaxed flex-1">
          {product.product_summary}
        </p>

          {/* Footer */}
          <div
              className="mt-auto flex items-end justify-between pt-5"
              style={{borderTop: "0.5px solid rgba(53,53,52,0.8)"}}
          >
            <div>
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-ash/50 mb-1">
                Transfer Unit
              </p>
              <p className="text-2xl font-bold text-bone">${product.price}</p>
          </div>
          <button
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-white/10 text-ash hover:border-mirai-glow/40 hover:text-mirai-glow transition-all duration-300 bg-graphite/50"
              aria-label={`View ${product.name}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
      </article>
  );
}

/* ─── Main Store Page ────────────────────────────────────── */

export default function StorePage() {
  const revealRef = useReveal();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    getProducts()
        .then((data) => {
          if (data && data.length > 0) setProducts(data);
          setLoading(false);
          setTimeout(() => {
            window.dispatchEvent(new Event("scroll"));
            document.querySelectorAll(".reveal:not(.visible)").forEach((el) =>
                el.classList.add("visible")
            );
          }, 500);
        })
        .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) =>
          el.classList.add("visible")
      );
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter, activeSort, searchQuery]);

  function handleViewClick(product: Product) {
    setSelectedProduct(product);
    setShowProductModal(true);
  }

  function handleBuyClick(product: Product) {
    setShowProductModal(false);
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
    const match =
        p.name.toLowerCase().includes(query) ||
        p.product_summary.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
    if (activeFilter === "all") return match;
    return match && p.category === activeFilter;
  });

  // Separate featured (bundle) from regular products
  const featuredProduct =
      filteredProducts.find((p) => p.category === "bundle") ?? filteredProducts[0];
  const gridProducts = featuredProduct
      ? filteredProducts.filter((p) => p.product_id !== featuredProduct.product_id)
      : [];

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

      {/* Subtle grid background wrapper */}
      <div
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
      >
        {/* ── HERO ─────────────────────────────────── */}
        <section className="relative pt-40 pb-16 px-edge overflow-hidden">
          <div className="absolute top-[10%] right-[8%] w-[500px] h-[500px] rounded-full pointer-events-none"
               style={{background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)"}}
          />

          <div className="reveal">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-ash/50 mb-6">
              // Store
            </p>
            <h1 className="font-display text-display-lg font-extrabold tracking-tight text-bone leading-[1.05] max-w-[700px] mb-6">
              The systems we run.
              <br/>
              <span className="text-ash/40">Packaged for you.</span>
            </h1>
            <p className="text-body-lg text-ash max-w-[550px] leading-relaxed">
              Every product is a production-tested configuration from our live
              deployment. No demo-ware. No theory. These are the actual files and
              playbooks running Mirai, JJ, and Chelsea right now.
            </p>
          </div>
        </section>

        {/* ── SEARCH BAR (PINNED) ───────────────────── */}
        <div
            className="sticky top-0 z-50 px-edge py-5 bg-void/90 backdrop-blur-md border-b border-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-14 -translate-y-px">
          <div className="max-w-4xl mx-auto flex flex-col gap-5">
            {/* Search input */}
            <div className="relative group">
              <div
                  className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-ash group-focus-within:text-mirai-glow transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <input
                  type="text"
                  placeholder={`Search ${products.length} products, toolkits, playbooks…`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-carbon/50 hover:bg-carbon text-bone focus:outline-none focus:bg-carbon pl-14 pr-6 py-4 rounded-xl transition-all font-body text-body-md shadow-inner"
                  style={{
                    border: "1px solid rgba(142,145,146,0.15)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(142,145,146,0.15)";
                  }}
              />
            </div>

            {/* Filter chips + sort */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  {id: "all", label: "All Products"},
                  {id: "playbook", label: "Playbooks"},
                  {id: "config", label: "Configurations"},
                  {id: "toolkit", label: "Toolkits"},
                  {id: "bundle", label: "Bundles"},
                ].map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`px-5 py-2 rounded-full text-[0.6rem] font-mono uppercase tracking-widest transition-all duration-300 ${
                            activeFilter === f.id
                                ? "bg-bone text-void shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                : "bg-carbon/40 text-ash border border-white/10 hover:bg-carbon hover:text-bone hover:border-white/20"
                        }`}
                    >
                      {f.label}
                    </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[0.55rem] font-mono uppercase tracking-[0.25em] text-ash/40">
                  Sort:
                </span>
                <select
                    value={activeSort}
                    onChange={(e) => setActiveSort(e.target.value)}
                    className="bg-carbon/40 text-ash text-[0.6rem] font-mono uppercase tracking-wider px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-mirai-glow/50 appearance-none cursor-pointer hover:bg-carbon hover:text-bone transition-all"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── CATALOG ──────────────────────────────── */}
        <main className="px-edge pb-section">

          {/* No results */}
          {!hasResults && (
              <section className="py-section flex flex-col items-center justify-center text-center">
                <p className="text-body-lg text-ash mb-4">No assets match the criteria</p>
                <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("all");
                      setActiveSort("default");
                    }}
                    className="text-mirai-glow hover:text-mirai-soft underline underline-offset-4 text-sm font-mono tracking-wide"
                >
                  Clear All Filters
                </button>
              </section>
          )}

          {hasResults && (
              <div className="reveal space-y-6">
                {/* Section label */}
                <div className="mb-10">
                  <p className="section-marker mb-2">
                    {searchQuery
                        ? "Search Results"
                        : activeFilter !== "all"
                            ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`
                            : "All Products"}
                  </p>
                  {(searchQuery || activeSort !== "default") && (
                      <p className="text-ash text-sm">
                        {searchQuery
                      ? `Showing ${filteredProducts.length} items for "${searchQuery}"`
                            : `Showing ${filteredProducts.length} items sorted by ${activeSort.replace(/-/g, " ")}`}
                      </p>
                  )}
                </div>

                {/* Featured card (full-width) */}
                {featuredProduct && (
                    <div className="reveal mb-6">
                      <FeaturedCard product={featuredProduct} onViewClick={handleViewClick}/>
                    </div>
                )}

                {/* Product grid */}
                {gridProducts.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {gridProducts.map((p, i) => (
                          <div key={p.product_id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                            <ProductCard product={p} onViewClick={handleViewClick}/>
                          </div>
                      ))}
                    </div>
                )}
              </div>
          )}
        </main>

        {/* ── FAQ ──────────────────────────────────── */}
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
                <h3 className="text-body-md font-medium text-bone mb-2">{faq.q}</h3>
                <p className="text-body-sm text-ash leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Global Modals */}
      {selectedProduct && (
          <>
            <ProductModal
                isOpen={showProductModal}
                onClose={() => setShowProductModal(false)}
                product={selectedProduct}
                onBuyClick={handleBuyClick}
            />
            <EmailModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                productId={selectedProduct.id}
                productName={selectedProduct.name}
            />
          </>
      )}
    </div>
  );
}
