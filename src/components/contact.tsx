"use client";

import { useEffect, useRef } from "react";

export function Contact() {
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

    // Observe all form items
    const items = section.querySelectorAll(".form-item");
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-6 md:px-12 py-20 md:py-32 bg-white" id="contact">
      <div className="max-w-2xl mx-auto">
        <h4 className="font-label text-tertiary uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[12px] mb-16 md:mb-24 text-center">
          CONTACTO PARA COMISIONES
        </h4>

        <form className="space-y-16">
          <div 
            className="relative form-item animate-fade-in"
            style={{ animationDelay: "0ms" }}
          >
            <input
              className="w-full bg-transparent border-0 border-b border-black/10 p-4 font-mono text-sm focus:ring-0 focus:border-black transition-colors uppercase tracking-widest placeholder:text-neutral-300 input-focus"
              placeholder="NOMBRE"
              type="text"
            />
          </div>

          <div 
            className="relative form-item animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <input
              className="w-full bg-transparent border-0 border-b border-black/10 p-4 font-mono text-sm focus:ring-0 focus:border-black transition-colors uppercase tracking-widest placeholder:text-neutral-300 input-focus"
              placeholder="CORREO ELECTRÓNICO"
              type="email"
            />
          </div>

          <div 
            className="relative form-item animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <textarea
              className="w-full bg-transparent border-0 border-b border-black/10 p-4 font-mono text-sm focus:ring-0 focus:border-black transition-colors uppercase tracking-widest placeholder:text-neutral-300 resize-none input-focus"
              placeholder="MENSAJE"
              rows={4}
            />
          </div>

          <div 
            className="pt-8 text-center form-item animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <button
              className="font-mono text-xl md:text-2xl uppercase tracking-[0.2em] border-none bg-none p-0 cursor-pointer btn-press btn-glow hover-opacity"
              type="submit"
            >
              CONSULTAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
