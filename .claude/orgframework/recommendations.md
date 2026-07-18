# orgframework — Next 10 Recommendations

## Already Built (v4.2)
- 1. **Org Chart Visualizer** — Mermaid.js diagrams from any structure
- 2. **Org Comparison Engine** — Side-by-side diff of structures
- 3. **Role Relationship Map** — Network graph of role connections
- 4. **Compensation Layer** — Salary bands by role, region, stage
- 5. **Maturity Score** — Stage-appropriateness assessment
- 6. **Expansion Playbooks** — Cross-region expansion guides
- 7. **Hiring Plan Generator** — Hiring sequences and timelines

## Next 10 Recommendations

### 8. Role-to-Task Converter
Take any role definition and output a structured prompt for that role. "Act as a Backend Engineer" → complete system prompt with context, tone, expertise level, and constraints. Bridges the gap between org structure and AI execution. Could power role-specific AI agents.

### 9. Org Budget Calculator
From any org structure + compensation bands → total cost model. "Show me my Series A SaaS company burn rate by department." Auto-calculate total comp, benefits overhead (varies by region: 1.25x-1.5x multiplier), and hiring ramp cost. Makes presets financially actionable.

### 10. Crisis Response Structure
Pre-built presets for crisis scenarios: data breach response, PR crisis, founder departure, mass layoff, acquisition integration, regulatory investigation. Each defines: who needs to be involved, how the chain of command changes, communication protocols, and escalation paths. High-impact because every company needs this at some point.

### 11. Org Timeline Visualizer
Not a static chart — an animated timeline. "Show me how my org evolves from Seed to Series C." Maps out how roles phase in/out, how departments grow, how reporting lines change over stages. Combines preset evolution data with a timeline-based Mermaid visualization.

### 12. Decision Rights Matrix (RACI Generator)
From any org structure → generate a RACI matrix for key decisions. "Who decides on pricing?" → Responsible (Pricing Strategist), Accountable (CPO), Consulted (Sales, Finance), Informed (Board). Makes the structure actionable in daily operations. Especially valuable for regulated industries.

### 13. Role Similarity Engine
Embedding-based role similarity search. "Show me roles similar to eng-backend." Uses the definitions corpus to compute semantic similarity. Helps users discover roles they didn't know existed, find alternative structures, and identify skills adjacency. Makes 11K roles navigable by meaning, not just name.

### 14. Org Health Monitor
Ongoing assessment system. "Check my org monthly." Tracks changes over time: growth rate, span of control drift, title inflation, missing function accumulation. Alerts when the org is heading toward unhealthy patterns. Like a credit score for organizational structure.

### 15. Culture Archetype Overlay
Org structures aren't neutral — they encode culture. Add culture overlays: "What happens to this org structure if we're a high-trust autonomous culture vs a command-and-control culture?" Changes spans of control, approval processes, meeting cadences, and role autonomy levels. Each preset gets culture variants.

### 16. Reverse Org Designer
Instead of building from top-down (CEO → departments → roles), support bottom-up design. "I have 10 engineers, 2 designers, and 1 product manager. What org structure fits?" Takes your actual headcount and suggests the optimal structure given the people you have. Solves the "I need to organize my team but I can't hire new people" problem.

### 17. Role Vacancy Simulator
"Simulate what happens if I lose my CTO." Shows: gaps created, who can cover, hiring urgency (30/60/90 day risk levels), delay-to-hire impact, and recommended backup assignments. Also works in reverse: "How does adding a Chief of Staff change my existing C-suite dynamics?"

## Priority Order

| Rank | Feature | Effort | Impact | Best For |
|---|---|---|---|---|
| 1 | Role-to-Task Converter | Low | High | Making org structures executable |
| 2 | Crisis Response Structure | Medium | High | Real-world necessity |
| 3 | Decision Rights Matrix | Low | High | Daily operational use |
| 4 | Reverse Org Designer | Medium | High | Practical team problem-solving |
| 5 | Org Budget Calculator | Medium | High | Financial planning |
| 6 | Role Similarity Engine | High | Medium | Navigating 11K roles |
| 7 | Org Timeline Visualizer | High | Medium | Investor/board presentations |
| 8 | Culture Archetype Overlay | Medium | Medium | Org design depth |
| 9 | Role Vacancy Simulator | High | Medium | Risk management |
| 10 | Org Health Monitor | High | Low (builds value over time) | Long-term health |

## Implementation Notes

The 7 systems built in v4.2 already cover the structural layer (compare, visualize, assess, hire, expand, map, comp). The next 10 move into:
- **Execution** (#8, #12) — making orgs actionable
- **Risk** (#10, #17) — handling problems
- **Financial** (#9) — making it real
- **Discovery** (#13) — using the data you already have
- **Evolution** (#11, #14, #16) — orgs as living systems
- **Culture** (#15) — beyond org charts to how people work

Each builds on existing data. #8 uses existing definitions. #9 uses existing compensation. #12 uses existing roles and presets. No new data collection needed — just new assembly.
