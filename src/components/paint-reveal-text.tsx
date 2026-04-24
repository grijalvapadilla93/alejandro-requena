"use client";

import { useEffect, useRef, useLayoutEffect } from "react";

export function PaintRevealText({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  trigger = "mount",
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "intersection";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const words = children.split(" ");

  // "mount" trigger: reveal immediately on client, synchronously before paint
  useLayoutEffect(() => {
    if (trigger !== "mount") return;
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLElement>(".pr-inner");
    if (spans.length === 0) return;

    // 1. Hide immediately, no transition
    spans.forEach((s) => {
      s.style.transition = "none";
      s.style.transform = "translateY(110%)";
      s.style.opacity = "0";
    });

    // 2. Force reflow so the browser commits the hidden state
    void el.offsetHeight;

    // 3. Enable transitions
    spans.forEach((s, i) => {
      s.style.transition = `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}s, opacity 0.6s ease ${delay + i * stagger}s`;
    });

    // 4. Reveal on next frame — this triggers the CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        spans.forEach((s) => {
          s.style.transform = "translateY(0)";
          s.style.opacity = "1";
        });
      });
    });
  }, [trigger, delay, stagger]);

  // "intersection" trigger: hide by default, reveal when scrolled into view
  useEffect(() => {
    if (trigger !== "intersection") return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealedRef.current) {
            revealedRef.current = true;
            const spans = el.querySelectorAll<HTMLElement>(".pr-inner");

            // 1. Ensure hidden (no transition)
            spans.forEach((s) => {
              s.style.transition = "none";
              s.style.transform = "translateY(110%)";
              s.style.opacity = "0";
            });
            void el.offsetHeight;

            // 2. Enable transitions
            spans.forEach((s, i) => {
              s.style.transition = `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}s, opacity 0.6s ease ${delay + i * stagger}s`;
            });

            // 3. Reveal
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                spans.forEach((s) => {
                  s.style.transform = "translateY(0)";
                  s.style.opacity = "1";
                });
              });
            });

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em] align-bottom"
          style={{ lineHeight: 1.15 }}
        >
          <span
            className="pr-inner inline-block"
            style={{
              transform: "translateY(0)",
              opacity: 1,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
