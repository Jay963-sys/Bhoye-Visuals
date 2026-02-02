"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useUser, useClerk } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const role = user?.publicMetadata?.role;
  const pathname = usePathname();

  // 1. GET SCROLL POSITION
  const { scrollY } = useScroll();

  // 2. INTERPOLATE VALUES (0px to 100px scroll)
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"],
  );

  const paddingBlock = useTransform(scrollY, [0, 100], ["32px", "16px"]);

  const borderBottom = useTransform(
    scrollY,
    [0, 100],
    ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.1)"],
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"],
  );

  const logoWidth = useTransform(scrollY, [0, 100], [140, 100]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          paddingBlock,
          borderBottom,
          backdropFilter,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO (Dynamic Size) */}
          {/* FIX: Added onClick={() => setMenuOpen(false)} here */}
          <Link
            href="/"
            className="relative z-50 group block"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div style={{ width: logoWidth }}>
              <Image
                src="/Logo Dark.svg"
                alt="Bhoye Visuals"
                width={140}
                height={60}
                className="w-full h-auto"
              />
            </motion.div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group py-2"
                >
                  <span
                    className={`text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[#FF3100]"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[#FF3100] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 text-white p-2"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-bold tracking-tighter uppercase text-white hover:text-[#FF3100]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
