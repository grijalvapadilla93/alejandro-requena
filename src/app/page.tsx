import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WorkGrid } from "@/components/work-grid";
import { Encargos } from "@/components/encargos";
import { Statement } from "@/components/statement";
import { Academia } from "@/components/academia";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <WorkGrid />
        <Encargos />
        <Statement />
        <Academia />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  );
}
