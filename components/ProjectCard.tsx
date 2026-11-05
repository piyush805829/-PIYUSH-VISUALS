"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Play, Sparkles, Clock, Maximize2 } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onSelect, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Determine aspect ratio class
  const getAspectClass = () => {
    switch (project.aspectRatio) {
      case "9:16":
        return "aspect-[9/16]";
      case "16:9":
        return "aspect-[16/9]";
      case "1:1":
        return "aspect-square";
      case "4:5":
        return "aspect-[4/5]";
      default:
        return "aspect-[9/16]";
    }
  };

  // For 16:9 horizontal projects, expand across 2 columns on medium+ grids to keep visual hierarchy balanced and asymmetric
  const isHorizontal = project.aspectRatio === "16:9";

  return (
    <article
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View project ${project.title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-video="true"
      data-cursor-text="WATCH"
      className={`group relative flex flex-col bg-[#0e0e0e] border border-white/[0.08] hover:border-[#D6FF48]/60 transition-all duration-500 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#D6FF48] ${
        isHorizontal ? "sm:col-span-2 md:col-span-2 lg:col-span-2" : "col-span-1"
      }`}
    >
      {/* Video / Thumbnail Container */}
      <div className={`relative w-full overflow-hidden bg-neutral-950 ${getAspectClass()}`}>
        {/* Static Poster Thumbnail */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered && videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Hover Video Preview (Desktop) */}
        <video
          ref={videoRef}
          src={project.previewVideo}
          muted
          playsInline
          loop
          preload="none"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none transition-opacity group-hover:opacity-60" />

        {/* Top Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-widest text-neutral-300">
            {project.aspectRatio}
          </span>

          <div className="flex items-center gap-1.5">
            {project.featured && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[#D6FF48] text-black text-[9px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5 fill-black" />
                <span>Featured</span>
              </span>
            )}
            <span className="flex items-center gap-1 px-2 py-0.5 bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-neutral-300">
              <Clock className="w-2.5 h-2.5" />
              <span>{formatDuration(project.duration)}</span>
            </span>
          </div>
        </div>

        {/* Center Play Indicator on Hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#D6FF48] text-black flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl">
            <Play className="w-5 h-5 fill-black translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Project Metadata Footer */}
      <div className="p-4 bg-[#0d0d0d] flex flex-col justify-between flex-grow border-t border-white/[0.06]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6FF48] block mb-1">
            {project.category}
          </span>
          <h3 className="font-editorial text-base sm:text-lg font-bold text-white group-hover:text-[#D6FF48] transition-colors line-clamp-1">
            {project.title}
          </h3>
          {project.clientOrBrand && (
            <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
              Client / Project: <span className="text-neutral-200">{project.clientOrBrand}</span>
            </p>
          )}
        </div>

        {/* Tag pills */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-white/[0.04] text-neutral-400 border border-white/[0.04]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

