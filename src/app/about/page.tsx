"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 relative overflow-hidden">
      {/* Background texture (if you have one, set the URL) */}
      <div className="absolute inset-0 bg-[url('')] opacity-20 pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10 space-y-10">
        {/* === 1. Intro Heading === */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed"
        >
          <span className="font-semibold text-[#FF3100]">BHOYE VISUALS</span>{" "}
          was founded out of the desire to tell great stories in new ways.
        </motion.p>

        {/* === 2. Larger Square Profile Image === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative group w-72 h-72 sm:w-80 sm:h-80 overflow-hidden shadow-lg shadow-black/40 rounded-none"
        >
          {/* Subtle glow border */}
          <div className="absolute inset-0 p-[2px] bg-gradient-to-tr from-[#FF3100]/60 via-[#C10801]/50 to-transparent">
            <div className="w-full h-full bg-[#202020]" />
          </div>

          <Image
            src="/jop.jpg"
            alt="Samuel Adeboye Emmanuel"
            fill
            className="object-cover relative z-10"
          />
        </motion.div>

        {/* === 3. Name + Title === */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-1"
        >
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
            SAMUEL ADEBOYE EMMANUEL
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            FILM MAKER | CREATIVE DIRECTOR
          </p>
        </motion.div>

        {/* === 4. Bio Paragraph (with inline connect link) === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl space-y-4"
        >
          <p>
            A creative filmmaker and video editor passionate about transforming
            ideas into visually captivating stories. I specialize in crafting
            engaging video content that captures emotion, elevates brands, and
            connects with audiences on a deeper level.
          </p>
          <p>
            My journey started with a simple love for storytelling through
            visuals. Over the years, I’ve worked on diverse freelance projects,
            from brand campaigns and event highlights to cinematic visuals that
            bring concepts to life. Every project is an opportunity for me to
            push boundaries, both technically and creatively.
          </p>
          <p>
            Beyond editing and filming, I’m deeply interested in the future of
            media. I’m currently exploring how AI can enhance storytelling,
            streamline post-production, and open new creative possibilities in
            modern videography.
          </p>
          <p>
            Whether behind the camera or in the edit suite, my goal remains the
            same — to deliver polished, meaningful visuals that leave a lasting
            impression.{" "}
            <span className="inline-block">
              📩{" "}
              <Link
                href="/contact"
                className="text-[#FF3100] hover:text-[#FF3100]/80 underline underline-offset-4 transition-colors"
              >
                Let’s connect
              </Link>{" "}
              and discuss your next project.
            </span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
