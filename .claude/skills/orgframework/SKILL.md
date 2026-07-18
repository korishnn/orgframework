# orgframework — Org Structure Reference for Claude Code

**537 hand-written reference roles + 31 org presets + crisis templates + compensation data.** Reference material for Claude to build custom org structures.

## Usage

```
/orgframework <your request>
```

Examples:
- `/orgframework we're a 50-person fintech in Berlin expanding to Brazil`
- `/orgframework design a hospital respiratory therapy department`
- `/orgframework our Series B fintech needs a compliance structure`

## How it works

1. **Context Classifier** — detects region, industry, stage from natural language
2. **Preset Matcher** — checks if a pre-built org template fits (31 available)
3. **Org Architect** — constructs departments, roles, and reporting lines for this request
4. **Region/Industry/Stage Adapt** — applies relevant laws, norms, and patterns
5. **Deliver** — response through the lens of the structure

## What's in the box

| Layer | Count | Where | Purpose |
|---|---|---|---|
| **Reference roles** | 537 | `styles/*.md` | Hand-written role data with responsibilities, KPIs, career paths |
| **Org presets** | 31 | `presets/*.json` | Pre-built org structure templates (Series A SaaS, fintech, hospital, etc.) |
| **Crisis templates** | 6 | `crisis/*.json` | Command structures for breach, layoff, founder departure, etc. |
| **Compensation data** | 50+ roles | `compensation/bands.json` | Salary bands by role, region, and level |
| **Regions** | 4 | `regions/*.json` | NA, EMEA, APAC, LATAM context |
| **Industries** | 5 | `industries/*.json` | SaaS, Fintech, Healthcare, Manufacturing, Ecommerce |
| **Stages** | 3 | `stages/*.json` | Startup, Scaleup, Enterprise |
| **Guidance files** | various | topic directories | Prompt guidance for org design subtopics |

## The philosophy

The 537 role files are reference material — detailed examples of real-world roles with responsibilities, KPIs, tools, career paths, regional nuances, and industry variations. Read them when you need depth on a function. But you are never limited to them. The AI can create any department name, invent roles, design reporting structures, build temporary orgs, or combine reference roles freely.

## Shortcodes

Region: `@na` `@emea` `@apac` `@latam`
Industry: `@saas` `@fintech` `@health` `@mfg` `@ecom`
Stage: `@startup` `@scaleup` `@enterprise`

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/orgframework.git
cd your-project
bash bin/install.sh
```

Then in Claude Code: `/orgframework <your request>`

## Development

```bash
npm test
```
