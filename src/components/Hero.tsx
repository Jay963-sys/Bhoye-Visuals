"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaInstagram, FaYoutube, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = bgRef.current;
    if (node) {
      node.animate(
        [
          { transform: "scale(1) translate(0, 0)" },
          { transform: "scale(1.1) translate(-5%, -5%)" },
        ],
        { duration: 20000, iterations: Infinity, easing: "ease-in-out" }
      );
    }
  }, []);

  return (
    <section className="relative h-screen bg-black text-white overflow-hidden flex items-center justify-center pt-24 md:pt-32 pb-10 md:pb-16">
      {/* BACKGROUND */}
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Cinematic background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-[url('/grain.png')] animate-grain mix-blend-overlay opacity-20" />
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        className="relative z-10 max-w-5xl text-center px-6 sm:px-10 space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.p
          className="font-display text-[11px] sm:text-sm md:text-base uppercase tracking-widest text-[#FF3100] font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4 },
            },
          }}
        >
          Bhoye Visuals — Videographer | Editor | Director
        </motion.p>

        <motion.h1
          className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg leading-tight"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1 },
            },
          }}
        >
          Cinematic Visuals, Bold Stories.
        </motion.h1>

        <motion.p
          className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1 },
            },
          }}
        >
          I craft immersive videos that captivate, communicate, and connect.
          Let&apos;s bring your vision to life.
        </motion.p>

        <motion.div
          className="flex justify-center flex-wrap gap-4 mt-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
        >
          <Link href="#works">
            <button className="px-6 py-3 bg-[#FF3100] hover:bg-[#C10801] text-white rounded-2xl transition shadow-md hover:scale-105">
              View Work
            </button>
          </Link>
          <Link href="#contact">
            <button className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded-2xl transition shadow-md hover:scale-105">
              Contact
            </button>
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="mt-8 flex justify-center gap-6 text-white text-xl sm:text-2xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
        >
          <Link
            href="https://www.instagram.com/bhoyevisuals"
            target="_blank"
            className="hover:text-[#FF3100] transition"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://youtube.com/@bhoyevisual"
            target="_blank"
            className="hover:text-[#FF3100] transition"
          >
            <FaYoutube />
          </Link>
          <Link
            href="https://x.com/bhoyevisuals"
            target="_blank"
            className="hover:text-[#FF3100] transition"
          >
            <FaTwitter />
          </Link>
          <Link
            href="mailto:Bhoyevisuals@gmail.com"
            className="hover:text-[#FF3100] transition"
          >
            <FaEnvelope />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-b from-transparent to-[#202020] z-10 pointer-events-none" />
    </section>
  );
}
