"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-12 text-center">
        {/* 🔥 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold 
                     bg-gradient-to-r from-[#FF3100] to-[#C10801] bg-clip-text text-transparent"
        >
          Let&apos;s Create Magic
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-400 max-w-xl mx-auto"
        >
          Whether you&apos;re ready to book a shoot, collaborate, or just say
          hello — I&apos;d love to hear from you.
        </motion.p>

        {/* 🔥 Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <ContactCard
            icon={<Mail size={28} />}
            label="Email"
            value="bhoyevisuals@gmail.com"
            href="mailto:bhoyevisuals@gmail.com"
          />
          <ContactCard
            icon={<Instagram size={28} />}
            label="Instagram"
            value="@bhoyevisuals"
            href="https://www.instagram.com/bhoyevisuals"
          />

          <ContactCard
            icon={<MapPin size={28} />}
            label="Location"
            value="Chicago, IL"
            href="https://maps.app.goo.gl/zJR2368xwFku5E3R9?g_st=ipc"
          />
        </motion.div>

        {/* 🔥 CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="mailto:bhoyevisuals@gmail.com"
            className="inline-block px-8 py-3 
                       bg-gradient-to-r from-[#FF3100] to-[#C10801] text-white 
                       rounded-full font-bold shadow-[0_0_15px_#FF3100aa] 
                       hover:scale-105 hover:shadow-[0_0_25px_#FF3100cc] 
                       transition duration-300 uppercase tracking-wide"
          >
            Send a Message
          </a>
        </motion.div>
      </div>
    </main>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 bg-[#ffffff0a] border border-white/10 
                 p-5 rounded-2xl transition duration-300 group 
                 backdrop-blur-sm shadow-md hover:border-[#FF3100]/60 
                 hover:shadow-[0_0_12px_#FF3100aa]"
    >
      {/* Icon with orange glow on hover */}
      <div className="text-white transition duration-300 group-hover:text-[#FF3100] group-hover:scale-110">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </a>
  );
}
