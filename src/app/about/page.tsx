"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wand2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#202020] text-white px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        {/* 🔶 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-[#FF3100] tracking-tight mb-10"
        >
          About Bhoye Visuals
        </motion.h1>

        {/* 🔶 Profile + Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <div className="w-44 h-44 relative rounded-full overflow-hidden border-4 border-[#FF3100] shadow-lg shadow-[#FF310050]">
            <Image
              src="/me.jpg"
              alt="Bhoye.mov"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-base sm:text-lg text-gray-300 leading-relaxed space-y-5 max-w-2xl bg-[#2a2a2a]/60 p-6 rounded-2xl border border-white/10 shadow-lg shadow-black/20">
            <p>
              <span className="text-white font-semibold">Boye</span> is a
              Chicago-based videographer and creative storyteller capturing{" "}
              <span className="text-[#FF3100] font-semibold">
                raw emotion, bold movement, and striking visuals
              </span>{" "}
              across every frame.
            </p>
            <p>
              Whether it’s music videos, brand content, or events — Bhoye blends
              instinct, artistry, and edge into unforgettable film.
            </p>
            <p>
              With a sharp eye for detail and a passion for editing that
              elevates the ordinary, Boye brings every project to life with
              heart, hustle, and high-grade visuals.
            </p>
          </div>
        </motion.div>

        {/* 🔶 Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FF3100] flex items-center gap-2 tracking-tight mb-4">
            <Wand2 size={24} /> Specialties & Tools
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-gray-300">
            {[
              "Cinematography",
              "Video Editing",
              "Color Grading",
              "Music Videos",
              "Event Coverage",
              "Premiere Pro",
              "DaVinci Resolve",
              "Sony Alpha Gear",
              "Lighting & Gimbals",
              "Storyboarding",
            ].map((skill) => (
              <li
                key={skill}
                className="bg-[#2a2a2a] border border-[#333] px-3 py-2 rounded-xl text-center transition-all duration-200 hover:border-[#FF3100] hover:text-white hover:shadow-[0_0_10px_#FF3100aa] hover:scale-[1.05]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
