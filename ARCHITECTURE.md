# orgframework Architecture

## Overview

orgframework is an **Organizational Intelligence Engine** for Claude Code. It combines:
- **545 hand-written reference roles** with responsibilities, KPIs, career paths, and relationships
- **35 org presets** with complete department/role structures for common scenarios
- **An LLM Council deliberation engine** that stress-tests every org design from 8 perspectives
- **Analysis engines** for similarity, vacancy simulation, comparison, visualization, and relationship mapping

## Data Flow

```
User Request
     │
     ▼
┌─────────────────────┐
│  Context Classifier │  (detects region, industry, stage)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Council Formation  │  (selects council members for this request)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     ┌─────────────────────┐
│  Role/Preset Load   │────►│  styles/  presets/  │
└─────────┬───────────┘     └─────────────────────┘
          │
          ▼
┌─────────────────────┐
│ Council Deliberation│  (2-3 rounds: proposal → critique → synthesis)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Org Construction   │  (builds org structure from council convergence)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Divergence Note    │  (documents assumptions, alternatives)
└─────────┬───────────┘
          │
          ▼
     Output → LLM Response
```

## Module Architecture

### Engine Modules (each is dual: importable + CLI)

| Module | Path | Purpose |
|---|---|---|
| **Similarity** | `similarity/search.js` | Find roles similar to a given role using token overlap scoring + inverted index |
| **Vacancy** | `vacancy/simulator.js` | Simulate impact of a key role vacancy |
| **Comparison** | `comparison/comparison.js` | Diff two org structures with metrics |
| **Reverse Org** | `reverse-org/designer.js` | Bottom-up org design from headcount list |
| **Visualizer** | `visualizer/generate.js` | Generate Mermaid.js org charts |
| **Council** | `council/orchestrator.js` | LLM Council deliberation state machine |
| **Relationship Map** | `relationship-map/relationship-map.js` | Role relationship graph |
| **Role-to-Task** | `role-to-task/generate.js` | Convert role definition to AI prompt |

### Shared Libraries

| Path | Purpose |
|---|---|
| `lib/errors.js` | `Result<T,E>` monad with `tryCatch()` and `tryReadJson()` |
| `lib/paths.js` | Centralized path resolution for the data directory |
| `lib/constants.js` | Named constants replacing magic numbers |

### Data Layers

| Directory | Count | Format | Purpose |
|---|---|---|---|
| `styles/` | 545 | `.md` | Reference role definitions |
| `presets/` | 35 | `.json` | Complete org structure templates |
| `regions/` | 4 | `.json` | Regional context (NA, EMEA, APAC, LATAM) |
| `industries/` | 5 | `.json` | Industry profiles |
| `stages/` | 3 | `.json` | Company stage profiles |
| `crisis/` | 6 | `.json` | Crisis response templates |
| `compensation/` | 1 | `.json` | Salary bands by role/region/level |

## Council Deliberation

The 8 council members (Strategist, Operator, Financial Controller, Culture Keeper, Pessimist, Regulatory Hawk, Talent Scout, Systems Architect) deliberate in rounds:

1. **Proposal** — Each member gives their initial assessment
2. **Critique** — Members respond to each other's proposals
3. **Synthesis** (optional, `@deep`) — Members converge with dissenting notes preserved

Every deliberation ends with a **Divergence Note**: assumptions made, alternatives considered, and what would change the recommendation.

## Key Design Decisions

1. **ESM only** — All modules use `import`/`export` syntax. No CommonJS.
2. **Result monad** — Functions return `Result.ok(value)` or `Result.fail(error)` instead of throwing.
3. **Dual CLI/module** — Every engine can be `import`ed from another module or run directly via `node`.
4. **CLI guard pattern** — `if (process.argv[1]?.endsWith('name.js')) { ... }` prevents CLI code from running on import.
5. **No build step** — JS runs directly via Node.js >= 18. TypeScript checking is optional.
