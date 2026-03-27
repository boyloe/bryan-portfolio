"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function BlogPreview() {
  return (
    <section id="blog" style={{ paddingTop: "9rem", paddingBottom: "9rem", background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <SectionHeading
          label="// writing"
          title="From the Blog"
          subtitle="Thoughts on engineering, remote work, and life on the road."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {BLOG_POSTS.map((post, i) => (
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              className="group block rounded-lg overflow-hidden relative"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
              }}
              whileHover={{
                y: -4,
                borderColor: "rgba(0,212,255,0.3)",
                boxShadow: "0 8px 30px rgba(0,212,255,0.06)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                {/* Platform tag */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "var(--accent-glow)",
                      color: "var(--accent-primary)",
                      border: "1px solid rgba(0,212,255,0.2)",
                    }}
                  >
                    {post.platform}
                  </span>
                  <motion.span
                    style={{ color: "var(--text-secondary)" }}
                    whileHover={{ color: "var(--accent-primary)" }}
                    className="group-hover:text-accent-primary transition-colors"
                  >
                    <ExternalLinkIcon />
                  </motion.span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold font-mono mb-2 group-hover:text-[var(--accent-primary)] transition-colors duration-200"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {post.excerpt}
                </p>

                {/* Date */}
                <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                  {formatDate(post.date)}
                </p>
              </div>

              {/* Bottom gradient overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "var(--gradient-accent)", opacity: 0, transition: "opacity 0.2s" }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
          className="flex justify-center mt-12"
        >
          <Link
            href="/blog"
            className="font-mono text-sm flex items-center gap-2 transition-all duration-200"
            style={{ color: "var(--accent-primary)" }}
          >
            Read more on the blog
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
