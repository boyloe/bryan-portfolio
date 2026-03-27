"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSONAL } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "About", href: "#about", section: true },
  { label: "Experience", href: "#experience", section: true },
  { label: "Skills", href: "#skills", section: true },
  { label: "Blog", href: "/blog", section: false },
  { label: "Contact", href: "#contact", section: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section
      const sections = ["home", "about", "experience", "skills", "blog", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-lg transition-all duration-200"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent-primary)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
          >
            {PERSONAL.name}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href, section }) => {
              const isActive = section
                ? activeSection === href.replace("#", "")
                : pathname === href;

              return section && pathname === "/" ? (
                <button
                  key={label}
                  onClick={() => scrollTo(href.replace("#", ""))}
                  className="relative text-sm font-mono transition-colors duration-200"
                  style={{ color: isActive ? "var(--accent-primary)" : "var(--text-secondary)" }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "var(--accent-primary)" }}
                    />
                  )}
                </button>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-mono transition-colors duration-200"
                  style={{ color: isActive ? "var(--accent-primary)" : "var(--text-secondary)" }}
                >
                  {label}
                </Link>
              );
            })}

            <a
              href={PERSONAL.resumeUrl}
              download
              className="text-xs font-mono px-3 py-1.5 rounded transition-all duration-200"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                color: "var(--accent-primary)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-glow)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-px"
                style={{ background: "var(--text-primary)" }}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y: menuOpen && i === 0 ? 6 : menuOpen && i === 2 ? -6 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(10,10,15,0.97)" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map(({ label, href, section }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {section ? (
                    <button
                      onClick={() => scrollTo(href.replace("#", ""))}
                      className="text-3xl font-mono font-bold transition-colors duration-200"
                      style={{ color: "var(--text-primary)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent-primary)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="text-3xl font-mono font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
