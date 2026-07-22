#!/usr/bin/env node
// bin/cli/reverse-org.js — CLI entry for reverse-org/designer.js
import { readJson } from '../../.claude/orgframework/lib/fs.js';
import { designReverseOrg } from '../../.claude/orgframework/reverse-org/designer.js';

const arg = process.argv[2];
if (arg === '--help' || arg === '-h' || !arg) {
  console.log('Usage: node .claude/orgframework/reverse-org/designer.js <json-file>');
  console.log('');
  console.log('Design an org structure bottom-up from an existing headcount list.');
  console.log('');
  console.log('Positional arguments:');
  console.log('  json-file   Path to JSON file containing a "people" array');
  console.log('              Each person: { "title": "...", "count": N }');
  process.exit(arg !== '--help' && arg !== '-h' ? 1 : 0);
}

const readResult = readJson(arg);
if (readResult.isFail) {
  console.error(`Error: Cannot read input file — ${readResult.error?.message ?? readResult.error}`);
  process.exit(1);
}

const data = readResult.value;
const people = data.people || data;
const result = designReverseOrg(people);
if (result.isFail) {
  console.error(`Error: ${result.error}`);
  process.exit(1);
}
console.log(JSON.stringify(result.value, null, 2));
