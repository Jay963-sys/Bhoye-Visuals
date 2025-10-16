import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutPreview from "../components/sections/AboutPreview";
import Services from "../components/sections/Services";
import WorksPreview from "../components/sections/WorksPreview";
import Clients from "../components/sections/Clients";
import FullRateCard from "../components/sections/Check";
import ContactPreview from "../components/sections/ContactPreview";
import Footer from "../components/Footer";
import { i } from "framer-motion/client";

export default function Home() {
  return (
    <main className="overflow-y-auto scroll-smooth">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <AboutPreview />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="works">
        <WorksPreview />
      </section>

      <section id="clients">
        <Clients />
      </section>

      <section id="booking">
        <FullRateCard />
      </section>

      <section id="contact">
        <ContactPreview />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}
