#!/usr/bin/env node
// bin/cli/role-to-task.js — CLI entry for role-to-task/generate.js
import { generateTaskPrompt } from '../../.claude/councilorg/role-to-task/generate.js';

const arg = process.argv[2];
if (arg === '--help' || arg === '-h') {
  console.log('Usage: node .claude/councilorg/role-to-task/generate.js <role-id> [--brief]');
  console.log('');
  console.log('Convert any role definition into a structured AI system prompt.');
  console.log('');
  console.log('Positional arguments:');
  console.log('  role-id    Role identifier (e.g. "eng-backend")');
  console.log('');
  console.log('Options:');
  console.log('  --brief    Generate a brief prompt instead of full');
  console.log('');
  console.log('Examples:');
  console.log('  node .claude/councilorg/role-to-task/generate.js eng-backend');
  console.log('  node .claude/councilorg/role-to-task/generate.js hlth-physician --brief');
  process.exit(0);
}

if (arg && !arg.startsWith('--')) {
  const brief = process.argv.includes('--brief');
  const result = generateTaskPrompt(arg, { brief });
  if (result.isFail) {
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }
  console.log(result.value);
} else {
  console.error('Error: A role ID is required.');
  console.error('Usage: node .claude/councilorg/role-to-task/generate.js <role-id> [--brief]');
  console.error('  node .claude/councilorg/role-to-task/generate.js eng-backend');
  console.error('  node .claude/councilorg/role-to-task/generate.js hlth-physician --brief');
  process.exit(1);
}
