"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioOn, setAudioOn] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setAudioOn(true);
      } else {
        audio.pause();
        setAudioOn(false);
      }
    }
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-black text-white pt-16">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional background audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/intro-bg.mp3" type="audio/mp3" />
      </audio>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold tracking-wide"
        >
          Bhoye Visuals
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mt-4 text-lg md:text-2xl max-w-xl text-gray-300"
        >
          Capturing stories through cinematic film & creative direction.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-white text-black font-medium rounded-full shadow hover:bg-gray-200 transition"
          >
            View Projects
          </Link>
        </motion.div>

        {/* Audio Toggle */}
        <motion.button
          onClick={toggleAudio}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 right-6 text-white bg-black/50 hover:bg-black/70 rounded-full px-4 py-2 text-sm transition backdrop-blur"
        >
          {audioOn ? "Mute Audio" : "Play Audio"}
        </motion.button>

        {/* Social Icons */}
        <div className="absolute bottom-6 left-6 flex gap-4 text-white text-xl">
          <a
            href="https://www.instagram.com/bhoyevisuals?igsh=MWRjcmZ4YzR2MmY4eA=="
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="hover:text-pink-400 transition" />
          </a>
          <a
            href="https://youtube.com/@bhoyevisual?si=UOC1QZJwPHd-pEz_"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube className="hover:text-red-500 transition" />
          </a>
          <a
            href="https://x.com/bhoyevisuals?s=11&t=vSVbjHCHW_QG5tU6-96n8g"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter className="hover:text-blue-400 transition" />
          </a>
        </div>

        {/* Watermark */}
        <div className="absolute top-4 right-6 opacity-30 text-xs tracking-wider">
          © Bhoye.mov
        </div>
      </div>
    </section>
  );
}
