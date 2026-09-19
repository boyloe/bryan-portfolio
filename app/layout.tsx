import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PERSONAL } from "@/lib/constants";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bryanoyloe.com"),
  title: {
    default: "Bryan Oyloe — Full-Stack & Forward Deployed Engineer",
    template: "%s — Bryan Oyloe",
  },
  description:
    "Full-stack engineer who turns ambiguous customer workflows into reliable production systems across discovery, architecture, delivery, and operations.",
  keywords: [
    "full-stack engineer",
    "forward deployed engineer",
    "Ruby on Rails",
    "React",
    "TypeScript",
    "Python",
    "customer-facing engineering",
  ],
  authors: [{ name: PERSONAL.name, url: "https://bryanoyloe.com" }],
  openGraph: {
    title: "Bryan Oyloe — Full-Stack & Forward Deployed Engineer",
    description:
      "Customer-facing systems, production ownership, and sanitized case studies from private operational software.",
    type: "website",
    url: "https://bryanoyloe.com",
    siteName: "Bryan Oyloe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bryan Oyloe — Full-Stack & Forward Deployed Engineer",
    description: "From ambiguous workflow to reliable production system.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL.name,
  jobTitle: PERSONAL.role,
  email: `mailto:${PERSONAL.email}`,
  url: "https://bryanoyloe.com",
  sameAs: [PERSONAL.github, PERSONAL.linkedin],
  knowsAbout: [
    "Ruby on Rails",
    "React",
    "TypeScript",
    "Python",
    "API integrations",
    "Production operations",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
