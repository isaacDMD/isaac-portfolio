"use client";

import type { CSSProperties, ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const SIZE_STYLES: Record<NonNullable<ButtonProps["size"]>, CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: "0.875rem" },
  md: { padding: "10px 20px", fontSize: "1rem" },
  lg: { padding: "14px 28px", fontSize: "1.125rem" },
};

const VARIANT_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: [
    "bg-[var(--accent)] text-[var(--text-primary)] border-transparent",
    "hover:brightness-[1.15] hover:shadow-[var(--glow-accent)]",
  ].join(" "),
  ghost: [
    "bg-transparent border-[var(--border-default)] text-[var(--text-primary)]",
    "hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ].join(" "),
  danger: [
    "bg-transparent border-[var(--error)] text-[var(--error)]",
    "hover:bg-[var(--error)] hover:text-[var(--text-primary)]",
  ].join(" "),
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center border border-solid",
    "focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2",
    VARIANT_CLASS[variant],
    disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties = {
    borderRadius: "var(--radius-sm)",
    fontFamily: "var(--font-geist-sans)",
    transition: `all var(--dur-normal) var(--ease-out)`,
    ...SIZE_STYLES[size],
  };

  if (href !== undefined) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        style={style}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? undefined : onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
