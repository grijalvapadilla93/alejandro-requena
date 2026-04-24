"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { image: "/obras/AlfombraJesus.jpg", title: "ALFOMBRA DE JESÚS", year: "2024" },
  { image: "/obras/Caballo.jpg", title: "CABALLO", year: "2023" },
  { image: "/obras/Muralleon.jpg", title: "MURAL LEÓN", year: "2024" },
  { image: "/obras/UltimaCena.jpg", title: "LA ÚLTIMA CENA", year: "2023" },
  { image: "/obras/zeuz.jpg", title: "ZEUS", year: "2024" },
];

export function HorizontalScrollGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-white">
      <div
        ref={trackRef}
        className="flex items-center gap-6 md:gap-12 h-[100dvh] pl-6 md:pl-12 pr-[50vw]"
      >
        {/* Heading */}
        <div className="flex-shrink-0 w-[60vw] md:w-[40vw] flex flex-col justify-center">
          <span className="font-label uppercase tracking-[0.4em] text-[9px] text-neutral-400 mb-4">
            Obras seleccionadas
          </span>
          <h2
            className="font-headline font-bold text-black leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2rem, 6vw, 100px)" }}
          >
            Portafolio
          </h2>
          <div className="w-12 h-[1px] bg-black/20 mt-6" />
        </div>

        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[70vw] md:w-[35vw] h-[60vh] md:h-[70vh] relative group overflow-hidden"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover img-grayscale transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="font-label uppercase tracking-[0.3em] text-[9px] text-white/60 block">
                {slide.year}
              </span>
              <span className="font-headline text-white text-lg md:text-xl tracking-tight">
                {slide.title}
              </span>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[30vw] flex items-center justify-center">
          <a
            href="#portafolio"
            className="font-label uppercase tracking-[0.3em] text-[10px] text-black border-b border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
          >
            Ver todo el portafolio
          </a>
        </div>
      </div>
    </div>
  );
}
