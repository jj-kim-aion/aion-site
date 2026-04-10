"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProducts, Product } from "@/lib/data";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [purchasedProduct, setPurchasedProduct] = useState<Product | null>(null);
  const [upsellProduct, setUpsellProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts();
        if (!products || products.length === 0) {
          setLoading(false);
          return;
        }

        const lastPurchasedId = localStorage.getItem("last_purchased_id");

        // Find by internal ID (number)
        const product = products.find(p => p.id.toString() === lastPurchasedId) || products[0];
        setPurchasedProduct(product);

        // Contextual Upsell Logic
        // 1. If bought Playbook -> Upsell Multi-Agent Pro Config
        // 2. If bought Starter Config -> Upsell Multi-Agent Pro Config
        // 3. If bought Pro Config -> Upsell Sentry Pipeline Kit
        // 4. Default -> Upsell Playbook (if not bought)

        let upsell: Product | null = null;
        if (product.product_id === "super-agent-playbook") {
          upsell = products.find(p => p.product_id === "multi-agent-pro-config") || null;
        } else if (product.product_id === "openclaw-starter-config") {
          upsell = products.find(p => p.product_id === "multi-agent-pro-config") || null;
        } else if (product.product_id === "multi-agent-pro-config") {
          upsell = products.find(p => p.product_id === "sentry-pipeline-kit") || null;
        } else {
          // Default: try to upsell the playbook if they didn't buy it, 
          // but if they just bought the full bundle, don't upsell the playbook
          if (product.product_id !== "super-agent-playbook" && product.product_id !== "full-deployment-bundle") {
            upsell = products.find(p => p.product_id === "super-agent-playbook") || null;
          } else if (product.product_id === "full-deployment-bundle") {
            // If they bought the bundle, they have everything. Maybe no upsell or a specific one?
            upsell = null;
          }
        }

        setUpsellProduct(upsell);
      } catch (error) {
        console.error("Error fetching products for success page:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-mirai-glow rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-edge max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-12">
          <span className="section-marker mb-4 block">// ORDER_CONFIRMED</span>
          <h1 className="text-display-lg font-semibold mb-6 tracking-tight text-bone">
            The mission has <span className="text-shimmer">begun.</span>
          </h1>
          <p className="text-body-lg text-ash max-w-2xl">
            Thank you for your purchase of <span className="text-bone">{purchasedProduct?.name}</span>. 
            Check your inbox for the deployment instructions and access links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Order Details */}
          <div className="bg-obsidian border border-white/[0.05] p-8 rounded-sm">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ash mb-6">
              Deployment Package
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
                <span className="text-ash">Product</span>
                <span className="text-bone font-medium">{purchasedProduct?.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
                <span className="text-ash">Status</span>
                <span className="text-mirai-glow flex items-center gap-2 text-sm uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-mirai-glow animate-pulse" />
                  Processing
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ash">Session ID</span>
                <span className="text-ash font-mono text-[0.6rem] truncate max-w-[150px]">
                  {sessionId?.substring(0, 20)}...
                </span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/[0.05]">
              <p className="text-body-sm text-ash leading-relaxed">
                You will receive an email shortly with your digital deliverables. 
                If you don&apos;t see it within 10 minutes, please check your spam folder or contact mission control.
              </p>
            </div>
          </div>

          {/* Upsell CTA */}
          {upsellProduct && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-mirai-glow/20 to-jj-glow/20 rounded-sm blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-void border border-white/[0.08] p-8 rounded-sm">
                <span className="inline-block px-2 py-0.5 bg-mirai-glow/10 text-mirai-glow text-[0.6rem] font-mono uppercase tracking-[0.2em] mb-4">
                  Recommended Next Step
                </span>
                <h3 className="text-display-sm font-semibold mb-4 text-bone">
                  {upsellProduct.name}
                </h3>
                <p className="text-body-sm text-ash mb-8 leading-relaxed">
                  {upsellProduct.product_summary}
                </p>
                <Link 
                  href="/store" 
                  className="btn-primary w-full text-center"
                >
                  <span>Complete Your Setup — ${upsellProduct.price}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/" className="text-ash hover:text-bone transition-colors text-body-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M1 7L6 2M1 7L6 12" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Return to HQ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-t-2 border-mirai-glow rounded-full animate-spin" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
