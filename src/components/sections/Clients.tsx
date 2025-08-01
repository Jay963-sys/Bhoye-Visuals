"use client";

import { motion } from "framer-motion";

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
      className="relative snap-start bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#111] text-white flex flex-col justify-center px-4 py-16 overflow-hidden"
    >
      {/* 🎨 Animated blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-[#C10801] opacity-30 rounded-full filter blur-3xl animate-pulse-slow top-[-20%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-[#FF3100] opacity-20 rounded-full filter blur-2xl animate-pulse-slower top-[40%] right-[-15%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-[#ffffff0a] opacity-10 rounded-full filter blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>

      {/* 🟫 Film grain overlay */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />

      {/* 🌌 Texture and Vignette */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      {/* ✨ Title */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FF3100] to-[#C10801] drop-shadow-md z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Clients We've Worked With
      </motion.h2>

      {/* 🔁 Horizontal Scroll Carousel */}
      <motion.div
        className="w-full max-w-full overflow-x-auto scroll-smooth scrollbar-hide z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div className="flex gap-10 items-center whitespace-nowrap px-2 animate-scroll-x-fast">
          {[...clientLogos, ...clientLogos].map((client, i) => (
            <motion.div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 h-14 md:h-16 w-auto bg-white/5 p-3 md:p-4 rounded-xl border border-white/10 backdrop-blur-sm shadow-md hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2.5 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={client.src}
                alt={client.name}
                className="h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
