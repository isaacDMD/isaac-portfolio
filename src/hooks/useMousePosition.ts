"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Normalized pointer position relative to the viewport.
 * Uses rAF so React state updates at most once per frame.
 * When reduced motion is preferred, always returns { x: 0, y: 0 }.
 */
export function useMousePosition(): MousePosition {
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const frameRef = useRef<number | null>(null);
  const latestRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const flush = () => {
      frameRef.current = null;
      setPosition(latestRef.current);
    };

    const onMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      latestRef.current = {
        x: Math.max(-1, Math.min(1, (event.clientX / width) * 2 - 1)),
        y: Math.max(-1, Math.min(1, (event.clientY / height) * 2 - 1)),
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return { x: 0, y: 0 };
  }

  return position;
}
