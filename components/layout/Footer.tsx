import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center font-mono text-xs"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      <p>
        Built by{" "}
        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent-primary)" }}
        >
          {PERSONAL.name}
        </a>{" "}
        · Somewhere on the road 🐾
      </p>
    </footer>
  );
}
