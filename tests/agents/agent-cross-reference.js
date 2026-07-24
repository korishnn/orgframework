#!/usr/bin/env node
// tests/agents/agent-cross-reference.js — Check file/index cross-references
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const index = JSON.parse(readFileSync(join(ROOT, '.claude/councilorg/index.json'), 'utf-8'));
const STYLES_DIR = join(ROOT, '.claude/councilorg/styles');
const PRESETS_DIR = join(ROOT, '.claude/councilorg/presets');
let issues = 0;

// 1. Every role in index → file exists
const actualFiles = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
for (const roleId of index.reference_roles) {
  if (!actualFiles.includes(roleId)) {
    console.log(`✗ index references "${roleId}" but no file exists`); issues++;
  }
}

// 2. Every role file → listed in index
for (const file of actualFiles) {
  if (!index.reference_roles.includes(file)) {
    console.log(`✗ File "${file}.md" not in index.json reference_roles`); issues++;
  }
}

// 3. Every preset file exists
const presetFiles = readdirSync(PRESETS_DIR).filter(f => f.endsWith('.json'));
console.log(`✓ ${presetFiles.length} preset files found`);

// 4. Check region/industry/stage profiles
const checkDir = (dir, name) => {
  const path = join(ROOT, '.claude/councilorg', dir);
  if (readdirSync(path).length > 0) console.log(`✓ ${name} profiles exist`);
  else { console.log(`✗ ${name} profiles missing`); issues++; }
};
checkDir('regions', 'Region');
checkDir('industries', 'Industry');
checkDir('stages', 'Stage');

console.log(`\n${issues} issues.`);
if (issues === 0) { console.log('✓ CROSS-REFERENCE PASS'); process.exit(0); }
else { process.exit(1); }
