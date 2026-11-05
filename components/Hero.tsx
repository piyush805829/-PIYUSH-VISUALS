"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { IntroVideoPlayer } from "@/components/IntroVideoPlayer";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 flex flex-col justify-between overflow-hidden border-b border-white/[0.06]">
      {/* Background ambient lighting accents */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D6FF48]/[0.035] blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-[#D6FF48]/[0.02] blur-[120px] rounded-full" />

      {/* Hero Top Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 md:pt-10">
        {/* Editorial Sub-header / Index */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48] font-semibold">
              [ 01 // PORTFOLIO 2026 ]
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              INDEPENDENT VIDEO EDITOR & DIRECTOR
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            <span className="hidden sm:inline">BASED IN INDIA</span>
            <span>WORLDWIDE REMOTE COMMISSIONS</span>
          </div>
        </div>

        {/* Oversized Editorial Headline */}
        <div className="py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[108px] font-black tracking-tighter uppercase leading-[0.88] text-white">
              I MAKE VIDEOS
              <br />
              <span className="text-neutral-500 hover:text-white transition-colors duration-500">
                FEEL{" "}
              </span>
              <span className="text-[#D6FF48] inline-block hover:scale-[1.02] transition-transform origin-left">
                DIFFERENT.
              </span>
            </h1>
          </motion.div>

          {/* Asymmetrical Layout Grid: Intro Statement + CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-10 sm:mt-14">
            {/* Left description column */}
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl"
              >
                Independent Video Editor & Visual Storyteller crafting cinematic experiences,
                engaging content, and powerful brand visuals with precision rhythm and intentional pacing.
              </motion.p>
            </div>

            {/* Right CTA column */}
            <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
              <Link
                href="#work"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#D6FF48] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg"
              >
                <span>View Selected Work</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>

              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 px-7 py-4 border border-white/20 bg-white/[0.02] text-white font-mono text-xs uppercase tracking-widest hover:border-[#D6FF48] hover:text-[#D6FF48] transition-all duration-300 backdrop-blur-sm"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* C. INTRO VIDEO: Integrated Directly Into The Hero Experience */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative mt-4 sm:mt-8"
        >
          {/* Film Frame Header Ribbon */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#101010] border-t border-x border-white/10 font-mono text-[11px] text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="tracking-widest uppercase text-white font-semibold">
                REC • PIYUSH INTRODUCTION REEL
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-neutral-500">
              <span>FPS: 60.00</span>
              <span>RES: 3840×2160 (4K)</span>
              <span>AUDIO: STEREO 48kHz</span>
            </div>
          </div>

          {/* Video Player */}
          <IntroVideoPlayer className="w-full" autoPlay={true} />

          {/* Film Frame Footer Ribbon */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2.5 bg-[#0D0D0D] border-b border-x border-white/10 font-mono text-[10px] text-neutral-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#D6FF48]">00. INTRO VIDEO</span>
              <span className="text-white/20">•</span>
              <span>SIGNATURE STYLE & PACING REEL</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-500">
              <span>TIMECODE: 00:00:03:09</span>
              <span className="text-[#D6FF48] font-bold">READY TO COMMENCE</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infinite Kinetic Ticker Banner */}
      <div className="mt-16 w-full overflow-hidden border-y border-white/[0.08] bg-[#0c0c0c] py-3.5">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
          <span>PIYUSH VISUALS</span>
          <span className="text-[#D6FF48]">★</span>
          <span>CRAFTING VISUALS. CREATING IMPACT.</span>
          <span className="text-[#D6FF48]">★</span>
          <span>CINEMATIC COMMERCIALS</span>
          <span className="text-[#D6FF48]">★</span>
          <span>TALKING HEAD & INFOTAINMENT</span>
          <span className="text-[#D6FF48]">★</span>
          <span>ARCHITECTURE & LUXURY INTERIORS</span>
          <span className="text-[#D6FF48]">★</span>
          <span>PRODUCT DEMOS & RETAIL</span>
          <span className="text-[#D6FF48]">★</span>
          <span>VIRAL TRENDS & CULTURE</span>
          <span className="text-[#D6FF48]">★</span>
          <span>REAL ESTATE & EVENT COVERAGE</span>
          <span className="text-[#D6FF48]">★</span>
          {/* Duplicate set for seamless continuous marquee */}
          <span>PIYUSH VISUALS</span>
          <span className="text-[#D6FF48]">★</span>
          <span>CRAFTING VISUALS. CREATING IMPACT.</span>
          <span className="text-[#D6FF48]">★</span>
          <span>CINEMATIC COMMERCIALS</span>
          <span className="text-[#D6FF48]">★</span>
          <span>TALKING HEAD & INFOTAINMENT</span>
          <span className="text-[#D6FF48]">★</span>
          <span>ARCHITECTURE & LUXURY INTERIORS</span>
          <span className="text-[#D6FF48]">★</span>
          <span>PRODUCT DEMOS & RETAIL</span>
          <span className="text-[#D6FF48]">★</span>
          <span>VIRAL TRENDS & CULTURE</span>
          <span className="text-[#D6FF48]">★</span>
          <span>REAL ESTATE & EVENT COVERAGE</span>
          <span className="text-[#D6FF48]">★</span>
        </div>
      </div>
    </section>
  );
}

