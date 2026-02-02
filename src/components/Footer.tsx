"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

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
            <ul className="space-y-4 font-light text-sm text-gray-400">
              {["Home", "Projects", "Services", "Booking"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                    className="hover:text-white transition-colors block w-fit"
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
            <ul className="space-y-4 font-light text-sm text-gray-400">
              <li>
                <Link
                  href="https://instagram.com/bhoyevisuals"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                >
                  <Instagram size={16} /> Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com/@bhoyevisual"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                >
                  <Youtube size={16} /> YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                >
                  <Linkedin size={16} /> LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:bhoyevisualsllc@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors w-fit"
                >
                  <Mail size={16} /> Email
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------------------
            BOTTOM SECTION: CREDITS & BACK TO TOP
            ---------------------------------------------------- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 pb-8 relative z-20">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-xs text-gray-600 font-mono uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Bhoye Visuals.</p>

            <Link
              href="https://jay-dev-portfolio.vercel.app/"
              target="_blank"
              className="hover:text-[#FF3100] transition-colors flex items-center gap-1"
            >
              Designed by Jay
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-600 font-mono uppercase tracking-widest hover:text-[#FF3100] transition-colors"
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* THE GIANT WATERMARK (FIXED VISIBILITY) */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none absolute bottom-0 left-0 right-0 z-0">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          // ⚠️ Changed text color to white/10 (10% opacity) and removed mix-blend-overlay
          className="text-[13vw] md:text-[16vw] font-bold text-center text-white/10 tracking-tighter translate-y-[20%]"
        >
          BHOYE VISUALS
        </motion.h1>
      </div>
    </footer>
  );
}
