"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const packages = [
  {
    title: "Event Coverage",
    price: "$500",
    desc: "Up to 4 hours, 1 camera operator, basic edit",
  },
  {
    title: "Music Video",
    price: "$1000",
    desc: "Full-day shoot, 4K camera, basic grading",
  },
  {
    title: "Wedding Package",
    price: "$1000",
    desc: "Full-day, 2 videographers, highlight + drone",
  },
  {
    title: "Brand Shoot",
    price: "$500",
    desc: "2 min promo, 2 revisions, on-site",
  },
];

export default function RateCardPreview() {
  return (
    <section
      id="rates"
      className="relative min-h-screen snap-start bg-black text-white flex flex-col items-center justify-center px-6 md:px-12 py-24"
    >
      {" "}
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-[#FF3100]"
        >
          Rates & Booking
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mb-8 text-[#CCCCCC]"
        >
          Clear packages, transparent pricing, and flexible add-ons — pick a
          package and hit Book Now to get started.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl p-6 bg-black/30 backdrop-blur-sm border border-white/6 shadow-[0_6px_30px_#ff31001a]"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-[#CCCCCC] mb-4">{p.desc}</p>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-[#FF3100]">
                  {p.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <a href="#booking" className="inline-block">
            <button className="px-5 py-3 rounded-xl bg-[#e93c0c] text-black font-bold uppercase">
              Book Now
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
