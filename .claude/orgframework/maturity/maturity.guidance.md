# Maturity Score Engine

Assesses whether an org structure is stage-appropriate and identifies over/under-building.

## Assessment Dimensions

### 1. Headcount vs Layer Appropriateness
| Stage | Max Layers | Span of Control | Red Flags |
|---|---|---|---|
| Startup (1-10) | 2 (CEO → IC) | 1:5-8 | Anyone with "VP" or "Director" title |
| Scaleup (10-80) | 3 (CEO → Manager → IC) | 1:5-10 | More than 2 VPs; Directors without ICs |
| Enterprise (80+) | 5+ | 1:5-15 | More than 8 layers; anyone with no direct reports |

### 2. Role Count vs Stage
| Stage | Optimal Role Count | Symptom of Under-hiring | Symptom of Over-hiring |
|---|---|---|---|
| Startup (1-10) | 3-6 roles | One person does everything (burnout) | Titles inflated (3 VPs, 5 people) |
| Scaleup (10-80) | 10-25 roles | Founders still doing IC work | Middle management without IC responsibility |
| Enterprise (80+) | 25+ roles | Missing specialized functions | Redundant roles in same function |

### 3. Missing Functions by Stage
| Stage | Must-Have Functions | Nice-to-Have | Premature |
|---|---|---|---|
| Startup | Engineering, Product, Sales/Marketing | HR, Finance, Legal | Compliance officer, Chief of Staff |
| Scaleup | Add: HR, Finance, Customer Success | Add: Legal, Data, Design | Internal comms, DEI officer, Innovation lab |
| Enterprise | Add: Legal, Compliance, Internal Comms, DEI, Audit, Risk | Executive comms, Corporate strategy | N/A (all functions valid at scale) |

### 4. Executive Span Check
| Signal | What's Wrong |
|---|---|
| CEO has 10+ direct reports | No COO or exec team layer. CEO is bottleneck. |
| Manager manages 1 person | Unnecessary layer. Combine or flatten. |
| 5 layers for 20 people | Severe over-management. Flatten. |
| No one reports to CTO | CTO is IC, not executive. Title mismatch. |
| VP of X with no department | Title inflation. This is a manager or IC. |

### 5. Regulatory Readiness
| Industry | Must-Have Roles by Stage |
|---|---|
| Fintech (any stage) | Compliance officer (from day 1). Legal counsel by Series A. |
| Healthcare (any stage) | Compliance/HIPAA officer. Clinical safety lead by scaleup. |
| Public company | SOX compliance, Internal audit, SEC reporting. |

## Score Calculation

The AI produces a weighted score per dimension and an overall maturity score:

```
Maturity Assessment: [Company] - [Stage]

| Dimension | Score | Assessment |
|---|---|---|
| Layer appropriateness | 8/10 | One extra layer for a 25-person company |
| Role coverage | 7/10 | Missing dedicated Customer Success |
| Title appropriateness | 9/10 | All titles match stage |
| Missing functions | 6/10 | No HR or Finance function at Series A |
| Executive span | 8/10 | CEO has 7 direct reports, reasonable |
| Regulatory | 5/10 | No compliance function for fintech |

OVERALL: 72/100 — Good foundation, 3 areas to address

Critical fixes needed before next stage:
1. Hire a Finance lead (not VP — Director/Manager level)
2. Add a Customer Success IC reporting to Sales
3. Bring in compliance counsel (part-time or fractional)
```

## Usage

When a user asks "is my org right?" or provides a structure for assessment:
1. Determine stage from headcount/funding signals
2. Run each dimension
3. Score and produce action items
4. Flag critical vs nice-to-have fixes
