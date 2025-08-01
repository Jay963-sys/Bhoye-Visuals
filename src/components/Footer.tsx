"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative min-h-[50vh] bg-black text-white px-4 sm:px-6 md:px-10 py-16 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* 🎨 Animated blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[60vw] h-[60vw] bg-[#C10801] opacity-30 rounded-full blur-3xl animate-pulse-slow top-[-30%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-[#FF3100] opacity-20 rounded-full blur-2xl animate-pulse-slower bottom-[-20%] right-[-10%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-white/10 rounded-full blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>

      {/* 🟫 Film grain + texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-0 pointer-events-none" />

      {/* 🌐 Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col gap-6 items-center w-full max-w-4xl"
      >
        {/* 🔗 Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-white/80">
          <Link
            href="/#about"
            className="hover:text-white transition duration-300"
          >
            About
          </Link>
          <Link
            href="/#works"
            className="hover:text-white transition duration-300"
          >
            Works
          </Link>
          <Link
            href="/#clients"
            className="hover:text-white transition duration-300"
          >
            Clients
          </Link>
          <Link
            href="/#contact"
            className="hover:text-white transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* 🌐 Social Icons */}
        <div className="flex justify-center gap-5 text-xl text-white/80">
          <Link
            href="https://www.instagram.com/bhoyevisuals?igsh=MWRjcmZ4YzR2MmY4eA=="
            target="_blank"
            className="hover:text-white transition duration-300"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://youtube.com/@bhoyevisual?si=UOC1QZJwPHd-pEz_"
            target="_blank"
            className="hover:text-white transition duration-300"
          >
            <FaYoutube />
          </Link>
          <Link
            href="https://x.com/bhoyevisuals?s=11&t=vSVbjHCHW_QG5tU6-96n8g"
            target="_blank"
            className="hover:text-white transition duration-300"
          >
            <FaTwitter />
          </Link>
          <Link
            href="mailto:bhoyevisuals@gmail.com"
            className="hover:text-white transition duration-300"
          >
            <FaEnvelope />
          </Link>
        </div>

        {/* 📄 Copyright */}
        <div className="text-xs md:text-sm text-white/50 space-y-1">
          <p>
            © {new Date().getFullYear()} Bhoye Visuals. All rights reserved.
          </p>
          <p>
            Designed with ❤️ by{" "}
            <Link
              href="https://jay-dev-portfolio.vercel.app/"
              target="_blank"
              className="underline hover:text-[#FF3100] transition-colors duration-300"
            >
              Jay.dev
            </Link>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
