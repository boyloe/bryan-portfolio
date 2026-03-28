"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      variants={fadeInUp}
    >
      {label && (
        <p className="text-sm font-mono tracking-widest uppercase mb-3" style={{ color: "var(--accent-primary)" }}>
          {label}
        </p>
      )}
      <h2
        className="text-4xl md:text-5xl font-bold font-mono relative inline-block"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
        <span
          className="absolute -bottom-2 left-0 h-px w-full"
          style={{ background: "var(--gradient-accent)", opacity: 0.6 }}
        />
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
