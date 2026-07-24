// council/orchestrator.js — LLM Council deliberation engine
// Scaffolds the 8-member council deliberation architecture for org design.
// The council provides multi-perspective stress-testing of every org structure.
// This module outputs structured deliberation scripts that the LLM host executes.

import { readDataFile } from '../lib/fs.js';
import { VIRTUAL_REPORT } from '../lib/constants.js';

// ── Council Member Definitions ────────────────────────────────────────
export const COUNCIL_MEMBERS = [
  {
    id: 'strategist',
    name: 'The Strategist',
    signature: 'Does this structure serve our 3-year strategy?',
    focus: 'Long-term vision, market positioning, competitive advantage, strategic flexibility',
    bias: 'Growth-oriented, may underestimate operational friction',
    prompt: 'You are The Strategist. Your role is to evaluate whether the proposed org structure serves the organization\'s 3-5 year strategic objectives. Consider: Does it enable the right capabilities? Does it create strategic flexibility? Does it position the org for the market it wants to be in, not just the one it\'s in now?'
  },
  {
    id: 'operator',
    name: 'The Operator',
    signature: 'Who does the work and where does it get stuck?',
    focus: 'Day-to-day execution, decision rights, handoffs, bottlenecks, workflow',
    bias: 'Prefers flat structures with clear ownership, may underinvest in strategic roles',
    prompt: 'You are The Operator. Your role is to evaluate whether the structure enables efficient execution. Consider: Who owns each decision? Where do handoffs happen? What will get stuck in committee? Can the work actually get done without excessive coordination overhead?'
  },
  {
    id: 'financial-controller',
    name: 'The Financial Controller',
    signature: 'What does this cost and is it sustainable?',
    focus: 'Cost of structure, headcount ROI, compensation, span efficiency, budget constraints',
    bias: 'Cost-conscious, may resist necessary investment in growth roles',
    prompt: 'You are The Financial Controller. Your role is to evaluate the financial sustainability of the proposed structure. Consider: What is the cost of this management layer? Is the span of control efficient? Are we over-invested in any function? What is the burn rate implication? Are there more cost-effective structural alternatives?'
  },
  {
    id: 'culture-keeper',
    name: 'The Culture Keeper',
    signature: 'What culture does this structure produce?',
    focus: 'Psychological safety, collaboration patterns, inclusion, values alignment',
    bias: 'Prioritizes culture over efficiency, may resist necessary hierarchy',
    prompt: 'You are The Culture Keeper. Your role is to evaluate what culture the proposed structure will produce. Consider: Does this structure encourage collaboration or silos? What behaviors does it incentivize? Will psychological safety survive the reporting structure? Does it reflect the stated values of the organization?'
  },
  {
    id: 'pessimist',
    name: 'The Pessimist',
    signature: 'What breaks first and who do we lose?',
    focus: 'Failure modes, single points of failure, attrition risk, worst-case scenarios',
    bias: 'Risk-averse, may over-index on edge cases and rare events',
    prompt: 'You are The Pessimist. Your job is to find what breaks. Consider: What is the single point of failure in this structure? Who is irreplaceable and what happens when they leave? What scenarios cause this structure to fail catastrophically? What are we not seeing?'
  },
  {
    id: 'regulatory-hawk',
    name: 'The Regulatory Hawk',
    signature: 'Which regulator knocks on our door first?',
    focus: 'Compliance, regulatory exposure, reporting requirements, jurisdictional risk',
    bias: 'May over-engineer compliance, underappreciate speed-to-market',
    prompt: 'You are The Regulatory Hawk. Your role is to evaluate regulatory and compliance risks. Consider: Which regulators oversee this industry and structure? Are reporting lines clear for compliance? Are there jurisdictional issues? Does the structure create accountability gaps for regulated activities?'
  },
  {
    id: 'talent-scout',
    name: 'The Talent Scout',
    signature: 'Can we hire these people, here, now?',
    focus: 'Talent availability, role viability, hiring difficulty, retention, career paths',
    bias: 'May prefer generic roles over specialized ones to ease hiring',
    prompt: 'You are The Talent Scout. Your role is to evaluate whether the proposed roles are hireable. Consider: Can we actually find and attract people for these roles in our locations? Do the career paths make sense? Are we creating impossible-to-fill unicorn roles? What is our retention risk for key roles?'
  },
  {
    id: 'systems-architect',
    name: 'The Systems Architect',
    signature: 'What system architecture does this org produce? (Conway\'s Law)',
    focus: 'Conway\'s Law implications, system boundaries, API ownership, platform vs product',
    bias: 'Prefers platform-oriented structures, may over-weight technical considerations',
    prompt: 'You are The Systems Architect. Your role is to evaluate the system architecture implications of the org structure via Conway\'s Law. Consider: What system boundaries does this org structure create? Where will integration challenges emerge? Does the structure encourage the right platform vs product boundaries? What communication paths will become system interfaces?'
  },
  {
    id: 'devils-advocate-red',
    name: 'The Devil\'s Advocate — Red Team',
    signature: 'If I wanted this org to fail, how would I exploit its structure?',
    focus: 'Adversarial thinking, structural vulnerabilities, attack surfaces, blind spots nobody wants to name',
    bias: 'Intentionally adversarial, may over-index on improbable exploit scenarios',
    prompt: 'You are The Devil\'s Advocate — Red Team. Your role is to think adversarially about the proposed org structure. Consider: If you wanted this org to fail, how would you exploit its structure? Where are the attack surfaces? What blind spots are people avoiding? What would a competent adversary take advantage of? What are we confident about that we shouldn\'t be?'
  },
  {
    id: 'devils-advocate-worst',
    name: 'The Devil\'s Advocate — Worst Case',
    signature: 'What is the absolute worst outcome and what sequence of events leads there?',
    focus: 'Cascade failures, correlated risks, extinction-level events, Murphy\'s Law enforcement',
    bias: 'Catastrophically pessimistic, may overlook that most risks don\'t materialize',
    prompt: 'You are The Devil\'s Advocate — Worst Case. Your role is to identify the worst possible outcomes and the chains of events that produce them. Consider: What is the absolute worst thing that could happen with this structure? What seemingly minor issues cascade into catastrophic failure? What correlated risks are we ignoring? What happens when multiple things go wrong simultaneously? What does our Murphy\'s Law stress test reveal?'
  }
];

