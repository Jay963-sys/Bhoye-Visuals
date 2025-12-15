"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clientLogos = [
  { name: "Ravian", src: "/logos/ravian.svg" },
  { name: "Blank Creative", src: "/logos/blank.svg" },
  { name: "United Nations", src: "/logos/unitednations.svg" },
  { name: "Zurik", src: "/logos/zurik.svg" },
  { name: "Davido", src: "/logos/davido.svg" },
  { name: "Samsung", src: "/logos/samsung.svg" },
  { name: "Modern Luxury", src: "/logos/modern.svg" },
  { name: "Alhan Islam", src: "/logos/alhan.svg" },
  { name: "Martell", src: "/logos/martell.svg" },
  { name: "CD Peacock", src: "/logos/peacock.svg" },
  { name: "SummerStage", src: "/logos/summer.svg" },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative min-h-screen snap-start bg-black text-white flex flex-col items-center justify-center px-6 md:px-12 py-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-white/10 opacity-20 rounded-full blur-3xl animate-pulse-slow top-[-20%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-white/5 opacity-10 rounded-full blur-2xl animate-pulse-slower top-[40%] right-[-15%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-white/10 opacity-10 rounded-full blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      {/* Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-[#FF3100] to-[#C10801] bg-clip-text text-transparent z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Clients We&apos;ve Worked With
      </motion.h2>

      <motion.p
        className="text-center max-w-2xl text-white/80 text-lg md:text-xl mb-8 leading-relaxed drop-shadow-sm relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        From local talent to global brands — captured with vision
      </motion.p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 z-10 max-w-6xl w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {clientLogos.map((client, i) => (
          <motion.div
            key={client.name}
            className="flex flex-col items-center bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-md 
      transition-transform duration-300 hover:scale-105 hover:border-[#FF3100]/60 hover:shadow-[0_0_20px_#FF3100]/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src={client.src}
              alt={client.name}
              width={120}
              height={120}
              className="h-16 md:h-20 object-contain mb-4"
            />
            <p className="text-sm md:text-base font-semibold text-gray-200">
              {client.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
