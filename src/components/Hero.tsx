"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaInstagram, FaYoutube, FaEnvelope, FaLinkedin } from "react-icons/fa";

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
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000"
          onCanPlay={(e) => e.currentTarget.classList.add("opacity-100")}
        >
          <source
            src="https://14wyrkgruiwcmejp.public.blob.vercel-storage.com/water.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Subtle brand tint */}
        <div className="absolute inset-0 bg-gradient-radial from-[#FF3100]/10 via-transparent to-transparent opacity-40" />
        {/* Grain/texture */}
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
          className="font-display text-[11px] sm:text-sm md:text-base uppercase tracking-widest text-gray-300 font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          Bhoye Visuals — Film Maker | Editor | Director
        </motion.p>

        <motion.div
          className="flex justify-center"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          <Image
            src="/Logo Dark.svg"
            alt="Bhoye Visuals Logo"
            width={300}
            height={120}
            className="w-36 sm:w-48 md:w-64 lg:w-80 xl:w-96 h-auto mx-auto drop-shadow-[0_0_25px_rgba(255,49,0,0.3)]"
            priority
          />
        </motion.div>

        <motion.p
          className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          I craft immersive videos that captivate, communicate, and connect.
          Let&apos;s bring your vision to life.
        </motion.p>

        <motion.div
          className="flex justify-center flex-wrap gap-4 mt-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <Link href="#works">
            <button
              className="px-6 py-3 rounded-2xl transition shadow-md hover:scale-105 
              bg-gradient-to-r from-[#FF3100] to-[#C10801] text-white font-medium
              hover:shadow-[0_0_24px_rgba(255,49,0,0.5)]"
            >
              View Work
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-6 py-3 border border-white text-white rounded-2xl transition shadow-md hover:scale-105 hover:border-[#FF3100] hover:text-[#FF3100]">
              Contact
            </button>
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="mt-8 flex justify-center gap-6 text-white text-xl sm:text-2xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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
            href="https://www.linkedin.com/in/adeboye-samuel?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            className="hover:text-[#FF3100] transition"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="mailto:Bhoyevisualsllc@gmail.com"
            className="hover:text-[#FF3100] transition"
          >
            <FaEnvelope />
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none" />
    </section>
  );
}
