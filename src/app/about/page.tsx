"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wand2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        {/* 🔥 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center 
                     bg-gradient-to-r from-[#FF3100] to-[#C10801] bg-clip-text text-transparent z-10"
        >
          About Bhoye Visuals
        </motion.h1>

        {/* 🖼️ Profile + Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          {/* Profile Image with constant orange glow */}
          <div className="relative group w-44 h-44 rounded-full overflow-hidden shadow-lg shadow-black/40">
            {/* Persistent Gradient Glow */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#FF3100]/50 via-[#C10801]/30 to-transparent blur-2xl transition-all duration-500 group-hover:from-[#FF3100]/80 group-hover:via-[#C10801]/60" />

            <Image
              src="/me.jpg"
              alt="Bhoye.mov"
              fill
              className="object-cover relative z-10 rounded-full"
            />

            {/* Gradient Ring Instead of White Border */}
            <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-[#FF3100] to-[#C10801]">
              <div className="w-full h-full rounded-full bg-black/90" />
            </div>

            {/* Extra glow ring */}
            <div className="absolute inset-0 rounded-full ring-2 ring-[#FF3100]/60 group-hover:ring-4 group-hover:ring-[#FF3100]/90 transition-all duration-500" />
          </div>

          <div className="text-base sm:text-lg text-gray-300 leading-relaxed space-y-5 max-w-2xl bg-[#1a1a1a]/60 p-6 rounded-2xl border border-white/10 shadow-lg shadow-black/20 relative">
            <p>
              <span className="text-white font-semibold">Boye</span> is a
              Chicago-based videographer and creative storyteller capturing{" "}
              <span className="text-white font-semibold">
                raw emotion, bold movement, and striking visuals
              </span>{" "}
              across every frame.
            </p>
            <p>
              Whether it&apos;s music videos, brand content, or events — Bhoye
              blends instinct, artistry, and edge into unforgettable film.
            </p>
            <p>
              With a sharp eye for detail and a passion for editing that
              elevates the ordinary, Boye brings every project to life with
              heart, hustle, and high-grade visuals.
            </p>
          </div>
        </motion.div>

        {/* 🛠️ Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Gradient Heading + Visible Icon */}
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 tracking-tight mb-4">
            <Wand2
              size={28}
              className="text-[#FF3100] drop-shadow-[0_0_6px_#FF3100aa]"
            />
            <span className="bg-gradient-to-r from-[#FF3100] to-[#C10801] bg-clip-text text-transparent">
              Specialties & Tools
            </span>
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-gray-300">
            {[
              "Cinematography",
              "Video Editing",
              "Wedding Videos",
              "Color Grading",
              "Music Videos",
              "Event Coverage",
              "Premiere Pro",
              "After Effects",
              "DaVinci Resolve",
              "Sony Alpha Gear",
              "Lighting & Gimbals",
              "Storyboarding",
            ].map((skill) => (
              <li
                key={skill}
                className="relative bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded-xl text-center transition-all duration-200 hover:scale-[1.05] hover:text-white hover:border-transparent hover:shadow-[0_0_15px_#FF3100aa]"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF3100]/30 to-[#C10801]/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{skill}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
