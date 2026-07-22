# Changelog

## 5.0.0 (v3) — The Organizational Intelligence Engine

### Major: LLM Council Architecture
- Added LLM Council: 8 simulated perspectives (Strategist, Operator, Financial Controller, Culture Keeper, Pessimist, Regulatory Hawk, Talent Scout, Systems Architect) that debate every org design
- 2-round council deliberation (proposal + critique), 3-round with `@deep` shortcode
- `@fast` shortcode to skip council for quick queries
- Every council deliberation ends with a Divergence Note

### Major: New Analysis Engines
- `@simulate` — Org stress simulation (hypergrowth, recession, key departure, acquisition, breach, IPO, remote shift, AI augmentation)
- `@conway` — Conway's Law mapper (forward and reverse)
- `@dunbar` — Dunbar cognitive limit auditor
- `@burnout` — Burnout risk index per role
- `@succession` — Single point of failure analyzer (bus factor = 1)
- `@topologies` — Team Topologies mapper (stream-aligned, enabling, complicated-subsystem, platform)
- `@culture-genome` — Culture prediction mapper (Westrum, DORA, sociotechnical)

### Major: Divergence Engine
- `@alternatives` — Generate 3 philosophically different org structures
- `@debate` — Two council members argue opposite positions, then converge
- Every output includes a Divergence Note

### New Presets (4)
- `ai-lab` — AI research lab (DeepMind/OpenAI-style)
- `dao-org` — DAO / decentralized organization
- `climate-tech` — Climate tech startup
- `human-ai-hybrid` — 50% human + 50% AI workforce

### New Roles (18)
- tech-ai-ops (AI/ML ops engineer)
- tech-prompt-engineer (Prompt engineer/LLM interaction designer)
- tech-dx-engineer (Developer experience engineer)
- exec-ai-ethics (Chief AI ethics officer)
- hr-remote-culture (Remote culture & async operations manager)
- hr-neurodiversity (Neurodiversity inclusion lead)
- sust-climate-head (Head of climate & sustainability)
- web3-community (Web3/DAO community manager)
- web3-tokenomics (Tokenomics designer)
- prd-growth-engineer (Growth engineer)
- sec-data-privacy (Data privacy engineer)
- ops-fractional-cxo (Fractional executive coordinator)
- mkt-internal-creator (Internal creator/evangelist)
- dsg-human-ai (Human-AI collaboration designer)
- eng-ai-safety (AI safety engineer)
- da-vector (Vector database/embeddings engineer)
- fin-crypto-treasury (Crypto treasury manager)
- lgl-ai-governance (AI governance & regulatory counsel)

### New Guidance Files
- `simulation/simulator.guidance.md` — Org stress simulation protocol
- `culture/culture-genome.guidance.md` — Westrum/DORA cultural mapping
- `conway/conway.guidance.md` — Conway's Law mapping and reverse Conway
- `topologies/team-topologies.guidance.md` — Team Topologies classification

### New Industries (3)
- `@web3` — Web3/DAO/crypto industry profile
- `@climate` — Climate tech / sustainability profile
- `@ai-labs` — AI research lab profile

### Other Changes
- index.json bumped to v5.0.0 with philosophy_v3, council_members config, deprecated_roles, simulation_scenarios
- additions.json bumped to v5.0.0 with 10 new additions (22 total)
- README.md fully rewritten for v3 with council architecture, new examples, and comprehensive documentation
- package.json bumped to 5.0.0
- New shortcodes: @fast, @deep, @simulate, @conflicts, @conway, @burnout, @succession, @dunbar, @topologies, @culture-genome, @futures, @alternatives, @debate, @dao, @ai-native, @web3, @climate, @ai-labs

## 4.3.0

- Added Systems Integration Hub addition
- Improved cross-system coordination logic

## 4.2.0

- Added Adaptive Learning Engine
- Added Auto Troubleshoot with correction protocol
- Improved context classification

## 4.1.0

- Added Cross-Function Weaver
- Added Urgency Adapt
- Added Scope Guard

## 4.0.0

- Added 12 additions system in additions.json
- Added Systems Integration Hub
- Major guidance system overhaul

## 3.0.0

- Initial reference library release
- 537 hand-written roles
- 31 org presets
- 6 crisis templates
- Compensation bands
- Region/industry/stage profiles
