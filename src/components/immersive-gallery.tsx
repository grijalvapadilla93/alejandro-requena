"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const paintings = [
  {
    id: 1,
    title: "ALFOMBRA DE JESÚS",
    medium: "YESO · CARBÓN",
    image: "/obras/AlfombraJesus.jpg",
  },
  {
    id: 2,
    title: "CABALLO",
    medium: "PINTURA AL ÓLEO",
    image: "/obras/Caballo.jpg",
  },
  {
    id: 3,
    title: "MURAL LEÓN",
    medium: "PINTURA MURAL",
    image: "/obras/Muralleon.jpg",
  },
  {
    id: 4,
    title: "LA ÚLTIMA CENA",
    medium: "PINTURA",
    image: "/obras/UltimaCena.jpg",
  },
  {
    id: 5,
    title: "ZEUS",
    medium: "PINTURA",
    image: "/obras/zeuz.jpg",
  },
];

export function ImmersiveGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const fixed = fixedRef.current;
    if (!container || !fixed) return;

    const images = fixed.querySelectorAll<HTMLElement>(".imm-image");
    const texts = container.querySelectorAll<HTMLElement>(".imm-text");

    const ctx = gsap.context(() => {
      const vh = () => window.innerHeight;

      texts.forEach((txt, i) => {
        gsap.fromTo(
          txt,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${i * vh()} 60%`,
              end: () => `top+=${(i + 0.5) * vh()} center`,
              scrub: 1,
            },
          }
        );

        gsap.to(txt, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: () => `top+=${(i + 0.5) * vh()} center`,
            end: () => `top+=${(i + 1) * vh()} top`,
            scrub: 1,
          },
        });
      });

      images.forEach((img, i) => {
        // Zoom while visible
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.35,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${i * vh()} bottom`,
              end: () => `top+=${(i + 1) * vh()} top`,
              scrub: 1,
            },
          }
        );

        if (i === 0) return;
        gsap.fromTo(
          img,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: () => `top+=${i * vh()} 80%`,
              end: () => `top+=${i * vh()} 20%`,
              scrub: 1,
            },
          }
        );
      });

      // Fade out fixed layer when exiting last slide
      gsap.to(fixed, {
        opacity: 0,
        pointerEvents: "none",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: () => `top+=${(paintings.length - 1) * vh()} 30%`,
          end: () => `top+=${paintings.length * vh()} top`,
          scrub: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Fixed background layer — stays locked while we scroll through triggers */}
      <div
        ref={fixedRef}
        className="fixed inset-0 w-full h-full z-[1]"
        aria-hidden="true"
      >
        {paintings.map((p, i) => (
          <div
            key={p.id}
            className="imm-image absolute inset-0 w-full h-full"
            style={{
              opacity: i === 0 ? 1 : 0,
              zIndex: i + 1,
            }}
          >
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${p.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Vignette edges */}
        <div
          className="absolute inset-0 pointer-events-none z-50"
          style={{
            boxShadow: "inset 0 0 150px rgba(0,0,0,0.5)",
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 z-50 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* Scrollable trigger sections */}
      <div ref={containerRef} className="relative z-[2]">
        {paintings.map((p, i) => (
          <div
            key={p.id}
            className="imm-section relative h-screen flex items-center justify-center"
          >
            <div className="imm-text text-center px-6 select-none">
              <span className="block font-label uppercase tracking-[0.5em] text-[10px] md:text-xs text-white/60 mb-4">
                {p.medium}
              </span>
              <h2
                className="font-headline font-bold text-white leading-[0.9] tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 10vw, 160px)" }}
              >
                {p.title.split(" ").map((word, wi) => (
                  <span key={wi} className="block">
                    {word}
                  </span>
                ))}
              </h2>

              {i === paintings.length - 1 && (
                <div className="mt-8 md:mt-12">
                  <a
                    href="#portafolio"
                    className="inline-block font-label uppercase tracking-[0.3em] text-[11px] text-white/80 border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all duration-500"
                  >
                    Ver colección completa
                  </a>
                </div>
              )}
            </div>

            {/* Scroll hint on first slide */}
            {i === 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="font-label uppercase tracking-[0.3em] text-[9px] text-white/50">
                  Scroll para entrar
                </span>
                <div className="w-[1px] h-8 bg-white/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
