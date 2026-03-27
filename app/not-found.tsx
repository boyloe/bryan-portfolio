import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center font-mono">
        <div className="text-8xl font-bold mb-4" style={{ color: "var(--accent-primary)" }}>
          404
        </div>
        <p className="text-xl mb-2" style={{ color: "var(--text-primary)" }}>
          Page not found
        </p>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          // must have taken a wrong turn on the road
        </p>
        <Link
          href="/"
          className="text-sm px-4 py-2 rounded transition-all duration-200"
          style={{
            background: "var(--accent-glow)",
            color: "var(--accent-primary)",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}
