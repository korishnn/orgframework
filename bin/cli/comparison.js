#!/usr/bin/env node
// bin/cli/comparison.js — CLI entry for comparison.js
import { readJson } from '../../.claude/councilorg/lib/fs.js';
import { compareStructures } from '../../.claude/councilorg/comparison/comparison.js';

const arg = process.argv[2];
if (arg === '--help' || arg === '-h' || !arg) {
  console.log('Usage: node .claude/councilorg/comparison/comparison.js <preset-a.json> <preset-b.json>');
  console.log('');
  console.log('Compare two org structure preset files and output a structured diff.');
  process.exit(arg ? 0 : 1);
}

const [pathA, pathB] = process.argv.slice(2);
if (!pathA || !pathB) {
  console.error('Error: Two preset file paths are required.');
  console.error('Usage: node .claude/councilorg/comparison/comparison.js <preset-a.json> <preset-b.json>');
  process.exit(1);
}

const resultA = readJson(pathA);
if (resultA.isFail) {
  console.error(`Error: Cannot read "${pathA}" — ${resultA.error?.message || resultA.error}`);
  process.exit(1);
}
const resultB = readJson(pathB);
if (resultB.isFail) {
  console.error(`Error: Cannot read "${pathB}" — ${resultB.error?.message || resultB.error}`);
  process.exit(1);
}

const structureA = resultA.value;
const structureB = resultB.value;
if (!structureA.org_structure) {
  console.error(`Error: "${pathA}" is missing org_structure field`);
  process.exit(1);
}
if (!structureB.org_structure) {
  console.error(`Error: "${pathB}" is missing org_structure field`);
  process.exit(1);
}

const result = compareStructures(structureA.org_structure, structureB.org_structure);
if (result.isFail) {
  console.error(`Error: ${result.error}`);
  process.exit(1);
}
console.log(JSON.stringify(result.value, null, 2));
