"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function Academia() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24 bg-white overflow-hidden" id="academia">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <span className="font-label text-tertiary uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] mb-4 block">
              FORMACIÓN ARTÍSTICA
            </span>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-light leading-none">
              ACADEMIA
            </h2>
            <div className="h-1 w-24 bg-black mt-6"></div>
          </div>
        </ScrollReveal>

        {/* Frase */}
        <ScrollReveal stagger={1}>
          <p className="font-headline text-2xl md:text-3xl lg:text-5xl font-light italic leading-tight max-w-4xl mb-16 md:mb-24">
            &ldquo;Enseñar es compartir el conocimiento que recibí del maestro
            Giovanni Yanes. Cada estudiante es un nuevo trazo en este lienzo
            infinito.&rdquo;
          </p>
        </ScrollReveal>

        {/* Galería con parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal stagger={2}>
            <div className="relative group img-hover-zoom card-lift">
              <img
                src="/obras/Academia1.jpg"
                alt="Academia Art Requena - Clases de dibujo"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="mt-4">
                <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px]">
                  CLASES DE DIBUJO
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={3}>
            <div className="relative group img-hover-zoom card-lift mt-0 md:mt-12">
              <img
                src="/obras/Academia2.jpg"
                alt="Academia Art Requena - Técnicas de pintura"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="mt-4">
                <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px]">
                  TÉCNICAS DE PINTURA
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={4}>
            <div className="relative group img-hover-zoom card-lift mt-0 md:mt-24">
              <img
                src="/obras/Academia3.jpg"
                alt="Academia Art Requena - Formación integral"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="mt-4">
                <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px]">
                  FORMACIÓN INTEGRAL
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Info adicional */}
        <ScrollReveal stagger={5}>
          <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-black/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-label text-tertiary uppercase tracking-[0.4em] text-[10px] mb-4">
                  UBICACIÓN
                </h4>
                <p className="font-body text-lg">
                  Jalapa, Guatemala
                </p>
              </div>
              <div>
                <h4 className="font-label text-tertiary uppercase tracking-[0.4em] text-[10px] mb-4">
                  DISCIPLINAS
                </h4>
                <p className="font-body text-lg">
                  Dibujo, Pintura, Técnicas Mixtas
                </p>
              </div>
              <div>
                <h4 className="font-label text-tertiary uppercase tracking-[0.4em] text-[10px] mb-4">
                  CONTACTO
                </h4>
                <p className="font-body text-lg">
                  Academia Art Requena
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
