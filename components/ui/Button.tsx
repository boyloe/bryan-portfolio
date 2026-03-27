"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({ children, variant = "primary", onClick, href, className }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded font-mono text-sm font-medium transition-all duration-200 cursor-pointer";

  const styles =
    variant === "primary"
      ? "text-[#0a0a0f] relative overflow-hidden"
      : "border text-[var(--accent-primary)] hover:bg-[var(--accent-glow)]";

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      <Tag
        className={cn(base, styles, className)}
        onClick={onClick}
        href={href}
        style={
          variant === "primary"
            ? { background: "var(--gradient-accent)", borderColor: "transparent" }
            : { borderColor: "var(--accent-primary)" }
        }
      >
        {children}
      </Tag>
    </motion.div>
  );
}
