#!/usr/bin/env node
// bin/cli/vacancy.js — CLI entry for vacancy/simulator.js
import { simulateVacancy } from '../../.claude/orgframework/vacancy/simulator.js';

const [presetName, roleTitle] = process.argv.slice(2);
if (presetName === '--help' || presetName === '-h' || (!presetName && !roleTitle)) {
  console.log('Usage: node .claude/orgframework/vacancy/simulator.js <preset-name> <role-title>');
  console.log('');
  console.log('Simulate the impact of a key role going vacant.');
  console.log('');
  console.log('Positional arguments:');
  console.log('  preset-name   Name of a preset file (without .json)');
  console.log('  role-title    Title of the role to simulate vacancy for');
  console.log('');
  console.log('Example: node .claude/orgframework/vacancy/simulator.js series-b-saas CTO');
  process.exit(presetName && presetName !== '--help' && presetName !== '-h' ? 1 : 0);
}

const result = simulateVacancy(presetName, roleTitle);
if (result.isFail) {
  console.error(`Error: ${result.error}`);
  process.exit(1);
}
console.log(JSON.stringify(result.value, null, 2));
