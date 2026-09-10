import type { CSSProperties } from "react";

export interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "interact";
  className?: string;
}

const VARIANT_STYLES: Record<
  NonNullable<BadgeProps["variant"]>,
  CSSProperties
> = {
  default: {
    borderColor: "var(--border-default)",
    color: "var(--text-secondary)",
    backgroundColor: "transparent",
  },
  accent: {
    borderColor: "var(--accent)",
    color: "var(--accent)",
    backgroundColor: "var(--accent-dim)",
  },
  interact: {
    borderColor: "var(--interact)",
    color: "var(--interact)",
    backgroundColor: "var(--interact-dim)",
  },
};

export default function Badge({
  label,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={["inline-flex items-center font-mono text-xs", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        paddingInline: "var(--space-2)",
        paddingBlock: "2px",
        borderRadius: "var(--radius-sm)",
        borderWidth: "1px",
        borderStyle: "solid",
        ...VARIANT_STYLES[variant],
      }}
    >
      {label}
    </span>
  );
}
