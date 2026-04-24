"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Only on desktop
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    // Check hoverable elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, .cursor-hover")
      ) {
        setHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, .cursor-hover")
      ) {
        setHovering(false);
      }
    };

    const tick = () => {
      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body { cursor: none !important; }
          a, button, [role="button"], input, textarea, .cursor-hover { cursor: none !important; }
        }
      `}</style>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          width: hovering ? 48 : 8,
          height: hovering ? 48 : 8,
          borderRadius: "50%",
          backgroundColor: "white",
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease",
          opacity: hidden ? 0 : 1,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          width: hovering ? 64 : 40,
          height: hovering ? 64 : 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.4)",
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease",
          opacity: hidden ? 0 : 0.6,
        }}
      />
    </>
  );
}
