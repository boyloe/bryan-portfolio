export const PERSONAL = {
  name: "Bryan Oyloe",
  role: "Full-Stack Engineer for Customer-Facing Systems",
  email: "boyloe@gmail.com",
  location: "Remote — United States",
  github: "https://github.com/boyloe",
  linkedin: "https://linkedin.com/in/bryan-oyloe",
  resumeUrl: "/resume/bryan-oyloe-forward-deployed-engineer.pdf",
  caseStudyPdfUrl: "/case-studies/bryan-oyloe-private-systems-case-studies.pdf",
};

export type CaseStudy = {
  slug: string;
  index: string;
  name: string;
  descriptor: string;
  summary: string;
  role: string;
  technologies: string[];
  evidence: { value: string; label: string }[];
  problem: string;
  ownership: string;
  decisions: { title: string; body: string }[];
  tradeoffs: string[];
  verification: string[];
  architecture: { label: string; detail: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "job-search-command-center",
    index: "01",
    name: "Job Search Command Center",
    descriptor: "Multi-source data + structured LLM evaluation",
    summary:
      "A privately operated system that turns inconsistent ATS feeds into a normalized, cost-aware application workflow with explainable recommendations.",
    role: "System design, adapters, data model, evaluation contracts, dashboard, deployment, and operations",
    technologies: ["Python", "SQLite", "ATS APIs", "LLM evaluation", "FastAPI", "Telegram"],
    evidence: [
      { value: "3", label: "ATS adapters" },
      { value: "89 + 2", label: "tests and subtests" },
      { value: "1", label: "durable source of truth" },
    ],
    problem:
      "Job leads arrived from different applicant-tracking systems with inconsistent fields and duplicated lifecycle work. Generic keyword matching obscured seniority, location, compensation, and application-plausibility risks. Model calls also needed explicit cost controls.",
    ownership:
      "I designed and built the ingestion adapters, normalized data model, evaluation contracts, application-state workflow, operational dashboard, scheduled pipeline, Telegram digest, private deployment, and test coverage.",
    decisions: [
      {
        title: "Keep source quirks at the edge",
        body: "Each ATS owns its retrieval and normalization logic. Downstream evaluation consumes one source-agnostic contract instead of accumulating vendor conditionals.",
      },
      {
        title: "Put deterministic state around model output",
        body: "Deduplication, eligibility, lifecycle transitions, and cost gates remain deterministic. LLM output is schema-validated and stored with model, latency, token, prompt-version, and cost telemetry.",
      },
      {
        title: "Treat cost as a product constraint",
        body: "Already-evaluated, applied, closed, incomplete, or implausible records are filtered before model use. The dashboard cannot trigger paid evaluation.",
      },
      {
        title: "Design an operational surface, not a demo",
        body: "The dashboard exposes recommendations, run health, service state, and application lifecycle while keeping ingestion and scheduler controls outside the UI.",
      },
    ],
    tradeoffs: [
      "SQLite favors operational simplicity over horizontal scale.",
      "A private network and shared token fit a single-user threat model; this is not multi-tenant authentication.",
      "Explicit workflow boundaries add code but reduce accidental spend and state corruption.",
    ],
    verification: [
      "89 tests plus 2 subtests pass in the private repository.",
      "Three independently implemented ATS integrations use a common normalized contract.",
      "Evaluation output is schema-constrained and recorded with per-run telemetry.",
      "The private service is monitored through health and administration views.",
    ],
    architecture: [
      { label: "ATS sources", detail: "Ashby · Greenhouse · Lever" },
      { label: "Adapters", detail: "retrieve · normalize · deduplicate" },
      { label: "SQLite", detail: "raw jobs · evaluations · lifecycle" },
      { label: "Evaluator", detail: "schema · scoring · cost telemetry" },
      { label: "Interfaces", detail: "dashboard · Telegram digest" },
    ],
  },
  {
    slug: "daily-momentum-command-center",
    index: "02",
    name: "Daily Momentum Command Center",
    descriptor: "One task workflow across browser and chat",
    summary:
      "A private task platform that keeps browser actions, Telegram commands, reminders, and scheduled check-ins on one durable domain model.",
    role: "Product workflow, API, persistence, messaging interface, reminders, deployment, and tests",
    technologies: ["Python", "FastAPI", "Pydantic", "SQLite", "Telegram", "systemd"],
    evidence: [
      { value: "2", label: "user interfaces" },
      { value: "38", label: "automated tests" },
      { value: "1", label: "shared task state" },
    ],
    problem:
      "Tasks entered in chat, reminders, and a browser dashboard easily drift into separate sources of truth. The system needed one durable task model, consistent behavior across interfaces, and reliable reminder semantics.",
    ownership:
      "I designed and built the API, SQLite task store, typed domain models, Telegram command layer, reminder workflow, dashboard actions, private deployment, and automated tests.",
    decisions: [
      {
        title: "Make every interface use the same state",
        body: "The browser UI, API, Telegram commands, check-ins, and reminder sender all use one SQLite-backed TaskStore instead of maintaining interface-specific copies.",
      },
      {
        title: "Model lifecycle behavior explicitly",
        body: "Create, update, complete, snooze, and permanent delete have distinct semantics. Reminder delivery records the send and advances the schedule instead of silently duplicating notifications.",
      },
      {
        title: "Constrain the API boundary",
        body: "Typed Pydantic models validate areas, priorities, statuses, time fields, completion criteria, materials, location context, and estimates before data reaches storage.",
      },
      {
        title: "Keep the production footprint appropriate",
        body: "A supervised user service binds to a private network interface, uses a token gate, persists locally, and exposes a health endpoint for operational verification.",
      },
    ],
    tradeoffs: [
      "SQLite is appropriate for a single-user service but not a multi-writer SaaS deployment.",
      "A lightweight command parser favors predictable behavior over unrestricted natural language.",
      "Private-network deployment reduces exposure but intentionally limits public demos.",
    ],
    verification: [
      "38 automated tests cover the private system.",
      "CRUD, snooze, reminders, Telegram parsing, dashboard, API, and scheduler behavior are exercised.",
      "Health checks and direct database readbacks support release verification.",
      "The same state is exercised through browser and messaging workflows.",
    ],
    architecture: [
      { label: "Interfaces", detail: "browser UI · Telegram" },
      { label: "FastAPI", detail: "typed requests · domain actions" },
      { label: "TaskStore", detail: "SQLite lifecycle + reminders" },
      { label: "Scheduler", detail: "check-ins · due reminders" },
      { label: "Private access", detail: "token gate · tailnet bind" },
    ],
  },
];

