"use client";

export function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-between items-start md:items-end px-6 md:px-12 bg-[#f9f9f9] pb-8 md:pb-12 pt-16 md:pt-24 gap-8">
      <div className="mb-0 md:mb-0">
        <div className="text-black font-serif text-xl md:text-2xl tracking-tighter mb-4">
          ALEJANDRO REQUENA
        </div>
        <p className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] text-[#4f370b]">
          © 2025 ALEJANDRO REQUENA. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 md:gap-8">
        <a
          href="https://www.instagram.com/alejandrorequena_/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] text-[#4f370b] hover:text-black transition-colors duration-300 link-underline"
        >
          INSTAGRAM
        </a>
        <a
          href="https://www.facebook.com/AlejandroRequena1010/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] text-[#4f370b] hover:text-black transition-colors duration-300 link-underline"
        >
          FACEBOOK
        </a>
        <a
          href="https://www.sicultura.gob.gt/directory-directorio_c/listing/edwin-alejandro-requena-cante/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] text-[#4f370b] hover:text-black transition-colors duration-300 link-underline"
        >
          SICULTURA
        </a>
      </div>

      {/* Hecho por Cenit Digital */}
      <div className="w-full md:w-auto mt-12 pt-8 border-t border-neutral-200">
        <div className="flex flex-col items-center gap-4">
          <span className="font-sans uppercase tracking-[0.3em] text-[10px] text-neutral-400">
            Hecho por
          </span>
          <img
            src="/cenit-logo.png"
            alt="Cenit Digital"
            className="h-10 w-auto opacity-80"
          />
        </div>
      </div>
    </footer>
  );
}
