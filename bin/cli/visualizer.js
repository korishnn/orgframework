#!/usr/bin/env node
// bin/cli/visualizer.js — CLI entry for visualizer/generate.js
import { generateFromPreset } from '../../.claude/orgframework/visualizer/generate.js';

const path = process.argv[2];
if (path === '--help' || path === '-h' || !path) {
  console.log('Usage: node .claude/orgframework/visualizer/generate.js <preset-json-path>');
  console.log('');
  console.log('Generate a Mermaid.js org chart from a preset JSON file.');
  process.exit(path ? 0 : 1);
}

const result = generateFromPreset(path);
if (result.isFail) {
  console.error(`Error: ${result.error}`);
  process.exit(1);
}
console.log(result.value);
