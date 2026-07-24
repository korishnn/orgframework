This is for Claude Code
# CouncilOrg 5.0.0 — The Organizational Intelligence Engine

**555 roles · 35 presets · 6 crisis templates · 8 council perspectives · 14 guidance additions · compensation data · region/industry/stage profiles**

Powered by an **LLM Council** architecture. Every org design is stress-tested by a simulated council of 80 organizational perspectives — the Strategist, Operator, Controller, Culture Keeper, Pessimist, Regulatory Hawk, Talent Scout, and Systems Architect — before delivery. Divergence is a feature: you get alternatives, not dogma.

```bash
/councilorg we're a 50-person fintech in Berlin expanding to Brazil
/councilorg @deep design a respiratory therapy department for a regional hospital
/councilorg @simulate hypergrowth our Series B SaaS is about to double headcount
/councilorg @alternatives @fintech @emea what's our org structure as a payments scaleup
/councilorg @dao we're launching a decentralized protocol, design the governance
/councilorg @ai-native our startup is building with 10 humans and 20 AI agents
```

---

## What is councilorg 5.0.0?

councilorg is a **reference library AND organizational intelligence engine** for Claude Code. It helps Claude build better organizational structures by combining:

- **555 hand-written roles** — each with responsibilities, KPIs, career paths, tools, cross-functional relationships, and regional/industry variations
- **35 org presets** — complete org structures for every scenario (Series A SaaS, hospital system, fintech, restaurant kitchen, AI lab, DAO, climate tech, human-AI hybrid, and more)
- **6 crisis templates** — pre-built command structures for breach, layoff, acquisition, founder departure, PR crisis, regulatory investigation
- **The LLM Council** — 8 perspectives that debate every org design (with 100-member candidate pool in config)
- **8 analysis engines** — similarity, vacancy simulation, comparison, reverse-org, visualization, council, relationship mapping, role-to-task
- **Compensation data** — salary bands for 500+ roles across 4 regions
- **Region/industry/stage profiles** — laws, norms, metrics, and patterns that shape org design

The AI is **never limited** to these references. They exist to give Claude concrete, detailed examples to draw from — and to ground its recommendations in real-world patterns rather than generic guesses.

---

## What's New in 5.0.0

### The LLM Council
When invoked without `@fast`, the system spins up a virtual council of 8 perspectives that deliberate on every org design before delivery.

| Council Member | Signature Question |
|---|---|
| **The Strategist** | "Does this structure serve our 3-year strategy?" |
| **The Operator** | "Who does the work and where does it get stuck?" |
| **The Financial Controller** | "What does this cost and is it sustainable?" |
| **The Culture Keeper** | "What culture does this structure produce?" |
| **The Pessimist** | "What breaks first and who do we lose?" |
| **The Regulatory Hawk** | "Which regulator knocks on our door first?" |
| **The Talent Scout** | "Can we hire these people, here, now?" |
| **The Systems Architect** | "What system architecture does this org produce?" |

