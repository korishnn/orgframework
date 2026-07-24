#!/usr/bin/env node
// bin/cli/relationship-map.js — CLI entry for relationship-map/relationship-map.js
import { buildGraph, validateGraph, findConnections, findMostConnected } from '../../.claude/councilorg/relationship-map/relationship-map.js';

const arg = process.argv[2];
if (arg === '--help' || arg === '-h') {
  console.log('Usage:');
  console.log('  node .../relationship-map.js <role-id>    Find connections for a role');
  console.log('  node .../relationship-map.js --all        List all roles in graph');
  console.log('  node .../relationship-map.js --stats      Show most connected roles');
  console.log('  node .../relationship-map.js --validate   Validate relationship graph');
  console.log('  node .../relationship-map.js --help       Show this help message');
  process.exit(0);
}

const graphResult = buildGraph();
if (graphResult.isFail) {
  console.error(`Error building graph: ${graphResult.error?.message ?? graphResult.error}`);
  process.exit(1);
}
const graph = graphResult.value;

if (arg === '--validate') {
  const report = validateGraph(graph);
  console.log(`\n  Relationship Graph Validation\n`);
  console.log(`  Roles:          ${Object.keys(graph).length}`);
  console.log(`  Total edges:    ${report.totalEdges}`);
  console.log(`  Avg connections: ${report.avgConnections}`);
  console.log(`  Disconnected:   ${report.disconnected.length}`);
  console.log(`  Dangling refs:  ${report.danglingRefs.length}`);
  if (report.disconnected.length > 0) {
    console.log(`\n  Roles with zero connections (may indicate parsing gaps):`);
    report.disconnected.slice(0, 20).forEach(r => console.log(`    ${r}`));
    if (report.disconnected.length > 20) console.log(`    ... and ${report.disconnected.length - 20} more`);
  }
  if (report.danglingRefs.length > 0) {
    console.log(`\n  References to non-existent roles:`);
    report.danglingRefs.slice(0, 20).forEach(d => console.log(`    ${d.from} → ${d.ref}`));
    if (report.danglingRefs.length > 20) console.log(`    ... and ${report.danglingRefs.length - 20} more`);
  }
} else if (arg === '--all') {
  console.log(`Total roles in graph: ${Object.keys(graph).length}`);
  console.log('First 10:', Object.keys(graph).slice(0, 10).join(', '));
} else if (arg === '--stats') {
  const top = findMostConnected(graph);
  console.log('Most connected roles:\n');
  console.log('  Rank | Role                           | Outbound | Inbound | Total');
  console.log('  ' + '─'.repeat(70));
  top.forEach((r, i) => {
    console.log(`  ${String(i + 1).padStart(3)} | ${r.role.padEnd(32)} | ${String(r.outbound).padStart(7)} | ${String(r.inbound).padStart(6)} | ${r.total}`);
  });
  const graphValues = Object.values(graph);
  console.log(`\n  Total unique role relationships mapped: ${graphValues.reduce((s, c) => s + c.length, 0)}`);
} else if (arg) {
  if (!graph[arg]) {
    console.error(`Error: Role "${arg}" not found in the relationship graph.`);
    process.exit(1);
  }
  const result = findConnections(graph, arg);
  console.log(`\n  Role: ${result.roleId}`);
  console.log(`  Direct collaborations: ${result.collaborates_with}`);
  console.log(`  Reverse references:    ${result.reverse_connections}`);
  console.log(`\n  Collaborates with:`);
  result.direct.forEach(r => console.log(`    ${r.includes('(reports_to)') ? `→ ${r.replace(' (reports_to)', '')} (reports to)` : `  ${r}`}`));
  if (result.reverse.length > 0) {
    console.log(`\n  Referenced by:`);
    result.reverse.forEach(r => console.log(`    ${r}`));
  }
} else {
  console.error('Error: A role ID or flag is required.');
  console.error('Usage: node .../relationship-map.js <role-id>');
  console.error('       node .../relationship-map.js --all');
  console.error('       node .../relationship-map.js --stats');
  console.error('       node .../relationship-map.js --validate');
  process.exit(1);
}
