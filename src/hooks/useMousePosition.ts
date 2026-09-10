"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  /** Normalized horizontal position in [-1, 1]. */
  x: number;
  /** Normalized vertical position in [-1, 1]. */
  y: number;
}

/**
 * Tracks the pointer position normalized to the viewport.
 * Center = (0, 0), edges ≈ ±1.
 */
export default function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const x = (event.clientX / width) * 2 - 1;
      const y = (event.clientY / height) * 2 - 1;
      setPosition({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return position;
}
