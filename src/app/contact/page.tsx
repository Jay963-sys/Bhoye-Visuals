"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FullRateCard from "@/components/sections/Check";

export default function ContactPage() {
  return (
    // FIX: Increased padding to pt-40 (mobile) and md:pt-48 (desktop)
    <main className="min-h-screen bg-black text-white pt-47 md:pt-50 relative">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* 1. HERO TEXT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 relative z-10">
        <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-4 block">
          Get In Touch
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
          Let&apos;s Create <br /> <span className="text-gray-600">Magic.</span>
        </h1>

        {/* 2. SOCIAL STRIPS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 md:gap-8"
        >
          <SocialStrip
            label="Instagram"
            href="https://instagram.com/bhoyevisuals"
          />
          <SocialStrip
            label="YouTube"
            href="https://youtube.com/@bhoyevisual"
          />
          <SocialStrip
            label="LinkedIn"
            href="https://linkedin.com/in/adeboye-samuel"
          />
          <SocialStrip
            label="Email Direct"
            href="mailto:bhoyevisualsllc@gmail.com"
          />
        </motion.div>
      </div>

      {/* 3. THE MAIN BOOKING FORM */}
      <div className="border-t border-white/10 relative z-10">
        <FullRateCard />
      </div>
    </main>
  );
}

// Sub-component: Clean Social Link
function SocialStrip({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      className="flex items-center gap-2 text-sm uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
    >
      {label} <ArrowUpRight size={14} />
    </a>
  );
}
