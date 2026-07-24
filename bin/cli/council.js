#!/usr/bin/env node
// bin/cli/council.js — CLI entry for council/orchestrator.js
import { COUNCIL_MEMBERS, createCouncilSession } from '../../.claude/councilorg/council/orchestrator.js';

const arg = process.argv[2];
if (arg === '--help' || arg === '-h') {
  console.log('Usage: node .claude/councilorg/council/orchestrator.js <command>');
  console.log('');
  console.log('Commands:');
  console.log('  members     List all 8 council members');
  console.log('  session     Create a new session and show initial state');
  process.exit(0);
}

if (arg === 'members') {
  console.log(`\n  LLM Council — ${COUNCIL_MEMBERS.length} Members\n`);
  COUNCIL_MEMBERS.forEach(m => {
    console.log(`  ${m.id.padEnd(20)} ${m.name}`);
    console.log(`  ${''.padEnd(20)} ${m.signature}`);
    console.log();
  });
} else if (arg === 'session') {
  const req = process.argv[3] || 'Design org structure for a 50-person fintech';
  const session = createCouncilSession(/** @type {any} */ ({ request: req }));
  console.log(JSON.stringify({ council: COUNCIL_MEMBERS.map(m => m.name), session }, null, 2));
} else {
  console.log('Usage: node .claude/councilorg/council/orchestrator.js members|session');
  console.log('  node .claude/councilorg/council/orchestrator.js session "your request"');
  process.exit(1);
}
