"use client";

import { useEffect } from "react";

export function BfcacheReload() {
  useEffect(() => {
    // Check immediately on mount (for fresh loads after back/forward)
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navEntry && navEntry.type === "back_forward") {
      window.location.reload();
      return;
    }

    // Persistent listener for bfcache restore
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return null;
}
