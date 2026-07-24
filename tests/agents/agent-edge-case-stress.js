#!/usr/bin/env node
// tests/agents/agent-edge-case-stress.js — Stress test engine modules with edge cases
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const stylesDir = join(ROOT, '.claude/councilorg/styles');
const presetsDir = join(ROOT, '.claude/councilorg/presets');
let issues = 0;
let tests = 0;

// 1. Load similarity engine and test edge cases
try {
  const { findSimilar, buildIndex } = await import(join(ROOT, '.claude/councilorg/similarity/search.js'));
  tests++;
  const result1 = findSimilar('nonexistent-role-xyz', 5);
  if (result1.isFail) console.log('✓ similarity: nonexistent role returns fail');
  else { console.log('✗ similarity: nonexistent role should fail'); issues++; }
  
  tests++;
  const result2 = findSimilar('eng-backend', 5);
  if (result2.isOk && result2.value.length > 0) console.log('✓ similarity: eng-backend returns results');
  else { console.log('✗ similarity: eng-backend failed'); issues++; }
} catch (e) {
  console.log(`✗ similarity engine error: ${e.message}`); issues++;
}

// 2. Test vacancy simulator edge cases
try {
  const { simulateVacancy } = await import(join(ROOT, '.claude/councilorg/vacancy/simulator.js'));
  tests++;
  const r1 = simulateVacancy('nonexistent-preset', 'CEO');
  if (r1.isFail) console.log('✓ vacancy: nonexistent preset returns fail');
  else { console.log('✗ vacancy: nonexistent preset should fail'); issues++; }
  
  tests++;
  const r2 = simulateVacancy('seed-startup', '');
  if (r2.isFail) console.log('✓ vacancy: empty title returns fail');
  else { console.log('✗ vacancy: empty title should fail'); issues++; }
} catch (e) {
  console.log(`✗ vacancy engine error: ${e.message}`); issues++;
}

// 3. Test council edge cases
try {
  const { createCouncilSession, advanceRound } = await import(join(ROOT, '.claude/councilorg/council/orchestrator.js'));
  tests++;
  const session = createCouncilSession({ request: 'test', depth: 'deep' });
  if (session.context.depth === 'deep') console.log('✓ council: deep depth set correctly');
  else { console.log('✗ council: deep depth not set'); issues++; }
  
  tests++;
  const r3 = advanceRound(session);
  if (r3 && r3.round) console.log('✓ council: advanceRound works');
  else { console.log('✗ council: advanceRound failed'); issues++; }
} catch (e) {
  console.log(`✗ council engine error: ${e.message}`); issues++;
}

// 4. Test comparison engine edge cases
try {
  const { compareStructures } = await import(join(ROOT, '.claude/councilorg/comparison/comparison.js'));
  tests++;
  const r4 = compareStructures(null, {});
  if (r4.isFail) console.log('✓ comparison: null input returns fail');
  else { console.log('✗ comparison: null should fail'); issues++; }
  
  tests++;
  const r5 = compareStructures({ departments: [] }, { departments: [] });
  if (r5.isOk) console.log('✓ comparison: empty structures compare');
  else { console.log('✗ comparison: empty structures failed'); issues++; }
} catch (e) {
  console.log(`✗ comparison engine error: ${e.message}`); issues++;
}

// 5. Test reverse-org edge cases
try {
  const { designReverseOrg } = await import(join(ROOT, '.claude/councilorg/reverse-org/designer.js'));
  tests++;
  const r6 = designReverseOrg([]);
  if (r6.isFail) console.log('✓ reverse-org: empty list returns fail');
  else { console.log('✗ reverse-org: empty should fail'); issues++; }
} catch (e) {
  console.log(`✗ reverse-org error: ${e.message}`); issues++;
}

console.log(`\n${tests} edge case tests, ${issues} issues.`);
if (issues === 0) { console.log('✓ EDGE CASE STRESS PASS'); process.exit(0); }
else process.exit(1);
