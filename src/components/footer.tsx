"use client";

export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center px-6 md:px-12 bg-[#f9f9f9] pb-12 pt-16">
      {/* Main footer content */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
        <div>
          <div className="text-black font-serif text-2xl md:text-3xl tracking-tighter mb-4">
            ALEJANDRO REQUENA
          </div>
          <p className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] text-[#4f370b]">
            © 2026 ALEJANDRO REQUENA. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          <a
            href="https://www.instagram.com/alejandrorequena_/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] text-[#4f370b] hover:text-black transition-colors duration-300 link-underline"
          >
            INSTAGRAM
          </a>
          <a
            href="https://www.facebook.com/AlejandroRequena1010/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] text-[#4f370b] hover:text-black transition-colors duration-300 link-underline"
          >
            FACEBOOK
          </a>
          <a
            href="https://www.sicultura.gob.gt/directory-directorio_c/listing/edwin-alejandro-requena-cante/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] text-[#4f370b] hover:text-black transition-colors duration-300 link-underline"
          >
            SICULTURA
          </a>
        </div>
      </div>

      {/* Hecho por Cenit Digital */}
      <div className="w-full border-t border-neutral-300 pt-10">
        <div className="flex flex-col items-center gap-5">
          <span className="font-sans uppercase tracking-[0.3em] text-[11px] md:text-[12px] text-neutral-500">
            Hecho por
          </span>
          <img
            src="/cenit-logo.png"
            alt="Cenit Digital"
            className="h-14 md:h-16 w-auto opacity-90"
          />
        </div>
      </div>
    </footer>
  );
}
