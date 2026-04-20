"use client";

import { Parallax } from "@/components/parallax";

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-white" id="inicio">
      {/* Layer 1: "ALEJANDRO" text - back layer (slow) */}
      <Parallax speed={0.3} className="absolute inset-0 flex items-center justify-start z-10 pointer-events-none">
        <h1 className="fragmented-text select-none">
          <span className="block font-headline font-extralight tracking-tighter text-black/10 leading-[0.85]" style={{ fontSize: "clamp(3.5rem, 20vw, 999px)" }}>
            ALEJANDRO
          </span>
        </h1>
      </Parallax>

      {/* Layer 2: Photo - anchored to bottom, feet align with the bottom bar line */}
      <Parallax speed={0.6} className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none pb-16 md:pb-0">
        <div className="relative w-full max-w-2xl mx-auto px-4">
            <img
            src="/obras/AlejandroFotoCuerpo-removebg-preview (1).png"
            alt="Alejandro Requena - Artista Visual"
            className="w-full h-auto object-contain max-h-[85vh] md:max-h-[85vh]"
          />
        </div>
      </Parallax>

      {/* Layer 3: "REQUENA" text - front layer (fast) */}
      <Parallax speed={1.0} className="absolute inset-x-0 bottom-28 md:bottom-12 flex items-end justify-end z-30 pointer-events-none">
        <h1 className="fragmented-text select-none mr-4 md:mr-12">
          <span className="block font-headline font-bold tracking-tighter text-black leading-[0.85]" style={{ fontSize: "clamp(3.5rem, 20vw, 999px)" }}>
            REQUENA
          </span>
        </h1>
      </Parallax>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-6 md:pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-0 border-t border-black pt-3 md:pt-4 z-40">
        <span className="font-label text-tertiary uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px]">
          JALAPA, GUATEMALA
        </span>
        <p className="max-w-md font-body text-sm md:text-lg italic leading-tight">
          Donde el yeso y el carbon se transforman en expresion pura.
        </p>
      </div>
    </section>
  );
}
