"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    const register = () => {
      document.querySelectorAll(".reveal:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-scale:not(.is-visible), .reveal-pair:not(.is-visible), .stagger-reveal:not(.is-visible)").forEach((el) => {
        // Immediately reveal if already in viewport (handles refresh-mid-page)
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    register();

    // Watch for newly added reveal elements (route changes, lazy content)
    const mo = new MutationObserver(register);
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety fallback: ensure everything is visible after 4s
    const timer = window.setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-pair, .stagger-reveal").forEach((el) => el.classList.add("is-visible"));
    }, 4000);

    return () => {
      observer.disconnect();
      mo.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return <>{children}</>;
}
