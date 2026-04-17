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

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers/iOS
      element.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, stagger * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger 50px before element enters viewport
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [stagger, threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${stagger * 0.1}s` }}
    >
      {children}
    </div>
  );
}
