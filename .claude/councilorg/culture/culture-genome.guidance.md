# Culture Genome Guidance — Mapping Structure to Culture

## Purpose
Map an org structure to its predicted cultural traits using Westrum's typology, DORA metrics, and sociotechnical patterns. Given a structure, predict information flow quality, blame culture risk, innovation velocity, and psychological safety zones.

## Westrum Typology Quick Reference

| Type | Information Flow | Failure Response | New Ideas | Trust Level | Org Structure Correlates |
|---|---|---|---|---|---|
| **Pathological** | Hoarded | Hidden | Crushed | Low | Deep hierarchy, high span of control, centralized decisions, no skip-levels, fear culture |
| **Bureaucratic** | Through channels | Processed | Treated as threat | Medium | Matrix org, multi-layer approvals, heavy documentation, process over outcomes |
| **Generative** | Free flow | Leads to learning | Welcomed | High | Flat hierarchy, high autonomy, cross-functional teams, blameless culture |

## Culture Detection from Structure

### Indicators of Pathological Culture Risk
- CEO:team ratio > 1:50 (CEO has no time for individual connection)
- 6+ layers of management (information is filtered/distorted at each layer)
- Decision authority requires 3+ approvals (fear-based sign-off culture)
- No anonymous feedback channels (fear of retaliation)
- Role descriptions include 'enforce policy' more than 'enable success'
- Span of control > 15 for managers (no capacity for coaching or psychological safety)
- No skip-level meeting practice built into the structure

### Indicators of Bureaucratic Culture Risk
- Matrix structure where every role reports to 2+ managers
- Handoff density > 3 per work item between teams
- Dedicated 'process' roles in every department
- Centralized decisions for local concerns
- Job descriptions emphasize process adherence over outcomes
- Cross-team collaboration requires formal agreements/SLAs
- Innovation requires committee approval

### Indicators of Generative Culture Potential
- Maximum 3 layers from IC to CEO
- Teams own product end-to-end (autonomy)
- Cross-functional teams with all skills needed to deliver
- Dedicated time for exploration (hackathons, innovation time)
- Blameless post-mortems referenced in team practices
- Career ladders include 'mentoring' and 'coaching' as requirements for promotion
- Teams can make decisions within their domain without approval
- Job descriptions emphasize outcomes, learning, and collaboration

## DORA Performance Mapping

Use team structure to predict where the org lands on DORA metrics:

| DORA Level | Structure Requirements |
|---|---|
| **Elite** | Small autonomous teams (<10). Dedicated DevOps/platform. Full CI/CD. Teams own services end-to-end. Feature flags. No release managers. On-call is team's responsibility. |
| **High** | Feature teams with some autonomy. Platform team exists. CI/CD in place. Deploy weekly. Some release gates. Dedicated QA or automated testing. |
| **Medium** | Separate dev and ops teams. Release manager role exists. Deploy monthly. Manual gates. Test environment != production. |
| **Low** | Dev → QA → Ops handoffs. Heavy hierarchy. Deploy quarterly. Everything manual. Release is an 'event'. Teams don't own their services in production. |

## Sociotechnical Patterns

### Team Topology → Culture Signal
- **Mostly stream-aligned teams** → Generative culture likely (autonomy, ownership, learning)
- **Mostly platform/enabling teams** → Bureaucratic culture risk (if platform teams control what stream teams can do)
- **Complicated-subsystem teams as the majority** → Pathological risk (knowledge hoarding, bottlenecks)

### Communication Structure → Culture Signal
- **All communication goes through managers** → Pathological (information control)
- **Any role can talk to any role** → Generative (information flow)
- **Communication requires tickets or formal channels** → Bureaucratic

### Decision Rights → Culture Signal
- **Decisions made at lowest possible level** → Generative
- **All decisions escalate to top** → Pathological
- **Decisions follow defined matrix** → Bureaucratic

## Output Format

```
## Culture Genome Analysis

### Predicted Westrum Typology: [Pathological / Bureaucratic / Generative]

### Evidence from Structure
1. [Structural feature] → [Cultural indicator]
2. [Structural feature] → [Cultural indicator]

### Psychological Safety Zones
- [Roles/teams] — high safety (autonomy, peer support, blameless practices)
- [Roles/teams] — low safety (high span, isolation, enforcement focus)

### Information Flow Quality
- [Assessment of how information moves through the org]
- [Bottlenecks and blockages]

### Innovation Velocity Projection
- [Based on structure, how fast can this org innovate?]
- [Key constraints on innovation]

### Blame Culture Risk Score: [Low / Medium / High]
[Rationale based on structural indicators]

### DORA Performance Prediction: [Elite / High / Medium / Low]
[Structural reasoning]

### Recommendations for Target Culture
1. [Structural change] → [Cultural impact]
2. [Structural change] → [Cultural impact]
```
