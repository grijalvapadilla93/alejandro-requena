"use client";

import { useEffect } from "react";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Polyfill for older browsers
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (callback) => {
        return setTimeout(callback, 16);
      };
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Update CSS variable
      document.documentElement.style.setProperty('--scroll', `${scrollY}px`);
      
      // Also update for parallax elements directly (better Safari compatibility)
      const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
      
      parallaxElements.forEach(el => {
        const element = el as HTMLElement;
        const speed = element.classList.contains('parallax-slow') ? 0.3 :
                     element.classList.contains('parallax-medium') ? 0.5 : 0.7;
        
        element.style.transform = `translateY(${scrollY * speed}px)`;
        element.style.webkitTransform = `translateY(${scrollY * speed}px)`;
      });
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Also listen for resize events
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return <>{children}</>;
}
