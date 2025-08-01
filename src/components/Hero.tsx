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
    <section className="relative h-screen bg-black text-white overflow-hidden flex items-center justify-center py-24 md:py-32">
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
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {/* Subtitle */}
        <motion.p
          className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-[#FF3100] font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: "easeOut" },
            },
          }}
        >
          Bhoye Visuals — Videographer | Editor | Director
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.4, ease: "easeOut" },
            },
          }}
        >
          Cinematic Visuals, Bold Stories.
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.4, ease: "easeOut" },
            },
          }}
        >
          I craft immersive videos that captivate, communicate, and connect.
          Let’s bring your vision to life.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex justify-center flex-wrap gap-4 mt-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.4, ease: "easeOut" },
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
          className="mt-6 flex justify-center gap-6 text-white text-xl sm:text-2xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.4, ease: "easeOut" },
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

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* SVG Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="w-full h-16 md:h-20 text-[#111111]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L60,69.3C120,75,240,85,360,106.7C480,128,600,160,720,154.7C840,149,960,107,1080,117.3C1200,128,1320,192,1380,224L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
