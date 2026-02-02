"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clientLogos = [
  { name: "Rivian", src: "/logos/rivian.svg" },
  { name: "25", src: "/logos/25.svg" },
  { name: "United Nations", src: "/logos/unitednations.svg" },
  { name: "Zurik", src: "/logos/zurik.svg" },
  { name: "Davido", src: "/logos/davido.svg" },
  { name: "Samsung", src: "/logos/samsung.svg" },
  { name: "Modern Luxury", src: "/logos/modern.svg" },
  { name: "Alhan Islam", src: "/logos/alhan.svg" },
  { name: "Martell", src: "/logos/martell.svg" },
  { name: "CD Peacock", src: "/logos/peacock.svg" },
  { name: "SummerStage", src: "/logos/summer.svg" },
  { name: "Blank Creative", src: "/logos/blank.svg" },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative min-h-[80vh] bg-black text-white flex flex-col md:flex-row"
    >
      {/* LEFT SIDE: HEADER */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-10 md:p-16 flex flex-col justify-center relative z-10">
        <div className="sticky top-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-4 block"
          >
            Trusted By
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Global <br /> Partners
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm leading-relaxed max-w-xs"
          >
            From local talent to global brands—capturing visions for some of the
            world’s most forward-thinking names.
          </motion.p>
        </div>
      </div>

      {/* RIGHT SIDE: THE LOGO MESH */}
      <div className="w-full md:w-2/3 bg-neutral-900/20">
        <div className="grid grid-cols-2 md:grid-cols-3">
          {clientLogos.map((client, i) => (
            <LogoCell key={client.name} client={client} index={i} />
          ))}
        </div>
      </div>

      {/* Background Grain */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay pointer-events-none" />
    </section>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: LOGO CELL (Responsive Fix)
// ----------------------------------------------------------------------
function LogoCell({
  client,
  index,
}: {
  client: { name: string; src: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="relative group h-40 md:h-52 flex items-center justify-center border-b border-r border-white/10 p-8 cursor-default overflow-hidden transition-all duration-500 hover:bg-white"
    >
      <div className="relative w-full h-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
        <Image
          src={client.src}
          alt={client.name}
          width={140}
          height={60}
          className="object-contain max-w-[70%] max-h-[60%] transition-all duration-300
                    
                    /* --- MOBILE DEFAULT (Visible White Silhouette) --- */
                     opacity-90
                    
                    /* --- DESKTOP DEFAULT (Dimmed Ghost) --- */
                    md:opacity-90
                    
                    /* --- DESKTOP HOVER (Full Color Flash) --- */
                    group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100"
        />
      </div>

      {/* Corner Accent (Only show on desktop hover) */}
      <div className="hidden md:block absolute top-0 right-0 w-3 h-3 bg-[#FF3100] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
