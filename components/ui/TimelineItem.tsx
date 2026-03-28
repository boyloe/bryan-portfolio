"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeInLeft, fadeInRight, viewportOptions } from "@/lib/animations";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  note?: string;
  previousCareer?: boolean;
  index: number;
}

export default function TimelineItem({
  title,
  company,
  period,
  location,
  highlights,
  note,
  previousCareer,
  index,
}: TimelineItemProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-start gap-8 md:gap-0">
      {/* Desktop: alternating layout */}
      <div className="hidden md:flex w-full items-start">
        {/* Left side */}
        <div className="w-1/2 pr-12">
          {isLeft && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={fadeInLeft}
              className="text-right"
            >
              <ItemContent
                title={title}
                company={company}
                period={period}
                location={location}
                highlights={highlights}
                note={note}
                previousCareer={previousCareer}
                expanded={expanded}
                onToggle={() => setExpanded((e) => !e)}
                align="right"
              />
            </motion.div>
          )}
        </div>

        {/* Center dot */}
        <div className="relative flex flex-col items-center" style={{ minWidth: 24 }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={viewportOptions}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-4 h-4 rounded-full pulse-dot z-10"
            style={{
              background: previousCareer ? "var(--text-secondary)" : "var(--accent-primary)",
              boxShadow: previousCareer ? "none" : "0 0 12px rgba(0,212,255,0.6)",
            }}
          />
        </div>

        {/* Right side */}
        <div className="w-1/2 pl-12">
          {!isLeft && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={fadeInRight}
            >
              <ItemContent
                title={title}
                company={company}
                period={period}
                location={location}
                highlights={highlights}
                note={note}
                previousCareer={previousCareer}
                expanded={expanded}
                onToggle={() => setExpanded((e) => !e)}
                align="left"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile: left-edge layout */}
      <div className="flex md:hidden w-full">
        <div className="flex flex-col items-center mr-4" style={{ minWidth: 16 }}>
          <div
            className="w-3 h-3 rounded-full pulse-dot mt-2"
            style={{
              background: previousCareer ? "var(--text-secondary)" : "var(--accent-primary)",
            }}
          />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInRight}
          className="flex-1 pb-8"
        >
          <ItemContent
            title={title}
            company={company}
            period={period}
            location={location}
            highlights={highlights}
            note={note}
            previousCareer={previousCareer}
            expanded={expanded}
            onToggle={() => setExpanded((e) => !e)}
            align="left"
          />
        </motion.div>
      </div>
    </div>
  );
}

function ItemContent({
  title,
  company,
  period,
  location,
  highlights,
  note,
  previousCareer,
  expanded,
  onToggle,
  align,
}: {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  note?: string;
  previousCareer?: boolean;
  expanded: boolean;
  onToggle: () => void;
  align: "left" | "right";
}) {
  return (
    <div
      className="rounded-xl p-6 cursor-pointer group transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${previousCareer ? "rgba(136,136,160,0.25)" : "rgba(0, 212, 255, 0.12)"}`,
        boxShadow: previousCareer
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.4), 0 0 0 0 transparent",
      }}
      onClick={onToggle}
      onMouseEnter={(e) => {
        if (!previousCareer) {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 212, 255, 0.3)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.06)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = previousCareer ? "rgba(136,136,160,0.25)" : "rgba(0, 212, 255, 0.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
      }}
    >
      {note && (
        <span
          className="inline-block text-xs font-mono px-2 py-0.5 rounded mb-3"
          style={{
            background: "rgba(136,136,160,0.15)",
            color: "var(--text-secondary)",
            border: "1px solid rgba(136,136,160,0.2)",
          }}
        >
          {note}
        </span>
      )}
      <h3
        className="text-xl font-bold font-mono mb-2"
        style={{ color: previousCareer ? "var(--text-secondary)" : "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p className="font-semibold mb-2" style={{ color: "var(--accent-primary)", fontSize: "1rem" }}>
        {company}
      </p>
      <div className={`flex gap-3 text-sm mb-4 ${align === "right" ? "justify-end" : ""}`} style={{ color: "var(--text-secondary)" }}>
        <span>{period}</span>
        <span>·</span>
        <span>{location}</span>
      </div>

      {/* Expand/collapse indicator */}
      <div className="flex items-center gap-1 text-xs font-mono" style={{ color: "var(--accent-primary)", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
        <span>{expanded ? "[ collapse ]" : "[ expand ]"}</span>
      </div>

      {expanded && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-3 space-y-2 overflow-hidden"
        >
          {highlights.map((h, i) => (
            <li key={i} className={`text-sm flex gap-2 ${align === "right" ? "flex-row-reverse" : ""}`} style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--accent-primary)", flexShrink: 0 }}>▸</span>
              <span>{h}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
