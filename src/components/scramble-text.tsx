"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function ScrambleText({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  duration = 1200,
}: {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let raf: number;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start - delay;

      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * text.length);

      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
        } else if (i < revealed) {
          out += text[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(out);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, text, delay, duration]);

  const Component = Tag as any;
  return (
    <Component ref={ref} className={className}>
      {display}
    </Component>
  );
}
