#!/usr/bin/env node
// vacancy.js — Simulate what happens when a key role goes vacant
// node .claude/councilorg/vacancy/simulator.js <preset> <role-id>

import { Result } from '../lib/errors.js';
import { readPresetFile, readDataFile } from '../lib/fs.js';
import { MAX_COVERAGE_OPTIONS } from '../lib/constants.js';


// ── Role impact database ──────────────────────────────────────────────
// Loaded from data/impact-db.json at module init.
/** @type {{ [key: string]: { urgency: string, coverage: string, timeframe: string, risk: string } }} */
let roleImpact = {};

/**
 * Initialize the impact database. Called once at module load.
 * Falls back gracefully if the data file is missing.
 */
function loadImpactDb() {
  const result = readDataFile('data/impact-db.json');
  if (result.isOk) {
    roleImpact = result.value;
  }
}
loadImpactDb();

/**
 * Resolve a role title against the impact database using fuzzy matching.
 * @param {string} titleLower
 * @returns {{ urgency: string, coverage: string, timeframe: string, risk: string }}
 */
function resolveImpact(titleLower) {
  // First try exact match
  if (roleImpact[titleLower]) return roleImpact[titleLower];

  // Try prefix/keyword matching
  for (const [key, impact] of Object.entries(roleImpact)) {
    if (new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(titleLower)) return impact;
  }

  // Default fallback based on level hints in the title
  if (/^(head|chief|svp|evp|president)/i.test(titleLower)) {
    return { urgency: 'critical', coverage: 'Executive search needed. Board or senior team covers strategy temporarily.',       timeframe: '2-4 months',              risk: 'Strategic drift. Team uncertainty. External perception.' };
  }
  if (/^(vp|director|senior|lead)/i.test(titleLower)) {
    return { urgency: 'high',     coverage: 'Next-level leader or senior IC can absorb. Formal backfill process starts.',       timeframe: '1-3 months',              risk: 'Team morale. Cross-functional coordination. Decision speed.' };
  }
  if (/^(manager|supervisor|coordinator)/i.test(titleLower)) {
    return { urgency: 'medium',   coverage: 'Senior team members distribute duties. Peer managers help with coverage.',         timeframe: '2-6 weeks',               risk: 'Operational continuity. Team velocity. Career development pauses.' };
  }

  return { urgency: 'high', coverage: 'Cross-training needed. Backfill ASAP. Consider contractor for interim coverage.', timeframe: '4-12 weeks', risk: 'Operational disruption. Team morale. Knowledge loss.' };
}

/**
 * Enhanced urgency computation that combines role level, count, and department criticality.
 * @param {string} titleLower - Lowercase role title
 * @param {string} [level] - Role level from preset
 * @param {number} [count] - Headcount for this role
  * @returns {{ urgency: string, coverage: string, timeframe: string, risk: string }}
 */
function computeEnhancedImpact(titleLower, level, count) {
  // Start with the base fuzzy match
  const base = resolveImpact(titleLower);
  let urgency = base.urgency;

  // Elevate urgency if count === 1 (single point of failure)
  if (count === 1) {
    if (urgency === 'medium') urgency = 'high';
    else if (urgency === 'low') urgency = 'medium';
  }

  // Elevate urgency for executive/leadership levels
  if (level && /^(head|vp|director|chief|executive|cxo)/i.test(level)) {
    if (urgency !== 'critical') urgency = urgency === 'low' ? 'medium' : 'high';
  }

  // De-escalate urgency if multiple people fill this role
  if (count && count >= 3 && urgency === 'critical') urgency = 'high';
  if (count && count >= 5 && urgency === 'high') urgency = 'medium';

  return { ...base, urgency };
}

/**
 * Simulate what happens when a key role goes vacant in an org preset.
 * @param {string} presetName - Preset file name (without .json)
 * @param {string} vacantRoleTitle - Role title to simulate vacancy for
 * @returns {Result<Object, string>} Impact assessment object, or error string if not found
 */
export function simulateVacancy(presetName, vacantRoleTitle) {
  if (!presetName) return Result.fail('Preset name is required.');
  if (!vacantRoleTitle) return Result.fail('Role title is required.');

  const presetResult = readPresetFile(presetName);
  if (presetResult.isFail) {
    const isNotFound = presetResult.error?.message?.includes('ENOENT') || presetResult.error?.message?.includes('no such file');
    return Result.fail(isNotFound ? `Preset "${presetName}" not found.` : `Cannot read preset "${presetName}": ${presetResult.error?.message ?? presetResult.error}`);
  }
  const preset = presetResult.value;

  const titleLower = vacantRoleTitle.toLowerCase();

  // Find the role in the structure
  let foundRole = null;
  let foundDept = null;
  const departments = preset.org_structure?.departments || [];
  for (const dept of departments) {
    const match = dept.roles.find(/** @param {{title: string}} r */ r => r.title.toLowerCase().includes(titleLower));
    if (match) { foundRole = match; foundDept = dept; break; }
  }

  if (!foundRole) return Result.fail(`Role "${vacantRoleTitle}" not found in ${presetName} preset.`);

  // Resolve impact data
  const impact = computeEnhancedImpact(titleLower, foundRole.level, foundRole.count);

  // Find potential coverage from same department
  const deptRoles = foundDept?.roles || [];
  const coverageOptions = deptRoles.filter(/** @param {{title: string}} r */ r => r.title !== foundRole.title).slice(0, MAX_COVERAGE_OPTIONS);

  return Result.ok({
    role: foundRole.title,
    dept: foundDept?.name,
    level: foundRole.level,
    urgency: impact.urgency,
    impact_assessment: `Losing your ${foundRole.title} is ${impact.urgency} urgency. ${impact.coverage}`,
    coverage: coverageOptions.map(/** @param {{title: string, level?: string, count?: number}} r */ r => `${r.title} (${r.level}) — could cover with ${(r.count ?? 1) >= 2 ? 'shared load' : 'some gaps'}`),
    replacement_timeframe: impact.timeframe,
    risks: impact.risk.split('. ').filter(Boolean),
    recommendation: coverageOptions.length > 0
      ? `Immediately reassign ${coverageOptions[0].title} as interim. Begin recruitment within 1 week. Target: ${impact.timeframe} replacement window.`
      : `No internal coverage. Engage external recruiter immediately. Consider contractor/consultant for 90-day bridge.`
  });
}

// ── CLI is in bin/cli/vacancy.js ───────────────────────────────────
