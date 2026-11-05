"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for fluid cursor follow
  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });

  useEffect(() => {
    // Only activate custom cursor on fine-pointer devices (desktop mouse)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check target element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      const videoCard = target.closest("[data-cursor-video]");

      if (videoCard) {
        setIsVideoHovered(true);
        setCursorText(videoCard.getAttribute("data-cursor-text") || "PLAY");
      } else {
        setIsVideoHovered(false);
        setCursorText("");
      }

      setIsPointer(!!interactive && !videoCard);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Outer Follower */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono uppercase tracking-widest text-[10px] font-bold"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isVideoHovered ? 72 : isPointer ? 44 : 28,
          height: isVideoHovered ? 72 : isPointer ? 44 : 28,
          backgroundColor: isVideoHovered
            ? "#D6FF48"
            : isPointer
            ? "rgba(214, 255, 72, 0.15)"
            : "transparent",
          borderColor: isVideoHovered ? "#D6FF48" : isPointer ? "#D6FF48" : "rgba(255, 255, 255, 0.4)",
          borderWidth: isVideoHovered ? "0px" : "1.5px",
          color: isVideoHovered ? "#000000" : "#ffffff",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      >
        {isVideoHovered && <span>{cursorText}</span>}
      </motion.div>

      {/* Center Precision Dot */}
      {!isVideoHovered && (
        <motion.div
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            x: cursorX,
            y: cursorY,
          }}
          animate={{
            width: isPointer ? 0 : 5,
            height: isPointer ? 0 : 5,
            backgroundColor: "#D6FF48",
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  );
}

