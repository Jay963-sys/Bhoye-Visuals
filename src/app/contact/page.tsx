"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#202020] text-white px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative space-y-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-[#FF3100]"
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
            value="@bhoye.mov"
            href="https://www.instagram.com/bhoyevisuals"
          />
          <ContactCard
            icon={<Phone size={28} />}
            label="Phone"
            value="+1 (708) 362 1740"
            href="tel:+17083621740"
          />
          <ContactCard
            icon={<MapPin size={28} />}
            label="Location"
            value="Chicago, IL"
            href="https://maps.app.goo.gl/zJR2368xwFku5E3R9?g_st=ipc"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="mailto:bhoyevisuals@gmail.com"
            className="inline-block px-8 py-3 bg-[#FF3100] text-black rounded-full font-bold shadow-xl hover:scale-105 hover:bg-white transition duration-300 uppercase tracking-wide"
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
      className="flex items-center gap-4 bg-[#ffffff0a] hover:bg-[#ffffff15] border border-white/10 p-5 rounded-2xl transition duration-300 group backdrop-blur-sm shadow-md"
    >
      <div className="text-[#FF3100] group-hover:scale-110 group-hover:text-white transition duration-300">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </a>
  );
}
