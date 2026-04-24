"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

const sizes = [
  {
    name: "Pequeño",
    dim: "30 × 40 cm",
    price: "Desde Q450",
    usd: "~$60 USD",
    time: "1–2 semanas",
    desc: "Ideal para retratos individuales en lápiz o carboncillo. Formato íntimo, perfecto para escritorios o espacios reducidos.",
    bestFor: "Lápiz · Carboncillo · Crayón",
  },
  {
    name: "Mediano",
    dim: "50 × 70 cm",
    price: "Desde Q900",
    usd: "~$120 USD",
    time: "2–3 semanas",
    desc: "El formato más pedido. Retratos con mayor nivel de detalle y expresión. Funciona en cualquier ambiente.",
    bestFor: "Lápiz · Carboncillo · Acuarela · Óleo",
    featured: true,
  },
  {
    name: "Grande",
    dim: "80 × 100 cm",
    price: "Desde Q1,875",
    usd: "~$250 USD",
    time: "3–4 semanas",
    desc: "Pieza de impacto. Máximo detalle, composiciones complejas o retratos de cuerpo completo. Para coleccionistas.",
    bestFor: "Óleo · Acuarela · Técnica mixta",
  },
];

const extras = [
  { name: "Marco artesanal", price: "+Q200–500", desc: "Madera nativa, acabado a mano" },
  { name: "Certificado de autenticidad", price: "Incluido", desc: "Firma, fecha, dimensiones y número de pieza" },
  { name: "Envío internacional", price: "A cotizar", desc: "Empaque profesional + seguro de envío" },
];

export function Encargos() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-12 py-16 md:py-24 bg-white overflow-hidden" id="encargos">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-label text-tertiary uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] mb-4 block">
                OBRA A TU MEDIDA
              </span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-light leading-none">
                Encargos
              </h2>
              <div className="h-1 w-24 bg-black mt-6" />
            </div>
            <p className="font-sans text-neutral-500 text-sm max-w-sm leading-relaxed">
              Elegí el tamaño, la técnica y el concepto. Yo me encargo de convertir tu idea en una pieza original.
            </p>
          </div>
        </ScrollReveal>

        {/* Size cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 mb-16">
          {sizes.map((s, i) => (
            <ScrollReveal key={s.name} stagger={i}>
              <div
                className={`relative bg-white p-8 md:p-10 flex flex-col gap-6 group cursor-pointer transition-colors duration-300 h-full
                  ${selected === i ? "bg-neutral-50" : "hover:bg-neutral-50"}`}
                onClick={() => setSelected(i)}
              >
                {/* Featured badge */}
                {s.featured && (
                  <div className="absolute top-0 right-0 bg-black text-white font-label uppercase tracking-[0.2em] text-[9px] px-4 py-1.5">
                    Más pedido
                  </div>
                )}

                {/* Size name + dimensions */}
                <div>
                  <div className="font-headline text-2xl md:text-3xl leading-tight">{s.name}</div>
                  <div className="font-label text-tertiary uppercase tracking-[0.3em] text-[10px] mt-1">
                    {s.dim}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-black/10" />

                {/* Price */}
                <div>
                  <div className="font-headline text-3xl md:text-4xl font-light italic">{s.price}</div>
                  <div className="font-label text-neutral-400 uppercase tracking-[0.2em] text-[10px] mt-1">
                    {s.usd} · {s.time}
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-neutral-500 text-sm leading-relaxed flex-1">
                  {s.desc}
                </p>

                {/* Best for */}
                <div className="font-label text-neutral-400 uppercase tracking-[0.15em] text-[9px] border-t border-black/10 pt-4">
                  {s.bestFor}
                </div>

                {/* Selection indicator */}
                <div
                  className={`w-full h-10 flex items-center justify-center border transition-all duration-300 font-label uppercase tracking-[0.2em] text-[10px]
                    ${selected === i
                      ? "bg-black border-black text-white"
                      : "border-black/10 text-neutral-400 group-hover:border-black group-hover:text-black"
                    }`}
                >
                  {selected === i ? "Seleccionado ✓" : "Seleccionar"}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Extras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {extras.map((e) => (
            <ScrollReveal key={e.name}>
              <div className="flex flex-col gap-2 border-l-2 border-black/10 pl-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-headline text-lg">{e.name}</span>
                  <span className="font-label text-tertiary uppercase tracking-[0.15em] text-[10px]">
                    {e.price}
                  </span>
                </div>
                <span className="font-sans text-neutral-500 text-sm">{e.desc}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 border border-black/10">
            <div>
              <div className="font-headline text-xl md:text-2xl mb-1">
                ¿Listo para encargar tu obra?
              </div>
              <div className="font-sans text-neutral-500 text-sm">
                Respondé unas preguntas rápidas por WhatsApp y te envío cotización en menos de 24h.
              </div>
            </div>
            <a
              href="https://wa.me/50245782430?text=Hola%20Alejandro%2C%20quiero%20cotizar%20un%20retrato"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black text-white font-label uppercase tracking-[0.2em] text-[10px] px-8 py-4 hover:bg-neutral-800 transition-colors no-underline whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Cotizar por WhatsApp →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
