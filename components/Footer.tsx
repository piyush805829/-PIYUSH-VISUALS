"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail, MessageCircle, Instagram } from "lucide-react";

export function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08]">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 border border-[#D6FF48] bg-[#080808] flex items-center justify-center text-[#D6FF48] font-mono font-bold text-xs">
                  PV
                </div>
                <span className="font-editorial text-xl font-black uppercase tracking-wider">
                  PIYUSH VISUALS
                </span>
              </div>
              <p className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#D6FF48] uppercase tracking-tight max-w-md">
                CRAFTING VISUALS.
                <br />
                CREATING IMPACT.
              </p>
            </div>

            <div className="mt-8 font-mono text-xs text-neutral-400 space-y-1.5">
              <div>STUDIO TIME: <span className="text-white font-bold">{localTime || "IST"}</span></div>
              <div>AVAILABILITY: <span className="text-[#D6FF48] font-bold">Q1/Q2 COMMISSIONS OPEN</span></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48] block mb-4">
              // SITEMAP
            </span>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-neutral-400">
              <li>
                <Link href="#work" className="hover:text-white transition-colors">
                  01 // Selected Work
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  02 // Services & Craft
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  03 // About Piyush
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  04 // Project Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48] block mb-4">
              // DIRECT CHANNELS
            </span>
            <ul className="space-y-3 font-mono text-xs text-neutral-300">
              <li>
                <a
                  href="mailto:sainipiyush5924@gmail.com"
                  className="flex items-center gap-2 hover:text-[#D6FF48] transition-colors"
                >
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>sainipiyush5924@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918058296481?text=Hi%20Piyush!%20I'm%20interested%20in%20a%20video%20editing%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#D6FF48] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>+91 80582 96481 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/piyushvisualss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#D6FF48] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>@piyushvisualss (Instagram)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} PIYUSH VISUALS. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Designed & Engineered for Impact</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-[#D6FF48] transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
