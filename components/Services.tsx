"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Film,
  Smartphone,
  MessageSquare,
  ShoppingBag,
  Home,
  Sparkles,
  ArrowUpRight,
  Layers,
  Sliders,
  CheckCircle2,
} from "lucide-react";

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      num: "01",
      title: "Short-form Video Editing",
      icon: Smartphone,
      subtitle: "Reels, Shorts, TikTok & Algorithm Virality",
      description:
        "High-retention editing built around psychological visual hooks, aggressive sound design, dynamic zooms, and kinetic captions that hold viewer retention past the 8-second mark.",
      deliverables: ["Hook Optimization", "Kinetic Captions", "Sound FX Layering", "9:16 Aspect Mastering"],
    },
    {
      num: "02",
      title: "Cinematic Video Editing",
      icon: Film,
      subtitle: "Brand Anthems, Commercials & Director Cuts",
      description:
        "Widescreen 16:9 narrative visual craftsmanship with seamless pacing, film-grade color treatment, atmospheric soundscapes, and deliberate rhythmic flow that elevates brand prestige.",
      deliverables: ["Film Emulation Grade", "Rhythmic Pacing", "Advanced Cut-on-Action", "4K Mastering"],
    },
    {
      num: "03",
      title: "Talking Head & Infotainment",
      icon: MessageSquare,
      subtitle: "Executive Authority, Doctors & Creators",
      description:
        "Polishing expert thought leadership into punchy, compelling content. Clean jump cuts, motion graphic callouts, B-roll insertions, and audio mastering that command authority.",
      deliverables: ["Pacing Cleanup", "Motion Callouts", "Dynamic B-Roll Integration", "Multi-Cam Sync"],
    },
    {
      num: "04",
      title: "Product Commercials & Retail",
      icon: ShoppingBag,
      subtitle: "E-Commerce, Furniture, Tech & Luxury Goods",
      description:
        "Commercial-ready product showcases that highlight texture, build quality, and value propositions. Tailored for conversion-driven social ads and website hero headers.",
      deliverables: ["Feature Callouts", "Speed Ramps", "Commercial Sound Mix", "Multi-Platform Export"],
    },
    {
      num: "05",
      title: "Real Estate & Interior Videos",
      icon: Home,
      subtitle: "Luxury Architecture, Walkthroughs & Spaces",
      description:
        "Spatial visual storytelling that communicates scale, natural ambient lighting, textures, and bespoke interiors with ultra-smooth speed ramps, stabilizing, and architectural balance.",
      deliverables: ["Gimbal Stabilization", "Sky & Light Balancing", "Spatial Sound Design", "Architectural Flow"],
    },
    {
      num: "06",
      title: "Motion Graphics & Visual Storytelling",
      icon: Sparkles,
      subtitle: "Custom Titles, Lower Thirds & 3D Elements",
      description:
        "Custom kinetic typography, tracking badges, logo stings, UI animations, and visual storytelling assets designed specifically to fit your brand identity.",
      deliverables: ["Kinetic Typography", "Motion Tracking", "Custom Lower Thirds", "Brand Asset Animation"],
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 relative border-b border-white/[0.08] bg-[#090909]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48]">
                [ 03 // CAPABILITIES ]
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                POST-PRODUCTION SUITE
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              SERVICES & CRAFT
            </h2>
          </div>

          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Every project receives tailored creative direction, rhythm editing, custom sound design,
            and high-end color grading.
          </p>
        </div>

        {/* Services Editorial List */}
        <div className="divide-y divide-white/[0.08]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={service.num}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="py-10 sm:py-14 transition-colors duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Number & Icon */}
                  <div className="lg:col-span-2 flex items-center gap-4">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-neutral-600 group-hover:text-[#D6FF48] transition-colors duration-300">
                      {service.num}
                    </span>
                    <div className="w-10 h-10 rounded-none bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-[#D6FF48] group-hover:border-[#D6FF48] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="lg:col-span-4">
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#D6FF48] transition-colors">
                      {service.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mt-1">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-3">
                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables Pills */}
                  <div className="lg:col-span-3 flex flex-wrap gap-1.5 pt-2 lg:pt-0">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/[0.03] border border-white/[0.08] text-neutral-300 group-hover:border-[#D6FF48]/40 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow & Tech Stack Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-[#0f0f0f] border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#D6FF48] tracking-widest block mb-2">
              01 // CORE SUITE
            </span>
            <p className="text-neutral-300">
              DaVinci Resolve Studio (Color & Fusion) • Adobe Premiere Pro • After Effects
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#D6FF48] tracking-widest block mb-2">
              02 // AUDIO & PACING
            </span>
            <p className="text-neutral-300">
              Bespoke SFX Stems, Sub-bass Impact Shaping, Dialogue Isolation & Audio Mastering
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#D6FF48] tracking-widest block mb-2">
              03 // DELIVERY SPEC
            </span>
            <p className="text-neutral-300">
              ProRes 422 HQ, Master 4K H.264/H.265, Multi-aspect crops (9:16, 16:9, 1:1, 4:5)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

