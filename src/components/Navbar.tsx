"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const role = user?.publicMetadata?.role;

  // Scroll effect for background blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
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

  const navLinks = (
    <>
      <Link
        href="/about"
        onClick={handleLinkClick}
        className="hover:text-accent transition"
      >
        About
      </Link>
      <Link
        href="/projects"
        onClick={handleLinkClick}
        className="hover:text-accent transition"
      >
        Projects
      </Link>
      <Link
        href="/contact"
        onClick={handleLinkClick}
        className="hover:text-accent transition"
      >
        Contact
      </Link>

      {!isSignedIn ? (
        <Link
          href="/sign-in"
          onClick={handleLinkClick}
          className="text-sm opacity-60 hover:opacity-100 transition"
        >
          Admin Login
        </Link>
      ) : role === "admin" ? (
        <>
          <Link
            href="/admin"
            onClick={handleLinkClick}
            className="hover:text-accent text-sm"
          >
            Admin Panel
          </Link>
          <button
            onClick={() => {
              signOut(() => {
                window.location.href = "/";
              });
            }}
            className="text-sm hover:text-red-400"
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
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold tracking-wide">
          Bhoye.mov
        </Link>

        <div className="hidden md:flex gap-6 text-white">{navLinks}</div>

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
            className="md:hidden px-6 pb-6 pt-2 bg-black text-white flex flex-col gap-4"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
