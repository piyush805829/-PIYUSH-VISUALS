"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Film, Sparkles } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.08] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-none border border-[#D6FF48] bg-[#080808] flex items-center justify-center text-[#D6FF48] font-mono font-bold text-xs group-hover:bg-[#D6FF48] group-hover:text-black transition-colors duration-300">
                PV
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-sm sm:text-base font-extrabold tracking-wider uppercase text-white group-hover:text-[#D6FF48] transition-colors">
                  PIYUSH VISUALS
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#888888] -mt-0.5">
                  Visual Director
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-[#D6FF48] transition-colors duration-200 relative group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D6FF48] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right side: Availability status & CTA */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Live Availability Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6FF48] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6FF48]"></span>
                </span>
                <span className="tracking-wider uppercase text-[10px] text-neutral-300">
                  Open for Q1/Q2 Commissions
                </span>
              </div>

              {/* Inquiry CTA */}
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden px-5 py-2 text-xs font-mono uppercase tracking-widest bg-[#D6FF48] text-black font-semibold transition-all duration-300 hover:bg-white"
              >
                <span>Initiate Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#D6FF48] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] w-max text-[11px] font-mono text-neutral-300 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6FF48] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6FF48]"></span>
                </span>
                <span className="text-[10px] uppercase tracking-wider">
                  Open for Commissions
                </span>
              </div>

              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-editorial text-3xl font-extrabold uppercase tracking-tight text-white hover:text-[#D6FF48] transition-colors flex items-center justify-between border-b border-white/[0.06] pb-4"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-neutral-500">0{idx + 1}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 text-center text-xs font-mono uppercase tracking-widest bg-[#D6FF48] text-black font-bold flex items-center justify-center gap-2"
              >
                <span>Initiate Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="flex justify-between items-center text-[11px] font-mono text-neutral-500 pt-2">
                <span>CRAFTING VISUALS</span>
                <span>CREATING IMPACT</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

