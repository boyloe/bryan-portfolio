import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PERSONAL } from "@/lib/constants";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PERSONAL.name} — Full Stack Software Engineer`,
  description:
    "Full stack software engineer with 5+ years of experience building production applications in healthcare, real estate, and construction. React, Rails, TypeScript.",
  openGraph: {
    title: `${PERSONAL.name} — Full Stack Software Engineer`,
    description:
      "Building production-grade web applications from the road. React, Ruby on Rails, TypeScript, AI integrations.",
    type: "website",
    url: "https://bryanoyloe.com",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL.name} — Full Stack Software Engineer`,
    description: "Building production-grade web applications from the road.",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: PERSONAL.name,
      jobTitle: PERSONAL.title,
      email: PERSONAL.email,
      url: "https://bryanoyloe.com",
      sameAs: [PERSONAL.github, PERSONAL.linkedin],
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded font-mono text-sm"
          style={{ background: "var(--accent-primary)", color: "#0a0a0f" }}
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
