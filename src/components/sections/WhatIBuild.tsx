"use client";

import { motion, useReducedMotion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  capabilities,
  projects,
  type Capability,
} from "@/lib/data";

const FADE_EASE = [0, 0, 0.2, 1] as const;

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function getStacksForCategory(categoryId: Capability["id"]): string[] {
  const stacks = projects
    .filter((project) => project.category === categoryId)
    .flatMap((project) => project.stack);

  return [...new Set(stacks)];
}

function CapabilityCard({
  capability,
  index,
  reduce,
}: {
  capability: Capability;
  index: number;
  reduce: boolean;
}) {
  const categoryProjects = projects.filter(
    (project) => project.category === capability.id,
  );
  const projectCount = categoryProjects.length;
  const stacks = getStacksForCategory(capability.id);
  const visibleStacks = stacks.slice(0, 4);
  const remaining = stacks.length - visibleStacks.length;

  const projectLabel =
    projectCount === 1 ? "— 1 project" : `— ${projectCount} projects`;

  return (
    <motion.article
      variants={{
        hidden: {
          opacity: 0,
          y: reduce ? 0 : 16,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduce ? 0.15 : 0.4,
            ease: FADE_EASE,
          },
        },
      }}
      className="group border border-[var(--border-default)] bg-[var(--surface)] p-[var(--space-6)] transition-[border-color,box-shadow] duration-[var(--dur-normal)] ease-[var(--ease-out)] hover:border-[var(--accent)] hover:shadow-[var(--glow-accent)]"
      style={{ borderRadius: "var(--radius-md)" }}
    >
      <p
        className="mb-[var(--space-4)] font-mono text-xs text-[var(--text-muted)] transition-colors duration-[var(--dur-normal)] ease-[var(--ease-out)] group-hover:text-[var(--accent)]"
        aria-hidden="true"
      >
        {formatIndex(index)}
      </p>

      <h3 className="mb-[var(--space-2)] text-lg font-semibold text-[var(--text-primary)]">
        {capability.label}
      </h3>

      <p className="mb-[var(--space-4)] text-sm text-[var(--text-secondary)]">
        {capability.description}
      </p>

      <p className="mb-[var(--space-4)] font-mono text-xs text-[var(--text-muted)]">
        {projectLabel}
      </p>

      {stacks.length > 0 ? (
        <ul className="flex flex-wrap gap-[var(--space-2)]" aria-label="Stack">
          {visibleStacks.map((tech) => (
            <li key={tech}>
              <Badge label={tech} variant="default" />
            </li>
          ))}
          {remaining > 0 ? (
            <li>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                +{remaining} more
              </span>
            </li>
          ) : null}
        </ul>
      ) : null}
    </motion.article>
  );
}

export default function WhatIBuild() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);

  return (
    <SectionWrapper
      id="what-i-build"
      label="CAPABILITIES"
      className="px-[var(--space-4)] md:px-[var(--space-8)]"
    >
      <header className="mb-[var(--space-8)] max-w-[680px]">
        <h2
          className="display-md mb-[var(--space-3)] text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold text-[var(--text-primary)]"
          style={{ fontWeight: 700 }}
        >
          What I Build
        </h2>
        <p className="text-base text-[var(--text-secondary)]">
          Not a list of tools. A set of things I actually build.
        </p>
      </header>

      <motion.div
        className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2 md:gap-[var(--space-6)]"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduce ? 0 : 0.1,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {capabilities.map((capability, index) => (
          <CapabilityCard
            key={capability.id}
            capability={capability}
            index={index}
            reduce={reduce}
          />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
