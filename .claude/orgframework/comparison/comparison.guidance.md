# Org Comparison Engine

Given two org structures, the AI produces a structured side-by-side comparison.

## Comparison Template

```
## Org Comparison: [Structure A] vs [Structure B]

### At a Glance
| Dimension | Structure A | Structure B | Delta |
|---|---|---|---|
| Total headcount | [N] | [N] | [+/-N] |
| Layers | [N] | [N] | [+/-N] |
| Departments | [N] | [N] | [+/-N] |
| Roles defined | [N] | [N] | [+/-N] |
| Span of control (avg) | [N:1] | [N:1] | |

### Department-by-Department
| Department | Structure A | Structure B | Notes |
|---|---|---|---|
| Engineering | [headcount, roles] | [headcount, roles] | [key diff] |
| Marketing | ... | ... | ... |

### Key Differences
1. **[Structural difference]** — What it means in practice.
2. **[Cost implication]** — Rough comparison.
3. **[Cultural impact]** — How this changes the way people work.
4. **[Scalability]** — Which structure scales better.

### Recommendation
- **Choose A if:** [criteria]
- **Choose B if:** [criteria]
- **Hybrid approach:** [combine elements]

### Trade-off Summary
| Trade-off | Winner | Why |
|---|---|---|
| Cost efficiency | A/B | ... |
| Speed of decision-making | A/B | ... |
| Employee development | A/B | ... |
| Cross-functional collaboration | A/B | ... |
```

## Usage in SKILL

When a user asks to compare two structures:
1. Parse both structures (from presets or user descriptions)
2. Run the comparison dimensions
3. Output the structured diff
4. End with a clear recommendation

Supported commands:
- "compare [preset A] vs [preset B]"
- "what's the difference between [structure] and [structure]"
- "should I use [A] or [B] for a [stage] [industry] company"
