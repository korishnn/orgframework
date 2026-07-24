# Hiring Plan Generator

Generates hiring sequences from an org structure. Answers: "Who do I hire first?"

## Generation Logic

### Stage-Based Hiring Priority

| Stage | First 3 Hires | Next 5 | Then |
|---|---|---|---|
| **Pre-seed (1-3)** | Co-founder/CTO, First Engineer, First Sales/BD | — | — |
| **Seed (3-10)** | 2nd Engineer, Designer, Marketing lead | Customer-facing role, Operations | Specialized engineers |
| **Series A (10-30)** | Head of Engineering, Head of Product, HR/People | Specialized engineers, Data analyst, Customer success | Finance, More marketers |
| **Series B (30-80)** | VP-level leaders, HR Business Partner, Finance lead | Legal counsel, Data science, Design team | Internal tools, Platform engineering |
| **Enterprise (80+)** | C-suite completion, Department heads, Specialized functions | Centers of excellence, Training, Internal comms | Innovation, Corporate development |

### Hiring Sequence Template

```
## Hiring Plan: [Company Name]

### Context
- Stage: [Seed / Series A / B / Enterprise]
- Current headcount: [N]
- Target headcount: [N] in [timeline]

### Phase 1: Immediate (0-30 days)
| Role | Priority | Why Now | Budget |
|---|---|---|---|
| [role] | Critical | [reason] | [$range] |

### Phase 2: Short-term (30-90 days)
| Role | Priority | Why Now | Budget |
|---|---|---|---|
| [role] | High | [reason] | [$range] |

### Phase 3: Medium-term (90-180 days)
| Role | Priority | Dependency | Budget |
|---|---|---|---|
| [role] | Medium | [must hire X first] | [$range] |

### Total Cost Estimate
- Phase 1: $XX,XXX/month
- Phase 2: $XX,XXX/month
- Phase 3: $XX,XXX/month
- Total annual: $XXX,XXX

### Hiring Sequence (ordered)
1. **[Role]** — Reason this must come first
2. **[Role]** — Why second
3. ...
```

### Key Heuristics
- Revenue-generating roles hire before support roles
- Regulated industries: compliance/legal hire earlier (pre-revenue for fintech)
- Remove bottlenecks before adding headcount (is the CEO the bottleneck?)
- First manager hire is the most critical — should be a player-coach
- Don't hire a VP before they have at least 3 people to manage

## Usage

When a user provides an org structure or asks "who do I hire first":
1. Parse current headcount and stage
2. Identify gaps between current and target structure
3. Order by impact/bottleneck removal
4. Produce a phased hiring plan with timeline and budget
