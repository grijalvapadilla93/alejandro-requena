"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SimpleParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function SimpleParallax({
  children,
  speed = 0.5,
  className = "",
}: SimpleParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Only animate when element is in viewport
      if (
        rect.top < windowHeight &&
        rect.bottom > 0
      ) {
        // Calculate parallax offset
        const offset = (scrollY - elementTop + windowHeight) * speed * 0.1;
        element.style.transform = `translateY(${offset}px)`;
      }
    };

    // Initial call
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
