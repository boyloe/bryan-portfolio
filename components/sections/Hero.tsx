"use client";

import { useRef, useState, useCallback, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PERSONAL, TYPING_PHRASES } from "@/lib/constants";
import TypingAnimation from "@/components/ui/TypingAnimation";
import SceneFallback from "@/components/three/SceneFallback";
import Button from "@/components/ui/Button";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Hero() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [webglSupported] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch {
      return false;
    }
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    mouseX.current = (clientX / width) * 2 - 1;
    mouseY.current = -(clientY / height) * 2 + 1;
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden dot-grid"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Scene or Fallback */}
      <div className="absolute inset-0 -z-10">
        {webglSupported ? (
          <Suspense fallback={<SceneFallback />}>
            <HeroScene mouseX={mouseX} mouseY={mouseY} />
          </Suspense>
        ) : (
          <SceneFallback />
        )}
      </div>

      {/* Scanline */}
      <div className="scanline" />

      {/* Vignette */}
      <div
        className="absolute inset-0 -z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="font-mono font-bold leading-none"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5rem)",
              color: "var(--text-primary)",
              textShadow: "0 0 40px rgba(0,212,255,0.15)",
            }}
          >
            {PERSONAL.name}
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl font-mono h-8"
            style={{ color: "var(--accent-primary)" }}
          >
            <TypingAnimation phrases={TYPING_PHRASES} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Button variant="primary" onClick={() => scrollTo("experience")}>
              View My Work
            </Button>
            <Button variant="outline" onClick={() => scrollTo("contact")}>
              Get in Touch
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 1.1 }}
            className="flex gap-6 mt-2"
          >
            {[
              { href: PERSONAL.github, icon: <GithubIcon />, label: "GitHub" },
              { href: PERSONAL.linkedin, icon: <LinkedInIcon />, label: "LinkedIn" },
              { href: `mailto:${PERSONAL.email}`, icon: <EmailIcon />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-all duration-200"
                style={{ color: "var(--text-secondary)" }}
                whileHover={{
                  color: "var(--accent-primary)",
                  filter: "drop-shadow(0 0 8px rgba(0,212,255,0.6))",
                  scale: 1.15,
                }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        style={{ color: "var(--text-secondary)" }}
        aria-label="Scroll down"
        whileHover={{ color: "var(--accent-primary)" }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown />
        </motion.div>
      </motion.button>
    </section>
  );
}
