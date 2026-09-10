"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export interface SectionWrapperProps {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}

/** Mirrors --dur-slow (400ms) and --ease-out from globals.css */
const SECTION_TRANSITION = {
  duration: 0.4,
  ease: [0, 0, 0.2, 1] as const,
};

export default function SectionWrapper({
  id,
  label,
  children,
  className,
}: SectionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-label={label}
      className={[
        "mx-auto w-full max-w-[1280px]",
        "py-[var(--space-12)] md:py-[var(--space-20)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={SECTION_TRANSITION}
      viewport={{ once: true, margin: "-80px" }}
    >
      <span
        aria-hidden="true"
        className="mb-[var(--space-4)] block font-mono text-xs text-[var(--text-muted)]"
      >
        {`// ${label}`}
      </span>
      {children}
    </motion.section>
  );
}
