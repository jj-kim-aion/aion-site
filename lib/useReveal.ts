"use client";

import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
              console.log(`useReveal: Element ${entry.target.className} is intersecting, marking visible`);
            entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Stop observing once it's visible
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const el = ref.current;
    if (!el) return;

    const observeReveals = () => {
      const reveals = el.querySelectorAll(".reveal:not(.visible)");
        console.log(`useReveal: Found ${reveals.length} hidden reveal elements to observe in`, el);
        reveals.forEach((r) => {
            console.log(`useReveal: Observing element`, r.tagName, r.className, r.textContent?.slice(0, 20));
            observer.observe(r);
        });
    };

    // Initial observation
    observeReveals();

    // Use MutationObserver to watch for newly added .reveal elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          observeReveals();
        }
      });
    });

    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return ref;
}
