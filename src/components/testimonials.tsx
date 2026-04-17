"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "Deslumbra con imagen de Jesús realizada con yeso y carbón.",
    source: "Emisoras Unidas",
  },
  {
    quote: "Un artista que captura el alma en cada trazo.",
    source: "Sicultura Guatemala",
  },
  {
    quote: "Formando nuevas generaciones de artistas en Jalapa.",
    source: "Comunidad Artística",
  },
  {
    quote: "Del dibujo animado al retrato hiperrealista, un maestro total.",
    source: "Arte Guatemalteco",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Simple IntersectionObserver for fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all testimonial items
    const items = section.querySelectorAll(".testimonial-item");
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 py-20 md:py-32 bg-white" id="testimonials">
      <h3 className="font-label text-tertiary uppercase tracking-[0.4em] text-[10px] mb-16">
        TESTIMONIOS
      </h3>

      <div className="w-full space-y-16">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="testimonial-item grid grid-cols-12 py-8 border-b border-black/10 items-end animate-fade-in"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            <div className="col-span-12 md:col-span-8 font-headline text-2xl md:text-3xl lg:text-5xl italic font-light">
              {item.quote}
            </div>
            <div className="col-span-12 md:col-span-4 font-label text-tertiary uppercase tracking-[0.4em] text-[10px] md:text-right mt-4 md:mt-0">
              {item.source}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