export const EXPERIENCE = [
  {
    company: "Whitelabel Collaborative",
    title: "Full Stack Developer II",
    period: "2021 — Present",
    summary:
      "Delivering production software across healthcare, pharmaceutical, real-estate, and enterprise client environments.",
    highlights: [
      "Built and maintained Ruby on Rails applications and React interfaces for regulated and data-intensive workflows.",
      "Delivered a HIPAA-conscious prescription workflow for secure physician-to-enterprise transmission.",
      "Designed APIs, integrations, dashboards, and reporting tools while working directly with product and design partners.",
      "Introduced AI-assisted workflows for code review, bug detection, and summarization with human validation.",
    ],
  },
  {
    company: "Igedla LLC",
    title: "Full Stack Mobile Development Intern",
    period: "2020 — 2021",
    summary: "Built mobile healthcare experiences and helped establish frontend architecture.",
    highlights: [
      "Developed a React Native symptom-checker workflow with Merck Manual API integration.",
      "Designed and launched the company website with Gatsby and React.",
    ],
  },
  {
    company: "Newpark Drilling Fluids",
    title: "Drilling Fluids Specialist II",
    period: "2018 — 2020",
    summary: "Field engineering in high-stakes operating environments before moving into software.",
    highlights: [
      "Translated live field conditions into cost-aware technical recommendations for rig and engineering teams.",
      "Contributed to a stuck-pipe remediation that saved a client approximately $3M.",
    ],
  },
];

export const CAPABILITIES = [
  {
    label: "Discover",
    detail: "Clarify the real workflow, users, constraints, and success criteria before prescribing architecture.",
  },
  {
    label: "Design",
    detail: "Shape data contracts, APIs, integrations, state transitions, and failure boundaries that teams can reason about.",
  },
  {
    label: "Deliver",
    detail: "Build across Rails, React, Next.js, TypeScript, Python, SQL, and third-party systems with tests alongside the work.",
  },
  {
    label: "Operate",
    detail: "Own rollout, monitoring, cost controls, support paths, and the tradeoffs that appear after a system meets production.",
  },
];
