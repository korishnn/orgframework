#!/usr/bin/env node
// bin/cli/similarity.js — CLI entry for similarity/search.js
import { findSimilar } from '../../.claude/councilorg/similarity/search.js';

const arg = process.argv[2];
if (arg === '--help' || arg === '-h') {
  console.log('Usage: node .claude/councilorg/similarity/search.js <role-id>');
  console.log('');
  console.log('Find roles similar to a given role using text overlap scoring.');
  process.exit(0);
}

if (arg) {
  const result = findSimilar(arg);
  if (result.isFail) {
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }
  /** @type {Array<{role: string, similarity: number}>} */
  const results = result.value || [];
  if (results.length === 0) {
    console.log(`\n  No similar roles found for "${arg}".`);
    process.exit(0);
  }
  console.log(`\n  Roles similar to "${arg}":\n`);
  results.forEach((r, i) => {
    const bar = '█'.repeat(Math.floor(r.similarity / 5));
    console.log(`  ${String(i + 1).padStart(2)}. ${r.role.padEnd(35)} ${String(r.similarity).padStart(2)}%  ${bar}`);
  });
} else {
  console.error('Error: A role ID is required.');
  console.error('Usage: node .claude/councilorg/similarity/search.js <role-id>');
  console.error('Example: node .claude/councilorg/similarity/search.js eng-backend');
  process.exit(1);
}
