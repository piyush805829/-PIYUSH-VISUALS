"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Film, Terminal, Sparkles, Award } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative border-b border-white/[0.08] overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 bg-[#D6FF48]/[0.025] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48]">
              [ 04 // PERSPECTIVE ]
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              EDITORIAL BIOGRAPHY
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            ABOUT PIYUSH
          </h2>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
          {/* Left Column: Big Philosophy Quote & Brand Manifesto */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="relative border-l-2 border-[#D6FF48] pl-6 sm:pl-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D6FF48] block mb-3">
                // MANIFESTO
              </span>
              <blockquote className="font-editorial text-2xl sm:text-4xl text-white font-bold tracking-tight leading-tight uppercase">
                &ldquo;Editing is not just assembling footage. It is sculpting rhythm, tension, and
                subconscious emotional weight.&rdquo;
              </blockquote>
            </div>

            <div className="space-y-6 text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
              <p>
                I am an independent video editor and visual storyteller specializing in
                cinematic commercials, high-retention short-form content, architecture tours,
                and documentary-style infotainment.
              </p>
              <p>
                Every project I touch is approached with editorial intentionality: stripping away
                fluff, engineering seamless transitions, timing cuts precisely to audio stems,
                and applying nuanced color grading that turns raw footage into an immersive experience.
              </p>
              <p className="text-sm font-mono text-neutral-400 border-l border-white/10 pl-4 py-1">
                Note: Dedicated to boutique brands, discerning creators, agencies, and architecture
                firms seeking distinctive post-production that avoids generic templates.
              </p>
            </div>

            {/* Philosophy Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-[#0e0e0e] border border-white/[0.08]">
                <span className="font-mono text-xs text-[#D6FF48] block mb-1">01 / RHYTHM</span>
                <p className="text-xs text-neutral-300">
                  Cut on the beat or intentionally against it to create momentum and anticipation.
                </p>
              </div>

              <div className="p-4 bg-[#0e0e0e] border border-white/[0.08]">
                <span className="font-mono text-xs text-[#D6FF48] block mb-1">02 / AUDIO</span>
                <p className="text-xs text-neutral-300">
                  Sound design accounts for 70% of perceived cinematic impact.
                </p>
              </div>

              <div className="p-4 bg-[#0e0e0e] border border-white/[0.08]">
                <span className="font-mono text-xs text-[#D6FF48] block mb-1">03 / COLOR</span>
                <p className="text-xs text-neutral-300">
                  Film-grade emulation curves and color harmony that anchor brand tone.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Bio Card & Workflow Breakdown */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Identity Card */}
            <div className="p-6 sm:p-8 bg-[#0e0e0e] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D6FF48]/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-editorial text-2xl font-bold uppercase text-white">
                    PIYUSH
                  </h3>
                  <span className="font-mono text-xs text-[#D6FF48] uppercase tracking-widest">
                    Creative Director & Editor
                  </span>
                </div>
                <div className="w-12 h-12 bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-xs text-[#D6FF48] font-bold">
                  PV
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3 py-6 font-mono text-xs border-b border-white/[0.08]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Primary Discipline:</span>
                  <span className="text-neutral-200">Video Editing & Color Grading</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Software Suite:</span>
                  <span className="text-neutral-200">Premiere Pro, DaVinci, AE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Mastering:</span>
                  <span className="text-neutral-200">4K UHD / DCI Color Pipeline</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Turnaround:</span>
                  <span className="text-neutral-200">24h – 72h on sprint reels</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Current Status:</span>
                  <span className="text-[#D6FF48] flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF48] animate-ping" />
                    Accepting Select Projects
                  </span>
                </div>
              </div>

              {/* CTA link */}
              <div className="pt-6">
                <Link
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#D6FF48] transition-colors"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Guarantees / Principles */}
            <div className="p-6 bg-[#0a0a0a] border border-white/[0.06] space-y-3 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-3 text-neutral-300">
                <Check className="w-4 h-4 text-[#D6FF48] flex-shrink-0" />
                <span>Zero template shortcuts — bespoke timelines for each client</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Check className="w-4 h-4 text-[#D6FF48] flex-shrink-0" />
                <span>Clear communication and structured revision rounds</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Check className="w-4 h-4 text-[#D6FF48] flex-shrink-0" />
                <span>High-bandwidth cloud file delivery (Google Drive / Frame.io)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

