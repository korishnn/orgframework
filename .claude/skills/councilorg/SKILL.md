# CouncilOrg 5.0.0 — The Organizational Intelligence Engine

**555 roles · 35 presets · 6 crisis templates · 8 council perspectives · 8 engines · 14 guidance additions**

Powered by an **LLM Council** architecture. Every org design is stress-tested by a simulated council of organizational perspectives — the Strategist, Operator, Controller, Culture Keeper, Pessimist, Regulatory Hawk, Talent Scout, and Systems Architect — before delivery. Divergence is a feature: you get alternatives, not dogma.

---

## Council Architecture

When invoked without `@fast`, the system spins up a virtual council of 10 perspectives (8 core + 2 Devil's Advocates). The council deliberates in two rounds (three with `@deep`):

| Council Member | Signature Question |
|---|---|
| **The Strategist** | "Does this structure serve our 3-year strategy?" |
| **The Operator** | "Who does the work and where does it get stuck?" |
| **The Financial Controller** | "What does this cost and is it sustainable?" |
| **The Culture Keeper** | "What culture does this structure produce?" |
| **The Pessimist** | "What breaks first and who do we lose?" |
| **The Regulatory Hawk** | "Which regulator knocks on our door first?" |
| **The Talent Scout** | "Can we hire these people, here, now?" |
| **The Systems Architect** | "What system architecture does this org produce?" (Conway's Law) |
| **The Devil's Advocate — Red Team** | "If I wanted this org to fail, how would I exploit its structure?" |
| **The Devil's Advocate — Worst Case** | "What is the absolute worst outcome and what sequence of events leads there?" |

**Council rounds:**
1. **Proposal** — Each member gives initial take (1-2 sentences)
2. **Critique** — Members respond to each other's concerns, flag contradictions
3. **Synthesis** — Converge on final structure with dissenting notes preserved (3rd round only with `@deep`)

Every council deliberation ends with a **Divergence Note** — what assumptions were made, alternatives considered, and what would change the recommendation.

---

## Shortcodes

### Context
`@na` `@emea` `@apac` `@latam` — Region
`@saas` `@fintech` `@health` `@mfg` `@ecom` `@web3` `@climate` `@ai-labs` — Industry
`@startup` `@scaleup` `@enterprise` — Stage

### Council Depth
- `@fast` — Skip council deliberation. Direct answer. Use for quick queries.
- `@deep` — Full 3-round council deliberation with dissenting notes. Use for high-stakes decisions.
- *(default)* — 2-round council deliberation (proposal + critique, no divergence synthesis).

### Analysis Engines
- `@simulate <scenario>` — Run org through a stress scenario: `hypergrowth`, `recession`, `key_departure`, `acquisition`, `breach`, `ipo`, `remote_shift`, `ai_augmentation`
- `@conflicts` — Identify structural conflicts in an existing org (spans, layers, role ambiguity, power vacuums)
- `@conway` — Predict system architecture from org structure (or vice versa via reverse Conway)
- `@burnout` — Assess burnout risk per role based on span, isolation, and ambiguity
- `@succession` — What breaks if any role is suddenly vacant (bus factor = 1 analysis)
- `@dunbar` — Flag teams exceeding Dunbar cognitive limits (layers: 50, 150, 500, 1500)
- `@topologies` — Map to Team Topologies patterns (stream-aligned, enabling, complicated-subsystem, platform)
- `@culture-genome` — Map structure to predicted cultural traits (Westrum, DORA, sociotechnical)
- `@futures` — Generate 3 alternative future org structures for the same situation

### Divergence Modes
- `@alternatives` — Produce 3 viable but philosophically different org structures (e.g. hierarchical vs holacratic vs squad-matrix)
- `@debate` — Two council members argue opposite positions, then converge

### Special Structures
- `@dao` — Design a DAO / network-state governance structure
- `@ai-native` — Design for AI-augmented workforce (human+AI teams)

---

## Philosophy

**Truth emerges from productive disagreement.**

councilorg v3 does not give you one "optimal" org chart. It facilitates a multi-perspective deliberation on your organizational question — then presents the converged structure with every dissenting note preserved. You see not just *what* was designed, but *why*, *what was argued*, and *what would change the answer*.

The 555 roles are reference material — inspiration, not prescription. The 35 presets are starting points, not answers. Every council deliberation is grounded in your specific context: region, industry, stage, and culture.

### Divergence over Dogma
- Every output includes a **Divergence Note** — assumptions made, alternatives considered, what would change the recommendation
- `@alternatives` gives you 3 philosophically different structures for the same brief
- The council's disagreements are surfaced, not hidden

---

## How it works

1. **Context Classifier** — detects region, industry, stage from natural language
2. **Council Formation** — selects relevant council members for this specific request
3. **Role/Preset Loading** — loads relevant reference roles, preset if applicable, guidance additions
4. **Council Deliberation** — runs round 1 (proposals) and round 2 (critique); round 3 with `@deep`
5. **Org Construction** — builds the org structure incorporating council convergence
6. **Divergence Note** — documents assumptions, alternatives, and what would change the answer
7. **Delivery** — presents the structure with council context

---

## What's in the box

| Layer | Count | Where | Purpose |
|---|---|---|---|
| **Reference roles** | 555 | `styles/*.md` | Hand-written role data with responsibilities, KPIs, career paths |
| **Org presets** | 35 | `presets/*.json` | Pre-built org structure templates (Series A SaaS, fintech, hospital, AI lab, DAO, etc.) |
| **Crisis templates** | 6 | `crisis/*.json` | Command structures for breach, layoff, founder departure, etc. |
| **Council members** | 8 (100 in config pool) | built-in | Multi-perspective deliberation engine |
| **Analysis engines** | 8 | engine modules | Similarity, vacancy, comparison, reverse-org, visualization, council, relationship-map, role-to-task |
| **Compensation data** | 500+ roles | `compensation/bands.json` | Salary bands by role, region, and level |
| **Regions** | 4 | `regions/*.json` | NA, EMEA, APAC, LATAM context |
| **Industries** | 5 | `industries/*.json` | SaaS, Fintech, Healthcare, Manufacturing, Ecommerce |
| **Stages** | 3 | `stages/*.json` | Startup, Scaleup, Enterprise |
| **Guidance files** | 14 | topic directories | Prompt guidance for org design subtopics |

---

## Usage

```
/councilorg <your request>
```

Examples:
- `/councilorg we're a 50-person fintech in Berlin expanding to Brazil`
- `/councilorg @deep design a hospital respiratory therapy department`
- `/councilorg @simulate hypergrowth we're a Series B SaaS about to double headcount`
- `/councilorg @alternatives @fintech @emea what's our org structure as a payments scaleup`
- `/councilorg @conflicts here's our current org chart [paste]`
- `/councilorg @dao we're launching a decentralized protocol, design the governance`
- `/councilorg @ai-native our startup is building with 10 humans and 20 AI agents`

---

## Installation

```bash
git clone https://github.com/korishnn/councilorg.git
cd your-project
bash path/to/councilorg/bin/install.sh
```

Then in Claude Code: `/councilorg <your request>`

---

## Development

```bash
npm test
```

---

## The v3 Difference

councilorg v2 was a reference library. **v3 is an organizational intelligence engine.**

- **v2:** "Here's an org chart for a fintech in Berlin."
- **v3:** "I've convened 8 perspectives on your Berlin fintech org. The Strategist suggests this structure for your 3-year pan-European expansion. The Regulatory Hawk flags BaFin compliance requirements. The Culture Keeper warns that this span of control may reduce psychological safety. The Pessimist notes that your Head of Compliance is a single point of failure. Here's the converged recommendation — and here are two alternatives if you deprioritize speed for stability."

v3 doesn't just answer. It deliberates.
