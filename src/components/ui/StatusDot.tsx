"use client";

import { useEffect, useState } from "react";

export interface StatusDotProps {
  status: "online" | "processing" | "idle";
  label: string;
  className?: string;
}

const STATUS_COLOR: Record<StatusDotProps["status"], string> = {
  online: "var(--success)",
  processing: "var(--warning)",
  idle: "var(--text-muted)",
};

const PULSE_DURATION: Partial<Record<StatusDotProps["status"], string>> = {
  online: "2s",
  processing: "1s",
};

const PULSE_KEYFRAMES = `@keyframes status-dot-pulse{0%,100%{opacity:1}50%{opacity:0.3}}`;

export default function StatusDot({
  status,
  label,
  className,
}: StatusDotProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const pulseDuration = PULSE_DURATION[status];
  const shouldPulse = Boolean(pulseDuration) && !prefersReducedMotion;

  return (
    <span
      role="status"
      aria-label={label}
      className={[
        "inline-flex items-center gap-[var(--space-2)] font-mono text-xs",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {shouldPulse ? <style>{PULSE_KEYFRAMES}</style> : null}
      <span
        aria-hidden="true"
        className="inline-block size-1.5 shrink-0 rounded-full"
        style={{
          backgroundColor: STATUS_COLOR[status],
          animation: shouldPulse
            ? `status-dot-pulse ${pulseDuration} ease-in-out infinite`
            : undefined,
        }}
      />
      <span>{label}</span>
    </span>
  );
}
