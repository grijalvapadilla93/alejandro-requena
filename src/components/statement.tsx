"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { PaintRevealText } from "@/components/paint-reveal-text";

export function Statement() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24 bg-white overflow-hidden" id="acerca">
      <div className="max-w-6xl">
        <ScrollReveal>
          <div className="font-headline text-4xl md:text-5xl lg:text-8xl font-light leading-[1.1] text-black">
            <PaintRevealText trigger="intersection" stagger={0.06}>
              El arte es una sustracción.
            </PaintRevealText>
            <span className="block italic font-bold mt-2 md:mt-4">
              <PaintRevealText trigger="intersection" delay={0.4} stagger={0.06}>
                No sumo color, revelo ausencia.
              </PaintRevealText>
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={2}>
          <div className="mt-16 md:mt-24 max-w-2xl font-body text-xl md:text-2xl leading-relaxed italic text-neutral-600">
            Desde los tres años, el arte ha sido mi lenguaje. Formado bajo la
            tutela del maestro Giovanni Yanes, cada trazo es una pregunta sobre
            la gravedad y cada plano un descanso para el ojo. En mi academia
            Art Requena en Jalapa, formo a nuevas generaciones mientras
            yo sigo explorando los límites del yeso y el carbon.
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
