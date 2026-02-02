import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/sections/Services";
import WorksPreview from "../components/sections/WorksPreview";
import Clients from "../components/sections/Clients";
import FullRateCard from "../components/sections/Check";

export default function Home() {
  return (
    <main className="overflow-y-auto scroll-smooth">
      <Navbar />

      <section id="hero">
        <Hero />
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
    </main>
  );
}
