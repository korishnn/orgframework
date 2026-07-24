# Org Health Monitor

Ongoing assessment system. "Check my org monthly." Tracks changes over time and alerts when the org drifts toward unhealthy patterns.

## Health Dimensions

### 1. Structural Health
| Metric | Healthy | Warning | Unhealthy |
|---|---|---|---|
| Layers vs headcount | ≤ log2(N) | log2(N) + 1 | log2(N) + 2+ |
| Avg span of control | 1:5-10 | 1:3-4 or 1:11-15 | 1:1-2 or 1:15+ |
| Manager-to-IC ratio | 1:4-8 | 1:2-3 | 1:1+ |
| Title inflation | Titles match stage | Some inflated titles | VP without reports, Director of nothing |

### 2. Functional Health
| Function | Stage-Aware Check |
|---|---|
| Engineering | IC-to-manager ratio healthy? Tech lead coverage? |
| Product | PM-to-engineer ratio (1:5-8 is healthy)? |
| Sales | AE-to-SDR ratio? Ramp time for new hires? |
| Marketing | Brand vs demand split appropriate for stage? |
| Finance | FP&A exists by Series B? Controller by Series C? |
| HR/People | First HR hire by 30 people? L&D by 80? |

### 3. Bottleneck Detection
- **CEO span too wide** (>8 directs) → Need COO or Chief of Staff
- **Key person dependency** → Role has no backup or coverage plan
- **Decision approval chains** → Too many layers for routine decisions
- **Communication paths** → N(N-1)/2 formula exceeds workable channels

### 4. Growth Readiness
- **Missing functions for next stage** (see maturity guidance)
- **Process maturity** (too little for size vs too much for stage)
- **Hiring velocity** (can the org absorb planned growth?)

## Health Score Card

```
## Org Health Score: [Company Name]
| Date: [date] | Stage: [stage] | Headcount: [N]

### Score: 72/100 (Amber — Watch 3 areas)

| Dimension | Score | Status | Action |
|---|---|---|---|
| Structure | 8/10 | ✅ | Good layer count |
| Functions | 6/10 | ⚠️ | Missing FP&A |
| Bottlenecks | 7/10 | ⚠️ | CEO span at 9 |
| Growth readiness | 5/10 | 🔴 | No HR function at 50 people |

### Critical Alerts
🔴 **No HR/People function** at 50 headcount. Hire Head of People urgently.
⚠️ **CEO has 9 direct reports.** Hire COO or Chief of Staff to reduce to 5-7.
⚠️ **Missing FP&A.** CFO is doing budgeting manually. Add FP&A analyst.

### Trend
[If previous data exists]
- Last month: 68/100
- This month: 72/100 (+4)
- Positive trend: Engineering manager hired
- Negative trend: Sales span increased to 1:12

### Recommendations
1. **Immediate** (this month): Hire Head of People
2. **Short-term** (next quarter): Add FP&A, hire COO
3. **Medium-term** (next 6 months): Build middle management layer
```

## Tracking Format

The monitor can store checkpoints:

```json
{
  "org_id": "company-x",
  "checkpoints": [
    {
      "date": "2026-01-15",
      "headcount": 45,
      "scores": { "structure": 8, "functions": 6, "bottlenecks": 7, "growth": 5 },
      "alerts": ["No HR function", "CEO span at 9"],
      "recommendations": ["Hire Head of People", "Hire COO"]
    }
  ]
}
```

## Usage

When a user asks for a health check:
1. Assess their current org structure against the health dimensions
2. Score each dimension with stage-awareness
3. Flag alerts (red = critical, amber = warning, green = healthy)
4. Track trends if previous data exists
5. Generate prioritized recommendations
