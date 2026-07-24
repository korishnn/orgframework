#!/usr/bin/env node
// reverse-org.js — Bottom-up org designer from existing headcount
// Usage: node .claude/councilorg/reverse-org/designer.js <json-file>
// JSON format: { "people": [{ "title": "Backend Engineer", "count": 5 }, ...] }

import { Result } from '../lib/errors.js';
import { readDataFile } from '../lib/fs.js';

// ── Title → department classification rules ──────────────────────────
// Each rule: { keywords: string[], dept: string }
// Rules are evaluated in order; the first match wins.
// Loaded from data/dept-rules.json.
/** @type {Array<{ keywords: string[], dept: string }>} */
let DEPT_RULES = [];

function loadDeptRules() {
  const result = readDataFile('data/dept-rules.json');
  if (result.isOk) {
    DEPT_RULES = result.value;
  }
}
loadDeptRules();

/**
 * Classify a role title into a department.
 * @param {string} title
 * @returns {string} Department name or 'Unassigned'
 */
function classifyDepartment(title) {
  const lower = title.toLowerCase();
  for (const rule of DEPT_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw))) return rule.dept;
  }
  return 'Unassigned';
}

/**
 * Determine org stage from headcount.
 * @param {number} total
 * @returns {{ stage: string, maxLayers: number, ceoTitle: string }}
 */
function classifyStage(total) {
  if (total <= 10) return { stage: 'startup', maxLayers: 2, ceoTitle: 'Founder / CEO' };
  if (total <= 80) return { stage: 'scaleup', maxLayers: 3, ceoTitle: 'CEO' };
  return { stage: 'enterprise', maxLayers: 4, ceoTitle: 'CEO' };
}

/**
 * Build stage-appropriate org design metadata.
 * @param {number} total
 * @param {Array<any>} departments
 * @param {boolean} hasLeaders
 * @param {string} ceoTitle
 * @param {string} stage
 * @returns {Object}
 */
function buildOrgDesign(total, departments, hasLeaders, ceoTitle, stage) {
  const nonExec = departments.filter(d => d.name !== 'Executive');
  const base = { ceo: ceoTitle, departments: nonExec };

  if (stage === 'startup') {
    return {
      ...base,
      structure: 'Flat',
      layers: 2,
      departments: nonExec.map(d => ({
        name: d.name,
        lead: hasLeaders ? 'Existing lead' : 'Team lead (player-coach)',
        team_size: d.total,
        notes: d.total <= 2 ? 'Small team, keep flat' : d.total <= 5 ? 'Natural team, consider a tech lead' : 'Growing team, needs a dedicated manager soon'
      })),
      gaps: ['No dedicated manager layer yet — founders still manage ICs', 'Missing: HR, Finance, Legal (use fractional)'],
      next_hires: ['First dedicated manager for the largest team', 'Fractional HR/Finance if missing']
    };
  }

  if (stage === 'scaleup') {
    return {
      ...base,
      structure: 'Functional departments with VPs/Directors',
      layers: 3,
      departments: nonExec.map(d => ({
        name: d.name,
        lead: hasLeaders ? 'Existing Director/VP' : `Need to hire: Head of ${d.name}`,
        team_size: d.total,
        notes: d.total >= 8 ? 'Needs 2 levels (lead + ICs)' : 'Single level is fine'
      })),
      gaps: ['First dedicated People/HR hire recommended', 'Finance needs a FP&A lead by Series B', 'Legal: fractional counsel is fine at this stage'],
      next_hires: ['Head of missing function', 'First dedicated HR/People person', 'Customer Success lead if growing']
    };
  }

  // enterprise
  return {
    ...base,
    structure: 'Deep hierarchy with C-suite, VPs, Directors',
    layers: 4,
    departments: nonExec.map(d => ({
      name: d.name,
      lead: 'VP / SVP',
      team_size: d.total,
      notes: d.total >= 20 ? 'Needs 3+ layers of management' : 'Standard department'
    })),
    gaps: ['Check: every C-level has a succession plan', 'Check: no department has >15 direct reports to one person', 'Consider: shared services for enterprise functions'],
    next_hires: ['Fill missing C-suite roles', 'Internal audit / SOX compliance', 'Corporate development / M&A']
  };
}

/**
 * Design an org structure bottom-up from an existing headcount list.
 * @param {Array<{title: string, count?: number}>} people - List of people/roles
 * @returns {Result<{ total_people: number, stage: string, orgDesign: Object, recommended_title: string }, string>}
 */
export function designReverseOrg(people) {
  if (!Array.isArray(people)) return Result.fail('Input must be an array of { title, count } objects.');
  if (people.length === 0) return Result.fail('People list is empty — nothing to design.');

  const total = people.reduce((s, p) => s + (Math.max(p.count || 1, 1)), 0);

  // Classify each person into a department
  const deptMap = new Map();
  for (const p of people) {
    if (!p.title || typeof p.title !== 'string') continue;
    const dept = classifyDepartment(p.title);
    if (!deptMap.has(dept)) deptMap.set(dept, []);
    deptMap.get(dept).push(p);
  }

  const departments = [];
  for (const [name, members] of deptMap.entries()) {
    departments.push({
      name,
      total: members.reduce((/** @type {number} */ s, /** @type {{count?: number}} */ m) => s + (m.count || 1), 0),
      roles: members
    });
  }

  // Detect if leaders already exist
  const hasLeaders = departments.some(/** @param {{roles: Array<any>}} d */ d =>
    d.roles.some(/** @param {{title: string}} r */ r =>
      /^(head|director|vp|manager|chief|lead)/i.test(r.title)
    )
  );

  const { stage, ceoTitle } = classifyStage(total);
  const orgDesign = buildOrgDesign(total, departments, hasLeaders, ceoTitle, stage);

  return Result.ok({ total_people: total, stage, orgDesign, recommended_title: ceoTitle });
}

// ── CLI is in bin/cli/reverse-org.js ─────────────────────────────
