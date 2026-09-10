"use client";

import { motion, useReducedMotion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { capabilities, projects, type Project } from "@/lib/data";

const FADE_EASE = [0, 0, 0.2, 1] as const;

const featuredProjects = projects.filter((project) => project.featured);

function categoryLabel(category: Project["category"]): string {
  return (
    capabilities.find((capability) => capability.id === category)?.label ??
    category
  );
}

function FlowBlock({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "default" | "accent" | "interact";
}) {
  const toneClass =
    tone === "accent"
      ? "border-[var(--accent)] bg-[var(--accent-dim)]"
      : tone === "interact"
        ? "border-[var(--interact)] bg-[var(--interact-dim)]"
        : "border-[var(--border-default)] bg-[var(--surface-raised)]";

  return (
    <div
      className={`rounded-[var(--radius-sm)] border p-[var(--space-3)] ${toneClass}`}
    >
      <p className="mb-1 font-mono text-xs text-[var(--text-muted)]">{label}</p>
      <p className="text-sm text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      className="flex justify-center py-1 font-mono text-sm text-[var(--accent)]"
      aria-hidden="true"
    >
      ↓
    </div>
  );
}

function InputOutputDiagram({ project }: { project: Project }) {
  const input = project.input ?? "—";
  const processing = project.processing ?? project.stack.join(" + ");
  const output = project.output ?? "—";

  const ariaLabel = `Input: ${input}. Processing: ${processing}. Output: ${output}.`;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="flex flex-col justify-center"
    >
      <FlowBlock label="INPUT" value={input} tone="default" />
      <FlowArrow />
      <FlowBlock label="PROCESSING" value={processing} tone="accent" />
      <FlowArrow />
      <FlowBlock label="OUTPUT" value={output} tone="interact" />
    </div>
  );
}

function FeaturedProjectCard({
  project,
  index,
  reduce,
}: {
  project: Project;
  index: number;
  reduce: boolean;
}) {
  const fromLeft = index % 2 === 0;
  const enterX = reduce ? 0 : fromLeft ? -24 : 24;

  return (
    <motion.article
      initial={{ opacity: 0, x: enterX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? 0.15 : 0.4,
        ease: FADE_EASE,
      }}
      className="grid grid-cols-1 gap-[var(--space-8)] border border-[var(--border-default)] bg-[var(--surface)] p-[var(--space-8)] transition-[border-color,box-shadow,transform] duration-[var(--dur-normal)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-lg)] md:grid-cols-2"
      style={{ borderRadius: "var(--radius-md)" }}
    >
      <div className="flex flex-col gap-[var(--space-4)]">
        <Badge label={categoryLabel(project.category)} variant="accent" />

        <h3
          className="display-sm text-[clamp(1.5rem,2.5vw,2rem)] leading-tight font-bold text-[var(--text-primary)]"
          style={{ fontWeight: 700 }}
        >
          {project.title}
        </h3>

        <p className="text-lg text-[var(--text-secondary)]">{project.tagline}</p>

        <p className="text-base text-[var(--text-secondary)]">
          {project.description}
        </p>

        <ul
          className="flex flex-wrap gap-[var(--space-2)]"
          aria-label="Tech stack"
        >
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge label={tech} variant="default" />
            </li>
          ))}
        </ul>

        {project.github ? (
          <div className="pt-[var(--space-2)]">
            <Button variant="ghost" size="sm" href={project.github}>
              View on GitHub
            </Button>
          </div>
        ) : null}
      </div>

      <InputOutputDiagram project={project} />
    </motion.article>
  );
}

export default function FeaturedWork() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);

  return (
    <SectionWrapper
      id="featured-work"
      label="FEATURED EXPERIMENTS"
      className="px-[var(--space-4)] md:px-[var(--space-8)]"
    >
      <header className="mb-[var(--space-8)] max-w-[680px]">
        <h2
          className="display-md mb-[var(--space-3)] text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold text-[var(--text-primary)]"
          style={{ fontWeight: 700 }}
        >
          Human × Machine
        </h2>
        <p className="text-base text-[var(--text-secondary)]">
          Two experiments that shaped this portfolio&apos;s direction.
        </p>
      </header>

      <div className="flex flex-col gap-[var(--space-6)]">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            index={index}
            reduce={reduce}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
