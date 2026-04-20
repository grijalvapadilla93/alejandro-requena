"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  stagger = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Force show after 1.5 seconds as fallback for very old browsers
    const fallbackTimer = setTimeout(() => {
      element.classList.add('revealed');
    }, 1500 + stagger * 100);

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      element.classList.add('revealed');
      clearTimeout(fallbackTimer);
      return;
    }

    // Create observer with options
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, stagger * 100);
            observer.unobserve(entry.target);
            clearTimeout(fallbackTimer);
          }
        });
      },
      { 
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px' // Trigger as soon as element touches viewport
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      clearTimeout(fallbackTimer);
    };
  }, [stagger, threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${stagger * 0.15}s` }}
    >
      {children}
    </div>
  );
}
