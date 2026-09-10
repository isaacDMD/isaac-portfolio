"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  capabilities,
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/data";

const FADE_EASE = [0, 0, 0.2, 1] as const;
const DUR_NORMAL = 0.25;

/** Stand-in for Lucide `Github` (brand icons removed from lucide-react). */
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

type FilterId = "all" | ProjectCategory;

const nonFeaturedProjects = projects.filter((project) => !project.featured);

function categoryLabel(category: Project["category"]): string {
  return (
    capabilities.find((capability) => capability.id === category)?.label ??
    category
  );
}

function cardSummary(project: Project): string {
  if (project.tagline.trim().length > 0) {
    return project.tagline;
  }
  const text = project.description.trim();
  if (text.length <= 80) return text;
  return `${text.slice(0, 80).trimEnd()}…`;
}

function ProjectCard({
  project,
  reduce,
}: {
  project: Project;
  reduce: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
      transition={{
        duration: DUR_NORMAL,
        ease: FADE_EASE,
      }}
      className="flex h-full flex-col gap-[var(--space-3)] border border-[var(--border-default)] bg-[var(--surface)] p-[var(--space-5)] transition-[border-color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
      style={{ borderRadius: "var(--radius-md)" }}
    >
      <Badge label={categoryLabel(project.category)} variant="default" />

      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
        {project.title}
      </h3>

      <p className="text-sm text-[var(--text-secondary)]">
        {cardSummary(project)}
      </p>

      <ul
        className="flex flex-wrap gap-[var(--space-1)]"
        aria-label="Tech stack"
      >
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge label={tech} variant="default" />
          </li>
        ))}
      </ul>

      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-[var(--space-2)] text-sm text-[var(--text-muted)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
        >
          <GithubIcon size={16} />
          View source
        </a>
      ) : (
        <div className="mt-auto" aria-hidden="true" />
      )}
    </motion.article>
  );
}

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return nonFeaturedProjects;
    return nonFeaturedProjects.filter(
      (project) => project.category === activeFilter,
    );
  }, [activeFilter]);

  return (
    <SectionWrapper
      id="projects"
      label="ALL PROJECTS"
      className="px-[var(--space-4)] md:px-[var(--space-8)]"
    >
      <header className="mb-[var(--space-8)] flex flex-col gap-[var(--space-6)]">
        <h2
          className="display-md text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold text-[var(--text-primary)]"
          style={{ fontWeight: 700 }}
        >
          Projects
        </h2>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-[var(--space-2)]"
        >
          <Button
            variant={activeFilter === "all" ? "primary" : "ghost"}
            size="sm"
            type="button"
            onClick={() => setActiveFilter("all")}
            aria-pressed={activeFilter === "all"}
          >
            All
          </Button>
          {capabilities.map((capability) => (
            <Button
              key={capability.id}
              variant={activeFilter === capability.id ? "primary" : "ghost"}
              size="sm"
              type="button"
              onClick={() => setActiveFilter(capability.id)}
              aria-pressed={activeFilter === capability.id}
            >
              {capability.label}
            </Button>
          ))}
        </div>
      </header>

      <motion.div
        layout
        className="grid grid-cols-1 gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} reduce={reduce} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
