"use client";

import { useEffect, useRef, useState } from "react";

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

    const items = section.querySelectorAll(".form-item");
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    const subject = encodeURIComponent(`Consulta de ${name} - Alejandro Requena Art`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`
    );
    window.location.href = `mailto:alejandrorequena1010@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <section ref={sectionRef} className="px-6 md:px-12 py-20 md:py-32 bg-white" id="contact">
      <div className="max-w-2xl mx-auto">
        <h4 className="font-label text-tertiary uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[12px] mb-6 text-center">
          CONTACTO PARA COMISIONES
        </h4>
        <p className="font-sans text-center text-neutral-500 text-sm mb-16 md:mb-24 max-w-md mx-auto leading-relaxed">
          ¿Te interesa una obra o quieres encargar algo único? Escríbeme y conversamos.
        </p>

        <form className="space-y-16" onSubmit={handleSubmit}>
          <div className="relative form-item" style={{ transitionDelay: "0ms" }}>
            <input
              name="name"
              required
              className="w-full bg-transparent border-0 border-b border-black/10 p-4 font-mono text-sm focus:ring-0 focus:border-black transition-colors uppercase tracking-widest placeholder:text-neutral-300 input-focus"
              placeholder="NOMBRE"
              type="text"
            />
          </div>

          <div className="relative form-item" style={{ transitionDelay: "100ms" }}>
            <input
              name="email"
              required
              className="w-full bg-transparent border-0 border-b border-black/10 p-4 font-mono text-sm focus:ring-0 focus:border-black transition-colors uppercase tracking-widest placeholder:text-neutral-300 input-focus"
              placeholder="CORREO ELECTRÓNICO"
              type="email"
            />
          </div>

          <div className="relative form-item" style={{ transitionDelay: "200ms" }}>
            <textarea
              name="message"
              required
              className="w-full bg-transparent border-0 border-b border-black/10 p-4 font-mono text-sm focus:ring-0 focus:border-black transition-colors uppercase tracking-widest placeholder:text-neutral-300 resize-none input-focus"
              placeholder="MENSAJE"
              rows={4}
            />
          </div>

          <div className="pt-8 text-center form-item" style={{ transitionDelay: "300ms" }}>
            <button
              className="inline-flex items-center gap-3 font-mono text-xl md:text-2xl uppercase tracking-[0.2em] border-none bg-black text-white px-8 py-4 cursor-pointer btn-press btn-glow hover:opacity-90 transition-opacity"
              type="submit"
              disabled={status === "sending"}
            >
              <SendIcon />
              {status === "sending" ? "ABRIENDO..." : "CONSULTAR"}
            </button>
          </div>
        </form>

        {/* WhatsApp CTA */}
        <div className="mt-16 text-center form-item" style={{ transitionDelay: "400ms" }}>
          <p className="font-sans text-neutral-400 text-xs uppercase tracking-[0.3em] mb-4">
            ¿Prefieres WhatsApp?
          </p>
          <a
            href="https://wa.me/50245782430"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] border border-[#25D366] text-[#25D366] px-6 py-3 hover:bg-[#25D366] hover:text-white transition-all duration-300"
          >
            <MessageCircleIcon />
            ESCRIBIR POR WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
