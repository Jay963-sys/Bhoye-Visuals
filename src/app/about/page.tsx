"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wand2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-accent mb-10"
        >
          About Bhoye.mov
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-accent shadow-xl">
            <Image
              src="/me.jpg"
              alt="Bhoye.mov"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-gray-300 text-lg leading-relaxed">
            <p>
              <strong className="text-white font-semibold">Boye</strong> is a
              Chicago-based videographer and creative storyteller capturing raw
              emotion, bold movement, and striking visuals across every frame.
              Whether it's cinematic music videos, brand content, or events —
              Bhoye blends instinct, artistry, and edge into unforgettable film.
            </p>

            <p className="mt-4">
              With a sharp eye for detail and a passion for editing that
              elevates the ordinary, Boye brings every project to life with
              heart, hustle, and high-grade visuals. No templates. Just real,
              original motion.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14"
        >
          <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
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
                className="bg-white/5 border border-neutral-700 px-3 py-2 rounded-lg text-center hover:border-accent transition"
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
