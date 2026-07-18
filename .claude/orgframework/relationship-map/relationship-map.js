#!/usr/bin/env node
// relationship-map.js — Build and query role relationship graph from styles/*
// Usage: node bin/relationship-map.js <role-id>  (find all connections for a role)
//        node bin/relationship-map.js --all        (list all relationships)
//        node bin/relationship-map.js --stats      (most connected roles)

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STYLES_DIR = join(__dirname, '..', '.claude', 'orgframework', 'styles');

// Build relationship graph from all role files
function buildGraph() {
  const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
  const graph = {};

  for (const f of files) {
    const roleId = f.replace('.md', '');
    const content = readFileSync(join(STYLES_DIR, f), 'utf-8');
    const connections = [];

    // Extract "Collaborates with" references
    const collabMatch = content.match(/Collaborates with:?\s*(.+)/i) ||
                        content.match(/- Collaborates with:?\s*(.+)/i);
    if (collabMatch) {
      const refs = collabMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      for (const ref of refs) {
        // Extract role IDs from references
        const roleIds = ref.match(/[a-z]+-[a-z0-9-]+/g);
        if (roleIds) connections.push(...roleIds);
      }
    }

    // Extract "Reports to" references
    const reportsMatch = content.match(/Reports to:?\s*(.+)/i) ||
                         content.match(/- Reports to:?\s*(.+)/i);
    if (reportsMatch) {
      const refs = reportsMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      for (const ref of refs) {
        const roleIds = ref.match(/[a-z]+-[a-z0-9-]+/g);
        if (roleIds) connections.push(...roleIds.map(r => `${r} (reports_to)`));
      }
    }

    graph[roleId] = connections;
  }

  return graph;
}

function findConnections(graph, roleId) {
  const direct = graph[roleId] || [];
  const reverse = [];
  for (const [node, connections] of Object.entries(graph)) {
    if (node !== roleId && connections.some(c => c.includes(roleId))) {
      reverse.push(node);
    }
  }
  return { roleId, collaborates_with: direct.length, direct, reverse_connections: reverse.length, reverse };
}

function findMostConnected(graph, topN = 20) {
  const scores = [];
  for (const [node, connections] of Object.entries(graph)) {
    // Count unique connections (excluding "reports_to" markers)
    const unique = new Set(connections.map(c => c.replace(/\s*\(reports_to\)/, '')));
    // Count reverse references
    let reverseCount = 0;
    for (const [other, otherConns] of Object.entries(graph)) {
      if (other !== node && otherConns.some(c => c.includes(node))) reverseCount++;
    }
    scores.push({ role: node, outbound: unique.size, inbound: reverseCount, total: unique.size + reverseCount });
  }
  return scores.sort((a, b) => b.total - a.total).slice(0, topN);
}

// CLI
const arg = process.argv[2];
if (arg) {
  const graph = buildGraph();
  if (arg === '--all') {
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
    console.log(`\n  Total unique role relationships mapped: ${Object.values(graph).reduce((s, c) => s + c.length, 0)}`);
  } else {
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
  }
} else {
  console.log('Usage:');
  console.log('  node bin/relationship-map.js <role-id>    Find connections for a role');
  console.log('  node bin/relationship-map.js --all        List all roles in graph');
  console.log('  node bin/relationship-map.js --stats      Show most connected roles');
}
