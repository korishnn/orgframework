# Budget Calculator

From any org structure + compensation data → total cost model.

## Calculation Formula

```
Total Org Cost = Σ(role_count × (base_salary + bonus + equity_annualized + overhead))
```

### Overhead Multipliers by Region
| Region | Overhead | Includes |
|---|---|---|
| NA | 1.25x-1.4x | Health insurance, 401(k) match, payroll tax, office, tools |
| EMEA | 1.3x-1.6x | Social contributions, mandatory insurance, 13th salary, higher vacation |
| APAC | 1.15x-1.3x | Social insurance, housing fund (China), transportation (Japan) |
| LATAM | 1.3x-1.5x | 13th salary, social security, meal vouchers (Brazil), profit sharing (Mexico) |

### Cost by Stage
| Stage | Typical Monthly Burn (Org Only) | Notes |
|---|---|---|
| Startup (1-10) | $30K-$150K | Mostly engineering. Founders take below market. |
| Scaleup (10-80) | $150K-$800K | Department leads hired. Market-rate comp. |
| Enterprise (80+) | $800K-$5M+ | Full benefits, RSUs, multiple layers, office space. |

## Budget Breakdown Template

```
## Org Budget: [Company]

### Monthly Run Rate
| Department | Headcount | Avg Cost/Head | Total |
|---|---|---|---|
| Engineering | X | $Y | $Z |
| ... | ... | ... | ... |
| TOTAL | X | - | $Z |

### Annual Projection
| Category | Amount |
|---|---|
| Total compensation | $X |
| Benefits & overhead (@ X%) | $X |
| Tools & software | $X |
| Office/facilities | $X |
| Recruiting & training | $X |
| **Total annual** | **$X** |
| **Monthly burn** | **$X** |
```

## Usage

When a user asks "what does this org cost":
1. Load org structure (from preset or their description)
2. Pull compensation data from compensation/bands.json
3. Apply region overhead multiplier
4. Calculate per-department and total costs
5. Output budget breakdown with stage benchmarks
