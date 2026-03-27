"use client";

import { BLOG_POSTS, PERSONAL } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const PLATFORMS = ["All", "Medium", "Dev.to"];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-mono tracking-widest uppercase mb-3" style={{ color: "var(--accent-primary)" }}>
            // writing
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold font-mono mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Blog
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Thoughts on engineering, remote work, AI, and life on the road.
          </p>
        </div>

        {/* Platform filter — static for now, JS-free */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {PLATFORMS.map((p) => (
            <span
              key={p}
              className="text-xs font-mono px-3 py-1.5 rounded cursor-pointer transition-all duration-200"
              style={{
                background: p === "All" ? "var(--accent-glow)" : "var(--bg-secondary)",
                color: p === "All" ? "var(--accent-primary)" : "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {BLOG_POSTS.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 rounded-lg transition-all duration-200 hover:border-[rgba(0,212,255,0.25)] hover:-translate-y-0.5"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}

            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
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
                  <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                    {formatDate(post.date)}
                  </span>
                </div>
                <h2
                  className="text-base font-bold font-mono mb-1 transition-colors duration-200 group-hover:text-[var(--accent-primary)]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.title}
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {post.excerpt}
                </p>
              </div>
              <div
                className="mt-1 flex-shrink-0 transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
              >
                <ExternalLinkIcon />
              </div>
            </a>
          ))}
        </div>

        {/* Empty state note */}
        <p className="mt-10 text-xs font-mono text-center" style={{ color: "var(--text-secondary)" }}>
          // placeholder posts — replace with real links in lib/constants.ts
        </p>
      </div>
    </div>
  );
}
