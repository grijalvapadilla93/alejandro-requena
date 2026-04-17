"use client";

import { useEffect } from "react";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll', `${scrollY}px`);
    };

    // Initial call
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
}
