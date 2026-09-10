"use client";

import StatusDot from "@/components/ui/StatusDot";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] px-[var(--space-4)] py-[var(--space-8)] md:px-[var(--space-8)]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[var(--space-4)] text-center md:grid md:grid-cols-3 md:items-center md:gap-0 md:text-left">
        <p className="font-mono text-sm text-[var(--text-muted)] md:justify-self-start">
          ISAAC DJIMADJO
        </p>

        <p className="text-xs text-[var(--text-muted)] md:justify-self-center md:text-center">
          Built with Next.js &amp; React Three Fiber
        </p>

        <div className="md:justify-self-end">
          <StatusDot status="online" label="AVAILABLE" />
        </div>
      </div>
    </footer>
  );
}
