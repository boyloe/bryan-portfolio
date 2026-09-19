import Link from "next/link";

export default function NotFound() {
  return (
    <section className="case-section">
      <div className="shell compact-heading">
        <p className="eyebrow">404 · Route not found</p>
        <h1>That path does not lead to a system.</h1>
        <p className="hero-lede">The page may have moved, or the address may be incomplete.</p>
        <Link className="button button-primary" href="/">← Return home</Link>
      </div>
    </section>
  );
}
