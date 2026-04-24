"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function useScramble(
  text: string,
  options?: { delay?: number; duration?: number; trigger?: boolean }
) {
  const { delay = 0, duration = 1200, trigger = true } = options || {};
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const totalFrames = Math.round(duration / 16);

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start - delay;

      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
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
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [text, delay, duration, trigger]);

  return display;
}