// ── Council State Machine ─────────────────────────────────────────────

/**
 * @typedef {'proposal' | 'critique' | 'synthesis' | 'complete'} CouncilRound
 * @typedef {{ id: string, name: string, proposal: string|null, critiques: string[], final_position: string|null }} CouncilMemberState
 * @typedef {{ request: string, region: string, industry: string, stage: string, preset: string|null, depth: 'fast'|'default'|'deep' }} CouncilContext
 * @typedef {{ context: CouncilContext, members: CouncilMemberState[], currentRound: CouncilRound, divergence: Array<{memberId: string, position: string, type: string}>, startedAt: string, completedAt: string|null }} CouncilSession
 */

/**
 * Create a new council deliberation session.
 * @param {CouncilContext & { request?: string, region?: string, industry?: string, stage?: string, preset?: string|null, depth?: 'fast'|'default'|'deep' }} context - The org design context
 * @returns {CouncilSession} Council session state
 */
export function createCouncilSession(context) {
  return {
    context: {
      request: context.request || '',
      region: context.region || 'unknown',
      industry: context.industry || 'unknown',
      stage: context.stage || 'unknown',
      preset: context.preset || null,
      depth: context.depth || 'default',
    },
    members: COUNCIL_MEMBERS.map(m => ({
      id: m.id,
      name: m.name,
      proposal: null,
      critiques: [],
      final_position: null,
    })),
    currentRound: 'proposal', // proposal → critique → synthesis → complete
    divergence: [],
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
}

/**
 * Advance the council deliberation to the next round.
 * Returns the round prompt that gets fed to the LLM.
 * @param {CouncilSession} session - Council session from createCouncilSession()
 * @returns {{ round: CouncilRound, prompt: string, session: CouncilSession }}
 */
export function advanceRound(session) {
  const rounds = ['proposal', 'critique', 'synthesis', 'complete'];
  const currentIdx = rounds.indexOf(session.currentRound);

  if (currentIdx >= rounds.length - 1) {
    session.currentRound = 'complete';
    session.completedAt = new Date().toISOString();
    return { round: 'complete', prompt: '', session };
  }

  const nextRound = /** @type {CouncilRound} */ (rounds[currentIdx + 1]);
  session.currentRound = nextRound;

  let prompt = '';

  if (nextRound === 'proposal') {
    prompt = `# LLM Council — Proposal Round\n\n` +
      `Context: "${session.context.request}"\n` +
      `Region: ${session.context.region} | Industry: ${session.context.industry} | Stage: ${session.context.stage}\n\n` +
      `Each council member provides their initial assessment of the appropriate org structure.\n\n` +
      COUNCIL_MEMBERS.map(m =>
        `## ${m.name}\n${m.prompt}\n\n**Signature question:** ${m.signature}\n`
      ).join('\n');
  }

  if (nextRound === 'critique') {
    const proposals = session.members
      .filter(m => m.proposal)
      .map(m => `  - ${m.name}: "${m.proposal}"`)
      .join('\n');

    prompt = `# LLM Council — Critique Round\n\n` +
      `Council members now read each other's proposals and respond.\n` +
      `Each member should flag contradictions, raise concerns, and challenge assumptions.\n\n` +
      `## Proposals from Round 1\n${proposals}\n\n` +
      `## Instructions\n` +
      `Each member should:\n` +
      `1. Identify one assumption they disagree with from another member\n` +
      `2. Point out a trade-off another member missed\n` +
      `3. Acknowledge where they agree with others' assessments\n` +
      `Keep critiques constructive and specific.`;
  }

  if (nextRound === 'synthesis') {
    const critiques = session.members
      .map(m => `  - ${m.name}: ${m.critiques.length > 0 ? '"' + m.critiques[m.critiques.length - 1] + '"' : 'No critique recorded'}`)
      .join('\n');

    prompt = `# LLM Council — Synthesis Round (Deep Deliberation)\n\n` +
      `Council members converge on a final recommendation.\n` +
      `Each member states: what they now recommend and any remaining dissent.\n\n` +
      `## Critiques from Round 2\n${critiques}\n\n` +
      `## Instructions\n` +
      `Each member should:\n` +
      `1. State their final position with conditions\n` +
      `2. Note any unresolved disagreement (dissent is preserved — it's a feature)\n` +
      `3. Identify what would change their recommendation\n\n` +
      `## Divergence Note Template\n` +
      `After all members state final positions, produce a divergence note:\n` +
      `- **Assumptions made:** ...\n` +
      `- **Alternatives considered:** ...\n` +
      `- **What would change this recommendation:** ...`;
  }

  return { round: nextRound, prompt, session };
}

/**
 * Record a council member's proposal.
 * @param {CouncilSession} session
 * @param {string} memberId
 * @param {string} proposal
 * @returns {CouncilSession} Updated session
 */
export function recordProposal(session, memberId, proposal) {
  const member = session.members.find(m => m.id === memberId);
  if (member) member.proposal = proposal;
  return session;
}

/**
 * Record a critique from one member about another's proposal.
 * @param {CouncilSession} session
 * @param {string} fromMemberId
 * @param {string} critique
 * @returns {CouncilSession} Updated session
 */
export function recordCritique(session, fromMemberId, critique) {
  const member = session.members.find(m => m.id === fromMemberId);
  if (member) member.critiques.push(critique);
  return session;
}

/**
 * Record a council member's final position.
 * @param {CouncilSession} session
 * @param {string} memberId
 * @param {string} position
 * @param {boolean} [dissenting=false]
 * @returns {CouncilSession} Updated session
 */
export function recordFinalPosition(session, memberId, position, dissenting = false) {
  const member = session.members.find(m => m.id === memberId);
  if (member) {
    member.final_position = position;
    if (dissenting) {
      session.divergence.push({ memberId, position, type: 'dissent' });
    }
  }
  return session;
}

/**
 * Generate the final divergence note from completed council session.
 * @param {CouncilSession} session
 * @returns {{ depth: string, council_members: number, rounds_completed: number|string, dissenting_opinions: number, divergence: Array<{memberId: string, position: string, type: string}>, assumptions: string[], what_would_change: string[] }}
 */
export function generateDivergenceNote(session) {
  const depths = { fast: '1-round direct answer', default: '2-round proposal + critique', deep: '3-round proposal + critique + synthesis' };
  return {
    depth: depths[session.context.depth] || depths.default,
    council_members: COUNCIL_MEMBERS.length,
    rounds_completed: session.currentRound === 'complete' ? (session.context.depth === 'deep' ? 3 : session.context.depth === 'fast' ? 1 : 2) : session.currentRound,
    dissenting_opinions: session.divergence.length,
    divergence: session.divergence,
    assumptions: [
      'Org structure recommendations reflect current context but should be revisited at each funding/stage milestone',
      'Regional norms and labor laws may override generic recommendations',
      'Culture and team dynamics are inferred from structure, not measured directly'
    ],
    what_would_change: [
      'A change in funding or revenue trajectory',
      'A shift in strategic priority or market conditions',
      'Key hires or departures of senior leadership',
      'Regulatory changes affecting the industry'
    ]
  };
}

// ── Computational Analysis Functions ──────────────────────────────
// These provide hard data inputs that enrich the council deliberation prompts.

/**
 * Compute span of control metrics from an org structure.
 * @param {{ departments?: Array<{ name: string, roles?: Array<{ title: string, level?: string, reports_to?: string }> }> }} orgStructure
 * @returns {{ avg: number, max: number, min: number, spans: Array<{ manager: string, directReports: number }> }}
 */
export function computeSpanOfControl(orgStructure) {
  const depts = orgStructure?.departments || [];
  /** @type {Map<string, number>} */
  const managerCount = new Map();
  for (const dept of depts) {
    const roles = dept.roles || [];
    for (const role of roles) {
      if (role.reports_to && role.reports_to !== VIRTUAL_REPORT) {
        managerCount.set(role.reports_to, (managerCount.get(role.reports_to) || 0) + 1);
      }
    }
  }
  const spans = [...managerCount.entries()].map(([manager, directReports]) => ({ manager, directReports }));
  const counts = spans.map(s => s.directReports);
  return {
    avg: counts.length ? Math.round((counts.reduce((a, b) => a + b, 0) / counts.length) * 10) / 10 : 0,
    max: counts.length ? Math.max(...counts) : 0,
    min: counts.length ? Math.min(...counts) : 0,
    spans
  };
}

/**
 * Detect single points of failure — roles with count=1 at critical levels.
 * @param {{ departments?: Array<{ name: string, roles?: Array<{ title: string, level?: string, count?: number }> }> }} orgStructure
 * @returns {Array<{ role: string, dept: string, level: string, risk: string }>}
 */
export function detectSinglePointsOfFailure(orgStructure) {
  const depts = orgStructure?.departments || [];
  /** @type {Array<{ role: string, dept: string, level: string, risk: string }>} */
  const failures = [];
  for (const dept of depts) {
    const roles = dept.roles || [];
    for (const role of roles) {
      const count = role.count ?? 1;
      if (count === 1 && role.level && /^(head|vp|director|chief|executive|lead)/i.test(role.level)) {
        failures.push({
          role: role.title,
          dept: dept.name,
          level: role.level,
          risk: `Single point of failure: ${role.title} has count=1 at ${role.level} level`
        });
      }
    }
  }
  return failures;
}

/**
 * Audit org structure against Dunbar cognitive limits.
 * Flags: teams > 15, departments > 150.
 * @param {{ departments?: Array<{ name: string, roles?: Array<{ title?: string, count?: number }> }> }} orgStructure
 * @returns {Array<{ type: string, name: string, size: number, limit: number, detail: string }>}
 */
export function auditDunbarLimits(orgStructure) {
  const depts = orgStructure?.departments || [];
  /** @type {Array<{ type: string, name: string, size: number, limit: number, detail: string }>} */
  const flags = [];
  for (const dept of depts) {
    const roles = dept.roles || [];
    const totalHeadcount = roles.reduce((s, r) => s + (r.count || 1), 0);
    if (totalHeadcount > 150) {
      flags.push({ type: 'department', name: dept.name, size: totalHeadcount, limit: 150, detail: `Department "${dept.name}" (${totalHeadcount} people) exceeds Dunbar's 150-person cognitive limit` });
    }
    // Check individual role counts as proxy for team size
    for (const role of roles) {
      const roleCount = role.count || 1;
      if (roleCount > 15) {
        flags.push({ type: 'team', name: role.title || 'unknown', size: roleCount, limit: 15, detail: `Role "${role.title}" (${roleCount} people) may exceed Dunbar's 15-person team coherence limit` });
      }
    }
  }
  return flags;
}

/**
 * Compute maximum hierarchy depth across departments.
 * @param {{ departments?: Array<{ name: string, roles?: Array<{ title: string, level?: string, reports_to?: string }> }> }} orgStructure
 * @returns {{ maxLayers: number, deptLayers: Array<{ dept: string, layers: number }> }}
 */
export function computeLayers(orgStructure) {
  const depts = orgStructure?.departments || [];
  const deptLayers = [];
  for (const dept of depts) {
    const roles = dept.roles || [];
    const levels = new Set(roles.map(r => r.level || '').filter(Boolean));
    deptLayers.push({ dept: dept.name, layers: levels.size });
  }
  return {
    maxLayers: deptLayers.length ? Math.max(...deptLayers.map(d => d.layers)) : 0,
    deptLayers
  };
}

/**
 * Derive per-level default salary bands from compensation/bands.json,
 * falling back to hardcoded defaults when the file is unavailable.
 * @returns {Record<string, number>}
 */
function deriveDefaultBands() {
  /** @type {Record<string, number>} */
  const fallback = {
    'executive': 250000, 'vp': 200000, 'director': 160000,
    'manager': 120000, 'lead': 100000, 'senior': 90000,
    'ic': 75000, 'entry': 50000
  };

  // Try to load compensation bands to extract per-level medians
  const compResult = readDataFile('compensation/bands.json');
  if (compResult.isFail) return fallback;

  try {
    const bandsData = /** @type {any} */ (compResult.value);
    if (!bandsData?.bands || typeof bandsData.bands !== 'object') return fallback;

    /** @type {Map<string, number[]>} */
    const levelSalaries = new Map();

    for (const roleEntry of Object.values(bandsData.bands)) {
      const role = /** @type {any} */ (roleEntry);
      const breakdown = role?.breakdown;
      if (!breakdown || typeof breakdown !== 'object') continue;

      for (const [level, data] of Object.entries(breakdown)) {
        const levelData = /** @type {any} */ (data);
        const naRange = levelData?.na;
        if (typeof naRange !== 'string') continue;

        // Parse range like "800K-1200K" or "$1.2M-$1.8M" to midpoint
        const normalizedRange = naRange
          .replace(/[,\s$]/g, '') // strip commas, spaces, dollar signs
          .replace(/(\d+(?:\.\d+)?)K/gi, (_, n) => String(Number(n) * 1000))
          .replace(/(\d+(?:\.\d+)?)M/gi, (_, n) => String(Number(n) * 1000000));
        const parts = normalizedRange.replace(/[^0-9.-]/g, ' ').trim().split(/[\s-]+/).map(Number);
        const midpoint = parts.length >= 2 ? Math.round((parts[0] + parts[1]) / 2) : parts[0];
        if (isNaN(midpoint)) continue;

        if (!levelSalaries.has(level)) levelSalaries.set(level, []);
        const salaries = levelSalaries.get(level);
        if (salaries) salaries.push(midpoint);
      }
    }

    if (levelSalaries.size === 0) return fallback;

    // Compute per-level medians and merge into fallback
    const result = { ...fallback };
    const levelMap = {
      'junior': 'entry', 'mid': 'ic', 'senior': 'senior', 'lead': 'lead',
      'manager': 'manager', 'director': 'director', 'vp': 'vp',
      'executive': 'executive', 'head': 'director', 'principal': 'senior',
      'staff': 'senior'
    };

    for (const [level, salaries] of levelSalaries) {
      salaries.sort((a, b) => a - b);
      const median = salaries.length % 2 === 0
        ? Math.round((salaries[salaries.length / 2 - 1] + salaries[salaries.length / 2]) / 2)
        : salaries[Math.floor(salaries.length / 2)];

      const mappedKey = levelMap[/** @type {keyof typeof levelMap} */ (level)] || level;
      if (mappedKey in result) {
        result[mappedKey] = median;
      }
    }

    return result;
  } catch {
    return fallback;
  }
}

/**
 * Estimate annual burn cost from org structure headcount.
 * Uses provided compensation bands or defaults.
 * @param {{ departments?: Array<{ name: string, roles?: Array<{ title: string, count?: number, level?: string }> }> }} orgStructure
 * @param {Record<string, Record<string, number>>} [compBands] - Compensation bands: { level: { role: salary } }
 * @returns {{ totalAnnualBurn: number, deptCosts: Array<{ dept: string, cost: number, headcount: number }>, currency: string }}
 */
export function estimateBurnCost(orgStructure, compBands) {
  const depts = orgStructure?.departments || [];
  /** @type {Record<string, number>} */
  const defaultBands = deriveDefaultBands();
  const bands = compBands || {};
  const deptCosts = [];
  let total = 0;
  for (const dept of depts) {
    const roles = dept.roles || [];
    let deptCost = 0;
    let deptHC = 0;
    for (const role of roles) {
      const count = role.count || 1;
      deptHC += count;
      const level = (role.level || 'ic').toLowerCase();
      const band = bands[level]?.[role.title] || defaultBands[level] || defaultBands.ic;
      deptCost += band * count;
    }
    deptCosts.push({ dept: dept.name, cost: deptCost, headcount: deptHC });
    total += deptCost;
  }
  return { totalAnnualBurn: total, deptCosts, currency: 'USD' };
}

// ── Enhanced Advance Round ──────────────────────────────────────────

/**
 * Build a computational analysis summary from an org structure.
 * @param {{ departments?: Array<any> }} orgStructure
 * @returns {string}
 */
function buildAnalysisSummary(orgStructure) {
  if (!orgStructure?.departments?.length) return '';
  const span = computeSpanOfControl(orgStructure);
  const failures = detectSinglePointsOfFailure(orgStructure);
  const dunbar = auditDunbarLimits(orgStructure);
  const layers = computeLayers(orgStructure);
  const burn = estimateBurnCost(orgStructure);
  const parts = [];
  parts.push(`**Span of Control:** avg=${span.avg}, max=${span.max}, min=${span.min}`);
  parts.push(`**Hierarchy:** ${layers.maxLayers} layers max`);
  parts.push(`**Annual Burn Estimate:** $${(burn.totalAnnualBurn / 1000000).toFixed(1)}M across ${burn.deptCosts.length} departments`);
  if (failures.length) parts.push(`**Single Points of Failure:** ${failures.length} roles (${failures.map(f => f.role).join(', ')})`);
  if (dunbar.length) parts.push(`**Dunbar Limit Flags:** ${dunbar.length} (${dunbar.map(d => d.name).join(', ')})`);
  return parts.join('\n');
}

/**
 * Advance the council deliberation to the next round with computational data injected.
 * Enhanced version that includes hard metrics in deliberation prompts.
 * @param {CouncilSession} session - Council session
 * @param {{ departments?: Array<any> }} [orgStructure] - Optional org structure for computing metrics
 * @returns {{ round: CouncilRound, prompt: string, session: CouncilSession }}
 */
export function advanceRoundWithData(session, orgStructure) {
  const result = advanceRound(session);
  if (orgStructure && result.prompt) {
    const analysis = buildAnalysisSummary(orgStructure);
    if (analysis) {
      result.prompt = `## Computational Analysis\n\n${analysis}\n\n` + result.prompt;
    }
  }
  return result;
}

// ── CLI is in bin/cli/council.js ────────────────────────────────────
