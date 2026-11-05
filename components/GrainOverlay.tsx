"use client";

import React from "react";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 bg-noise opacity-30 mix-blend-overlay"
    />
  );
}

