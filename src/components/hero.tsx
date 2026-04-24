"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaintRevealText } from "@/components/paint-reveal-text";

gsap.registerPlugin(ScrollTrigger);

function TimeWidget() {
  const [time, setTime] = React.useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Guatemala",
        }) + " GMT-6"
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-label uppercase tracking-[0.3em] text-[9px] text-neutral-400 tabular-nums">
      {time}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const alejandroRef = useRef<HTMLDivElement>(null);
  const requenaRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const alejandro = alejandroRef.current;
    const requena = requenaRef.current;
    const sub = subRef.current;
    if (!section || !alejandro || !requena || !sub) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      const slideAmount = isMobile ? 15 : 30;

      gsap.to(alejandro, {
        x: `-${slideAmount}%`,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });

      gsap.to(requena, {
        x: `${slideAmount}%`,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });

      gsap.to(sub, {
        y: isMobile ? -20 : -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "40% top",
          scrub: 1,
        },
      });

      gsap.to(section, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "70% top",
          end: "95% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] md:h-[150vh] bg-white"
      id="inicio"
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-6 md:px-12 pt-24 md:pt-28 pb-6 pointer-events-none">
        <span className="font-label uppercase tracking-[0.3em] text-[9px] text-neutral-400">
          JALAPA, GT
        </span>
        <TimeWidget />
      </div>

      {/* Pinned content */}
      <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden select-none px-4 z-[2] pt-20">
        <div
          ref={alejandroRef}
          className="block font-headline font-bold tracking-tighter text-black leading-[0.9] text-center"
          style={{ fontSize: "clamp(2.8rem, 12vw, 180px)" }}
        >
          <PaintRevealText delay={0.4}>ALEJANDRO</PaintRevealText>
        </div>

        <div
          ref={requenaRef}
          className="block font-headline font-extralight tracking-tighter text-black/20 leading-[0.9] text-center -mt-1 md:-mt-2"
          style={{ fontSize: "clamp(2.8rem, 12vw, 180px)" }}
        >
          <PaintRevealText delay={0.8}>REQUENA</PaintRevealText>
        </div>

        <div
          ref={subRef}
          className="mt-8 md:mt-12 flex flex-col items-center gap-3"
        >
          <span className="font-label uppercase tracking-[0.4em] text-[9px] md:text-[11px] text-neutral-400">
            Artista Visual · Jalapa, Guatemala
          </span>
          <div className="w-[1px] h-10 bg-black/20" />
          <span className="font-label uppercase tracking-[0.3em] text-[7px] md:text-[8px] text-neutral-300 animate-bounce">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}
