"use client";

import { motion, useReducedMotion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { timeline, type TimelineItem } from "@/lib/data";

const FADE_EASE = [0, 0, 0.2, 1] as const;

const DOT_CLASS: Record<TimelineItem["type"], string> = {
  education: "border-[var(--accent)] bg-[var(--accent-dim)]",
  experience: "border-[var(--interact)] bg-[var(--interact-dim)]",
  certification: "border-[var(--success)] bg-transparent",
};

const TYPE_BADGE: Record<
  TimelineItem["type"],
  { label: string; variant: "default" | "accent" }
> = {
  education: { label: "Education", variant: "default" },
  experience: { label: "Experience", variant: "accent" },
  certification: { label: "Certification", variant: "default" },
};

function TimelineContent({
  item,
  align,
}: {
  item: TimelineItem;
  align: "left" | "right";
}) {
  const badge = TYPE_BADGE[item.type];

  return (
    <div
      className={[
        "flex flex-col gap-[var(--space-2)]",
        align === "right" ? "items-end text-right" : "items-start text-left",
      ].join(" ")}
    >
      <time className="font-mono text-xs text-[var(--text-muted)]">
        {item.year}
      </time>
      <h3 className="text-base font-semibold text-[var(--text-primary)]">
        {item.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)]">{item.organization}</p>
      <Badge label={badge.label} variant={badge.variant} />
    </div>
  );
}

function TimelineEntry({
  item,
  index,
  reduce,
}: {
  item: TimelineItem;
  index: number;
  reduce: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.li
      variants={{
        hidden: {
          opacity: 0,
          x: reduce ? 0 : -12,
        },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            duration: reduce ? 0.15 : 0.4,
            ease: FADE_EASE,
          },
        },
      }}
      className="relative pb-[var(--space-8)] last:pb-0"
    >
      {/* Mobile: dot left + content right */}
      <div className="grid grid-cols-[20px_1fr] gap-x-[var(--space-4)] md:hidden">
        <div className="relative flex justify-center">
          <span
            aria-hidden="true"
            className={`mt-1.5 size-2.5 shrink-0 rounded-full border-2 ${DOT_CLASS[item.type]}`}
          />
        </div>
        <TimelineContent item={item} align="left" />
      </div>

      {/* Desktop: alternating sides around center axis */}
      <div className="hidden md:grid md:grid-cols-[1fr_20px_1fr]">
        <div className="pr-[var(--space-8)]">
          {isLeft ? <TimelineContent item={item} align="right" /> : null}
        </div>

        <div className="relative flex justify-center">
          <span
            aria-hidden="true"
            className={`mt-1.5 size-2.5 shrink-0 rounded-full border-2 ${DOT_CLASS[item.type]}`}
          />
        </div>

        <div className="pl-[var(--space-8)]">
          {!isLeft ? <TimelineContent item={item} align="left" /> : null}
        </div>
      </div>
    </motion.li>
  );
}

export default function Journey() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);

  return (
    <SectionWrapper
      id="journey"
      label="JOURNEY"
      className="px-[var(--space-4)] md:px-[var(--space-8)]"
    >
      <h2
        className="display-md mb-[var(--space-10)] text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold text-[var(--text-primary)]"
        style={{ fontWeight: 700 }}
      >
        My Path
      </h2>

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[9px] w-0.5 bg-[var(--border-default)] md:left-1/2 md:-translate-x-1/2"
        />

        <motion.ol
          className="relative flex flex-col"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduce ? 0 : 0.12,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {timeline.map((item, index) => (
            <TimelineEntry
              key={`${item.type}-${item.title}-${item.year}`}
              item={item}
              index={index}
              reduce={reduce}
            />
          ))}
        </motion.ol>
      </div>
    </SectionWrapper>
  );
}
