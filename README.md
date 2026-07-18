# orgframework

**No fixed org chart. Every request gets a custom-built organizational structure.**

`orgframework` detects the region, industry, company stage, and task type from your natural language — then dynamically constructs the optimal org structure for that specific context. No departments to pick from. No role categories to browse. You describe the situation, it builds the structure.

```bash
/orgframework we're a 50-person fintech in Berlin expanding to Brazil, what's the org plan
/orgframework our 10-person healthcare startup is expanding to the UK
/orgframework I need to think through the Q3 reorg for a Series B SaaS company
```

---

## How it works

```
Your request
    ↓
Context Classifier — detects region, industry, stage, task type
    ↓
Org Architect — builds a custom org structure for THIS request
    ↓
Adapt — applies local laws, cultural norms, industry regulations, stage patterns
    ↓
Delivers context-aware output through the lens of the structure
```

### Example

**You type:** `50-person fintech in Berlin expanding to Brazil`

**No template. The AI dynamically constructs:**

> **Context:** EMEA→LATAM expansion | Fintech | Scale-up | Task: International expansion
>
> ## Org Structure: Berlin HQ → Brazil Expansion
>
> **Brazil Country Manager** (new — reports to COO Berlin)
> Entity setup, local team hiring, regulatory relationships with BCB
>
> **Brazil Compliance Lead** (new — reports to CCO Berlin, dotted to Brazil GM)
> BCB licensing, LGPD compliance, local AML — critical for fintech
>
> **Brazil Engineering Manager** (new — reports to CTO Berlin)
> Local 10-person engineering team, Pix integration

---

## What's in the box

| What | Count | Role |
|---|---|---|
| Region profiles | 4 (NA, EMEA, APAC, LATAM) | Apply local context |
| Industry profiles | 5 (SaaS, Fintech, Healthcare, Manufacturing, Ecommerce) | Apply vertical patterns |
| Stage profiles | 3 (Startup, Scaleup, Enterprise) | Apply maturity patterns |
| Hand-written reference roles | 537 | **Inspiration, not prescription** — read for detail, invent freely |
| Org presets | 31 | Pre-built structures (Series A SaaS, fintech, hospital, restaurant, etc.) |
| Crisis templates | 6 | Command structures for breach, layoff, acquisition, etc. |
| Compensation data | 50+ roles | Salary bands by role, region, and level |

## The philosophy

The 537 role files in `.claude/orgframework/styles/` are **reference material** — detailed examples of real-world roles with responsibilities, KPIs, tools, career paths, regional nuances, and industry variations. Read them when you need depth on a function. But you are **never limited to them**. The AI can:

- Create any department name that fits the situation
- Invent roles that don't exist in the reference files
- Design reporting structures that serve the task
- Build temporary or project-based orgs for one-time initiatives
- Combine, adapt, or ignore reference roles as needed

## Shortcodes

Region: `@na` `@emea` `@apac` `@latam`
Industry: `@saas` `@fintech` `@health` `@mfg` `@ecom`
Stage: `@startup` `@scaleup` `@enterprise`

## Context Dimensions

| Dimension | What it detects | How it shapes the org |
|---|---|---|
| **Region** | Country/city names, legal references | Employment laws, culture, currency, entity types, reporting standards |
| **Industry** | Domain keywords (fintech, healthcare, etc.) | Regulatory embedding, key metrics, operational patterns |
| **Stage** | Funding language, size context | Org depth, process maturity, decision speed, comp philosophy |
| **Task type** | The action being requested | Which perspectives need to be involved |

---

## Installation

```bash
git clone https://github.com/korishnn/orgframework.git
cd your-project
bash orgframework/bin/install.sh
```

Then in Claude Code: `/orgframework <your request>`

---

## Development

```bash
# Validate all 537 reference role files exist and match the index
npm test
```

---

## License

MIT — build whatever org structure you need.
