"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const alejandroRef = useRef<HTMLSpanElement>(null);
  const requenaRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const alejandro = alejandroRef.current;
    const requena = requenaRef.current;
    const sub = subRef.current;
    if (!section || !alejandro || !requena || !sub) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Entrance — slide up, then clear inline styles so scroll can take over
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(alejandro, {
        y: 120,
        duration: 1,
        ease: "power4.out",
        clearProps: "transform",
      });

      tl.from(
        requena,
        { y: 120, duration: 0.9, ease: "power4.out", clearProps: "transform" },
        "-=0.6"
      );

      tl.from(
        sub,
        { y: 30, duration: 0.7, ease: "power2.out", clearProps: "transform" },
        "-=0.4"
      );

      // Scroll animation — text splits apart (works on all devices, less on mobile)
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

      // Fade transition — hero fades to white as you scroll past
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

      {/* Pinned content */}
      <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden select-none px-4 z-[2]">
        {/* ALEJANDRO — CSS entrance animation */}
        <span
          ref={alejandroRef}
          className="block font-headline font-bold tracking-tighter text-black leading-[0.85] text-center hero-enter"
          style={{
            fontSize: "clamp(2.8rem, 14vw, 300px)",
            animationDelay: "0.3s",
          }}
        >
          ALEJANDRO
        </span>

        {/* REQUENA — CSS entrance animation */}
        <span
          ref={requenaRef}
          className="block font-headline font-extralight tracking-tighter text-black/20 leading-[0.85] text-center -mt-1 md:-mt-4 hero-enter"
          style={{
            fontSize: "clamp(2.8rem, 14vw, 300px)",
            animationDelay: "0.6s",
          }}
        >
          REQUENA
        </span>

        {/* Subtitle — CSS entrance animation */}
        <div
          ref={subRef}
          className="mt-8 md:mt-12 flex flex-col items-center gap-3 hero-enter"
          style={{ animationDelay: "0.9s" }}
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
