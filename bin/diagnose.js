#!/usr/bin/env node
// diagnose.js — Self-diagnostic for the orgframework adaptive system
// Run: node bin/diagnose.js

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const STYLES_DIR = join(ROOT, '.claude', 'orgframework', 'styles');
const PRESETS_DIR = join(ROOT, '.claude', 'orgframework', 'presets');
const ADAPT_PATH = join(ROOT, '.claude', 'orgframework', 'adaptations', 'profile.json');
const TROUBLESHOOT_PATH = join(ROOT, '.claude', 'orgframework', 'diagnostics', 'troubleshoot.json');
const ADDITIONS_PATH = join(ROOT, '.claude', 'orgframework', 'additions.json');

const SEP = '─'.repeat(56);

console.log(`\n${SEP}`);
console.log('  orgframework — Self Diagnosis');
console.log(`${SEP}\n`);

// ─── System Health ────────────────────────────────────────────────────
console.log('📦 System Health');
console.log('  Directory              Status    Count/Size');

const checks = [
  { name: 'Reference Roles', path: STYLES_DIR, type: 'dir', fileExt: '.md' },
  { name: 'Role Definitions', path: STYLES_DIR, type: 'dir', fileExt: '.md' },
  { name: 'Presets', path: PRESETS_DIR, type: 'dir', fileExt: '.json' },
  { name: 'Regions', path: join(ROOT, '.claude', 'orgframework', 'regions'), type: 'dir', fileExt: '.json' },
  { name: 'Industries', path: join(ROOT, '.claude', 'orgframework', 'industries'), type: 'dir', fileExt: '.json' },
  { name: 'Stages', path: join(ROOT, '.claude', 'orgframework', 'stages'), type: 'dir', fileExt: '.json' },
  { name: 'Adaptations', path: ADAPT_PATH, type: 'file' },
  { name: 'Troubleshoot', path: TROUBLESHOOT_PATH, type: 'file' },
  { name: 'Additions', path: ADDITIONS_PATH, type: 'file' },
];

for (const check of checks) {
  const exists = existsSync(check.path);
  let info = '';
  if (exists && check.type === 'dir') {
    const files = readdirSync(check.path).filter(f => f.endsWith(check.fileExt));
    info = `${files.length}`;
  } else if (exists && check.type === 'file') {
    const stats = statSync(check.path);
    const sizeKB = (stats.size / 1024).toFixed(1);
    info = `${sizeKB} KB`;
  }
  const status = exists ? '✅' : '❌';
  const line = `  ${status} ${check.name.padEnd(22)} ${(exists ? 'Found' : 'MISSING').padEnd(8)} ${info}`;
  console.log(line);
}

// ─── Definitions from Role Files ────────────────────────────────────
const roleFiles = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
let totalRoleLines = 0;
for (const f of roleFiles) {
  totalRoleLines += readFileSync(join(STYLES_DIR, f), 'utf-8').split('\n').length;
}
console.log(`\n📖 Roles:`);
console.log(`  File count:          ${roleFiles.length}`);
console.log(`  Total lines:         ${totalRoleLines.toLocaleString()}`);
console.log(`  Average lines/role:  ${Math.round(totalRoleLines / roleFiles.length)}`);

// ─── Presets Stats ────────────────────────────────────────────────────
if (existsSync(PRESETS_DIR)) {
  const files = readdirSync(PRESETS_DIR).filter(f => f.endsWith('.json'));
  let totalDepts = 0, totalRoles = 0;
  for (const f of files) {
    try {
      const data = JSON.parse(readFileSync(join(PRESETS_DIR, f), 'utf-8'));
      if (data.org_structure?.departments) {
        totalDepts += data.org_structure.departments.length;
        for (const d of data.org_structure.departments) {
          totalRoles += d.roles?.length || 0;
        }
      }
    } catch {}
  }
  console.log(`\n🏗️  Presets:`);
  console.log(`  Templates:           ${files.length}`);
  console.log(`  Total departments:   ${totalDepts}`);
  console.log(`  Total defined roles: ${totalRoles}`);
}

// ─── Additions Count ──────────────────────────────────────────────────
if (existsSync(ADDITIONS_PATH)) {
  const additions = JSON.parse(readFileSync(ADDITIONS_PATH, 'utf-8'));
  console.log(`\n🧩 Additions:`);
  console.log(`  Version:             ${additions.version}`);
  console.log(`  Total additions:     ${additions.additions.length}`);
  for (const a of additions.additions) {
    console.log(`    ${a.id.padEnd(30)} ${a.tokens}`);
  }
}

// ─── Adaptation Status ────────────────────────────────────────────────
if (existsSync(ADAPT_PATH)) {
  const profile = JSON.parse(readFileSync(ADAPT_PATH, 'utf-8'));
  console.log(`\n🧠 Adaptation Profile:`);
  console.log(`  Interactions:        ${profile.total_interactions}`);
  console.log(`  Corrections logged:  ${profile.total_corrections}`);
  console.log(`  User familiarity:    ${profile.user.familiarity}`);
  console.log(`  Preferred regions:   ${profile.user.preferred_regions.join(', ') || 'none yet'}`);
  console.log(`  Preferred industries: ${profile.user.preferred_industries.join(', ') || 'none yet'}`);
  console.log(`  Current depth:       ${profile.preferences.depth.current}`);
  console.log(`  Current format:      ${profile.preferences.format.current}`);
  console.log(`  Current tone:        ${profile.preferences.tone.current}`);
  console.log(`  Detection accuracy:`);
  for (const [key, val] of Object.entries(profile.detection_accuracy)) {
    const pct = val.attempts > 0 ? Math.round(val.correct / val.attempts * 100) : 'N/A';
    console.log(`    ${key.padEnd(15)} ${val.attempts} attempts, ${val.correct} correct (${pct}%)`);
  }
}

// ─── Troubleshoot Status ──────────────────────────────────────────────
if (existsSync(TROUBLESHOOT_PATH)) {
  const ts = JSON.parse(readFileSync(TROUBLESHOOT_PATH, 'utf-8'));
  console.log(`\n🔧 Troubleshoot Engine:`);
  console.log(`  Detection rules:     ${ts.detection_rules.length}`);
  console.log(`  Issues logged:       ${ts.issues_log.length}`);
}

// ─── Summary ──────────────────────────────────────────────────────────
console.log(`\n${SEP}`);
const allOk = checks.every(c => existsSync(c.path));
if (allOk) {
  console.log('  ✅ SYSTEM HEALTHY — All components present and accounted for.');
} else {
  console.log('  ⚠️  SYSTEM HAS ISSUES — Some files are missing. Run node bin/install.sh');
}
console.log(`${SEP}\n`);
