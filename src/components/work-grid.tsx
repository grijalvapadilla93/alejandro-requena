"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { TiltImage } from "@/components/tilt-image";
import { MagneticWrap } from "@/components/magnetic-wrap";

const works = [
  {
    id: 1,
    title: "ALFOMBRA DE JESÚS",
    year: "YESO",
    image: "/obras/AlfombraJesus.jpg",
    aspect: "aspect-[4/5]",
    colSpan: "col-span-12 md:col-span-7",
    available: true,
  },
  {
    id: 2,
    title: "CABALLO",
    year: "PINTURA",
    image: "/obras/Caballo.jpg",
    aspect: "aspect-square",
    colSpan: "col-span-12 md:col-span-5 md:col-start-2",
    available: true,
  },
  {
    id: 3,
    title: "MURAL LEÓN",
    year: "PINTURA MURAL",
    image: "/obras/Muralleon.jpg",
    aspect: "aspect-[3/4]",
    colSpan: "col-span-12 md:col-span-4 md:col-start-8 mt-0 md:mt-24",
    available: false,
  },
  {
    id: 4,
    title: "LA ÚLTIMA CENA",
    year: "PINTURA",
    image: "/obras/UltimaCena.jpg",
    aspect: "aspect-[21/9]",
    colSpan: "col-span-12 md:col-span-10 md:col-start-1",
    available: true,
  },
  {
    id: 5,
    title: "ZEUS",
    year: "PINTURA",
    image: "/obras/zeuz.jpg",
    aspect: "aspect-square",
    colSpan: "col-span-12 md:col-span-4 md:col-start-2",
    available: true,
  },
];

function WorkCard({ work }: { work: (typeof works)[0] }) {
  return (
    <div className="relative group cursor-crosshair">
      <TiltImage className="img-hover-zoom card-lift">
        <img
          className={`w-full img-grayscale ${work.aspect} object-cover`}
          src={work.image}
          alt={work.title}
        />
      </TiltImage>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px] hover-opacity">
          {work.title}
        </span>
        <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px]">
          {work.year}
        </span>
      </div>
      {work.available ? (
        <MagneticWrap strength={0.2}>
          <a
            href="#contact"
            className="inline-block mt-3 font-label uppercase tracking-[0.3em] text-[9px] text-black border-b border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
          >
            Consultar disponibilidad
          </a>
        </MagneticWrap>
      ) : (
        <span className="inline-block mt-3 font-label uppercase tracking-[0.3em] text-[9px] text-neutral-400">
          Obra no disponible
        </span>
      )}
    </div>
  );
}

export function WorkGrid() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24 bg-white" id="portafolio">
      {/* First row - 1 image + text */}
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <ScrollReveal className="col-span-12 md:col-span-7">
          <WorkCard work={works[0]} />
        </ScrollReveal>

        <ScrollReveal
          className="col-span-12 md:col-span-4 md:col-start-9 self-center"
          stagger={1}
        >
          <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl leading-none font-light italic text-parallax">
            Cada trazo, <br />
            una pregunta.
          </h2>
        </ScrollReveal>
      </div>

      {/* Second row - 2 images */}
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <ScrollReveal className={works[1].colSpan}>
          <WorkCard work={works[1]} />
        </ScrollReveal>

        <ScrollReveal className={works[2].colSpan} stagger={1}>
          <WorkCard work={works[2]} />
        </ScrollReveal>
      </div>

      {/* Third row - wide image */}
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <ScrollReveal className={works[3].colSpan}>
          <WorkCard work={works[3]} />
        </ScrollReveal>
      </div>

      {/* Fourth row - 1 image */}
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <ScrollReveal className={works[4].colSpan}>
          <WorkCard work={works[4]} />
        </ScrollReveal>
      </div>
    </section>
  );
}
