"use client";

import { useEffect, useRef, useState } from "react";

export interface TerminalLineProps {
  text: string;
  /** Delay before typing starts (ms). Default 0. */
  delay?: number;
  /** Milliseconds between each character. Default 40. */
  speed?: number;
  /** Blinking block cursor after the text is complete. Default false. */
  showCursor?: boolean;
  className?: string;
  /** Fired once when the full text has been revealed. */
  onComplete?: () => void;
}

const CURSOR_KEYFRAMES = `@keyframes terminal-line-cursor-blink{0%,49%{opacity:1}50%,100%{opacity:0}}`;

export default function TerminalLine({
  text,
  delay = 0,
  speed = 40,
  showCursor = false,
  className,
  onComplete,
}: TerminalLineProps) {
  const [displayed, setDisplayed] = useState("");
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    setDisplayed("");
    setActive(false);
    setComplete(false);

    const finish = (fullText: string) => {
      if (cancelled) return;
      setActive(true);
      setDisplayed(fullText);
      setComplete(true);
      onCompleteRef.current?.();
    };

    if (prefersReducedMotion) {
      finish(text);
      return () => {
        cancelled = true;
      };
    }

    timeoutId = setTimeout(() => {
      if (cancelled) return;
      setActive(true);

      if (text.length === 0) {
        setComplete(true);
        onCompleteRef.current?.();
        return;
      }

      let index = 0;
      intervalId = setInterval(() => {
        if (cancelled) return;
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId !== undefined) clearInterval(intervalId);
          intervalId = undefined;
          setComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [text, delay, speed, prefersReducedMotion]);

  if (!active) {
    return null;
  }

  return (
    <span
      aria-label={text}
      className={["text-[var(--text-primary)]", className]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <style>{CURSOR_KEYFRAMES}</style>
      <span aria-live="polite" aria-atomic="true">
        {displayed}
      </span>
      {showCursor && complete && !prefersReducedMotion ? (
        <span
          aria-hidden="true"
          style={{
            animation: "terminal-line-cursor-blink 600ms step-end infinite",
          }}
        >
          █
        </span>
      ) : null}
    </span>
  );
}
