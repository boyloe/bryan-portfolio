"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";
import { EXPERIENCE } from "@/lib/constants";

export default function Experience() {
  return (
    <section id="experience" style={{ paddingTop: "9rem", paddingBottom: "9rem", background: "var(--bg-secondary)" }}>
      <div className="section-container">
        <SectionHeading
          label="// experience"
          title="Work History"
          subtitle="5+ years of full-stack development across healthcare, real estate, and beyond."
        />

        {/* Timeline container */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, var(--accent-primary), transparent)", opacity: 0.3 }}
          />
          {/* Left edge line (mobile) */}
          <div
            className="block md:hidden absolute left-1.5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--accent-primary), transparent)", opacity: 0.3 }}
          />

          <div className="space-y-12">
            {EXPERIENCE.map((job, i) => (
              <TimelineItem key={i} {...job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
