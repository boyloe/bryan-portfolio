"use client";

import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp, viewportOptions } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" style={{ paddingTop: "10rem", paddingBottom: "10rem", background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <SectionHeading label="// about" title="About Me" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid md:grid-cols-2 gap-20 items-start"
        >
          {/* Text */}
          <motion.div variants={fadeInLeft} className="space-y-5">
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-primary)" }}>
              I&apos;m a full stack engineer who builds reliable, production-grade web applications — and I do it from a travel trailer somewhere in North America.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              For the past 5+ years, my wife, our two cats, and I have been living on the road full-time, working remotely while exploring the US and Canada. I&apos;ve shipped healthcare portals, real estate platforms, construction tools, and AI-powered developer workflows — all from wherever we&apos;ve parked.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I bring the same adaptability to my code that I bring to life on the road: pragmatic, resourceful, and always moving forward.
            </p>

            <div
              className="mt-6 p-5 rounded-xl border-l-2"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--accent-primary)",
                borderLeft: "2px solid var(--accent-primary)",
              }}
            >
              <p className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent-primary)" }}>// note</span>
                <br />
                Before software, I was a Petroleum Engineer — I understand complex systems, high-stakes problem solving, and working under pressure.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: "5+", label: "Years Experience" },
                { value: "3", label: "Industries" },
                { value: "∞", label: "Miles Driven" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div
                    className="text-3xl font-bold font-mono"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual: Travel map placeholder */}
          <motion.div variants={fadeInRight} className="relative">
            <div
              className="rounded-xl overflow-hidden relative"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(0,212,255,0.12)",
                minHeight: 320,
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* Stylized map background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
                  backgroundSize: "100% 100%",
                }}
              />
              <div className="dot-grid absolute inset-0 opacity-40" />

              {/* Map content */}
              <div className="relative p-8 flex flex-col items-center justify-center h-full min-h-80 gap-4">
                <div className="text-6xl">🗺️</div>
                <p className="text-sm font-mono text-center" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-primary)" }}>// currently somewhere in</span>
                  <br />
                  North America
                </p>
                <div className="flex gap-2 flex-wrap justify-center mt-2">
                  {["US", "Canada"].map((loc) => (
                    <span
                      key={loc}
                      className="text-xs px-3 py-1 rounded-full font-mono"
                      style={{
                        background: "var(--accent-glow)",
                        color: "var(--accent-primary)",
                        border: "1px solid rgba(0,212,255,0.2)",
                      }}
                    >
                      {loc}
                    </span>
                  ))}
                </div>

                {/* Animated location pin */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-2xl mt-2"
                >
                  📍
                </motion.div>
              </div>

              {/* Glow border on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                whileHover={{ boxShadow: "0 0 30px rgba(0,212,255,0.08)" }}
              />
            </div>

            {/* Decorative tilt effect */}
            <div
              className="absolute -inset-1 rounded-lg -z-10"
              style={{
                background: "var(--gradient-accent)",
                opacity: 0.03,
                transform: "rotate(1deg)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
