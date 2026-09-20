import Link from "next/link";
import { CAPABILITIES, CASE_STUDIES, EXPERIENCE, PERSONAL } from "@/lib/constants";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <section className="hero ruled-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Full-stack engineering · customer solutions</p>
            <h1>I turn ambiguous workflows into reliable software.</h1>
            <p className="hero-lede">
              I work across discovery, architecture, APIs, data, frontend delivery, testing,
              rollout, and production support—especially where the problem is still taking shape.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#systems">View selected systems <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href={`mailto:${PERSONAL.email}`}>Start a conversation <Arrow /></a>
            </div>
          </div>

          <aside className="hero-brief" aria-label="Role brief">
            <p className="brief-label">Current brief / 2026</p>
            <dl>
              <div><dt>Seeking</dt><dd>Senior Full-Stack or Forward Deployed Engineer roles</dd></div>
              <div><dt>Strongest fit</dt><dd>Customer-facing products, integrations, regulated workflows, applied AI</dd></div>
              <div><dt>Core stack</dt><dd>Rails · React · TypeScript · Python · SQL</dd></div>
              <div><dt>Based</dt><dd>Remote, United States</dd></div>
            </dl>
          </aside>
        </div>

        <div className="shell proof-strip" aria-label="Professional overview">
          <div><strong>5+ years</strong><span>shipping production software</span></div>
          <div><strong>End to end</strong><span>discovery through operations</span></div>
          <div><strong>High-context</strong><span>healthcare, pharma, real estate</span></div>
          <div><strong>Field tested</strong><span>engineering before software</span></div>
        </div>
      </section>

      <section className="section" id="systems">
        <div className="shell">
          <header className="section-heading split-heading">
            <div>
              <p className="eyebrow">Selected systems</p>
              <h2>Evidence over project thumbnails.</h2>
            </div>
            <p>
              These systems are private and actively operated. The case studies expose the problem,
              architecture, decisions, tradeoffs, and verification evidence without exposing private data.
            </p>
          </header>

          <div className="case-list">
            {CASE_STUDIES.map((study) => (
              <article className="case-card" key={study.slug}>
                <div className="case-index">{study.index}</div>
                <div className="case-main">
                  <p className="case-kicker">{study.descriptor}</p>
                  <h3>{study.name}</h3>
                  <p>{study.summary}</p>
                  <div className="tag-list" aria-label="Technologies">
                    {study.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                  <Link className="text-link" href={`/work/${study.slug}`}>
                    Read the case study <Arrow />
                  </Link>
                </div>
                <div className="case-evidence" aria-label="Verification evidence">
                  {study.evidence.map((item) => (
                    <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="section-action">
            <a className="text-link" href={PERSONAL.caseStudyPdfUrl}>
              Download the complete sanitized case-study packet <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="section section-ink" id="approach">
        <div className="shell">
          <header className="section-heading split-heading">
            <div>
              <p className="eyebrow eyebrow-light">How I work</p>
              <h2>One owner across the delivery loop.</h2>
            </div>
            <p>
              Forward deployed engineering is less about a title than an operating model: learn the domain,
              reduce ambiguity, build the right system, and stay accountable after launch.
            </p>
          </header>
          <ol className="capability-grid">
            {CAPABILITIES.map((capability, index) => (
              <li key={capability.label}>
                <span className="step-number">0{index + 1}</span>
                <h3>{capability.label}</h3>
                <p>{capability.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="shell">
          <header className="section-heading split-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2>Software judgment shaped in production.</h2>
            </div>
            <p>
              My path runs from field engineering to full-stack delivery. The common thread is diagnosing
              real operating conditions, communicating clearly, and making the system work.
            </p>
          </header>

          <div className="experience-list">
            {EXPERIENCE.map((role) => (
              <article key={`${role.company}-${role.title}`}>
                <div className="experience-meta">
                  <p>{role.period}</p>
                  <p>{role.company}</p>
                </div>
                <div className="experience-content">
                  <h3>{role.title}</h3>
                  <p className="role-summary">{role.summary}</p>
                  <ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="shell about-grid">
          <div>
            <p className="eyebrow">About</p>
            <h2>Systems thinking, without losing the human context.</h2>
          </div>
          <div className="about-copy">
            <p>
              Before software, I worked as a petroleum engineer in operating environments where technical
              decisions carried real cost and schedule consequences. That background still shapes how I work:
              understand the system, make risk visible, and communicate with the people closest to the problem.
            </p>
            <p>
              Since 2021, I have worked remotely while traveling the US and Canada with my wife and our two cats.
              It is a human detail, but also evidence of the adaptability and ownership I bring to distributed teams.
            </p>
            <div className="about-links">
              <a className="text-link" href={PERSONAL.resumeUrl}>Read my résumé <Arrow /></a>
              <a className="text-link" href={PERSONAL.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
