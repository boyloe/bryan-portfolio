"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp, viewportOptions } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PERSONAL } from "@/lib/constants";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(PERSONAL.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: Replace with your Formspree endpoint or API route
    try {
      await new Promise((r) => setTimeout(r, 1200)); // placeholder
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "0.375rem",
    padding: "0.75rem 1rem",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  };

  return (
    <section id="contact" style={{ paddingTop: "10rem", paddingBottom: "10rem", background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <SectionHeading
          label="// contact"
          title="Get in Touch"
          subtitle="I'm always open to discussing new opportunities, interesting projects, or just talking shop. Currently open to remote-first roles."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid md:grid-cols-2 gap-16"
        >
          {/* Form */}
          <motion.form variants={fadeInLeft} onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your name" },
              { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[name as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--accent-primary)";
                    e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>
                Message
              </label>
              <textarea
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--accent-primary)";
                  e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-mono"
                  style={{ color: "#00ffaa" }}
                >
                  <span>✓</span>
                  <span>Message sent! I&apos;ll be in touch soon.</span>
                </motion.div>
              ) : status === "error" ? (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-mono" style={{ color: "#ff6b6b" }}>
                    ✗ Something went wrong. Try again or email me directly.
                  </p>
                  <Button variant="primary" onClick={() => setStatus("idle")}>
                    Retry
                  </Button>
                </div>
              ) : (
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 px-6 rounded font-mono text-sm font-medium transition-all duration-200"
                  style={{
                    background: "var(--gradient-accent)",
                    color: "#0a0a0f",
                    opacity: status === "loading" ? 0.7 : 1,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                  }}
                  whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </motion.button>
              )}
            </div>
          </motion.form>

          {/* Contact info */}
          <motion.div variants={fadeInRight} className="space-y-6">
            <div>
              <p className="text-xs font-mono mb-4" style={{ color: "var(--text-secondary)" }}>
                // reach me directly
              </p>

              {/* Email with copy */}
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 p-4 rounded-lg w-full text-left transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(0,212,255,0.12)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), 0 0 16px rgba(0,212,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.12)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.4)";
                }}
              >
                <span style={{ color: "var(--accent-primary)" }}>@</span>
                <span className="flex-1 font-mono text-sm" style={{ color: "var(--text-primary)" }}>
                  {PERSONAL.email}
                </span>
                <span style={{ color: emailCopied ? "#00ffaa" : "var(--text-secondary)" }}>
                  {emailCopied ? <CheckIcon /> : <CopyIcon />}
                </span>
              </button>
            </div>

            {/* Links */}
            <div className="space-y-3">
              {[
                { label: "GitHub", url: PERSONAL.github, prefix: "github.com/" },
                { label: "LinkedIn", url: PERSONAL.linkedin, prefix: "linkedin.com/in/" },
              ].map(({ label, url, prefix }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg transition-all duration-200"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(0,212,255,0.12)",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.35)";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent-primary)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), 0 0 16px rgba(0,212,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.4)";
                  }}
                >
                  <span className="text-xs font-mono w-16 flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                  <span className="font-mono text-sm">{url.replace("https://", "")}</span>
                </a>
              ))}
            </div>

            {/* Resume download */}
            <a
              href={PERSONAL.resumeUrl}
              download
              className="flex items-center justify-center gap-2 p-4 rounded-lg font-mono text-sm transition-all duration-200"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(0,212,255,0.25)",
                color: "var(--accent-primary)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.4)";
              }}
            >
              ↓ Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
