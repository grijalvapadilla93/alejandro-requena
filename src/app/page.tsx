import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WorkGrid } from "@/components/work-grid";
import { Statement } from "@/components/statement";
import { Academia } from "@/components/academia";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkGrid />
        <Statement />
        <Academia />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
