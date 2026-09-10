"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import StatusDot from "@/components/ui/StatusDot";

const FADE_EASE = [0, 0, 0.2, 1] as const;

const PARAGRAPHS = [
  "I'm Isaac, a Full-Stack Developer based in Lomé, Togo. I study computer engineering at IAI and I build things that sit at the intersection of software and human behavior.",
  "My interest is in how humans interact with machines. Not just building UIs, but thinking about input, detection, response — how a gesture becomes data, how data becomes action.",
  "I work across the stack: Python backends, REST APIs, React and Vue frontends. But what I enjoy most is building things that feel unexpected.",
] as const;

const LOOKING_FOR = ["Internship", "Freelance", "Employment"] as const;

const LANGUAGES = ["French — Native", "English — Professional"] as const;

/** Lucide no longer ships brand icons — compact marks for connect links. */
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

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.125 2.062 2.062 0 0 1 .004 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const CONNECT_LINKS: {
  href: string;
  label: string;
  icon: ReactNode;
  external: boolean;
}[] = [
  {
    href: "https://github.com/IsaacDMD",
    label: "@IsaacDMD",
    icon: <GithubIcon size={16} />,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/isaac-djimadjo",
    label: "isaac-djimadjo",
    icon: <LinkedinIcon size={16} />,
    external: true,
  },
  {
    href: "mailto:isaacdjimadjo830@gmail.com",
    label: "isaacdjimadjo830@gmail.com",
    icon: <Mail aria-hidden="true" size={16} strokeWidth={1.75} />,
    external: false,
  },
  {
    href: "https://wa.me/22890764916",
    label: "+228 90764916",
    icon: <MessageCircle aria-hidden="true" size={16} strokeWidth={1.75} />,
    external: true,
  },
];

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <p className="font-mono text-xs text-[var(--text-muted)]">{label}</p>
      {children}
    </div>
  );
}

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const reduce = Boolean(prefersReducedMotion);

  const columnTransition = (delay: number) => ({
    duration: reduce ? 0.15 : 0.4,
    ease: FADE_EASE,
    delay: reduce ? 0 : delay,
  });

  return (
    <SectionWrapper
      id="about"
      label="ABOUT"
      className="px-[var(--space-4)] md:px-[var(--space-8)]"
    >
      <div className="grid grid-cols-1 gap-[var(--space-10)] md:grid-cols-2 md:gap-[var(--space-12)]">
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={columnTransition(0)}
        >
          <h2
            className="display-md mb-[var(--space-6)] text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold text-[var(--text-primary)]"
            style={{ fontWeight: 700 }}
          >
            About Me
          </h2>

          <div className="flex flex-col gap-[var(--space-4)]">
            {PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base text-[var(--text-secondary)]"
                style={{ lineHeight: 1.7 }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={columnTransition(0.15)}
          className="flex flex-col gap-[var(--space-8)]"
          aria-label="Profile details"
        >
          {/* TODO: remplacer par <Image> Next.js */}
          <div
            aria-hidden="true"
            className="size-[120px] shrink-0 rounded-full border-2 border-solid border-[var(--border-default)] bg-[var(--surface-raised)]"
          />

          <InfoBlock label="BASED IN">
            <p className="text-base text-[var(--text-primary)]">Lomé, Togo</p>
          </InfoBlock>

          <InfoBlock label="LOOKING FOR">
            <ul className="flex flex-col gap-[var(--space-2)]">
              {LOOKING_FOR.map((item) => (
                <li key={item}>
                  <StatusDot status="online" label={item} />
                </li>
              ))}
            </ul>
          </InfoBlock>

          <InfoBlock label="LANGUAGES">
            <ul className="flex flex-col gap-[var(--space-1)]">
              {LANGUAGES.map((language) => (
                <li
                  key={language}
                  className="text-sm text-[var(--text-primary)]"
                >
                  {language}
                </li>
              ))}
            </ul>
          </InfoBlock>

          <InfoBlock label="CONNECT">
            <ul className="flex flex-col gap-[var(--space-2)]">
              {CONNECT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-[var(--space-2)] text-sm text-[var(--text-secondary)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </InfoBlock>
        </motion.aside>
      </div>
    </SectionWrapper>
  );
}
