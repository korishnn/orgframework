# RACI Generator — Decision Rights Matrix

From any org structure, generate a RACI (Responsible, Accountable, Consulted, Informed) matrix for key decisions.

## Universal Decision Categories

| Decision | R | A | C | I |
|---|---|---|---|---|
| Product roadmap priorities | Product Manager | CPO / Head of Product | Engineering, Sales, Customer Support | CEO, Marketing |
| Pricing changes | Pricing Strategist / Product | CPO / CFO | Sales, Finance, Marketing | CEO, Board |
| Hiring a new role | HR Recruiting + Hiring Manager | Department Head | HR, Finance (budget) | Exec team |
| Budget allocation | FP&A / Department Head | CFO | All department heads | CEO, Board |
| Technology stack choice | Engineering Lead (Architect) | CTO | Engineering team, Security | Product, IT |
| Marketing campaign | Marketing Manager | CMO | Product, Sales, Design | CEO (if major spend) |
| Customer refund > $X | Customer Support Agent | CS Manager / Finance | Customer Success | — |
| Compliance decision | Compliance Officer | General Counsel | Security, Operations | CEO, Board |
| Office location | Facilities / Operations | COO | HR (talent pool), Finance (budget), Exec | All staff |
| Vendor contract > $X | Procurement | CFO/COO | Legal, Department Head | CEO |

## Dynamic RACI Generation

The AI determines RACI assignments based on:

### 1. Org Structure
- **Flatter org** = A sits lower (Manager-level decisions stay with manager)
- **Deep hierarchy** = A sits higher (Director/VP approves)
- **Startup** = Founders are A for everything. R is whoever can do the work.
- **Enterprise** = Clear RACI separation. Matrix orgs have shared A.

### 2. Industry Adjustments
- **Fintech:** Compliance and Legal have veto power (C/A on most decisions)
- **Healthcare:** Clinical safety is always A for patient-impacting decisions
- **Regulated:** Legal/Compliance may be A, not just C, for decisions with regulatory implications

### 3. Regional Adjustments
- **EU/EMEA:** Works council must be I (informed) for hiring/layoff/restructuring decisions
- **DE (Germany):** Works council may be C (consulted) for organizational changes
- **APAC:** Seniority hierarchy may elevate A to higher level

### 4. Stage Adjustments
- **Startup:** R and A are often the same person (founder)
- **Scaleup:** R and A begin to separate. First delegated authorities established.
- **Enterprise:** Clear RACI with approval thresholds. A is always above R.

## Output Format

```
## Decision Matrix: [Org Name]

| Decision | R | A | C | I |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

### Key Thresholds
- Spending up to $5K: Manager approves
- $5K-$50K: Director approves
- $50K+: VP+ with CFO sign-off

### Critical Escalations
- Security incidents: Skip chain, go directly to CISO
- Regulatory inquiries: Legal must be notified within 1 hour
- Customer escalations: Any unresolved >48h → CS Director
```

## Usage

When a user asks "who decides X" or "how do we make decisions in this structure":
1. Load their org structure (from preset or described)
2. Apply the universal RACI baseline
3. Adjust by stage, industry, region
4. Output the matrix with key thresholds
