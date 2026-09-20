"use client";

import Link from "next/link";
import { useRef } from "react";
import { PERSONAL } from "@/lib/constants";

const links = [
  { label: "Systems", href: "/#systems" },
  { label: "Approach", href: "/#approach" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const mobileNavRef = useRef<HTMLDetailsElement>(null);
  const closeMobileNav = () => mobileNavRef.current?.removeAttribute("open");

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="wordmark" href="/" aria-label="Bryan Oyloe, home">
          <span className="wordmark-mark" aria-hidden="true">BO</span>
          <span>Bryan Oyloe</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a className="nav-resume" href={PERSONAL.resumeUrl}>
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <details className="mobile-nav" ref={mobileNavRef}>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMobileNav}>
                {link.label}
              </Link>
            ))}
            <a href={PERSONAL.resumeUrl} onClick={closeMobileNav}>Résumé ↗</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
