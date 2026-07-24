# Crisis Response Structure Presets

Pre-built crisis org structures for when normal operations break down. Each defines: crisis command chain, roles that activate, communication protocols, and escalation paths.

## Available Presets

| Crisis | When to Use | Activation Trigger |
|---|---|---|
| `data-breach` | Security incident, data leak, ransomware | Confirmed breach, SOC alert, ransomware note |
| `pr-crisis` | Negative press, social media firestorm, viral complaint | Press inquiry, trending hashtag, reporter call |
| `founder-departure` | CEO/CTO/founder leaves suddenly | Resignation, death, incapacitation |
| `mass-layoff` | RIF, restructuring, shutdown | Board decision, funding cliff, regulatory mandate |
| `acquisition` | Company being acquired, M&A announcement | LOI signed, public announcement |
| `regulatory-investigation` | Government inquiry, subpoena, raid | Legal notice, warrant, regulator visit |

## Crisis Chain of Command

During a crisis, the normal org chart is replaced by a flat crisis command structure:

```
                    ┌─────────────────┐
                    │  Crisis Lead     │  ← CEO or designated exec
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐       ┌─────▼─────┐       ┌─────▼─────┐
    │ Ops Lead │       │ Comms Lead │       │ Legal Lead │
    │(what now)│       │ (what to   │       │ (what's    │
    │          │       │  say)      │       │  allowed)  │
    └────┬────┘       └─────┬──────┘       └─────┬──────┘
         │                  │                     │
    ┌────▼────┐       ┌─────▼─────┐       ┌─────▼─────┐
    │ Teams    │       │ Spokes-   │       │ External   │
    │ execute  │       │ person    │       │ counsel    │
    └─────────┘       └───────────┘       └───────────┘
```

## Crisis Roles

Every crisis activates these roles with modified authority:

### Crisis Lead
- **Normal role:** CEO, COO, or most senior available exec
- **Crisis authority:** Full decision-making power, bypasses normal approval chains
- **Responsible for:** Life/safety decisions, resource allocation, declaring crisis over
- **Command:** All communications go through Crisis Lead. No freelancing.

### Ops Lead
- **Normal role:** CTO, COO, or department head
- **Crisis authority:** Can redeploy any personnel temporarily
- **Responsible for:** Technical response, containment, recovery operations

### Comms Lead
- **Normal role:** CMO, PR director, Head of Comms
- **Crisis authority:** All external communications must be approved by Comms Lead
- **Responsible for:** Press statements, internal comms, stakeholder updates, social media monitoring

### Legal Lead
- **Normal role:** General Counsel or outside counsel
- **Crisis authority:** Can stop any action on legal grounds
- **Responsible for:** Regulatory notifications, privilege, evidence preservation, liability assessment

## Activation Protocol

1. **Detect** — Crisis identified by any team member
2. **Assess** — Crisis Lead convenes within 30 minutes (or immediately for safety)
3. **Activate** — Crisis command structure replaces normal org. Announce to all staff.
4. **Execute** — Ops, Comms, Legal work in parallel, reporting to Crisis Lead
5. **Deactivate** — Crisis Lead declares resolution. Normal org resumes. Post-mortem scheduled.

## Key Rules

- **No freelancing:** During a crisis, every external communication must go through Comms Lead
- **Document everything:** All crisis decisions and their rationale must be logged
- **Speed over process:** Normal approval chains are suspended. Crisis Lead decisions are final.
- **Safety first:** No decision that compromises physical safety, legal compliance, or data security
- **Post-crisis:** Mandatory post-mortem within 1 week. Update crisis plan based on lessons learned.

## Usage

When a user describes a crisis scenario, load this system and overlay the crisis command structure on their existing org. Walk through activation protocol, role assignments, and key actions for the specific crisis type.
