# Simulator Guidance — Org Stress Simulation

## Purpose
Given an org structure and a stress scenario, simulate how the organization responds. Identify first failures, cascade effects, recovery path, and structural buffers needed.

## Input
- Org structure: departments, roles, spans of control, key relationships
- Scenario: one of the 8 defined simulation scenarios

## Scenarios

### hypergrowth
- Double headcount in 6 months
- **What breaks:** Manager spans exceed cognitive limits. Onboarding pipeline collapses. Culture dilutes. Decision bottlenecks form where founders still approve every hire.
- **Cascade:** Hiring delays → team understaffing → burnout → attrition → more hiring pressure
- **Recovery:** Hire first-line managers before you need them. Create a hiring engine (recruiting ops + interview training). Document culture explicitly.
- **Buffers:** Over-hire managers by 20%. Build onboarding as a product. Set hiring quality gates.

### recession
- 30% budget cut required
- **What breaks:** Layer 2 managers become redundant if you trim teams. R&D gets cut first (long-term damage). Support quality drops.
- **Cascade:** Budget cuts → team reductions → survivor syndrome → voluntary attrition of top talent → further cuts
- **Recovery:** Cut from the top, not the bottom. Protect revenue-generating and product roles. Communicate the plan transparently.
- **Buffers:** Maintain 10-15% variable comp. Build cross-training so teams can flex. Keep a 'war chest' of contractors.

### key_departure
- CEO, CTO, Head of Sales, or Head of Product leaves without notice
- **What breaks:** Strategic decisions stop. External confidence drops. Key relationships are lost. Succession panic.
- **Cascade:** Leader departure → internal competition for role → team fragmentation → competitor poaching → more exits
- **Recovery:** Have a named successor (even if interim). Document all external relationships. Maintain institutional memory in written form.
- **Buffers:** Every executive should have a deputy. Never let bus factor = 1 for any mission-critical role. Mandate documentation of all key processes and relationships.

### acquisition
- Your org is acquired by a larger company
- **What breaks:** Duplicate roles across companies. Cultural collision (startup speed vs enterprise process). Compensation misalignment. Leadership power struggle.
- **Cascade:** Integration planning → role redundancy decisions → voluntary departures → culture conflict → retention issues
- **Recovery:** Decide integration depth early (full merge / separate / partial). Communicate quickly. Align comp within 90 days.
- **Buffers:** Retention packages. Clear integration team with decision rights. Culture integration workshops.

### breach
- Major security breach (customer data exposed, ransomware, etc.)
- **What breaks:** Incident response command structure is critical. Normal hierarchy breaks down — you need rapid, centralized decisions.
- **Cascade:** Breach discovery → containment → communication → regulatory notification → legal liability → reputation damage → customer churn
- **Recovery:** Establish incident command immediately. Separate: investigation team, communication team, legal team, engineering fix team. No one person wears all four hats.
- **Buffers:** Pre-defined incident response playbook. Pre-trained incident command team. Tabletop exercises quarterly. Cyber insurance.

### ipo
- Going public
- **What breaks:** Financial reporting rigor. SOX/regulatory compliance. Board structure. Investor relations. Executive time allocation.
- **Cascade:** Pre-IPO prep → regulatory filings → roadshow → quiet period → public trading → quarterly rhythm
- **Recovery:** Build public-company infrastructure 12 months before IPO. CFO, legal, IR as core. Add board members with public company experience.
- **Buffers:** Dual-class stock for founder control. Lock-up planning. Employee communication plan for the liquidity event.

### remote_shift
- Forced to go fully remote
- **What breaks:** Middle management becomes coordination overhead. Async communication replaces synchronous — culture erodes. Trust mechanisms break. Informal information flow stops.
- **Cascade:** Remote shift → productivity dip → communication tool overload → async documentation gaps → culture erosion → disconnection → attrition
- **Recovery:** Invest in async-first documentation. Flatten hierarchy. Reduce meeting culture. Create intentional social connection. Written culture handbook.
- **Buffers:** Company handbook as source of truth. Async communication training. Home office budget. Regular in-person gatherings (even if 2x/year).

### ai_augmentation
- AI agents replace 30% of current roles
- **What breaks:** Middle management (AI handles reporting & coordination). Tier-1 support (AI handles first response). Data entry, basic content, monitoring.
- **Cascade:** Role elimination → restructuring → human role redefinition → AI oversight roles created → compensation rebalancing
- **Recovery:** Map every role to replacement/augmentation/transformation/new creation. Redeploy, don't fire. Create new roles (AI ops, model monitoring, AI ethics).
- **Buffers:** Human-in-the-loop for all critical decisions. Reskilling budget. AI oversight as a new career track.

## Output Format

```
## Stress Simulation: [Scenario]

### Scenario Applied
[How the scenario impacts the org]

### First Roles/Functions to Break
- [Role A] — [Reason]
- [Role B] — [Reason]

### Cascade Effects
[Event chain showing how failure propagates]

### Fragility Heatmap
| Role/Team | Severity | Risk | Recommended Buffer |
|---|---|---|---|
| [A] | Critical | Single point of failure | Cross-train [B] as backup |
| [C] | High | Span overload | Hire deputy |

### Recovery Timeline
- Immediate (0-30 days): [steps]
- Short-term (30-90 days): [steps]
- Medium-term (90-180 days): [steps]

### Structural Buffers Recommended
1. [Buffer] — addresses [risk]
2. [Buffer] — addresses [risk]
```
