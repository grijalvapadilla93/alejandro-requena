"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

const works = [
  {
    id: 1,
    title: "ALFOMBRA DE JESÚS",
    year: "YESO",
    image: "/obras/AlfombraJesus.jpg",
    aspect: "aspect-[4/5]",
    colSpan: "col-span-12 md:col-span-7",
  },
  {
    id: 2,
    title: "CABALLO",
    year: "PINTURA",
    image: "/obras/Caballo.jpg",
    aspect: "aspect-square",
    colSpan: "col-span-12 md:col-span-5 md:col-start-2",
  },
  {
    id: 3,
    title: "MURAL LEÓN",
    year: "PINTURA MURAL",
    image: "/obras/Muralleon.jpg",
    aspect: "aspect-[3/4]",
    colSpan: "col-span-12 md:col-span-4 md:col-start-8 mt-0 md:mt-24",
  },
  {
    id: 4,
    title: "LA ÚLTIMA CENA",
    year: "PINTURA",
    image: "/obras/UltimaCena.jpg",
    aspect: "aspect-[21/9]",
    colSpan: "col-span-12 md:col-span-10 md:col-start-1",
  },
  {
    id: 5,
    title: "ZEUS",
    year: "PINTURA",
    image: "/obras/zeuz.jpg",
    aspect: "aspect-square",
    colSpan: "col-span-12 md:col-span-4 md:col-start-2",
  },
];

export function WorkGrid() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24 space-y-16 md:space-y-24 bg-white" id="portafolio">
      {/* First row - 1 image + text */}
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <ScrollReveal className="col-span-12 md:col-span-7">
          <div className="relative group cursor-crosshair img-hover-zoom card-lift">
            <img
              className={`w-full img-grayscale object-cover ${works[0].aspect}`}
              src={works[0].image}
              alt={works[0].title}
            />
            <div className="mt-4 flex justify-between">
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px] hover-opacity">
                {works[0].title}
              </span>
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px]">
                {works[0].year}
              </span>
            </div>
          </div>
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
          <div className="relative group img-hover-zoom card-lift">
            <img
              className={`w-full img-grayscale ${works[1].aspect} object-cover`}
              src={works[1].image}
              alt={works[1].title}
            />
            <div className="mt-4">
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px] hover-opacity">
                {works[1].title}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className={works[2].colSpan} stagger={1}>
          <div className="relative group img-hover-zoom card-lift">
            <img
              className={`w-full img-grayscale ${works[2].aspect} object-cover`}
              src={works[2].image}
              alt={works[2].title}
            />
            <div className="mt-4 text-right">
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px] hover-opacity">
                {works[2].title}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Third row - wide image */}
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <ScrollReveal className={works[3].colSpan}>
          <div className="relative group img-hover-zoom card-lift">
            <img
              className={`w-full img-grayscale ${works[3].aspect} object-cover`}
              src={works[3].image}
              alt={works[3].title}
            />
            <div className="mt-4 flex justify-between">
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px] hover-opacity">
                {works[3].title}
              </span>
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px]">
                {works[3].year}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Fourth row - 1 image */}
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <ScrollReveal className={works[4].colSpan}>
          <div className="relative group img-hover-zoom card-lift">
            <img
              className={`w-full img-grayscale ${works[4].aspect} object-cover`}
              src={works[4].image}
              alt={works[4].title}
            />
            <div className="mt-4 flex justify-between">
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px] hover-opacity">
                {works[4].title}
              </span>
              <span className="font-label text-tertiary uppercase tracking-[0.4em] text-[9px]">
                {works[4].year}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
