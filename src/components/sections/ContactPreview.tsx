"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Send, Mail, Instagram, Youtube, Twitter } from "lucide-react";

export default function ContactPreview() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden min-h-screen snap-start bg-black text-white flex flex-col items-center justify-center px-6 py-20 md:py-32"
    >
      {/* ⚪ Animated Blobs (Black & White theme) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-white/10 opacity-20 rounded-full blur-3xl animate-pulse-slow top-[-20%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-white/5 opacity-10 rounded-full blur-2xl animate-pulse-slower top-[40%] right-[-15%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-white/10 opacity-10 rounded-full blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      {/* Foreground content */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-[#FF3100] to-[#C10801] bg-clip-text text-transparent z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Let&apos;s Create Something Beautiful
        <span className="absolute left-1/2 -bottom-2 w-28 h-[3px] bg-gradient-to-r from-[#FF3100] to-[#C10801] rounded-full transform -translate-x-1/2"></span>
      </motion.h2>

      <motion.p
        className="text-center max-w-2xl text-white/80 text-lg md:text-xl mb-8 leading-relaxed drop-shadow-sm relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Whether it&apos;s a music video, short film, or creative concept —
        I&apos;m ready to bring your vision to life with cinematic precision.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Link
          href="/contact"
          className="flex items-center gap-2 px-7 py-3 rounded-full border border-white/10 backdrop-blur bg-white/5 
    transition-all duration-300 hover:scale-105 font-medium text-lg 
    hover:bg-gradient-to-r hover:from-[#FF3100]/20 hover:to-[#C10801]/20 hover:border-[#FF3100]/40 hover:shadow-[0_0_20px_#FF3100]/30"
        >
          Get in Touch <Send size={18} />
        </Link>

        <Link
          href="mailto:bhoyevisuals@gmail.com"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 backdrop-blur bg-white/5 
    transition-all duration-300 hover:scale-105 font-medium text-lg
    hover:bg-gradient-to-r hover:from-[#FF3100]/20 hover:to-[#C10801]/20 hover:border-[#FF3100]/40 hover:shadow-[0_0_20px_#FF3100]/30"
        >
          <Mail size={18} /> Email Me
        </Link>
      </motion.div>

      {/* Socials */}
      <motion.div
        className="flex gap-6 mt-10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        viewport={{ once: true }}
      >
        <Link
          href="https://www.instagram.com/bhoyevisuals?igsh=MWRjcmZ4YzR2MmY4eA=="
          target="_blank"
          className="hover:text-[#FF3100] transition"
        >
          <Instagram size={28} className="hover:text-[#FF3100] transition" />
        </Link>
        <Link
          href="https://youtube.com/@bhoyevisual?si=UOC1QZJwPHd-pEz_"
          target="_blank"
          className="hover:text-[#FF3100] transition"
        >
          <Youtube size={28} className="hover:text-[#FF3100] transition" />
        </Link>
        <Link
          href="https://x.com/bhoyevisuals?s=11&t=vSVbjHCHW_QG5tU6-96n8g"
          target="_blank"
          className="hover:text-[#FF3100] transition"
        >
          <Twitter size={28} className="hover:text-[#FF3100] transition" />
        </Link>
      </motion.div>
    </section>
  );
}
