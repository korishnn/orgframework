# Org Timeline Visualizer

Shows how an org structure evolves across stages — from Seed → Series A → B → C → Enterprise.

## Stage Evolution Model

### Seed (1-10 people)
```
CEO/Founder
├── Engineer (first hire)
├── Engineer #2
├── Product/Marketing (multi‑hat)
└── Sales/BD (multi‑hat)
```
**Key transitions:** First hires set culture. Generalists > specialists. No formal departments.

### Series A (10-30 people)
```
CEO
├── Head of Engineering ─── 4-8 engineers
├── Head of Product ─────── 1-2 PMs
├── Marketing Lead ──────── 1-2 marketers
└── Sales Lead ──────────── 2-3 AEs, 1 BDR
```
**Key transitions:** First functional VPs hired. Dedicated roles replace multi‑hat. Founders stop doing IC work.

### Series B (30-80 people)
```
CEO
├── VP Engineering ──── Managers ─── Engineers (15-25)
├── CPO ─────────────── PMs, Design (6-10)
├── CMO ─────────────── Marketing, Comms (5-8)
├── VP Sales ────────── AEs, SDRs, CS (10-15)
├── Head of People ──── HR, Recruiting (2-3)
└── CFO ─────────────── Finance, Ops (3-5)
```
**Key transitions:** Management layer emerges. First HR/People hire. Finance formalized. Process introduced.

### Series C / Growth (80-200+ people)
```
CEO
├── CTO ─────── VP Eng ─── Directors ─── Managers ─── ICs
├── CPO ─────── Research, Analytics, Design
├── CMO ─────── Brand, Demand, Content, Comms
├── CRO ─────── Sales, CS, Partnerships, RevOps
├── CFO ─────── FP&A, Accounting, Treasury, Audit
├── CHRO ────── Talent, L&D, Benefits, Culture
└── GC ──────── Legal, Compliance, Privacy
```
**Key transitions:** C-suite complete. Middle management layer. Cross-functional dependencies formalized. Board reporting cadence established.

### Enterprise / Public (500+)
```
CEO
├── CTO ──── EVP ──── SVP ──── VP ──── Director ──── Manager ──── IC
├── CPO ──── (same depth)
├── CMO ──── (same depth)
├── CFO ──── (same depth, plus IR, Audit, Tax)
├── CHRO ─── (same depth, plus DEI, Internal Comms)
├── GC ───── (same depth, plus Litigation, Regulatory)
├── COO ──── (Ops, IT, Facilities, Supply Chain)
└── Board
```
**Key transitions:** Deep hierarchy (5-7 layers). Centers of Excellence. Shared services. Matrix management. Internal mobility programs.

## Timeline Views

### Role Phase-Outs
Roles that disappear as the company grows:
- "First engineer who does everything" → specialized ICs
- "Founder who is also the sales team" → dedicated sales org
- "Office manager who also does HR" → dedicated HR function

### Role Phase-Ins
Roles that appear at each stage:
- **Series A:** Head of Engineering, Head of Product
- **Series B:** VP Sales, CMO, CFO, Head of People
- **Series C:** GC, CRO, CHRO, Internal Audit
- **Enterprise:** DEI, Internal Comms, Corporate Development, M&A, Investor Relations

### Department Evolution Tree
```
Marketing                        Sales
├── Seed: Founder does it        ├── Seed: Founder does it
├── A: Marketing Lead + 1        ├── A: Sales Lead + 2 AEs
├── B: CMO + Brand + Demand     ├── B: VP Sales + CS + SDRs
├── C: CMO + 4 sub-teams        ├── C: CRO + Sales + CS + RevOps
└── E: CMO + full marketing org └── E: CRO + global sales + field
```

## Visualization Format

When a user asks for a timeline, output:

```
## Org Evolution: [Company] from Seed → Series C

### Stage Timeline
Seed → 18mo → Series A → 24mo → Series B → 18mo → Series C
[1-10]     [10-30]        [30-80]        [80-200]

### Headcount Growth
[Line chart concept: X=time, Y=headcount, points at each stage]

### Key Transitions
1. Seed→A: First VP Engineering hired. Product/Eng separates.
2. A→B: First CMO + CFO. Management layer forms.
3. B→C: C-suite completes. Middle management. Process introduced.

### Departments Over Time
[Table showing each department's size at each stage]
```

## Usage

When a user asks "how does my org evolve" or "timeline":
1. Determine their current and target stages
2. Load the stage evolution model
3. Map their current structure onto the timeline
4. Show what phases in, phases out, and key transitions
5. Output as structured timeline with Mermaid visualization
