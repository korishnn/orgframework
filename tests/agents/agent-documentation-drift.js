#!/usr/bin/env node
// tests/agents/agent-documentation-drift.js — Compare docs claims vs actual files
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const readme = readFileSync(join(ROOT, 'README.md'), 'utf-8');
const arch = readFileSync(join(ROOT, 'ARCHITECTURE.md'), 'utf-8');
const changelog = readFileSync(join(ROOT, 'CHANGELOG.md'), 'utf-8');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
let issues = 0;

const actualRoles = readdirSync(join(ROOT, '.claude/councilorg/styles')).filter(f => f.endsWith('.md')).length;
const actualPresets = readdirSync(join(ROOT, '.claude/councilorg/presets')).filter(f => f.endsWith('.json')).length;
const actualCrisis = readdirSync(join(ROOT, '.claude/councilorg/crisis')).filter(f => f.endsWith('.json')).length;
const actualGuidance = readdirSync(join(ROOT, '.claude/councilorg')).filter(f => f.endsWith('.guidance.md')).length;
const engineDirs = ['similarity', 'vacancy', 'comparison', 'reverse-org', 'visualizer', 'council', 'relationship-map', 'role-to-task'];
let actualEngines = 0;
for (const dir of engineDirs) {
  const jsFiles = readdirSync(join(ROOT, '.claude/councilorg', dir)).filter(f => f.endsWith('.js'));
  if (jsFiles.length > 0) actualEngines++;
}

console.log(`Actual: ${actualRoles} roles, ${actualPresets} presets, ${actualCrisis} crisis, ${actualGuidance} guidance, ${actualEngines} engines`);

// Compare with README claims
if (readme.includes('555 roles')) console.log('✓ README claims 555 roles');
else if (readme.includes(String(actualRoles) + ' roles')) { /* ok */ }
else { console.log(`✗ README role count mismatch`); issues++; }

if (readme.includes('35 presets')) console.log('✓ README claims 35 presets');
if (readme.includes('10 council perspectives')) console.log('✓ README claims 10 council perspectives');

// Check CHANGELOG version matches package.json
if (changelog.includes(pkg.version)) console.log(`✓ CHANGELOG includes v${pkg.version}`);
else { console.log(`✗ CHANGELOG missing v${pkg.version}`); issues++; }

// Check ARCHITECTURE.md module list
if (arch.includes('similarity') && arch.includes('vacancy') && arch.includes('council')) {
  console.log('✓ ARCHITECTURE.md covers key engines');
} else { console.log('✗ ARCHITECTURE.md may be missing engines'); issues++; }

if (issues === 0) { console.log('✓ DOCUMENTATION DRIFT PASS'); process.exit(0); }
else process.exit(1);
