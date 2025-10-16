"use client";

import React from "react";
import { motion } from "framer-motion";

const packages = [
  {
    title: " Basic event Package",
    price: "$1500",
    desc: " 5-6 hours coverage, 1 camera, highlight video and speeches",
  },
  {
    title: "Mid Tier event Package",
    price: "$3500",
    desc: " 8-10 hours, two camera, highlight + full video",
  },
  {
    title: "High end event Package",
    price: "$6500+",
    desc: "Full day + prep, multiple cameras, drone, premium editing, longer derivables, extras",
  },
  {
    title: "Small event / Short Shoot",
    price: "$1200",
    desc: "1-3 hrs, 1 camera, 1 highlight reel",
  },
  {
    title: " Corporate / Promo Video",
    price: "$2000 - $5000+ depending on scale",
    desc: "Script/planning, multiple cameras, full edit, location/travel costs",
  },
  {
    title: " Hourly Rate",
    price: "$200/hr",
    desc: "Smaller Jobs, or incremental work(editing, extra shooting)",
  },
  {
    title: " Additional reels",
    price: "$200",
    desc: "",
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
