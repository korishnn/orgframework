#!/usr/bin/env node
// tests/agents/agent-council-integrity.js — Verify council member structure
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ORCHESTRATOR = join(ROOT, '.claude/councilorg/council/orchestrator.js');
const INDEX_JSON = join(ROOT, '.claude/councilorg/index.json');
const MEMBERS_100 = join(ROOT, '.claude/councilorg/council', '100-members.json');
let issues = 0;

// 1. Check orchestrator.js has 10 members
const orchestrator = readFileSync(ORCHESTRATOR, 'utf-8');
const memberIds = [...orchestrator.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
if (memberIds.length !== 10) {
  console.log(`✗ orchestrator.js has ${memberIds.length} members, expected 10`); issues++;
} else {
  console.log(`✓ orchestrator.js has 10 council members`);
}

const required = ['strategist','operator','financial-controller','culture-keeper','pessimist','regulatory-hawk','talent-scout','systems-architect','devils-advocate-red','devils-advocate-worst'];
for (const id of required) {
  if (!memberIds.includes(id)) { console.log(`✗ orchestrator.js missing member: ${id}`); issues++; }
}

// 2. Check council state machine
if (orchestrator.includes('proposal') && orchestrator.includes('critique') && orchestrator.includes('synthesis') && orchestrator.includes('complete')) {
  console.log('✓ Council state machine: proposal→critique→synthesis→complete');
} else {
  console.log('✗ Council state machine incomplete'); issues++;
}

// 3. Check index.json core_members
const index = JSON.parse(readFileSync(INDEX_JSON, 'utf-8'));
if (index.core_members) {
  const indexIds = index.core_members.map(m => m.id);
  for (const id of required) {
    if (!indexIds.includes(id)) { console.log(`✗ index.json core_members missing: ${id}`); issues++; }
  }
  if (indexIds.length === 10) console.log('✓ index.json has 10 core_members');
} else {
  console.log('✗ index.json missing core_members'); issues++;
}

// 4. Check 100-members.json
if (existsSync(MEMBERS_100)) {
  const members100 = JSON.parse(readFileSync(MEMBERS_100, 'utf-8'));
  console.log(`✓ 100-members.json exists with members`);
}

console.log(`\n${issues} issues found.`);
if (issues === 0) { console.log('✓ COUNCIL INTEGRITY PASS'); process.exit(0); }
else { process.exit(1); }
