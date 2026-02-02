"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUp,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black text-white pt-24 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* ----------------------------------------------------
            TOP SECTION: COLUMNS
            ---------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          {/* Column 1: Call to Action */}
          <div className="md:col-span-2">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Let&apos;s create something <br />
              <span className="text-[#FF3100]">timeless</span> together.
            </h3>
            <Link href="mailto:bhoyevisualsllc@gmail.com">
              <button className="group flex items-center gap-3 text-lg border-b border-white/30 pb-1 hover:border-[#FF3100] hover:text-[#FF3100] transition-all duration-300">
                bhoyevisualsllc@gmail.com
                <ArrowUp
                  className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  size={18}
                />
              </button>
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-6 block">
              Menu
            </span>
            <ul className="space-y-4">
              {["Home", "Projects", "Services", "Booking"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div>
            <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-6 block">
              Socials
            </span>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={16} /> Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube size={16} /> YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={16} /> LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={16} /> Twitter / X
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------------------
            BOTTOM SECTION: MASSIVE FOOTER TITLE
            ---------------------------------------------------- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <p className="text-xs text-gray-600 font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Bhoye Visuals. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-600 font-mono uppercase tracking-widest hover:text-[#FF3100] transition-colors"
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* THE GIANT WATERMARK */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none opacity-20">
        <motion.h1
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[18vw] font-bold text-center text-white/5 tracking-tighter mix-blend-overlay translate-y-[10%]"
        >
          BHOYE VISUALS
        </motion.h1>
      </div>
    </footer>
  );
}
