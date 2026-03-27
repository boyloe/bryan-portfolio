export const PERSONAL = {
  name: "Bryan Oyloe",
  title: "Full Stack Software Engineer",
  email: "boyloe@gmail.com",
  location: "Remote — currently traveling the US & Canada",
  github: "https://github.com/boyloe",
  linkedin: "https://linkedin.com/in/bryan-oyloe",
  resumeUrl: "/resume/Bryan_Oyloe_Resume.pdf",
};

export const EXPERIENCE = [
  {
    title: "Full Stack Developer II",
    company: "Whitelabel Collaborative",
    period: "Feb 2021 – Present",
    location: "Remote",
    current: true,
    highlights: [
      "Built and maintained large-scale Ruby on Rails applications for healthcare, pharmaceutical, and real estate clients",
      "Developed a HIPAA-compliant digital prescription portal for secure physician-to-enterprise prescription transmission",
      "Designed and enhanced RESTful APIs improving reliability and response times for internal tools and external integrations",
      "Created data-driven dashboards and reporting tools for client financial analysis and historical trend tracking",
      "Implemented dynamic, performant React interfaces across multiple applications",
      "Maintained a complex Rails backend helping users compare healthcare providers and reduce costs",
      "Integrated custom AI agents using LangChain and AutoGen for automated code review, bug detection, and dataset summarization",
      "Collaborated closely with product managers and designers on feature scoping and delivery",
    ],
  },
  {
    title: "Full Stack Mobile Development Intern",
    company: "Igedla LLC",
    period: "Dec 2020 – Apr 2021",
    location: "Denver, CO",
    current: false,
    highlights: [
      "Developed a symptom-checker chatbot using React Native with Merck Manual API integration",
      "Built multiple mobile app screens and contributed to frontend architecture decisions",
      "Designed and launched the company website from scratch using Gatsby and React",
    ],
  },
  {
    title: "Drilling Fluids Specialist II",
    company: "Newpark Drilling Fluids",
    period: "Jul 2018 – Feb 2020",
    location: "Denver, CO",
    current: false,
    previousCareer: true,
    highlights: [
      "Supported active drilling operations with fluid analysis and cost-effective treatment recommendations",
      "Produced daily technical reports for rig personnel and engineering teams",
      "Contributed to a stuck-pipe remediation that saved a client approximately $3M",
    ],
    note: "Previous Career — Engineering Background",
  },
];

export const EDUCATION = [
  {
    degree: "B.Sc. in Petroleum Engineering",
    school: "University of North Dakota",
  },
  {
    degree: "Full Stack Web Development Program",
    school: "Flatiron School",
  },
];

export const SKILLS: Record<string, string[]> = {
  "Languages & Frameworks": ["Ruby on Rails", "React", "TypeScript", "JavaScript", "Python", "Node.js"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Gatsby", "React Native"],
  Backend: ["REST APIs", "ActiveRecord", "Background Jobs", "Auth & Authorization"],
  Database: ["PostgreSQL"],
  Practices: ["Test-Driven Development", "Performance Optimization", "Code Reviews"],
  "AI & Automation": ["LangChain", "AutoGen", "AI-Assisted Workflows"],
  "Domain Expertise": ["HIPAA-Compliant Systems", "Third-Party API Integrations"],
};

export const BLOG_POSTS = [
  {
    title: "Integrating AI Agents into Legacy Rails Apps",
    excerpt:
      "How I used LangChain and AutoGen to add AI-powered code review to an existing Rails monolith.",
    date: "2025-12-15",
    platform: "Medium",
    url: "#",
  },
  {
    title: "Living on the Road as a Remote Engineer",
    excerpt:
      "5 years of full-time travel, 2 cats, and a career in software — here's what I've learned.",
    date: "2025-10-22",
    platform: "Dev.to",
    url: "#",
  },
  {
    title: "Why I Switched from Petroleum Engineering to Software",
    excerpt:
      "From drilling rigs to deployment pipelines — my unconventional path into tech.",
    date: "2025-08-05",
    platform: "Medium",
    url: "#",
  },
  {
    title: "Building HIPAA-Compliant Systems: Lessons Learned",
    excerpt:
      "Practical advice for developers working in healthcare software for the first time.",
    date: "2025-06-18",
    platform: "Dev.to",
    url: "#",
  },
];

export const TYPING_PHRASES = [
  "Full Stack Engineer",
  "React & Rails Specialist",
  "Building from the road",
  "5+ years shipping production software",
];
