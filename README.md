This is for Claude Code
# orgframework

**537 hand-written reference roles — 31 org presets — crisis templates — compensation data — region/industry/stage adaptation**

No fixed org chart builder. Describe your situation, and Claude Code dynamically constructs the optimal organizational structure for that specific context — with the right departments, roles, reporting lines, and regional/industry nuance.

```bash
/orgframework we're a 50-person fintech in Berlin expanding to Brazil
/orgframework design a respiratory therapy department for a regional hospital
/orgframework our Series B SaaS startup needs a compliance structure
/orgframework what's the right team structure for a remote-first design agency
```

---

## Table of Contents

- [What it is](#what-it-is)
- [Quick start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [What's inside](#whats-inside)
  - [Reference roles](#reference-roles)
  - [Org presets](#org-presets)
  - [Crisis templates](#crisis-templates)
  - [Compensation data](#compensation-data)
  - [Region profiles](#region-profiles)
  - [Industry profiles](#industry-profiles)
  - [Stage profiles](#stage-profiles)
  - [Guidance additions](#guidance-additions)
- [Architecture](#architecture)
  - [Directory layout](#directory-layout)
  - [How it works](#how-it-works)
  - [Role file format](#role-file-format)
  - [Preset file format](#preset-file-format)
- [Context dimensions](#context-dimensions)
- [Example](#example)
- [Development](#development)
  - [Running tests](#running-tests)
  - [Adding a role](#adding-a-role)
  - [Adding a preset](#adding-a-preset)
- [Roadmap](#roadmap)
- [License](#license)

---

## What it is

orgframework is a **reference library and skill for Claude Code** that helps Claude build better organizational structures. Instead of guessing what departments a fintech company needs or what a "Head of Compliance" in Germany should report to, Claude reads from:

- **537 hand-written roles** — each with responsibilities, KPIs, career paths, tools, cross-functional relationships, and regional/industry variations
- **31 org presets** — complete org structures for common scenarios (Series A SaaS, hospital system, fintech, restaurant kitchen, etc.)
- **6 crisis templates** — pre-built command structures for breach, layoff, acquisition, founder departure, PR crisis, regulatory investigation
- **Compensation data** — salary bands for 50+ roles across 4 regions and 4 levels
- **Region/industry/stage profiles** — laws, norms, metrics, and patterns that shape org design

The AI is **never limited** to these references. They exist to give Claude concrete, detailed examples to draw from — and to ground its recommendations in real-world patterns rather than generic guesses.

---

## Quick start

```bash
# 1. Install into your Claude Code project
bash path/to/orgframework/bin/install.sh

# 2. Use it in Claude Code
/orgframework we're a 30-person Series A SaaS company in Berlin, what's my org structure
```

Shortcodes for explicit context:
- Region: `@na` `@emea` `@apac` `@latam`
- Industry: `@saas` `@fintech` `@health` `@mfg` `@ecom`
- Stage: `@startup` `@scaleup` `@enterprise`

```bash
/orgframework @fintech @emea @scaleup we're expanding our payments team
```

---

## Installation

### Into any Claude Code project

```bash
# Clone the repo somewhere
git clone https://github.com/korishnn/orgframework.git

# Install into your project (from project root)
bash path/to/orgframework/bin/install.sh

# Or install into a specific directory
bash path/to/orgframework/bin/install.sh /path/to/your/project
```

This copies all roles, presets, and profiles into `.claude/orgframework/` and the skill definition into `.claude/skills/orgframework/`.

### Verify installation

```bash
node path/to/orgframework/bin/diagnose.js
```

Should show all components present and healthy.

---

## Usage

### General org design

```bash
/orgframework I need to hire a senior backend engineer in Berlin
/orgframework what does my Series A SaaS org look like with 25 people
/orgframework design the management structure for a 200-person manufacturing plant
/orgframework we're launching a new product line, what's the team structure
```

### Industry-specific

```bash
/orgframework design the compliance structure for a UK fintech
/orgframework what departments does a hospital need for respiratory therapy
/orgframework org structure for an ecommerce company during Black Friday
```

### International expansion

```bash
/orgframework US company expanding to Japan — what's the org plan
/orgframework we're opening a Brazil office from Berlin
```

### Crisis response

```bash
/orgframework we just had a data breach — what's the command structure
/orgframework our CTO is leaving suddenly, what's the transition plan
```

### Diagnostics and troubleshooting

```bash
/orgframework diagnose    # Show system health and learned preferences
/orgframework debug       # Show what was detected from your input
/orgframework reset       # Clear learned preferences
```

---

## What's inside

### Reference roles

**537 hand-written markdown files** in `.claude/orgframework/styles/`. Each covers one real-world role with:

| Field | What it contains |
|---|---|
| Summary | One-line description of the role |
| Level | IC, Manager, Head, VP, C-Suite |
| Reports to | Typical reporting structure |
| Responsibilities | 10-20 concrete responsibilities |
| Core Competencies | Skills and knowledge required |
| Tools & Technology | Common tools used in the role |
| KPIs & Success Metrics | How performance is measured |
| Career Progression | Typical ladder from junior to principal |
| Day-to-Day Workflow | What a typical week looks like |
| Cross-Functional Relationships | Who they work with and how |
| Regional Nuances | How the role varies by region |
| Industry Variations | How the role shifts by industry |
| Common Challenges | Pain points and pitfalls |
| Key Regulations & Compliance | Regulatory context |

**Domains covered:**

| Prefix | Domain | Example roles |
|---|---|---|
| `eng-` | Engineering | backend, frontend, devops, sre, ml, data, security, qa, mobile |
| `mkt-` | Marketing | brand, content, seo, growth, social, pr, marketing-ops |
| `sls-` | Sales | enterprise, sdr, solutions, customer-success, partnerships |
| `hr-` | HR | recruiting, hrbp, people-ops, compensation, l&d |
| `fin-` | Finance | controller, fp&a, tax, treasury, audit |
| `ops-` | Operations | operations, supply-chain, procurement, facilities |
| `lgl-` | Legal | counsel, compliance, privacy, contracts |
| `prd-` | Product | product-manager, product-ops, program-manager |
| `cs-` | Customer Support | support-engineer, success-manager, support-ops |
| `exec-` | Executive | ceo, coo, cfo, cto, chief-of-staff |
| `dsg-` | Design | product-design, ux, visual, brand, design-ops |
| `da-` | Data & Analytics | data-engineer, data-scientist, analyst, bi |
| `sec-` | Security & Compliance | security-engineer, grc, soc-analyst |
| `hlth-` | Healthcare | physician, nurse, surgeon, pharmacist, therapist |
| `edu-` | Education | teacher, professor, principal, librarian |
| `cre-` | Creative | director, producer, designer, editor, artist |
| `trade-` | Trades | carpenter, electrician, plumber, welder, mechanic |
| `tran-` | Transportation | driver, warehouse-manager, logistics |
| `avi-` | Aviation | pilot, flight-attendant, atc, mechanic |
| `hosp-` | Hospitality | hotel-manager, chef, concierge, housekeeping |
| `govt-` | Government | policy, administrator, inspector, diplomat |
| `mil-` | Military | officer, nco, specialist, strategist |
| `sci-` | Science | researcher, lab-manager, field-scientist |
| `np-` | Nonprofit | director, grant-writer, program-manager |
| `beauty-` | Beauty | barber, cosmetologist, esthetician, nail-tech |
| `acad-` | Academia | professor, researcher, anthropologist, economist |
| `agri-` | Agriculture | farmer, agronomist, forester, vineyard-manager |

### Org presets

**31 complete org structure templates** in `.claude/orgframework/presets/`. Each is a JSON file containing departments, roles with headcount, reporting lines, key cross-functional relationships, and an org chart.

| Preset | Headcount | Best for |
|---|---|---|
| `seed-startup` | 1-10 | Founders building MVP, pre-product-market fit |
| `series-a-saas` | 10-30 | First functional departments emerging |
| `series-b-saas` | 30-80 | Scaling with VPs, growing management layer |
| `fintech-org` | 10-500+ | Regulated fintech with embedded compliance |
| `hospital-system` | 200-10,000+ | Full hospital with clinical and admin departments |
| `dental-practice` | 3-50 | Dental clinic with clinical and front office |
| `urgent-care-clinic` | 5-50 | Walk-in clinic with providers and support |
| `mental-health-practice` | 3-50 | Therapy/counseling practice |
| `home-health-hospice` | 10-300 | Home health agency with field staff |
| `vet-clinic` | 3-30 | Veterinary practice |
| `hardware-medical-device` | 20-5,000+ | Medical device manufacturing and sales |
| `pharma-biotech-rd` | 10-5,000+ | Drug development and research |
| `ecommerce-retail` | 30-10,000+ | Online retail with fulfillment |
| `marketplace-platform` | 15-500+ | Two-sided marketplace |
| `manufacturing-plant` | — | Factory/production facility |
| `restaurant-kitchen` | 10-100 | Commercial kitchen |
| `hotel-property` | 50-500 | Full-service hotel |
| `architecture-firm` | 5-500 | Design and architecture practice |
| `consulting-firm` | 10-5,000+ | Management consulting |
| `law-firm` | 10-2,000+ | Legal practice with partners and associates |
| `agency-creative-digital` | 10-300 | Creative/digital agency |
| `film-production-crew` | 30-500 | Film/TV production |
| `school-k12` | 50-500 | K-12 school |
| `university-higher-ed` | 500-20,000 | University |
| `research-lab` | 3-30 | Scientific research lab |
| `nonprofit-ngo` | 5-500+ | Nonprofit organization |
| `government-agency` | 50-5,000 | Government department or agency |
| `military-unit` | 300-1,200 | Battalion/regiment |
| `sports-team` | 50-400 | Professional sports organization |
| `construction-site` | 10-200 | Construction project |
| `remote-first-company` | 10-500 | Distributed/remote org with async culture |
| `public-enterprise` | 500+ | Large public company |

### Crisis templates

**6 crisis command structures** in `.claude/orgframework/crisis/`. Each defines a clear chain of command, roles, responsibilities, and escalation paths for a specific crisis type:

| Template | Crisis scenario |
|---|---|
| `breach-cyber.json` | Data breach — containment, forensics, notifications |
| `mass-layoff.json` | Workforce reduction — legal, comms, severance |
| `founder-departure.json` | Founder/CEO leaving — succession, board, comms |
| `acquisition-integration.json` | Post-acquisition org integration |
| `pr-crisis.json` | Reputational crisis — media, legal, internal comms |
| `regulatory-investigation.json` | Regulator inquiry — legal defense, document production |

### Compensation data

**50+ roles with salary bands** in `.claude/orgframework/compensation/bands.json`. Four regions (NA, EMEA, APAC, LATAM), four levels (junior, mid, senior, lead). NA figures are total comp (base + bonus + equity); other regions vary by market norms.

```json
"eng-backend": {
  "junior": { "na": "80K-120K", "emea": "50K-74K EUR", ... },
  "mid":   { "na": "120K-180K", "emea": "74K-112K EUR", ... },
  "senior":{ "na": "180K-280K", "emea": "112K-174K EUR", ... },
  "lead":  { "na": "250K-400K", "emea": "155K-248K EUR", ... }
}
```

### Region profiles

4 profiles in `.claude/orgframework/regions/`. Each covers employment laws, cultural norms, benefits expectations, currency, and reporting standards for that region.

| Region | Key characteristics |
|---|---|
| NA | At-will employment, direct communication, 401(k)/health, FLSA |
| EMEA | Strong protection, works councils, GDPR, 20+ vacation days, IFRS |
| APAC | Hierarchy, bonus culture, social insurance, data localization |
| LATAM | 13th salary mandatory, CLT (Brazil), unions, nearshoring |

### Industry profiles

5 profiles in `.claude/orgframework/industries/`. Each covers the metrics, regulatory framework, and operational patterns specific to that vertical.

| Industry | Key metrics | Regulatory context |
|---|---|---|
| SaaS | MRR/ARR, churn, NRR, CAC | SOC 2 |
| Fintech | TPV, take rate, default rate | KYC/AML, PSD2, PCI DSS, BaFin/FCA/SEC |
| Healthcare | Patient outcomes, readmission | HIPAA, FDA, EU MDR |
| Manufacturing | OEE, yield, safety incidents | ISO, OSHA |
| Ecommerce | GMV, AOV, conversion, returns | Consumer rights, cross-border tax |

### Stage profiles

3 profiles in `.claude/orgframework/stages/`. Each adjusts org depth, decision-making speed, specialization level, and compensation philosophy.

| Stage | Org style | Comp approach |
|---|---|---|
| Startup | Flat, founder-led, multi-hat | Equity-heavy |
| Scaleup | Emerging departments, VPs | Market salary + options |
| Enterprise | Deep hierarchy, matrix | RSUs, structured bands |

### Guidance additions

12 additions in `.claude/orgframework/additions.json` — these are structured prompts that tell Claude how to think about org design for specific dimensions:

| Addition | What it does |
|---|---|
| Org Architect | Build custom org structure from scratch for every request |
| Context Classifier | Detect region, industry, stage, task type from natural language |
| Region Adapt | Apply local employment law, culture, currency |
| Industry Adapt | Apply industry metrics, regulations, patterns |
| Stage Adapt | Adjust org depth for company maturity |
| Meeting Format | Auto-format output by meeting type |
| Scope Guard | Flag decision rights, budget limits, regulatory gates |
| Urgency Adapt | Adjust depth — blunt for hotfixes, structured for planning |
| Cross-Function Weaver | Show how perspectives connect and decisions flow |
| Auto Troubleshoot | Self-evaluate and learn from corrections |
| Adaptive Learning | Track preferences within a conversation |
| Systems Integration | Coordinate across all available systems and data |

---

## Architecture

### Directory layout

```
orgframework/
├── .claude/
│   ├── skills/
│   │   └── orgframework/
│   │       └── SKILL.md                  # Skill definition for Claude Code
│   └── orgframework/
│       ├── index.json                    # Master index and configuration
│       ├── additions.json                # 12 cross-cutting guidance additions
│       ├── styles/                       # 537 hand-written role files
│       │   ├── eng-backend.md
│       │   ├── hlth-physician.md
│       │   ├── fin-cfo.md
│       │   └── ...
│       ├── presets/                      # 31 org structure templates
│       │   ├── series-a-saas.json
│       │   ├── fintech-org.json
│       │   ├── hospital-system.json
│       │   └── ...
│       ├── crisis/                       # 6 crisis command structures
│       │   ├── breach-cyber.json
│       │   ├── mass-layoff.json
│       │   └── ...
│       ├── compensation/
│       │   └── bands.json                # Salary bands, 50+ roles, 4 regions
│       ├── regions/                      # 4 region profiles
│       │   ├── na.json
│       │   ├── emea.json
│       │   ├── apac.json
│       │   └── latam.json
│       ├── industries/                   # 5 industry profiles
│       │   ├── saas.json
│       │   ├── fintech.json
│       │   ├── healthcare.json
│       │   ├── manufacturing.json
│       │   └── ecommerce.json
│       ├── stages/                       # 3 stage profiles
│       │   ├── startup.json
│       │   ├── scaleup.json
│       │   └── enterprise.json
│       ├── expansion/                    # Cross-region expansion playbooks
│       │   ├── us-to-emea.json
│       │   ├── us-to-latam.json
│       │   └── ...
│       ├── diagnostics/
│       │   └── troubleshoot.json         # Self-correction rules
│       ├── adaptations/                  # User preference tracking
│       │   ├── profile.json
│       │   └── resolver.guidance.md
│       ├── comparison/                   # Org structure diff engine
│       │   ├── comparison.guidance.md
│       │   └── comparison.js
│       ├── visualizer/                   # Mermaid.js org chart generator
│       │   ├── generate.js
│       │   └── templates.json
│       ├── hiring/
│       │   └── hiring.guidance.md
│       ├── maturity/
│       │   └── maturity.guidance.md
│       ├── raci/
│       │   └── raci.guidance.md
│       ├── relationship-map/
│       │   └── relationship-map.js
│       ├── similarity/
│       │   └── similarity.js
│       ├── health-monitor/
│       │   └── monitor.guidance.md
│       ├── budget/
│       │   └── budget.guidance.md
│       ├── culture/
│       │   └── culture.guidance.md
│       ├── reverse-org/
│       │   └── reverse-org.js
│       ├── role-to-task/
│       │   └── role-to-task.js
│       ├── timeline/
│       │   └── timeline.guidance.md
│       └── vacancy/
│           └── vacancy.js
├── bin/
│   ├── install.sh                        # Shell installer
│   ├── install.js                        # Node.js installer
│   └── diagnose.js                       # Self-diagnostic tool
├── tests/
│   ├── validate-roles.js                 # Validates all role files exist
│   ├── validate-presets.js               # Validates preset structure
│   └── validate-index.js                 # Validates index and config
├── .github/
│   └── workflows/
│       └── ci.yml                        # CI pipeline
├── package.json
├── README.md
└── LICENSE
```

### How it works

When a user runs `/orgframework <request>` in Claude Code:

```
User: "we're a 50-person fintech in Berlin expanding to Brazil"
                          │
                          ▼
┌─────────────────────────────────────────────┐
│          1. Context Classifier               │
│  ┌────────┬────────┬────────┬────────────┐  │
│  │Region  │Industry│ Stage  │ Task type  │  │
│  │ EMEA   │Fintech │Scaleup │ Expansion  │  │
│  └────────┴────────┴────────┴────────────┘  │
└─────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│         2. Preset Matcher                    │
│  Check presets/ for fintech org template.   │
│  Found: fintech-org.json — use as starting  │
│  point, adapt for EMEA + Brazil context.    │
└─────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│         3. Org Architect                     │
│  Construct departments, roles, reporting    │
│  lines. Read relevant styles/*.md files     │
│  for depth. Create whatever roles fit.      │
└─────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│         4. Region/Industry/Stage Adapt       │
│  Apply Brazil labor law (CLT, 13th salary). │
│  Apply fintech compliance (BCB licensing).  │
│  Apply scaleup depth (first VPs, emerging). │
└─────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────┐
│         5. Deliver                          │
│  Custom org structure with context header.  │
│  Region, industry, stage, task type shown.  │
└─────────────────────────────────────────────┘
```

### Role file format

Each reference role is a markdown file with a consistent structure. Example: `eng-backend.md`

```markdown
# eng-backend

**Summary:** Backend Engineer designs, builds, and maintains server-side logic,
APIs, data services, and system integrations that power the product experience.

**Level:** IC
**Reports to:** Engineering Manager
**Region variants:** NA, EMEA, APAC, LATAM

## Responsibilities
- Design, develop, test, and deploy RESTful and GraphQL APIs
- Implement business logic and server-side application features
- Optimize database schemas, queries, and indexing strategies
- Write comprehensive unit, integration, contract, and end-to-end tests
- ...

## Core Competencies
- Strong programming skills in Python, Go, Java, or TypeScript
- Deep understanding of relational and NoSQL databases
- Knowledge of API design (REST, GraphQL, gRPC)
- ...

## Tools & Technology
- Languages: Python, Go, TypeScript, Java, Rust, Ruby
- Databases: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
- ...

## KPIs & Success Metrics
- API response latency (p50, p95, p99) and error rates
- Service uptime and availability percentage
- Deployment frequency and lead time for changes
- ...

## Career Progression
- Junior (0-2): Implements well-scoped features under guidance
- Mid (2-5): Independently delivers feature-sized changes
- Senior (5-8): Leads complex feature initiatives, mentors others
- ...

## Day-to-Day Workflow
- Daily standup to share progress, blockers, and plans
- Sprint-based development with 1-2 week iterations
- Weekly 1:1 with engineering manager
- On-call rotation (1 week every 4-6 weeks)
- ...

## Cross-Functional Relationships
- Partners with eng-frontend on API contract design
- Works with prd-manager on feature requirements
- Coordinates with eng-sre on production readiness
- ...

## Regional Nuances
- NA: Largest market, highest comp, remote-first common
- EMEA: Strong labor protections, 35-40 hour weeks, GDPR
- APAC: More hierarchical, broader skillset expected
- LATAM: Growing remote workforce, Node.js/Python strong
- ...

## Industry Variations
- SaaS: Multi-tenant architecture, API-first, uptime
- Fintech: Transactional integrity, audit logging, PCI-DSS
- Healthcare: HIPAA, PHI, strict access controls
- ...
```

### Preset file format

Each preset is a JSON file with metadata, applicability rules, and a full org structure:

```json
{
  "preset": "series-a-saas",
  "version": "1.0",
  "name": "Series A SaaS",
  "description": "For SaaS companies at Series A stage with 10-30 people...",
  "applicability": {
    "regions": ["na", "emea", "apac", "latam"],
    "industries": ["saas"],
    "stages": ["startup", "scaleup"]
  },
  "headcount_range": "10-30",
  "org_structure": {
    "overview": "At Series A the startup formalizes into functional areas...",
    "departments": [
      {
        "name": "Engineering",
        "description": "Builds and ships the product...",
        "headcount": "4-8",
        "reports_to": "CEO",
        "roles": [
          {
            "title": "VP of Engineering",
            "count": 1,
            "level": "Head",
            "reports_to": "CEO",
            "description": "Leads engineering strategy, hiring, and delivery..."
          }
        ]
      }
    ],
    "key_relationships": [
      "Product and Engineering are co-located...",
      "Marketing and Sales meet weekly on funnel metrics..."
    ],
    "org_chart_text": "CEO\n├── VP of Engineering\n│   └── ..."
  }
}
```

---

## Context dimensions

The system automatically detects these from your natural language input:

| Dimension | How it's detected | What it shapes |
|---|---|---|
| **Region** | Country/city names, legal references, currency | Employment laws, culture, currency, entity types, benefits, reporting standards |
| **Industry** | Domain keywords (fintech, healthcare, etc.) | Which departments exist, regulatory embedding, key metrics, operational patterns |
| **Stage** | Funding language (Series A, pre-seed), headcount, revenue context | Org depth, process formality, decision speed, role specialization, comp approach |
| **Task type** | Action verbs (hire, launch, reorg, comply) | Which perspectives need to be involved, output format |

Use `@` shortcodes to override auto-detection:
```
/orgframework @emea @fintech @scaleup what's our Q3 hiring plan
```

---

## Example

**Input:**
```
/orgframework we're a 50-person fintech in Berlin expanding to Brazil
```

**What happens:**
1. Context detected: EMEA region, fintech industry, scaleup stage, expansion task
2. Fintech preset loaded — adapted for EMEA headquarters + Brazil expansion
3. Role files read for depth on key functions (compliance, legal, HR, payments)
4. Region profiles applied — CLT contracts, 13th salary, BCB licensing for Brazil
5. Custom org structure built for this specific scenario

**Output:**
```
Context: EMEA → LATAM expansion | Fintech | Scale-up | Task: International expansion

## Expansion Org Structure: Berlin HQ → Brazil

### New roles (Brazil)
Brazil Country Manager — reports to COO Berlin
  Entity setup, local hiring, regulatory relationships
Brazil Compliance Lead — reports to CCO Berlin, dotted to Brazil GM
  BCB licensing, LGPD compliance, local AML
Brazil Engineering Manager — reports to CTO Berlin
  Local team, Pix integration, Portuguese localization

### Existing Berlin roles supporting expansion
- lgl-privacy: GDPR ↔ LGPD data transfer framework
- fin-tax: Brazilian tax complexity
- hr-recruiting: CLT contracts, 13th salary, Portuguese hiring

### Key timeline
Month 1-2: Legal entity setup + BCB licensing
Month 3-4: Country Manager + Compliance Lead hired
Month 5-6: First 5 engineers onboarded
```

---

## Development

### Running tests

```bash
npm test
```

Validates:
- All 537 role files exist and match the index
- All role files have the correct expanded template structure
- All 31 presets have valid JSON, required fields, and valid departments/roles
- All region, industry, and stage profiles are present and configured correctly

### Adding a role

1. Create a new `.md` file in `.claude/orgframework/styles/`
2. Follow the existing format (summary, responsibilities, competencies, KPIs, career path, cross-functional relationships, regional nuances, industry variations)
3. Add the role ID to `reference_roles` array in `index.json`
4. Run `npm test` to verify

### Adding a preset

1. Create a new `.json` file in `.claude/orgframework/presets/`
2. Follow the preset format (metadata, applicability, departments with roles, key relationships, org chart text)
3. Run `npm test` to verify

### CI

The repo includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs `npm test` on every push.

---

## Roadmap

- [x] 537 hand-written reference roles across 30+ domains
- [x] 31 org presets for common structures
- [x] 6 crisis command templates
- [x] Compensation bands for 50+ roles across 4 regions
- [x] Region/industry/stage adaptation profiles
- [x] Cross-region expansion playbooks
- [x] Org chart visualization (Mermaid.js)
- [ ] RACI matrix generator
- [ ] Hiring plan generator from org structure
- [ ] Role vacancy simulation
- [ ] Maturity assessment against stage benchmarks
- [ ] Budget calculator from structure + comp data
- [ ] More presets (hospitality, manufacturing, logistics)
- [ ] More roles in underrepresented domains

---

## License

MIT — build whatever org structure you need.
