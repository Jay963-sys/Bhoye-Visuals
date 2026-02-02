"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Weddings",
    desc: "Timeless films that preserve the raw emotion of your most important day.",
    src: "/services/wedding.jpg",
  },
  {
    id: "02",
    title: "Event Coverage",
    desc: "Capturing the energy and atmosphere of corporate and social events.",
    src: "/services/event.jpg",
  },
  {
    id: "03",
    title: "Short Films",
    desc: "Narrative-driven storytelling with cinematic visuals and impactful pacing.",
    src: "/services/shortfilm.jpg",
  },
  {
    id: "04",
    title: "Brand Storytelling",
    desc: "Promote your mission through powerful, emotional visual campaigns.",
    src: "/services/brand2.jpg",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="relative bg-black text-white flex flex-col md:flex-row md:items-center md:min-h-screen py-24 md:py-0">
      {/* ----------------------------------------------------
          LEFT SIDE: THE LIST (Interactive)
          ---------------------------------------------------- */}
      <div className="w-full md:w-1/2 p-6 md:p-16 lg:p-24 z-20 flex flex-col justify-center">
        {/* Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-12 block shadow-black drop-shadow-md"
        >
          Our Expertise
        </motion.span>

        <div className="flex flex-col space-y-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveService(index)}
              className="group cursor-pointer relative"
            >
              {/* The Number & Title */}
              <div className="flex items-baseline gap-6 transition-all duration-300 group-hover:pl-4">
                <span
                  className={`font-mono text-sm transition-colors duration-300 ${
                    activeService === index ? "text-[#FF3100]" : "text-gray-500"
                  }`}
                >
                  {service.id}
                </span>
                {/* Added drop-shadow to text so it remains readable over bright images */}
                <h3
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter transition-colors duration-300 drop-shadow-lg ${
                    activeService === index ? "text-white" : "text-gray-600"
                  }`}
                >
                  {service.title}
                </h3>
              </div>

              {/* The Description (Reveals on Active) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeService === index ? "auto" : 0,
                  opacity: activeService === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="pt-4 pl-12 text-gray-300 max-w-md text-sm md:text-base leading-relaxed font-light drop-shadow-md">
                  {service.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 md:relative w-full md:w-1/2 h-full md:h-screen z-10 md:z-auto opacity-60 md:opacity-100 pointer-events-none md:pointer-events-auto">
        <div className="sticky top-0 h-full w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={services[activeService].id}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Placeholder for Dynamic Image */}
              <div className="relative w-full h-full bg-stone-900">
                <Image
                  src={services[activeService].src}
                  alt={services[activeService].title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Temporary colored block (Removed opacity here so it's full strength) */}
                <div
                  className={`w-full h-full ${
                    activeService === 0
                      ? "bg-red-900"
                      : activeService === 1
                        ? "bg-blue-900"
                        : activeService === 2
                          ? "bg-green-900"
                          : "bg-purple-900"
                  }`}
                />

                {/* Texture Overlay (Grain) */}
                <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay" />

                {/* FIX: Stronger Gradient 
                           This protects the text readability without washing out the whole image.
                           It darkens the Left (where text is) and Bottom.
                        */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:hidden" />

                {/* Desktop Gradient (Subtle fade from left) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent hidden md:block" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
