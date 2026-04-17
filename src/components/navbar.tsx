"use client";
import { useState, useEffect } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on link click
  const handleLink = () => setOpen(false);

  const links = [
    { name: "PORTAFOLIO", href: "#portafolio" },
    { name: "ACADEMIA", href: "#academia" },
    { name: "ACERCA", href: "#acerca" },
    { name: "CONTACTO", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 md:py-8 backdrop-blur-xl border-none transition-colors duration-300 ${
          scrolled ? "bg-[#f9f9f9]/90 shadow-sm" : "bg-[#f9f9f9]/80"
        }`}
      >
        <a
          href="/"
          className="font-serif text-lg md:text-xl tracking-tighter text-black hover-opacity transition-opacity duration-300"
        >
          ALEJANDRO REQUENA
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12">
          {links.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              className={`font-serif font-light uppercase tracking-[0.4em] text-xs transition-all duration-300 hover-opacity link-underline ${
                i === 0 ? "text-black font-bold" : "text-neutral-400"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ touchAction: 'manipulation' }}
        >
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ${
              open ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#f9f9f9] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((item, i) => (
          <a
            key={item.name}
            href={item.href}
            onClick={handleLink}
            className="font-serif text-3xl font-light tracking-tight text-black hover:text-neutral-400 transition-colors duration-300"
            style={{
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 1 : 0,
              transition: `all 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms`,
            }}
          >
            {item.name}
          </a>
        ))}
      </div>
    </>
  );
}
