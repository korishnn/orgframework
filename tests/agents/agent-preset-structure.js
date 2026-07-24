#!/usr/bin/env node
// tests/agents/agent-preset-structure.js — Deep-validate all 35 presets
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PRESETS_DIR = join(ROOT, '.claude/councilorg/presets');
const files = readdirSync(PRESETS_DIR).filter(f => f.endsWith('.json'));
let issues = 0;

for (const file of files) {
  try {
    const preset = JSON.parse(readFileSync(join(PRESETS_DIR, file), 'utf-8'));
    if (!preset.preset) { console.log(`✗ ${file}: missing "preset" field`); issues++; }
    if (!preset.name) { console.log(`✗ ${file}: missing "name"`); issues++; }
    if (!preset.org_structure) { console.log(`✗ ${file}: missing org_structure`); issues++; }
    else {
      if (!preset.org_structure.departments || !preset.org_structure.departments.length) {
        console.log(`✗ ${file}: org_structure has no departments`); issues++;
      } else {
        for (const dept of preset.org_structure.departments) {
          if (!dept.name) { console.log(`✗ ${file}: department missing name`); issues++; }
          if (!dept.roles) { console.log(`✗ ${file}: department "${dept.name}" missing roles`); issues++; }
          else {
            for (const role of dept.roles) {
              if (!role.title) { console.log(`✗ ${file}: role missing title in ${dept.name}`); issues++; }
              if (!role.count && role.count !== 0) { console.log(`✗ ${file}: role "${role.title}" missing count`); issues++; }
            }
          }
        }
      }
    }
  } catch (e) {
    console.log(`✗ ${file}: parse error — ${e.message}`); issues++;
  }
}

console.log(`\n${files.length} presets checked. ${issues} issues.`);
if (issues === 0) { console.log('✓ ALL PRESETS PASS'); process.exit(0); }
else { process.exit(1); }
