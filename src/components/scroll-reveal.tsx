"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Force show after a timeout as fallback
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000 + stagger * 100);

    // Use scroll event as primary method for Safari/iOS
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Element is in viewport
      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        setTimeout(() => {
          setIsVisible(true);
        }, stagger * 100);
        return true;
      }
      return false;
    };

    // Initial check
    if (checkVisibility()) {
      clearTimeout(fallbackTimer);
      return;
    }

    // Add scroll listener
    const handleScroll = () => {
      if (checkVisibility()) {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(fallbackTimer);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(fallbackTimer);
    };
  }, [stagger]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'revealed' : 'hidden-element'}`}
      style={{ 
        transitionDelay: `${stagger * 0.1}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      {children}
    </div>
  );
}
