"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import StatusDot from "@/components/ui/StatusDot";

const NAV_LINKS = [
  { id: "what-i-build", label: "What I Build" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = ["hero", ...NAV_LINKS.map((link) => link.id)] as const;

const LINK_CLASS =
  "px-[var(--space-2)] text-sm text-[var(--text-secondary)] transition-[color] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2";

function linkClassName(isActive: boolean): string {
  return [LINK_CLASS, isActive ? "text-[var(--accent)]" : null]
    .filter(Boolean)
    .join(" ");
}

export default function Nav() {
  const drawerId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top?.target.id) {
          setActiveSection(top.target.id);
        }
      },
      { threshold: 0.5 },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    previouslyFocusedRef.current =
      (document.activeElement as HTMLElement | null) ?? menuButtonRef.current;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const getFocusable = (): HTMLElement[] => {
      if (!drawer) return [];
      return Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
    };

    const focusable = getFocusable();
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const drawerMotion = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: "-100%" },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: "-100%" },
      };

  return (
    <>
      <header
        className={[
          // z-50: above page sections; below future full-screen modals (z-[60]+)
          "fixed inset-x-0 top-0 z-50",
          "h-16 w-full",
          "backdrop-blur-[12px]",
        ].join(" ")}
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg) 85%, transparent)",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
          transition: `box-shadow var(--dur-fast) var(--ease-out)`,
        }}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-[var(--space-4)] md:px-[var(--space-8)]"
        >
          <a
            href="#hero"
            className="font-mono text-base font-bold text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
            onClick={closeMenu}
          >
            ID
          </a>

          <div className="hidden items-center gap-[var(--space-6)] md:flex">
            <ul className="flex items-center gap-[var(--space-6)]">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={linkClassName(activeSection === link.id)}
                    aria-current={activeSection === link.id ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="h-4 w-px bg-[var(--border-subtle)]"
            />
            <StatusDot status="online" label="ONLINE" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex items-center justify-center text-[var(--text-primary)] md:hidden focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu aria-hidden="true" size={22} strokeWidth={1.75} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="nav-backdrop"
            // z-40: dimming layer under the sticky header / drawer (z-50)
            className="fixed inset-0 z-40 md:hidden"
            style={{
              backgroundColor: "color-mix(in srgb, var(--bg) 60%, transparent)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.25 }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        ) : null}
        {menuOpen ? (
          <motion.div
            key="nav-drawer"
            ref={drawerRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            // z-50: aligned with header so the drawer stacks with the nav chrome
            className="fixed inset-x-0 top-16 z-50 border-b border-[var(--border-subtle)] md:hidden"
            style={{ backgroundColor: "var(--surface)" }}
            initial={drawerMotion.initial}
            animate={drawerMotion.animate}
            exit={drawerMotion.exit}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.3,
              ease: [0, 0, 0.2, 1],
            }}
          >
            <ul className="flex flex-col gap-[var(--space-2)] px-[var(--space-4)] py-[var(--space-6)]">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={[
                      "block py-[var(--space-2)]",
                      linkClassName(activeSection === link.id),
                    ].join(" ")}
                    aria-current={
                      activeSection === link.id ? "true" : undefined
                    }
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
