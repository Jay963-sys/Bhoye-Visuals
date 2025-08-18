"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="relative min-h-screen snap-start flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-32 bg-black text-white overflow-hidden"
    >
      {/* 🌈 Subtle blobs with brand tint */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-[#FF3100]/10 rounded-full filter blur-3xl animate-pulse-slow top-[-20%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-white/5 rounded-full filter blur-2xl animate-pulse-slower top-[40%] right-[-15%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-[#C10801]/10 rounded-full filter blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>

      {/* 🌾 Grain overlay */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />

      {/* 🔳 Top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0" />

      {/* 🧑 Profile Image */}
      <motion.div
        className="w-40 h-40 md:w-60 md:h-60 relative z-10 group"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Image
          src="/profile.jpg"
          alt="Boye profile"
          fill
          className="rounded-full object-cover border-4 border-[#FF3100] shadow-[0_4px_40px_rgba(255,49,0,0.3)] group-hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      {/* 📝 Text Content */}
      <motion.div
        className="max-w-2xl text-center md:text-left space-y-6 z-10 px-2 md:px-0"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide drop-shadow-md">
          Who is <span className="text-[#FF3100]">Boye?</span>
        </h2>

        <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
          I&apos;m <span className="font-semibold text-white">Boye</span> — a
          creative videographer obsessed with capturing{" "}
          <span className="text-[#FF3100] font-semibold">
            emotion, rhythm, and atmosphere
          </span>
          . Every frame is intentional. Every cut tells a story.
        </p>

        <p className="text-gray-400 text-sm sm:text-base leading-loose">
          🎬 I specialize in cinematic storytelling for brands, music videos,
          events, and personal passion projects. Whether on the streets of
          Chicago or international sets, I bring bold vision and smooth
          execution.
        </p>

        <p className="text-gray-400 text-sm sm:text-base leading-loose">
          📍 Based in Chicago —{" "}
          <span className="text-[#C10801] font-medium">
            available worldwide
          </span>
          .
        </p>
      </motion.div>
    </section>
  );
}
