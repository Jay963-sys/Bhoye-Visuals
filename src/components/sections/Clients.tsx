"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clientLogos = [
  { name: "Sony", src: "/logos/sony.svg" },
  { name: "MTV Base", src: "/logos/mtvbase.svg" },
  { name: "United Nations", src: "/logos/unitednations.svg" },
  { name: "YouTube", src: "/logos/youtube.svg" },
  { name: "The North Face", src: "/logos/northface.svg" },
  { name: "Max", src: "/logos/max.svg" },
  { name: "Gucci", src: "/logos/gucci.svg" },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative min-h-screen snap-start bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-24 overflow-hidden"
    >
      {/* 🔴 Animated Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-[#C10801] opacity-30 rounded-full blur-3xl animate-pulse-slow top-[-20%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-[#FF3100] opacity-20 rounded-full blur-2xl animate-pulse-slower top-[40%] right-[-15%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-[#ffffff0a] opacity-10 rounded-full blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>

      {/* 🟫 Film Grain + Texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      {/* 🔠 Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF3100] to-[#C10801] drop-shadow-md z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Clients We&apos;ve Worked With
      </motion.h2>

      {/* 🔁 Logo Row */}
      <motion.div
        className="w-full max-w-6xl overflow-hidden z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div className="flex gap-10 items-center animate-scroll-x-fast whitespace-nowrap px-1">
          {[...clientLogos, ...clientLogos].map((client, i) => (
            <motion.div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 h-14 md:h-16 bg-white/5 p-3 md:p-4 rounded-xl border border-white/10 backdrop-blur-sm shadow-md transition-transform duration-300 hover:scale-105"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2.5 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={100}
                height={100}
                className="h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
