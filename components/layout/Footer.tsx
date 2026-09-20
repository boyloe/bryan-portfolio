import Link from "next/link";
import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Available for the next hard problem</p>
          <p className="footer-statement">
            Need an engineer who can move from an unclear workflow to a working production system?
          </p>
        </div>
        <div className="footer-links" aria-label="Contact links">
          <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
          <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={PERSONAL.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={PERSONAL.resumeUrl}>Résumé ↗</a>
        </div>
      </div>
      <div className="shell footer-base">
        <span>© {new Date().getFullYear()} Bryan Oyloe</span>
        <Link href="/">Full-stack engineering · customer solutions · production ownership</Link>
      </div>
    </footer>
  );
}
