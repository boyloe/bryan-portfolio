"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Card({ children, className, glow = false }: CardProps) {
  return (
    <motion.div
      className={cn("rounded-lg p-6 transition-all duration-300", className)}
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
      whileHover={{
        borderColor: glow ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.12)",
        boxShadow: glow ? "0 0 20px rgba(0,212,255,0.08)" : "none",
        y: -2,
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
