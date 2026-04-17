"use client";

import { useEffect, useRef } from "react";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const ticking = useRef(false);

  useEffect(() => {
    // Check if we're on iOS/Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    const updateScroll = () => {
      const scrollY = window.scrollY;
      
      // Update CSS variable
      document.documentElement.style.setProperty('--scroll', `${scrollY}px`);
      
      // For iOS/Safari, also update directly on elements with parallax classes
      if (isSafari || isIOS) {
        const parallaxSlow = document.querySelectorAll('.parallax-slow');
        const parallaxMedium = document.querySelectorAll('.parallax-medium');
        const parallaxFast = document.querySelectorAll('.parallax-fast');
        
        parallaxSlow.forEach(el => {
          (el as HTMLElement).style.transform = `translateY(${scrollY * 0.3}px)`;
        });
        
        parallaxMedium.forEach(el => {
          (el as HTMLElement).style.transform = `translateY(${scrollY * 0.5}px)`;
        });
        
        parallaxFast.forEach(el => {
          (el as HTMLElement).style.transform = `translateY(${scrollY * 0.7}px)`;
        });
      }
    };

    // Throttle scroll events for better performance
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          updateScroll();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Initial call
    updateScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen for resize events
    window.addEventListener('resize', updateScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return <>{children}</>;
}
