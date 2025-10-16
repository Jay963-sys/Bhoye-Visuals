"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ✅

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const role = user?.publicMetadata?.role;
  const pathname = usePathname(); // ✅ current route

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const navLinks = (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className={`transition font-medium ${
              isActive
                ? "text-[#FF3100] drop-shadow-[0_0_8px_#FF3100]"
                : "text-white hover:text-[#FF3100]/80"
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      {!isSignedIn ? (
        <Link
          href="/sign-in"
          onClick={handleLinkClick}
          className="text-sm opacity-60 hover:opacity-100 transition"
        ></Link>
      ) : role === "admin" ? (
        <>
          <Link
            href="/admin"
            onClick={handleLinkClick}
            className={`text-sm ${
              pathname === "/admin"
                ? "text-[#FF3100] drop-shadow-[0_0_8px_#FF3100]"
                : "hover:text-[#FF3100]/80"
            }`}
          >
            Admin Panel
          </Link>
          <button
            onClick={() => {
              signOut(() => {
                window.location.href = "/";
              });
            }}
            className="text-sm hover:text-[#FF3100]/80"
          >
            Sign Out
          </button>
        </>
      ) : null}
    </>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 dark:bg-darkPrimary/60 backdrop-blur-md shadow-md"
          : "bg-white/5 dark:bg-darkPrimary/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        {/* Logo link to homepage */}
        <Link href="/" className="block" aria-label="Homepage">
          <Image
            src="/Logo Dark.svg"
            alt="Bhoye Visuals Logo"
            width={60}
            height={30}
            className="h-10 w-auto sm:h-12 transition-all duration-300"
          />
        </Link>

        <div className="hidden md:flex gap-6">{navLinks}</div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-6 pt-2 bg-white/10 dark:bg-darkPrimary/60 backdrop-blur-md text-white flex flex-col gap-4"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
