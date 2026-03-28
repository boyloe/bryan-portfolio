"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/constants";

const CATEGORY_COLORS: Record<string, string> = {
  "Languages & Frameworks": "#00d4ff",
  Frontend: "#0099ff",
  Backend: "#00ffaa",
  Database: "#ff6b6b",
  Practices: "#ffd166",
  "AI & Automation": "#c77dff",
  "Domain Expertise": "#ff9f1c",
};

interface TerminalLine {
  text: string;
  color?: string;
  delay: number;
  type: "command" | "category" | "skill" | "blank" | "header";
}

function buildLines(): TerminalLine[] {
  const lines: TerminalLine[] = [
    { text: "$ bryan --skills --verbose", color: "#00d4ff", delay: 0, type: "command" },
    { text: "", delay: 200, type: "blank" },
    { text: "Loading skill profile for Bryan Oyloe...", color: "#8888a0", delay: 400, type: "header" },
    { text: "─────────────────────────────────────────────────────", color: "#1a1a2e", delay: 500, type: "header" },
    { text: "", delay: 600, type: "blank" },
  ];

  let delay = 700;
  Object.entries(SKILLS).forEach(([category, skills]) => {
    const color = CATEGORY_COLORS[category] || "#00d4ff";
    lines.push({ text: `[${category.toUpperCase()}]`, color, delay, type: "category" });
    delay += 120;
    skills.forEach((skill) => {
      lines.push({ text: `  ▸ ${skill}`, color: "#e4e4e7", delay, type: "skill" });
      delay += 80;
    });
    lines.push({ text: "", delay, type: "blank" });
    delay += 60;
  });

  lines.push({ text: "─────────────────────────────────────────────────────", color: "#1a1a2e", delay, type: "header" });
  delay += 100;
  lines.push({ text: "✓ Profile loaded. 5+ years of production experience.", color: "#00ffaa", delay, type: "header" });
  delay += 100;
  lines.push({ text: "$ _", color: "#00d4ff", delay, type: "command" });

  return lines;
}

export default function Skills() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lines = buildLines();

  // Start animation when in view
  const handleInView = () => {
    if (!started) {
      setStarted(true);
    }
  };

  useEffect(() => {
    if (!started) return;
    if (visibleCount >= lines.length) return;

    const nextLine = lines[visibleCount];
    const t = setTimeout(() => {
      setVisibleCount((c) => c + 1);
      // Auto scroll terminal
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, visibleCount === 0 ? 0 : nextLine.delay - (lines[visibleCount - 1]?.delay ?? 0));

    return () => clearTimeout(t);
  }, [started, visibleCount, lines]);

  return (
    <section id="skills" style={{ paddingTop: "10rem", paddingBottom: "10rem", background: "var(--bg-tertiary)" }}>
      <div className="section-container">
        <SectionHeading
          label="// skills"
          title="Tech Stack"
          subtitle="Run the command to see what I bring to the table."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
          onViewportEnter={handleInView}
        >
          {/* Terminal window */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,212,255,0.15)",
              background: "var(--bg-card)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(0,212,255,0.04)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "var(--border)", background: "var(--bg-tertiary)" }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              <span
                className="ml-3 text-xs font-mono"
                style={{ color: "var(--text-secondary)" }}
              >
                bryan@portfolio ~ skills
              </span>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="p-6 font-mono text-sm overflow-y-auto"
              style={{
                minHeight: 480,
                maxHeight: 600,
                background: "#0a0a0f",
                scrollbarWidth: "thin",
              }}
            >
              {lines.slice(0, visibleCount).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="leading-6"
                  style={{
                    color:
                      line.type === "skill"
                        ? "var(--text-primary)"
                        : line.color || "var(--text-secondary)",
                    fontWeight: line.type === "category" ? 700 : 400,
                    letterSpacing: line.type === "category" ? "0.05em" : undefined,
                  }}
                >
                  {line.text === "" ? <>&nbsp;</> : line.text}
                </motion.div>
              ))}

              {/* Blinking cursor at end */}
              {visibleCount < lines.length && (
                <span
                  className="cursor-blink inline-block w-2 h-4 align-middle"
                  style={{ background: "var(--accent-primary)" }}
                />
              )}
            </div>
          </div>

          {/* Replay button */}
          {visibleCount >= lines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end mt-4"
            >
              <button
                onClick={() => { setVisibleCount(0); setStarted(true); }}
                className="text-xs font-mono px-3 py-1 rounded transition-all duration-200"
                style={{
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                $ replay --animation
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
