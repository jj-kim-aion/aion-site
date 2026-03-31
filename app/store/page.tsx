"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import { PRODUCTS } from "@/lib/data";

/** Map product IDs to their download API routes */
const DOWNLOAD_ROUTES: Record<string, string> = {
  "super-agent-playbook": "/api/download/super-agent-playbook",
};

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  const [downloading, setDownloading] = useState(false);

  const downloadRoute = DOWNLOAD_ROUTES[product.id];

  async function handleDownload() {
    if (!downloadRoute || downloading) return;

    setDownloading(true);
    try {
      const res = await fetch(downloadRoute);

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Download failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        res.headers.get("content-disposition")?.match(/filename="(.+)"/)?.[1] ??
        `${product.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Download failed. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  }
  const categoryLabels: Record<string, string> = {
    playbook: "Playbook",
    config: "Configuration",
    toolkit: "Toolkit",
    bundle: "Bundle",
  };

  return (
    <div
      id={product.id}
      className="product-card rounded-architectural p-8 md:p-10 flex flex-col h-full group"
    >
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
            className="btn-primary text-[0.75rem] py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={downloading && !!downloadRoute}
            onClick={downloadRoute ? handleDownload : undefined}
          >
            <span>
              {downloading && downloadRoute
                ? "Downloading…"
                : product.cta}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  const revealRef = useReveal();

  const flagship = PRODUCTS.filter((p) => p.category === "playbook");
  const configs = PRODUCTS.filter((p) => p.category === "config");
  const toolkits = PRODUCTS.filter((p) => p.category === "toolkit");
  const bundles = PRODUCTS.filter((p) => p.category === "bundle");

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

      {/* ── FLAGSHIP ──────────────────── */}
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

      {/* ── CONFIGURATIONS ────────────── */}
      <section className="px-edge pb-section">
        <div className="divider-thin mb-16" />
        <div className="reveal mb-8">
          <p className="section-marker mb-2">Configurations</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {configs.map((p, i) => (
            <div key={p.id} className={`reveal reveal-delay-${i + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOLKITS ──────────────────── */}
      <section className="px-edge pb-section">
        <div className="divider-thin mb-16" />
        <div className="reveal mb-8">
          <p className="section-marker mb-2">Toolkits</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {toolkits.map((p, i) => (
            <div key={p.id} className={`reveal reveal-delay-${i + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ── BUNDLE ────────────────────── */}
      <section className="px-edge pb-section">
        <div className="divider-glow mb-16" />
        <div className="reveal mb-8">
          <p className="section-marker mb-2">The Full System</p>
        </div>
        <div className="reveal reveal-delay-1 max-w-3xl">
          {bundles.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────── */}
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
    </div>
  );
}