### New Analysis Engines
- `@simulate` — Run org through a stress scenario (hypergrowth, recession, key departure, acquisition, breach, IPO, remote shift, AI augmentation)
- `@conflicts` — Identify structural conflicts (spans, layers, role ambiguity, power vacuums)
- `@conway` — Predict system architecture from org structure (Conway's Law + reverse Conway)
- `@burnout` — Assess burnout risk per role
- `@succession` — Find single points of failure (bus factor = 1)
- `@dunbar` — Flag teams exceeding cognitive limits
- `@topologies` — Map teams to Team Topologies patterns
- `@culture-genome` — Map structure to predicted culture (Westrum, DORA)
- `@futures` — Generate 30 alternative future org structures

### Divergence Over Dogma
- `@alternatives` — 30 philosophically different orgs for the same brief
- `@debate` — Two council members argue opposite positions, then converge
- Every output includes a **Divergence Note**: assumptions made, alternatives considered, what would change the answer

### New Presets
- `ai-lab` — AI research lab (DeepMind/OpenAI-style)
- `dao-org` — DAO / decentralized organization
- `climate-tech` — Climate tech startup
- `human-ai-hybrid` — 50% human + 50% AI workforce

### New Roles (180+)
AI/ML ops engineer, prompt engineer, AI ethicist, remote culture manager, neurodiversity inclusion lead, head of climate/sustainability, Web3 community manager, tokenomics designer, growth engineer, data privacy engineer, fractional CXO coordinator, internal evangelist, human-AI collaboration designer, AI safety engineer, vector database engineer, crypto treasury manager, AI governance counsel, and more.

### New Industries
- `@web3` — Web3/DAO/crypto
- `@climate` — Climate tech / sustainability
- `@ai-labs` — AI research labs

---

## Quick Start

```bash
# 1. Install into your Claude Code project
bash path/to/councilorg/bin/install.sh

# 2. Use it in Claude Code
/councilorg we're a 300-person Series A SaaS company in Berlin, what's my org structure
```

### Shortcodes

**Context:**
`@na` `@emea` `@apac` `@latam` — Region
`@saas` `@fintech` `@health` `@mfg` `@ecom` `@web3` `@climate` `@ai-labs` — Industry
`@startup` `@scaleup` `@enterprise` — Stage

**Council Depth:**
`@fast` — Skip council, direct answer
`@deep` — Full 3-round council deliberation with dissenting notes
*(default)* — 2-round council deliberation

**Analysis Engines:**
`@simulate <scenario>` `@conflicts` `@conway` `@burnout` `@succession` `@dunbar` `@topologies` `@culture-genome` `@futures`

**Divergence:**
`@alternatives` `@debate`

**Special Structures:**
`@dao` `@ai-native`

```bash
/councilorg @fintech @emea @scaleup @deep we're expanding our payments team
/councilorg @simulate hypergrowth @fast we're a 2000-person SaaS about to hire 1000 more
/councilorg @alternatives design our 400-person product org
```

---

## Installation

### Into any Claude Code project

```bash
# Clone the repo somewhere
git clone https://github.com/korishnn/councilorg.git

# Install into your project (from project root)
bash path/to/councilorg/bin/install.sh

# Or install into a specific directory
bash path/to/councilorg/bin/install.sh /path/to/your/project
```

This copies all roles, presets, and profiles into `.claude/councilorg/` and the skill definition into `.claude/skills/councilorg/`.

### Verify installation

```bash
node path/to/councilorg/bin/diagnose.js
```

Should show all components present and healthy.

---

## Usage

### General org design

```bash
/councilorg I need to hire a senior backend engineer in Berlin
/councilorg what does my Series A SaaS org look like with 250 people
/councilorg design the management structure for a 2000-person manufacturing plant
/councilorg we're launching a new product line, what's the team structure
```

### Industry-specific

```bash
/councilorg design the compliance structure for a UK fintech
/councilorg what departments does a hospital need for respiratory therapy
/councilorg org structure for an ecommerce company during Black Friday
```

### International expansion

```bash
/councilorg US company expanding to Japan — what's the org plan
/councilorg we're opening a Brazil office from Berlin
```

### Crisis response

```bash
/councilorg we just had a data breach — what's the command structure
/councilorg our CTO is leaving suddenly, what's the transition plan
```

### Diagnostics and troubleshooting

```bash
/councilorg diagnose    # Show system health and learned preferences
/councilorg debug       # Show what was detected from your input
/councilorg reset       # Clear learned preferences
```

### Advanced examples

```bash
# Full council deliberation with stress simulation
/councilorg @deep @simulate hypergrowth @fintech we're a 500-person payments startup

# Team topology mapping
/councilorg @topologies here's our current team structure

# Conway law analysis
/councilorg @conway we have 3 backend teams and a platform team, predict our architecture

# Burnout and succession risk assessment
/councilorg @burnout @succession analyze our current org [paste org chart]

# AI-native org design
/councilorg @ai-native @fast design a 200-person AI-first startup

# DAO governance design
/councilorg @dao we're launching a DeFi protocol with 50 founders and a token
```

---

## What's inside

### Reference roles

**555 hand-written markdown files** in `.claude/councilorg/styles/`. Each covers one real-world role with:

| Field | What it contains |
|---|---|
| Summary | One-line description of the role |
| Level | IC, Manager, Head, VP, C-Suite |
| Reports to | Typical reporting structure |
| Responsibilities | 100-200 concrete responsibilities |
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
| `eng-` | Engineering | backend, frontend, devops, sre, ml, data, security, qa, mobile, ai-safety |
| `mkt-` | Marketing | brand, content, seo, growth, social, pr, marketing-ops, internal-creator |
| `sls-` | Sales | enterprise, sdr, solutions, customer-success, partnerships |
| `hr-` | HR | recruiting, hrbp, people-ops, compensation, l&d, remote-culture, neurodiversity |
| `fin-` | Finance | controller, fp&a, tax, treasury, audit, crypto-treasury |
| `ops-` | Operations | operations, supply-chain, procurement, facilities, fractional-cxo |
| `lgl-` | Legal | counsel, compliance, privacy, contracts, ai-governance |
| `prd-` | Product | product-manager, product-ops, program-manager, growth-engineer |
| `cs-` | Customer Support | support-engineer, success-manager, support-ops |
| `exec-` | Executive | ceo, coo, cfo, cto, chief-of-staff, ai-ethics |
| `dsg-` | Design | product-design, ux, visual, brand, design-ops, human-ai |
| `da-` | Data & Analytics | data-engineer, data-scientist, analyst, bi, vector |
| `sec-` | Security & Compliance | security-engineer, grc, soc-analyst, data-privacy |
| `tech-` | Technology | ai-engineer, ai-ops, prompt-engineer, dx-engineer |
| `web3-` | Web3 | community, tokenomics |
| `sust-` | Sustainability | climate-head |
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

**35 complete org structure templates** in `.claude/councilorg/presets/`. Each is a JSON file containing departments, roles with headcount, reporting lines, key cross-functional relationships, and an org chart.

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
| **`ai-lab`** 🆕 | 20-500 | AI research lab (DeepMind/OpenAI-style) |
| **`dao-org`** 🆕 | 5-200+ | DAO / decentralized organization |
| **`climate-tech`** 🆕 | 5-200 | Climate tech startup |
| **`human-ai-hybrid`** 🆕 | 10-500 | Human+AI hybrid workforce |

### Crisis templates

**6 crisis command structures** in `.claude/councilorg/crisis/`. Each defines a clear chain of command, roles, responsibilities, and escalation paths for a specific crisis type:

| Template | Crisis scenario |
|---|---|
| `breach-cyber.json` | Data breach — containment, forensics, notifications |
| `mass-layoff.json` | Workforce reduction — legal, comms, severance |
| `founder-departure.json` | Founder/CEO leaving — succession, board, comms |
| `acquisition-integration.json` | Post-acquisition org integration |
| `pr-crisis.json` | Reputational crisis — media, legal, internal comms |
| `regulatory-investigation.json` | Regulator inquiry — legal defense, document production |

### Compensation data

**500+ roles with salary bands** in `.claude/councilorg/compensation/bands.json`. Forty regions (NA, EMEA, APAC, LATAM), four levels (junior, mid, senior, lead). NA figures are total comp (base + bonus + equity); other regions vary by market norms.

```json
"eng-backend": {
  "junior": { "na": "80K-120K", "emea": "50K-74K EUR", ... },
  "mid":   { "na": "120K-180K", "emea": "74K-112K EUR", ... },
  "senior":{ "na": "180K-280K", "emea": "112K-174K EUR", ... },
  "lead":  { "na": "250K-400K", "emea": "155K-248K EUR", ... }
}
```

### Region profiles

40 profiles in `.claude/councilorg/regions/`. Each covers employment laws, cultural norms, benefits expectations, currency, and reporting standards for that region.

| Region | Key characteristics |
|---|---|
| NA | At-will employment, direct communication, 401(k)/health, FLSA |
| EMEA | Strong protection, works councils, GDPR, 20+ vacation days, IFRS |
| APAC | Hierarchy, bonus culture, social insurance, data localization |
| LATAM | 13th salary mandatory, CLT (Brazil), unions, nearshoring |

### Industry profiles

**80 profiles** in `.claude/councilorg/industries/`. Each covers the metrics, regulatory framework, and operational patterns specific to that vertical.

| Industry | Key metrics | Regulatory context |
|---|---|---|
| SaaS | MRR/ARR, churn, NRR, CAC | SOC 2 |
| Fintech | TPV, take rate, default rate | KYC/AML, PSD2, PCI DSS, BaFin/FCA/SEC |
| Healthcare | Patient outcomes, readmission | HIPAA, FDA, EU MDR |
| Manufacturing | OEE, yield, safety incidents | ISO, OSHA |
| Ecommerce | GMV, AOV, conversion, returns | Consumer rights, cross-border tax |
| **Web3** 🆕 | TVL, DAU, token velocity, governance participation | MiCA, SEC, FATF |
| **Climate** 🆕 | Carbon footprint, emission reduction, ESG score | SEC climate, CSRD, GHG Protocol |
| **AI Labs** 🆕 | Training FLOPs, benchmark scores, inference cost | EU AI Act, NIST AI RMF |

### Stage profiles

30 profiles in `.claude/councilorg/stages/`. Each adjusts org depth, decision-making speed, specialization level, and compensation philosophy.

| Stage | Org style | Comp approach |
|---|---|---|
| Startup | Flat, founder-led, multi-hat | Equity-heavy |
| Scaleup | Emerging departments, VPs | Market salary + options |
| Enterprise | Deep hierarchy, matrix | RSUs, structured bands |

### Guidance additions

**14 guidance additions** in `.claude/councilorg/` topic `.guidance.md` files — these are structured prompts that tell Claude how to think about org design for specific dimensions:

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
| **LLM Council** 🆕 | Orchestrate multi-perspective org deliberation |
| **Divergence Engine** 🆕 | Generate alternative structures with trade-off analysis |
| **Stress Simulator** 🆕 | Run org through failure scenarios |
| **Conway Mapper** 🆕 | Predict system architecture from org structure |
| **Dunbar Auditor** 🆕 | Check team sizes against cognitive limits |
| **Team Topologies** 🆕 | Classify teams into 4 patterns + interaction modes |
| **Culture Genome** 🆕 | Map structure to predicted culture (Westrum, DORA) |
| **Succession Analyzer** 🆕 | Find single points of failure |
| **Burnout Index** 🆕 | Score burnout risk per role |
| **AI Augmentation** 🆕 | Design orgs for human+AI hybrid workforces |

---

## Architecture

### Directory layout

```
councilorg/
├── .claude/
│   ├── skills/
│   │   └── councilorg/
│   │       └── SKILL.md                  # Skill definition for Claude Code
│   └── councilorg/
│       ├── index.json                    # Master index and configuration (v50)
│       ├── *.guidance.md                # 14 guidance additions
│       ├── styles/                       # 555 role files
│       ├── presets/                      # 35 org structure templates
│       ├── crisis/                       # 6 crisis command structures
│       ├── compensation/
│       │   └── bands.json                # Salary bands
│       ├── regions/                      # 4 region profiles
│       ├── industries/                   # 5 industry profiles
│       ├── stages/                       # 3 stage profiles
│       ├── expansion/                    # Cross-region expansion playbooks
│       ├── diagnostics/                  # Self-correction rules
│       ├── adaptations/                  # User preference tracking
│       ├── comparison/                   # Org structure diff engine
│       ├── visualizer/                   # Mermaid.js org chart generator
│       ├── hiring/
│       │   └── hiring.guidance.md
│       ├── maturity/
│       │   └── maturity.guidance.md
│       ├── raci/
│       │   └── raci.guidance.md
│       ├── relationship-map/
│       ├── similarity/
│       ├── health-monitor/
│       ├── budget/
│       ├── culture/
│       │   └── culture.guidance.md
│       │   └── culture-genome.guidance.md  🆕
│       ├── reverse-org/
│       ├── role-to-task/
│       ├── timeline/
│       ├── vacancy/
│       ├── simulation/
│       │   └── simulator.guidance.md      🆕
│       ├── conway/
│       │   └── conway.guidance.md         🆕
│       └── topologies/
│           └── team-topologies.guidance.md 🆕
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

When a user runs `/councilorg <request>` in Claude Code:

```
User: "we're a 500-person fintech in Berlin expanding to Brazil"
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│          1. Context Classifier                       │
│  Region: EMEA | Industry: Fintech | Stage: Scaleup  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         2. Council Formation (unless @fast)          │
│  Select 60-80 relevant council members for this       │
│  specific request based on context                  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         3. Round 1: Council Proposals                │
│  Each member gives 1-2 sentence initial take        │
│  on the proposed structure from their perspective   │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         4. Round 2: Council Critique                 │
│  Members respond to each other's concerns, flag     │
│  contradictions between perspectives                │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         5. (if @deep) Round 3: Synthesis             │
│  Converge on final structure with dissenting notes  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         6. Org Construction                          │
│  Build the org structure incorporating council      │
│  convergence. Read relevant styles/*.md for depth.  │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         7. Divergence Note                           │
│  Document assumptions, alternatives, and what would │
│  change the recommendation                          │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│         8. Deliver                                  │
│  Structure with council reasoning and divergence    │
│  note. Region, industry, stage shown in header.     │
└─────────────────────────────────────────────────────┘
```

### 2.0 → 5.0.0 Difference

- **2.0 (v2):** "Here's an org chart for a fintech in Berlin."
- **5.0.0 (v3):** "I've convened 8 perspectives on your Berlin fintech org. The Strategist suggests this structure for your 3-year pan-European expansion. The Regulatory Hawk flags BaFin compliance requirements. The Culture Keeper warns that this span of control may reduce psychological safety. The Pessimist notes that your Head of Compliance is a single point of failure. Here's the converged recommendation — and here are alternatives if you deprioritize speed for stability."

5.0.0 doesn't just answer. **It deliberates.**

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
    "org_chart_text": "CEO\n├── VP of Engineering\n    └── ..."
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
/councilorg @emea @fintech @scaleup what's our Q3 hiring plan
```

---

## Example

**Input:**
```
/councilorg we're a 50-person fintech in Berlin expanding to Brazil
```

**What happens:**
1. Context detected: EMEA region, fintech industry, scaleup stage, expansion task
2. Council formed (default 8 members selected for expansion context)
3. Council Round 1: Strategist suggests pan-European positioning; Operator flags cross-time-zone coordination; Regulatory Hawk notes BaFin+BCB dual compliance
4. Council Round 2: Controller challenges expansion cost; Talent Scout flags Brazil hiring market; Culture Keeper warns about Berlin→Brazil cultural bridge
5. Fintech preset loaded and adapted based on council input
6. Region profiles applied — CLT contracts, 13th salary, BCB licensing for Brazil
7. Divergence Note: what would change if growth > profitability

**Output:**
```
Context: EMEA → LATAM expansion | Fintech | Scale-up | Task: International expansion

## Council Deliberation
Convened: Strategist, Operator, Controller, Culture Keeper, Regulatory Hawk, Talent Scout

Round 1 — Initial Positions:
- Strategist: "Brazil is the natural LATAM entry point. This structure should be designed
  for further expansion into Mexico and Colombia within 24 months."
- Regulatory Hawk: "BCB licensing is 6-12 months. You need a local compliance lead
  before you can process payments."
- Talent Scout: "Engineering talent in São Paulo is strong but competitive. Your Berlin
  salary bands won't translate — you need 70-85% of Berlin for comparable senior talent."

Round 2 — Critique:
- Controller: "The 6-month licensing runway means we need interim revenue. Can we launch
  without processing payments initially?"
- Culture Keeper: "If we hire a Country Manager who's never worked in a German company,
  the Berlin→Brazil communication bridge needs explicit design."
- Operator: "I see a bottleneck: the Country Manager reports to COO in Berlin but depends
  on Compliance, Engineering, and Marketing teams that are already overloaded."

## Expansion Org Structure: Berlin HQ → Brazil

### New roles (Brazil)
Brazil Country Manager — reports to COO Berlin
  Entity setup, local hiring, regulatory relationships, cultural bridge

Brazil Compliance Lead — reports to CCO Berlin, dotted to Brazil GM
  BCB licensing, LGPD compliance, local AML

Brazil Engineering Manager — reports to CTO Berlin
  Local team, Pix integration, Portuguese localization

### Existing Berlin roles supporting expansion
- lgl-privacy: GDPR ↔ LGPD data transfer framework
- fin-tax: Brazilian tax complexity
- hr-recruiting: CLT contracts, 13th salary, Portuguese hiring

### Divergence Note
Assumptions: BCB licensing takes 6 months; Brazil team starts with 10 people; Pix integration
  is critical for payments.
Alternatives considered: (1) Full hub in São Paulo vs (2) Remote-first team across Brazil vs
  (3) Start with contractors and convert later.
What would change this: If BCB licensing takes >12 months, consider partnership with a
  licensed Brazilian PSP instead. If engineering salaries rise faster than projected,
  consider Campinas or Belo Horizonte instead of São Paulo.
```

---

## Why 10,000+ People Should Star This

**councilorg 5.0.0 is not just another org chart generator. It's an organizational intelligence engine.**

Most org design tools give you a template and say "fill this in." councilorg 5.0.0:
1. **Convenes 8 perspectives** that debate, critique, and stress-test every design
2. **Runs failure simulations** before you hire your first person
3. **Generates divergent alternatives** — 30 different philosophical approaches to the same problem
4. **Predicts your system architecture** from your org structure (Conway's Law)
5. **Measures burnout risk** per role before anyone burns out
6. **Checks cognitive limits** — are your spans within Dunbar's number?
7. **Maps your culture** — what Westrum typology does your structure produce?
8. **Designs for the future** — AI-native orgs, DAOs, climate tech, human-AI hybrid workforces

**It doesn't just give you an org chart. It debates, stress-tests, and diverges before you hire your first person.**

---

## Development

### Running tests

```bash
npm test
```

Validates:
- All 555 role files exist and match the index
- All role files have the correct expanded template structure
- All 35 presets have valid JSON, required fields, and valid departments/roles
- All region, industry, and stage profiles are present and configured correctly

### Adding a role

1. Create a new `.md` file in `.claude/councilorg/styles/`
2. Follow the existing format (summary, responsibilities, competencies, KPIs, career path, cross-functional relationships, regional nuances, industry variations)
3. Add the role ID to `reference_roles` array in `index.json`
4. Run `npm test` to verify

### Adding a preset

1. Create a new `.json` file in `.claude/councilorg/presets/`
2. Follow the preset format (metadata, applicability, departments with roles, key relationships, org chart text)
3. Run `npm test` to verify

### CI

The repo includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs `npm test` on every push.

---

## Roadmap

- [x] 555 hand-written reference roles across 300+ domains
- [x] 35 org presets for common and emerging structures
- [x] 6 crisis command templates
- [x] 8 analysis engines
- [x] Compensation bands for 500+ roles across 40 regions
- [x] Region/industry/stage adaptation profiles (80 industries including Web3, Climate, AI Labs)
- [x] Cross-region expansion playbooks
- [x] Org chart visualization (Mermaid.js)
- [x] LLM Council architecture with 8 perspectives (100-member candidate pool)
- [x] Divergence engine (alternatives, debate, divergence notes)
- [x] AI-native and DAO/Web3 organization design
- [ ] RACI matrix generator
- [ ] Hiring plan generator from org structure
- [ ] Role vacancy simulation
- [ ] Maturity assessment against stage benchmarks
- [ ] Budget calculator from structure + comp data
- [ ] Interactive org chart explorer
- [ ] More presets (space tech, biotech, creator economy)
- [ ] More roles in underrepresented domains

---

## Development

```bash
# Install dependencies
npm install

# Run all validation tests
npm test

# Run lint (same as test)
npm run lint

# Run self-diagnostic
npm run diagnose

# Install into a project (Node.js or shell)
node bin/install.js /path/to/project
bash bin/install.sh /path/to/project
```

**Requirements:** Node.js >= 18 (ESM modules).

**Project structure:**
- `.claude/councilorg/` — All data (roles, presets, profiles, engines)
- `.claude/skills/councilorg/SKILL.md` — The LLM Council instruction set
- `bin/` — Installers and diagnostic tool
- `tests/` — Validation scripts with JSON Schema checking
- `tests/schemas/` — JSON Schema definitions for data validation

**Adding a new preset:** Create a JSON file in `.claude/councilorg/presets/` matching the schema at `tests/schemas/preset.schema.json`, then run `npm test` to verify.

---

## License

MIT — build whatever org structure you need.
