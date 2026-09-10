"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import StatusDot from "@/components/ui/StatusDot";
import TerminalLine from "@/components/ui/TerminalLine";
import { useMousePosition } from "@/hooks/useMousePosition";

const TERMINAL_CLASS = "font-mono text-xs !text-[var(--text-muted)]";

const FADE_EASE = [0, 0, 0.2, 1] as const;

const INPUT_LABELS = ["MOUSE", "GESTURE", "MOTION"] as const;

type BootLine = 0 | 1;
type InputLine = 0 | 1 | 2 | 3;

/**
 * Hero — system init sequence that reveals Isaac's identity.
 * Steps 0→6 advance only via onComplete / onAnimationComplete (no chained timeouts).
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);
  const { x: mouseX, y: mouseY } = useMousePosition();

  const [step, setStep] = useState(0);
  const [bootLine, setBootLine] = useState<BootLine>(0);
  const [inputLine, setInputLine] = useState<InputLine>(0);
  const [checks, setChecks] = useState({
    MOUSE: false,
    GESTURE: false,
    MOTION: false,
  });

  const effectiveStep = reduce ? 6 : step;

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  });
  const springY = useSpring(parallaxY, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  });

  useEffect(() => {
    if (reduce) {
      parallaxX.set(0);
      parallaxY.set(0);
      return;
    }
    parallaxX.set(mouseX * 8);
    parallaxY.set(mouseY * 8);
  }, [mouseX, mouseY, reduce, parallaxX, parallaxY]);

  const goTo = useCallback((next: number) => {
    setStep((current) => Math.max(current, next));
  }, []);

  const fadeTransition = {
    duration: reduce ? 0 : 0.4,
    ease: FADE_EASE,
  };

  const showIdentity = effectiveStep >= 3;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden px-[var(--space-4)] md:px-[var(--space-8)]"
    >
      <div
        id="hero-canvas-placeholder"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* Copy available to AT before the visual sequence reaches these lines */}
      <div className="sr-only">
        <p>Full-Stack Developer</p>
        <p>I build interfaces between humans and machines.</p>
      </div>

      <motion.div
        className="relative w-full max-w-[680px]"
        style={reduce ? undefined : { x: springX, y: springY }}
      >
        <div className="flex flex-col gap-[var(--space-6)]">
          {/* TEMPS 1–3 — decorative terminal boot */}
          <div
            aria-hidden="true"
            className="flex flex-col gap-[var(--space-2)]"
          >
            {/* TEMPS 1 */}
            <div className="flex flex-col gap-1">
              <div>
                {reduce ? (
                  <span className={TERMINAL_CLASS}>INTERACTION SYSTEM</span>
                ) : (
                  <TerminalLine
                    text="INTERACTION SYSTEM"
                    delay={0}
                    className={TERMINAL_CLASS}
                    onComplete={() => setBootLine(1)}
                  />
                )}
              </div>
              {(bootLine >= 1 || reduce) && (
                <div>
                  {reduce ? (
                    <span className={TERMINAL_CLASS}>INITIALIZING...</span>
                  ) : (
                    <TerminalLine
                      text="INITIALIZING..."
                      className={TERMINAL_CLASS}
                      onComplete={() => goTo(1)}
                    />
                  )}
                </div>
              )}
            </div>

            {/* TEMPS 2 */}
            {effectiveStep >= 1 && (
              <div className="flex flex-col gap-1">
                <div>
                  {reduce ? (
                    <span className={TERMINAL_CLASS}>INPUT DETECTED :</span>
                  ) : (
                    <TerminalLine
                      text="INPUT DETECTED :"
                      className={TERMINAL_CLASS}
                      onComplete={() => setInputLine(1)}
                    />
                  )}
                </div>
                {INPUT_LABELS.map((label, index) => {
                  const lineIndex = (index + 1) as InputLine;
                  const visible = reduce || inputLine >= lineIndex;
                  if (!visible) return null;

                  const isLast = index === INPUT_LABELS.length - 1;

                  return (
                    <div key={label} className="flex items-baseline gap-2">
                      {reduce ? (
                        <span className={TERMINAL_CLASS}>
                          {label.padEnd(12, " ")}
                        </span>
                      ) : (
                        <TerminalLine
                          text={label.padEnd(12, " ")}
                          className={TERMINAL_CLASS}
                          onComplete={() => {
                            setChecks((prev) => ({ ...prev, [label]: true }));
                            if (isLast) {
                              goTo(2);
                            } else {
                              setInputLine((lineIndex + 1) as InputLine);
                            }
                          }}
                        />
                      )}
                      {(checks[label] || reduce) && (
                        <span className="font-mono text-xs text-[var(--success)]">
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TEMPS 3 */}
            {effectiveStep >= 2 && (
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={fadeTransition}
                onAnimationComplete={() => {
                  if (!reduce) goTo(3);
                }}
                className="pt-[var(--space-2)]"
              >
                <StatusDot status="online" label="SYSTEM ONLINE" />
              </motion.div>
            )}
          </div>

          {/* TEMPS 4 — identity: one h1 (sr-only until the sequence reaches it) */}
          <motion.div
            initial={false}
            animate={{ opacity: showIdentity || reduce ? 1 : 0 }}
            transition={fadeTransition}
            className={showIdentity ? undefined : "sr-only"}
          >
            <h1
              className="display-xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] font-bold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-geist)", fontWeight: 700 }}
            >
              {reduce || !showIdentity ? (
                "Isaac Djimadjo"
              ) : (
                <>
                  <span className="sr-only">Isaac Djimadjo</span>
                  <span aria-hidden="true">
                    <TerminalLine
                      text="ISAAC DJIMADJO"
                      speed={60}
                      fontFamily="var(--font-geist)"
                      className="!text-[var(--text-primary)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] font-bold"
                      onComplete={() => goTo(4)}
                    />
                  </span>
                </>
              )}
            </h1>
          </motion.div>

          {/* TEMPS 5 — title */}
          {effectiveStep >= 4 && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={fadeTransition}
              onAnimationComplete={() => {
                if (!reduce) goTo(5);
              }}
              className="text-xl text-[var(--text-secondary)]"
              aria-hidden="true"
            >
              Full-Stack Developer
            </motion.p>
          )}

          {/* TEMPS 6 — tagline + CTAs */}
          {effectiveStep >= 5 && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={fadeTransition}
              onAnimationComplete={() => {
                if (!reduce) goTo(6);
              }}
              className="flex flex-col gap-[var(--space-6)]"
            >
              <p
                className="text-lg italic text-[var(--text-secondary)]"
                aria-hidden="true"
              >
                &ldquo;I build interfaces between humans and machines.&rdquo;
              </p>

              <div className="flex flex-wrap gap-[var(--space-4)]">
                <Button variant="primary" href="#projects">
                  EXPLORE WORK
                </Button>
                <Button variant="ghost" href="#about">
                  ABOUT ME
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
