"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-45 md:pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        {/* -------------------------------------------------------
            LEFT COLUMN: THE PORTRAIT
            ------------------------------------------------------- */}
        <div className="md:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative md:sticky md:top-32 w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

            <Image
              src="/jop.jpg"
              alt="Samuel Adeboye Emmanuel"
              fill
              className="object-cover"
              priority
            />

            {/* Name Overlay on Image */}
            <div className="absolute bottom-6 left-6 z-20">
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-white">
                Samuel <br /> Adeboye
              </h2>
            </div>
          </motion.div>
        </div>

        {/* -------------------------------------------------------
            RIGHT COLUMN: THE MANIFESTO
            ------------------------------------------------------- */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-6 block">
              The Director&apos;s Cut
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Telling great stories in{" "}
              <span className="text-gray-500">new ways.</span>
            </h1>

            {/* BIO TEXT */}
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                <strong className="text-white">Bhoye Visuals</strong> was
                founded out of a simple desire: to capture emotion, elevate
                brands, and connect with audiences on a deeper level.
              </p>
              <p>
                My journey started with a love for visuals, but it has evolved
                into a pursuit of{" "}
                <span className="text-white">cinematic precision</span>. From
                brand campaigns to intimate event highlights, I approach every
                project as an opportunity to push boundaries—both technically
                and creatively.
              </p>
              <p>
                Beyond the edit suite, I am deeply invested in the future of
                media. I am currently exploring how{" "}
                <span className="text-white">AI tools</span> can enhance
                storytelling workflows, streamlining post-production to open up
                new creative possibilities that were not possible just a few
                years ago.
              </p>
              <p>
                Whether behind the camera or crafting the final cut, my goal
                remains the same: to deliver polished, meaningful visuals that
                leave a lasting impression.
              </p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-6 mt-12 py-8 border-y border-white/10">
              <div>
                <div className="flex items-center gap-2 text-[#FF3100] mb-2">
                  <MapPin size={18} />
                  <span className="text-xs font-mono uppercase tracking-widest">
                    Based In
                  </span>
                </div>
                <p className="text-white text-xl font-bold">Chicago, IL</p>
                <p className="text-sm text-gray-500">Available Globally</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#FF3100] mb-2">
                  <Camera size={18} />
                  <span className="text-xs font-mono uppercase tracking-widest">
                    Focus
                  </span>
                </div>
                <p className="text-white text-xl font-bold">Direction & Edit</p>
                <p className="text-sm text-gray-500">
                  Commercial / Doc / Event
                </p>
              </div>
            </div>

            {/* SIGNATURE / CTA */}
            <div className="mt-12 flex items-center justify-between">
              <Link href="/contact">
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#FF3100] hover:text-white transition-all duration-300">
                  Let&apos;s Connect <ArrowUpRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
