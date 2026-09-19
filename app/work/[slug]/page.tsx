import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, PERSONAL } from "@/lib/constants";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  if (!study) return {};
  return {
    title: study.name,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  if (!study) notFound();

  return (
    <article className="case-page">
      <header className="case-hero ruled-section">
        <div className="shell">
          <Link className="back-link" href="/#systems">← Selected systems</Link>
          <p className="eyebrow">Case study {study.index} · Sanitized private system</p>
          <h1>{study.name}</h1>
          <p className="case-hero-lede">{study.summary}</p>
          <div className="case-role"><span>Ownership</span><p>{study.role}</p></div>
          <div className="tag-list" aria-label="Technologies">
            {study.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      </header>

      <section className="case-section">
        <div className="shell problem-grid">
          <div><p className="eyebrow">The problem</p><h2>What needed to change</h2></div>
          <div className="long-copy"><p>{study.problem}</p><p>{study.ownership}</p></div>
        </div>
      </section>

      <section className="case-section case-section-muted">
        <div className="shell">
          <div className="section-heading compact-heading">
            <p className="eyebrow">System map</p>
            <h2>One request, traced end to end.</h2>
          </div>
          <ol className="architecture-flow">
            {study.architecture.map((node, index) => (
              <li key={node.label}>
                <span className="flow-index">0{index + 1}</span>
                <strong>{node.label}</strong>
                <span>{node.detail}</span>
              </li>
            ))}
          </ol>
          <div className="metric-grid">
            {study.evidence.map((item) => (
              <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="shell">
          <div className="section-heading compact-heading">
            <p className="eyebrow">Key decisions</p>
            <h2>Designed for trust and operability.</h2>
          </div>
          <div className="decision-grid">
            {study.decisions.map((decision, index) => (
              <article key={decision.title}>
                <span>0{index + 1}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section section-ink">
        <div className="shell evidence-grid">
          <div>
            <p className="eyebrow eyebrow-light">Tradeoffs</p>
            <h2>What this design optimizes—and what it does not.</h2>
            <ul>{study.tradeoffs.map((tradeoff) => <li key={tradeoff}>{tradeoff}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow eyebrow-light">Verification</p>
            <h2>Private does not mean unverifiable.</h2>
            <ul className="check-list">{study.verification.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="case-section case-cta">
        <div className="shell case-cta-grid">
          <div><p className="eyebrow">Interview walkthrough</p><h2>Ask me to trace the system live.</h2></div>
          <div>
            <p>
              I can provide a guided, sanitized walkthrough of the workflow, representative code,
              architecture, automated tests, failure modes, and the changes required at larger scale.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={`mailto:${PERSONAL.email}?subject=${encodeURIComponent(`Case study: ${study.name}`)}`}>Discuss this system ↗</a>
              <a className="button button-secondary" href={PERSONAL.caseStudyPdfUrl}>Download packet ↗</a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
