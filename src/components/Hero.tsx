"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaEnvelope } from "react-icons/fa"; // Removed unused icons
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black text-white overflow-hidden"
    >
      {/* -------------------------------------------------------
          BACKGROUND VIDEO
          ------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-70"
        >
          <source
            src="https://14wyrkgruiwcmejp.public.blob.vercel-storage.com/water.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-15 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* -------------------------------------------------------
          MAIN CONTENT (Split Layout)
          ------------------------------------------------------- */}
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end z-10 p-6 md:p-12 pointer-events-none">
        {/* The Grid Container */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col md:flex-row items-end justify-between w-full gap-8 md:gap-0 border-t border-white/20 pt-8 md:pt-0 md:border-t-0"
        >
          {/* LEFT COLUMN: Roles + Massive Title */}
          <div className="w-full md:w-2/3 flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[#FF3100] font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-2 md:mb-4 pl-1"
            >
              Film Maker | Editor | Director
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="text-[12vw] md:text-[9rem] lg:text-[11rem] font-bold leading-[0.85] tracking-tighter text-white mix-blend-overlay"
              >
                BHOYE
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-[12vw] md:text-[9rem] lg:text-[11rem] font-bold leading-[0.85] tracking-tighter text-white"
              >
                VISUALS
              </motion.h1>
            </div>
          </div>

          {/* RIGHT COLUMN: Location, Bio & Buttons */}
          <div className="w-full md:w-1/3 flex flex-col items-start md:items-end justify-end space-y-6 md:pl-8 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-start md:items-end text-right space-y-6"
            >
              <div className="flex flex-col items-start md:items-end">
                <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-1">
                  Based In
                </span>
                <h3 className="text-xl md:text-2xl font-light text-white">
                  Chicago, IL
                </h3>
              </div>

              <p className="max-w-[300px] text-sm md:text-base text-gray-300 font-light leading-relaxed">
                I craft immersive videos that{" "}
                <span className="text-white font-medium">captivate</span>,{" "}
                <span className="text-white font-medium">communicate</span>, and{" "}
                <span className="text-white font-medium">connect</span>.
                <br className="hidden md:block" /> Let&apos;s bring your vision
                to life.
              </p>

              <div className="h-[1px] w-16 bg-white/20"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-2 w-full md:w-auto"
            >
              <Link href="#works" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-6 py-4 bg-white text-black hover:bg-[#FF3100] hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                  View Works
                </button>
              </Link>

              <Link href="#booking" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-6 py-4 border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all duration-300 uppercase tracking-widest text-xs font-bold">
                  Start Project
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Socials (Bottom Left) */}
      <div className="absolute bottom-6 left-6 md:hidden flex gap-4 text-white z-20">
        <SocialLink
          href="https://instagram.com/bhoyevisuals"
          icon={<FaInstagram />}
          delay={0}
        />
        <SocialLink
          href="mailto:Bhoyevisualsllc@gmail.com"
          icon={<FaEnvelope />}
          delay={0}
        />
      </div>
    </section>
  );
}

function SocialLink({
  href,
  icon,
  delay,
}: {
  href: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 + delay, duration: 0.5 }}
    >
      <Link
        href={href}
        target="_blank"
        className="text-white/70 hover:text-[#FF3100] hover:scale-110 transition-all duration-300"
      >
        {icon}
      </Link>
    </motion.div>
  );
}
