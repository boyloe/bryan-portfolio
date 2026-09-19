# Bryan Oyloe — Portfolio

A Next.js portfolio focused on senior full-stack and Forward Deployed Engineer roles. The site presents selected private systems through sanitized case studies that expose architecture, decisions, tradeoffs, and verification evidence without exposing credentials, personal records, or production access.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4 plus a global design layer
- IBM Plex Sans and IBM Plex Mono via `next/font`

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
pnpm lint
pnpm build
```

## Content structure

- `/` — positioning, selected systems, delivery approach, experience, and about
- `/work/job-search-command-center` — sanitized architecture and delivery case study
- `/work/daily-momentum-command-center` — sanitized multi-interface workflow case study
- `/resume/bryan-oyloe-forward-deployed-engineer.pdf` — current role-specific résumé
- `/case-studies/bryan-oyloe-private-systems-case-studies.pdf` — printable case-study packet

## Deployment safety

Work should be reviewed in a preview deployment before any production promotion. Do not merge to `main` or promote a deployment without explicit approval.
