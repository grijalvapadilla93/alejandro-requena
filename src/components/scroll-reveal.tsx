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
      // Fallback: show immediately
      element.classList.add('revealed');
      return;
    }

    // Safari/iOS fix: Use a more compatible approach
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isSafari || isIOS) {
      // Use scroll event for Safari/iOS
      const handleScroll = () => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Element is in viewport
        if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
          setTimeout(() => {
            element.classList.add('revealed');
          }, stagger * 100);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      
      // Initial check
      handleScroll();
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Use IntersectionObserver for other browsers
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
          rootMargin: '0px 0px -10% 0px'
        }
      );

      observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    }
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
