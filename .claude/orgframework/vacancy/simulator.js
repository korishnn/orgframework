#!/usr/bin/env node
// vacancy.js — Simulate what happens when a key role goes vacant
// node bin/vacancy.js <preset> <role-id>

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PRESETS_DIR = join(ROOT, '.claude', 'orgframework', 'presets');
const STYLES_DIR = join(ROOT, '.claude', 'orgframework', 'styles');

const roleImpact = {
  'ceo': { urgency: 'critical', coverage: 'Board appoints interim CEO. COO or Chair steps in.', timeframe: '1-3 months to replace', risk: 'Strategic paralysis. Board confidence. Investor relations.' },
  'cto': { urgency: 'critical', coverage: 'VP Engineering or senior architect can cover technical decisions.', timeframe: '2-4 months to replace', risk: 'Architecture stagnation. Engineer retention risk. Technical debt.' },
  'cfo': { urgency: 'high', coverage: 'FP&A Director or Controller can cover reporting and banking.', timeframe: '2-3 months to replace', risk: 'Audit delays. Investor confidence. Board reporting.' },
  'coo': { urgency: 'medium', coverage: 'Department heads absorb operational duties. Chief of Staff can coordinate.', timeframe: '2-4 months to replace', risk: 'Operational drift. Cross-functional alignment.' },
  'cmo': { urgency: 'medium', coverage: 'Marketing Director can maintain campaigns. Brand Manager can cover.', timeframe: '2-3 months to replace', risk: 'Brand consistency. Pipeline generation. Campaign momentum.' },
  'head of engineering': { urgency: 'critical', coverage: 'Senior engineers share tech lead duties. CTO covers gaps.', timeframe: '1-3 months', risk: 'Sprint velocity drops 30-50%. Architecture inconsistency.' },
  'head of sales': { urgency: 'critical', coverage: 'Senior AEs cover deals. Revenue operations maintains pipeline.', timeframe: '1-2 months', risk: 'Revenue cliff after 60 days. Team morale. Key accounts.' },
  'head of product': { urgency: 'high', coverage: 'Senior PMs maintain roadmap. CPO/CEO covers strategy.', timeframe: '1-3 months', risk: 'Roadmap drift. Engineering misalignment. Feature delays.' },
  'doctor': { urgency: 'critical', coverage: 'Locum tenens or per-diem coverage. Other providers absorb patient load.', timeframe: '1-4 weeks (locum)', risk: 'Patient safety. Revenue loss. Staff burnout.' },
  'nurse': { urgency: 'critical', coverage: 'Agency/travel nurses. Overtime for existing staff. Ratios may be compromised.', timeframe: '2-8 weeks', risk: 'Patient ratios. Staff burnout. Quality of care.' },
  'chef': { urgency: 'high', coverage: 'Sous chef steps up. May need to simplify menu.', timeframe: '2-4 weeks', risk: 'Menu consistency. Kitchen morale. Food quality.' },
  'teacher': { urgency: 'high', coverage: 'Substitute teacher. Other teachers absorb during prep periods.', timeframe: '1-4 weeks', risk: 'Student learning continuity. Classroom management.' },
};

export function simulateVacancy(presetName, vacantRoleTitle) {
  const presetPath = join(PRESETS_DIR, `${presetName}.json`);
  if (!existsSync(presetPath)) return `Preset "${presetName}" not found.`;

  const preset = JSON.parse(readFileSync(presetPath, 'utf-8'));
  const titleLower = vacantRoleTitle.toLowerCase();

  // Find the role in the structure
  let foundRole = null;
  let foundDept = null;
  for (const dept of (preset.org_structure?.departments || [])) {
    const match = dept.roles.find(r => r.title.toLowerCase().includes(titleLower));
    if (match) { foundRole = match; foundDept = dept; break; }
  }

  if (!foundRole) return `Role "${vacantRoleTitle}" not found in ${presetName} preset.`;

  // Find impact data
  let impact = { urgency: 'high', coverage: 'Cross-training needed. Backfill ASAP.', timeframe: '4-12 weeks', risk: 'Operational disruption. Team morale.' };
  for (const [key, val] of Object.entries(roleImpact)) {
    if (titleLower.includes(key)) { impact = val; break; }
  }

  // Find potential coverage
  const deptRoles = foundDept?.roles || [];
  const coverageOptions = deptRoles.filter(r => r.title !== foundRole.title).slice(0, 3);

  return {
    role: foundRole.title,
    dept: foundDept?.name,
    level: foundRole.level,
    urgency: impact.urgency,
    impact_assessment: `Losing your ${foundRole.title} is ${impact.urgency} urgency. ${impact.coverage}`,
    coverage: coverageOptions.map(r => `${r.title} (${r.level}) — could cover with ${r.count >= 2 ? 'shared load' : 'some gaps'}`),
    replacement_timeframe: impact.timeframe,
    risks: impact.risk.split('. ').filter(Boolean),
    recommendation: coverageOptions.length > 0
      ? `Immediately reassign ${coverageOptions[0].title} as interim. Begin recruitment within 1 week. Target: ${impact.timeframe} replacement window.`
      : `No internal coverage. Engage external recruiter immediately. Consider contractor/consultant for 90-day bridge.`
  };
}

const [presetName, roleTitle] = process.argv.slice(2);
if (presetName && roleTitle) {
  const result = simulateVacancy(presetName, roleTitle);
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log('Usage: node bin/vacancy.js <preset-name> <role-title>');
  console.log('Example: node bin/vacancy.js series-b-saas CTO');
}
