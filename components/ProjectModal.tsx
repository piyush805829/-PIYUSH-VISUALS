"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      } else if (e.key === "ArrowLeft") {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 3);
        }
      } else if (e.key === "ArrowRight") {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration,
            videoRef.current.currentTime + 3
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, isPlaying, isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    setCurrentTime(0);
    setProgress(0);
    video.load();

    video.play().catch(() => {
      // If browser blocked unmuted autoplay, mute and try again
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [project]);

  if (!project) return null;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = seekPercentage * duration;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isVertical = project.aspectRatio === "9:16";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/92 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative z-10 w-full bg-[#0a0a0a] border border-white/15 overflow-hidden shadow-2xl flex flex-col ${
            isVertical ? "max-w-4xl max-h-[92vh]" : "max-w-5xl max-h-[92vh]"
          }`}
        >
          {/* Top Modal Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#111111]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#D6FF48] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48] font-semibold">
                {project.category}
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="hidden sm:inline font-mono text-xs text-neutral-400">
                {project.ratioLabel}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline font-mono text-[10px] uppercase text-neutral-500">
                Press ESC to exit
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Body: Player + Metadata */}
          <div
            className={`flex flex-col ${
              isVertical ? "md:flex-row" : "flex-col"
            } overflow-y-auto flex-grow`}
          >
            {/* Video Viewport */}
            <div
              className={`relative bg-black flex items-center justify-center p-2 sm:p-4 ${
                isVertical
                  ? "md:w-1/2 flex-shrink-0 min-h-[420px] md:min-h-[580px]"
                  : "w-full aspect-video"
              }`}
            >
              <div
                className={`relative overflow-hidden bg-neutral-950 flex items-center justify-center ${
                  isVertical
                    ? "w-full max-w-[340px] aspect-[9/16] shadow-2xl border border-white/10"
                    : "w-full h-full"
                }`}
              >
                <video
                  ref={videoRef}
                  src={project.fullVideo || project.previewVideo}
                  poster={project.thumbnail}
                  playsInline
                  autoPlay
                  loop
                  muted={isMuted}
                  className="w-full h-full object-contain"
                  onClick={togglePlay}
                />

                {/* Big Center Play/Pause button overlay */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute z-10 w-16 h-16 rounded-full bg-[#D6FF48] text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                    aria-label="Play video"
                  >
                    <Play className="w-7 h-7 fill-black translate-x-0.5" />
                  </button>
                )}

                {/* Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
                  {/* Scrubber */}
                  <div
                    onClick={handleSeek}
                    className="relative h-1.5 w-full bg-white/20 cursor-pointer mb-2 hover:h-2 transition-all"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-[#D6FF48]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-white">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="hover:text-[#D6FF48] transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="hover:text-[#D6FF48] transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-neutral-400" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-[#D6FF48]" />
                        )}
                      </button>

                      <span className="text-[10px] text-neutral-400">
                        {formatTime(currentTime)} / {formatTime(duration || project.duration)}
                      </span>
                    </div>

                    <span className="text-[10px] text-neutral-500 uppercase">
                      {project.aspectRatio}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details Panel */}
            <div
              className={`p-6 sm:p-8 flex flex-col justify-between bg-[#0e0e0e] border-t md:border-t-0 md:border-l border-white/10 ${
                isVertical ? "md:w-1/2" : "w-full"
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-[#D6FF48]/10 border border-[#D6FF48]/30 text-[#D6FF48] font-mono text-[10px] uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#D6FF48]">
                      <Sparkles className="w-3 h-3 fill-[#D6FF48]" />
                      <span>Featured Highlight</span>
                    </span>
                  )}
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
                  {project.title}
                </h2>

                {/* Technical Specs List */}
                <div className="space-y-2.5 py-4 border-y border-white/[0.08] font-mono text-xs">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Source File:</span>
                    <span className="text-white font-mono text-[11px]">{project.filename}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Resolution:</span>
                    <span className="text-white font-mono text-[11px]">
                      {project.width} × {project.height}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Aspect Ratio:</span>
                    <span className="text-white font-mono text-[11px]">{project.ratioLabel}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>Length:</span>
                    <span className="text-white font-mono text-[11px]">{project.duration}s</span>
                  </div>
                  {project.clientOrBrand && (
                    <div className="flex justify-between items-center text-neutral-400">
                      <span>Brand / Entity:</span>
                      <span className="text-[#D6FF48] font-mono text-[11px]">
                        {project.clientOrBrand}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                      Editing Focus & Techniques:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/[0.04] border border-white/10 text-neutral-300 font-mono text-[10px] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Inquiry Action Box */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-neutral-400 mb-3">
                  Interested in an edit with similar pacing, color grade, or structure?
                </p>
                <a
                  href={`#contact`}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D6FF48] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                >
                  <span>Request Similar Video Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

