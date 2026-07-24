# Team Topologies Guidance — Mapping Teams to Fundamental Types

## Purpose
Classify teams and their interactions using the Team Topologies framework. Apply the 4 fundamental team types and 3 interaction modes to any org structure.

## The 4 Team Types

### Stream-Aligned Team
**Core idea:** Aligned to a single valuable stream of work (product, service, feature, mission, user journey). Owns the full lifecycle.

**Characteristics:**
- End-to-end ownership of a stream of value
- Contains all skills needed to deliver (cross-functional)
- Autonomous within their domain
- Default team type — most teams should be stream-aligned
- **Size:** 50-90 people (Dunbar's 150 max for a team)

**Best for:** Product development, customer-facing features, user journeys
**Avoid when:** The stream is too small to justify a full team, or the expertise required is too rare/narrow

**Warning signs a stream-aligned team is NOT actually stream-aligned:**
- They have handoffs to other teams to complete their work
- They don't own their services in production
- They need external approval for all changes
- They don't interact directly with users/customers

### Enabling Team
**Core idea:** Helps stream-aligned teams acquire missing capabilities. Composed of experts in specific practices/tools/technologies.

**Characteristics:**
- They mentor, coach, teach, and support — NOT do the work for stream teams
- Temporary engagement per stream team (weeks, not permanent)
- Their success metric: stream teams become self-sufficient
- They operate in facilitation mode
- They stay close to industry trends so stream teams don't have to

**Best for:** DevOps adoption, test automation, security practices, new technology adoption
**Avoid when:** The capability is needed permanently (make it a platform) or the stream team would never develop it (make it a complicated-subsystem)

**Warning signs an enabling team is NOT really an enabling team:**
- They do work for stream teams instead of teaching them
- They're embedded permanently with no exit plan
- They're used as an excuse for stream teams not to build capability
- They become a bottleneck (all requests go through them)

### Complicated-Subsystem Team
**Core idea:** Focuses on a subsystem that requires deep, specialized expertise that most stream-aligned teams wouldn't develop.

**Characteristics:**
- Serves multiple stream-aligned teams as consumers
- High specialization (math, physics, cryptography, video encoding, payment processing)
- Small team (3-5) of deep experts
- Their subsystem is consumed via clean API
- Minimizes cognitive load on stream teams for this complex domain

**Best for:** Video/audio encoding engines, physics simulation kernels, core payment processing, ML model training infrastructure, specialized hardware interfaces
**Avoid when:** The subsystem isn't actually that complicated, or when the team should be part of a stream-aligned team

**Warning signs a complicated-subsystem team is NOT really a complicated-subsystem team:**
- The subsystem could be simplified rather than kept complex
- Stream teams CAN develop this expertise if given time
- The team blocks stream teams' ability to ship
- The subsystem is maintained as a 'black box' that no one else can touch
- The team size grows past 8 (complexity and specialization shouldn't require large teams)

### Platform Team
**Core idea:** Provides a curated internal platform that reduces cognitive load for stream-aligned teams. The platform is a product consumed by other teams.

**Characteristics:**
- Treats internal consumers as customers (UX matters, docs matter, SLAs matter)
- Provides APIs, self-service tools, shared infrastructure
- Actively removes obstacles for stream-aligned teams
- The platform team's success = stream teams' speed
- Platform adoption is voluntary (if it's bad, teams should be free to bypass it)

**Best for:** Cloud infrastructure, CI/CD pipelines, data platform, ML platform, design system, developer portal
**Avoid when:** The platform would be more rigid than what stream teams need, or when the org is too small to justify a dedicated platform team

**Warning signs a platform team is NOT really a platform team:**
- They don't talk to their consumers (stream teams)
- They build what they think is right without validation
- Teams are forced to use the platform (if it was good they'd choose it)
- They become a bottleneck (approving, gatekeeping, or building everything)
- They don't have SLAs for their APIs and services

## The 3 Interaction Modes

### Collaboration
**When:** Two teams working closely together on a shared goal.
**How:** High bandwidth, high trust, frequent sync, pair programming, shared code ownership.
**Best for:** Discovery and exploration, novel problems, integration of two systems when boundaries are unclear.
**Risk:** Time-box this — it doesn't scale. Don't let collaboration become the permanent default.
**Duration:** Short-term (weeks), time-boxed.

### X-as-a-Service
**When:** One team provides something to another team with minimal collaboration.
**How:** Clear APIs, well-documented, SLAs, self-service. Consumer team is autonomous.
**Best for:** Platform teams serving stream teams, stable interfaces where boundaries are well-understood.
**Risk:** Platform team can be disconnected from consumer needs if they don't gather feedback.
**Duration:** Persistent — this is the default interaction mode.

### Facilitation
**When:** One team helps another team learn or adopt a capability.
**How:** Coaching, mentoring, workshops, code review, pair teaching. The helping team does NOT do the work.
**Best for:** Enabling teams helping stream teams, capability transfer, new technology adoption.
**Risk:** The facilitating team gets pulled into doing the work. Protect the boundary.
**Duration:** Temporary (weeks), with clear exit criteria.

## Org Diagnosis Process

1. **Classify each team** into one of the 4 types. If a team doesn't clearly fit one type, it may have a fuzzy identity problem.
2. **Count the distribution.** Most teams should be stream-aligned. If you have more enabling/complicated-subsystem/platform teams than stream-aligned teams, there's a topology problem.
3. **Assess interaction modes** between each pair of teams. Is the mode appropriate for the relationship? Are teams stuck in collaboration mode when they should be X-as-a-Service?
4. **Check for mismatches.** Is a team doing enabling work for everyone but labeled as platform? Is a complicated-subsystem team blocking stream teams? Is a platform team gatekeeping instead of serving?
5. **Identify interaction mode anti-patterns:**
   - **Too much collaboration:** Everything is a shared decision. No team owns anything.
   - **Too much X-as-a-Service:** Teams are isolated, no sharing of context or learning.
   - **No facilitation:** No capability transfer happening. Knowledge doesn't spread.

## Output Format

```
## Team Topologies Analysis

### Team Classification
| Team | Topology Type | Rationale | Interaction Mode(s) |
|---|---|---|---|
| [Team A] | Stream-aligned | Owns checkout flow end-to-end | X-as-a-Service with Platform, Collaboration with Team B |

### Topology Distribution
- Stream-aligned: X (target: 60-70%+)
- Enabling: X (target: 5-10%)
- Complicated-subsystem: X (target: 5-10%)
- Platform: X (target: 10-20%)

### Interaction Map
[Description of how teams interact — which mode between which teams]

### Issues Found
1. [Issue] — [Recommendation]
2. [Issue] — [Recommendation]

### Recommended Changes
1. [Change] — [Impact]
2. [Change] — [Impact]

### Topology Health Assessment: [Good / Needs Improvement / Problematic]
```
