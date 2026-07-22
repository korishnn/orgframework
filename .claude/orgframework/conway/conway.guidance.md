# Conway Mapper — Applying Conway's Law to Org Design

## Purpose
Apply Melvin Conway's 1968 observation: "Organizations design systems that mirror their communication structures." Given an org structure, predict the resulting system architecture. Given a desired system architecture, propose the org structure that produces it.

## Core Principle

**Conway's Law:** The structure of a system reflects the communication structure of the organization that built it.

**Reverse Conway Maneuver:** To achieve a target system architecture, first restructure the organization to communicate the way you want the system to work. This is the most powerful tool in the Conway Mapper.

## Mapping Dimensions

### Team Boundaries → Service/Module Boundaries
- **Each team owns a deployable unit** → Clean service boundaries, clear ownership
- **Multiple teams own one service** → Blurred responsibility, integration hell, blame culture around the shared service
- **One team owns multiple services** → Either well-designed platform or overloaded team, depends on cognitive load

### Communication Paths → API/Integration Surfaces
- **High-bandwidth communication between two teams** → Tightly coupled services, synchronous APIs, shared databases
- **Low-bandwidth communication between two teams** → Asynchronous APIs, event-driven, loose coupling
- **No communication between teams** → Independent systems, no integration (unless they should be integrated)

### Reporting Lines → Data Flow Authority
- **Reporting to the same manager** → Services likely share data stores or infrastructure
- **Different exec sponsors** → Systems likely have independent data strategies, harder to integrate

### Cross-Team Coordination → Integration Complexity
- **Teams coordinate through tickets** → API contracts, documented interfaces, slow integration
- **Teams coordinate through embedded liaisons** → Shared libraries, frequent API changes, tight coupling
- **Teams coordinate through shared platform team** → Curated platform APIs, managed integration

### Org Layers → System Abstraction Layers
- **Frontend team, backend team, data team** → Three-layer architecture (presentation, logic, data)
- **Product-aligned squads** → Microservices, domain-driven design, bounded contexts
- **Platform + stream-aligned teams** → Platform + satellite services architecture

## Assessment Questions

For each org-team-to-system mapping:

1. **Ownership clarity:** Does each team own a complete service/module they control end-to-end?
2. **Boundary alignment:** Do inter-team dependencies mirror inter-service APIs?
3. **Dunbar check:** Is there a single team whose communication load exceeds Dunbar's 1500 limit?
4. **Architecture prediction:** Would you deploy a monolith or microservices based on this org?
5. **Touch count:** How many teams touch a single deployable unit? (target: 1-2, max: 3)
6. **Conway trap:** Has the org structure created a system that's harder to evolve than it needs to be?
7. **API surface:** Does each team have one well-defined public API (or is there backchannel integration)?

## Reverse Conway Application

To achieve a desired architecture, restructure the org first:

| Target Architecture | Required Org Structure |
|---|---|
| **Microservices** | Small, autonomous, product-aligned teams. Each owns 1-3 services end-to-end. Platform team provides shared infrastructure. |
| **Platform + plugins** | One platform team (treats its platform as a product) + multiple stream-aligned teams that consume platform APIs. |
| **Event-driven** | Teams organized by domain/event. Each team owns its event producers/consumers. Shared event schema team or standards. |
| **Modular monolith** | Multiple teams contributing to the same codebase but owning distinct modules. Strong module boundaries enforced by architecture team. |
| **API-first / product APIs** | Separate API platform team + backend teams that expose APIs consumed by the platform team. API contracts negotiated between teams. |
| **Data mesh** | Domain-oriented data product teams. Each owns its data domain end-to-end. Shared data infrastructure / governance team. |

## Output Format

```
## Conway Analysis

### Org Communication Map
[Diagram/text showing how teams communicate — who talks to whom, how frequently, through what channels]

### Predicted System Architecture (Forward Conway)
The current org structure will naturally produce:
1. [Architecture pattern] — because [org structural reason]
2. [Service boundaries] — because [team boundaries]
3. [Integration patterns] — because [communication patterns]
4. [Coupling risks] — because [team overlap / handoff intensity]

### Alignment Check
| Dimension | Current Org | Implied System | Gap |
|---|---|---|---|
| Team → Service boundaries | [org fact] | [system fact] | [gap description] |

### Refactoring Recommendations
If this system architecture is NOT what you want, change the org:
1. [Org change] → [System impact]
2. [Org change] → [System impact]

### Reverse Conway (if applicable)
To achieve [target architecture]:
1. Restructure into [org structure]
2. Create [new team(s)] for [purpose]
3. Split [existing team] because [reason]
4. Establish [interaction mode] between [teams]
```
