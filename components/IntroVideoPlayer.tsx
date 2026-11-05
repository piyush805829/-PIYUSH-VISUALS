"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react";

interface IntroVideoPlayerProps {
  className?: string;
  autoPlay?: boolean;
}

export function IntroVideoPlayer({ className = "", autoPlay = true }: IntroVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);

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
      setIsLoaded(true);
    };
    const onError = () => {
      setHasError(true);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("error", onError);

    if (autoPlay) {
      video.play().catch(() => {
        // Autoplay policy prevented playback until user interaction
        setIsPlaying(false);
      });
    }

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("error", onError);
    };
  }, [autoPlay]);

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

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      data-cursor-video="true"
      data-cursor-text={isPlaying ? "PAUSE" : "PLAY"}
      className={`group relative overflow-hidden bg-black border border-white/10 rounded-none shadow-2xl ${className}`}
    >
      {/* Aspect Ratio Preservation: 16:9 */}
      <div className="relative w-full aspect-video bg-neutral-950 flex items-center justify-center">
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          poster="/thumbnails/intro-poster.webp"
          preload="metadata"
          muted={isMuted}
          playsInline
          loop
          className="w-full h-full object-cover object-center"
          onClick={togglePlay}
        />

        {/* Cinematic Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Fallback / Error Alert */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 text-center text-neutral-400">
            <p className="font-mono text-sm text-red-400 mb-2">Video source unavailable</p>
            <p className="text-xs">Ensure &apos;public/videos/intro.mp4&apos; is loaded.</p>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6FF48] animate-pulse" />
            <span>PIYUSH VISUALS • SHOWREEL</span>
          </div>
          <div className="px-2 py-0.5 bg-[#D6FF48] text-black font-mono font-bold text-[9px] uppercase tracking-wider">
            4K MASTER
          </div>
        </div>

        {/* Center Big Play Button (when paused) */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D6FF48] text-black flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
            aria-label="Play showreel"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black translate-x-0.5" />
          </button>
        )}

        {/* Unmute prompt banner if playing muted */}
        {isPlaying && isMuted && (
          <button
            onClick={toggleMute}
            className="absolute top-16 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-[#D6FF48]/40 text-[#D6FF48] text-[11px] font-mono uppercase tracking-wider hover:bg-[#D6FF48] hover:text-black transition-colors"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Click to Unmute Sound</span>
          </button>
        )}

        {/* Bottom Control Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 z-20 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {/* Progress Bar / Scrubber */}
          <div
            onClick={handleSeek}
            className="relative h-1.5 w-full bg-white/20 cursor-pointer mb-3 group/track hover:h-2.5 transition-all"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#D6FF48]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs font-mono">
            <div className="flex items-center gap-4">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="hover:text-[#D6FF48] transition-colors p-1"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* Sound Toggle */}
              <button
                onClick={toggleMute}
                className="hover:text-[#D6FF48] transition-colors p-1 flex items-center gap-1.5"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#D6FF48]" />}
                <span className="text-[10px] uppercase text-neutral-400">{isMuted ? "MUTED" : "AUDIO ON"}</span>
              </button>

              {/* Timestamp */}
              <span className="text-[11px] text-neutral-400">
                {formatTime(currentTime)} / {formatTime(duration || 3.1)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Reset loop button */}
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                  }
                }}
                className="hover:text-[#D6FF48] transition-colors p-1"
                title="Restart"
                aria-label="Restart Video"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="hover:text-[#D6FF48] transition-colors p-1"
                aria-label="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

