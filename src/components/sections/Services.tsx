"use client";

import { motion } from "framer-motion";
import { Camera, VideoIcon, Film, Megaphone } from "lucide-react";

const services = [
  {
    title: "Music Videos",
    desc: "Visually compelling stories crafted for artists of every genre.",
    icon: <VideoIcon className="w-8 h-8 text-white" />,
  },
  {
    title: "Event Coverage",
    desc: "Capture unforgettable moments with precision and professionalism.",
    icon: <Camera className="w-8 h-8 text-white" />,
  },
  {
    title: "Short Films",
    desc: "Bring narratives to life with cinematic visuals and impactful pacing.",
    icon: <Film className="w-8 h-8 text-white" />,
  },
  {
    title: "Brand Storytelling",
    desc: "Promote your mission through powerful, emotional storytelling.",
    icon: <Megaphone className="w-8 h-8 text-white" />,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden min-h-screen snap-start bg-black text-white px-4 sm:px-6 md:px-10 py-20 md:py-28 flex flex-col items-center justify-center"
    >
      {/* ⚪️ Monochrome Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-white/10 rounded-full filter blur-3xl animate-pulse-slow top-[-20%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-white/5 rounded-full filter blur-2xl animate-pulse-slower top-[40%] right-[-15%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-white/5 rounded-full filter blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>

      {/* 🌾 Film grain overlay */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />

      {/* 🔲 Gradient fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-0" />

      {/* 🧠 Section Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center text-white z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        What We Offer
      </motion.h2>

      {/* 🔡 Subtitle */}
      <motion.p
        className="text-center text-base sm:text-lg text-gray-300 mb-12 max-w-xl z-10 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Tailored creative solutions designed to elevate your story with
        cinematic precision.
      </motion.p>

      {/* 🎬 Service Cards */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 max-w-5xl w-full z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-[#111] border border-gray-600 p-6 rounded-2xl shadow-md transition-all duration-300 hover:border-white hover:shadow-[0_0_24px_rgba(255,255,255,0.5)] hover:-translate-y-1.5"
          >
            <div className="flex items-center gap-3 mb-4">
              {service.icon}
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
