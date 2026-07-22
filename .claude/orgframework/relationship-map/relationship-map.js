#!/usr/bin/env node
// relationship-map.js — Build and query role relationship graph from styles/*
// Usage: node .claude/orgframework/relationship-map/relationship-map.js <role-id>
//        node .claude/orgframework/relationship-map/relationship-map.js --all
//        node .claude/orgframework/relationship-map/relationship-map.js --stats
//        node .claude/orgframework/relationship-map/relationship-map.js --validate

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { getStylesDir } from '../lib/paths.js';
import { tryCatch, Result } from '../lib/errors.js';
import { createCache } from '../lib/cache.js';

const STYLES_DIR = getStylesDir();

// ── TTL Cache ─────────────────────────────────────────────────────────
const graphCache = createCache(60_000);

/**
 * Clear the cached graph. Call when the styles directory changes.
 */
export function clearCache() {
  graphCache.clear();
}

// ── Enhanced Relationship Extraction ───────────────────────────────────

/**
 * Extract relationship references from a role markdown file's content.
 * Supports multiple heading formats and inline markers.
 * @param {string} content - The full markdown content of a role file
 * @returns {{ collaboratesWith: string[], reportsTo: string[] }}
 */
function extractRelationships(content) {
  /** @type {string[]} */
  const collaboratesWith = [];
  /** @type {string[]} */
  const reportsTo = [];

  // Helper to extract role IDs from a text string
  function extractRoleIds(/** @type {string} */ text) {
    return text.match(/[a-z]+-[a-z0-9-]+/g) || [];
  }

  // Try multiple formats for "Collaborates with" / "Works with"
  const collabPatterns = [
    /Collaborates with:?\s*(.+)/i,
    /- Collaborates with:?\s*(.+)/i,
    /## Cross-Functional Relationships/i,
    /## Dependencies/i,
    /\*\*Works with:\*\*\s*(.+)/i,
    /\*\*Collaborates with:\*\*\s*(.+)/i,
  ];

  for (const pattern of collabPatterns) {
    const match = content.match(pattern);
    if (match) {
      // If it's a section heading (## ...), get bullet items until next heading
      if (pattern.source.startsWith('##')) {
        const sectionEnd = content.indexOf('##', (match.index || 0) + 1);
        const section = content.slice(match.index, sectionEnd >= 0 ? sectionEnd : undefined);
        const bulletItems = section.split('\n')
          .filter(l => l.trim().startsWith('-'))
          .map(l => l.replace(/^-\s*/, '').trim());
        for (const item of bulletItems) {
          collaboratesWith.push(...extractRoleIds(item));
        }
      } else {
        // Inline format: "Collaborates with: role-a, role-b"
        const refs = match[1].split(',').map(s => s.trim()).filter(Boolean);
        for (const ref of refs) {
          collaboratesWith.push(...extractRoleIds(ref));
        }
      }
      break; // First match wins
    }
  }

  // Try multiple formats for "Reports to"
  const reportsPatterns = [
    /Reports to:?\s*(.+)/i,
    /- Reports to:?\s*(.+)/i,
    /\*\*Reports to:\*\*\s*(.+)/i,
    /Reports To:?\s*(.+)/,
  ];

  for (const pattern of reportsPatterns) {
    const match = content.match(pattern);
    if (match) {
      const refs = match[1].split(',').map(s => s.trim()).filter(Boolean);
      for (const ref of refs) {
        reportsTo.push(...extractRoleIds(ref));
      }
      break;
    }
  }

  return { collaboratesWith, reportsTo };
}

/**
 * Build a relationship graph from all role markdown files.
 * @returns {import('../lib/errors.js').Result<Record<string, string[]>, Error>}
 */
export function buildGraph() {
  // Check cache first
  const cached = graphCache.get();
  if (cached) return Result.ok(cached);

  return tryCatch(() => {
    const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
    /** @type {Record<string, string[]>} */
    const graph = {};
    /** @type {Set<string>} */
    const allRoleIds = new Set();

    // First pass: collect all role IDs
    for (const f of files) {
      allRoleIds.add(f.replace('.md', ''));
    }

    // Second pass: extract relationships
    for (const f of files) {
      const roleId = f.replace('.md', '');
      const content = readFileSync(join(STYLES_DIR, f), 'utf-8');
      const { collaboratesWith, reportsTo } = extractRelationships(content);

      /** @type {string[]} */
      const connections = [];

      // Add collaborator references
      for (const ref of collaboratesWith) {
        connections.push(ref);
      }

      // Add reports_to references with marker
      for (const ref of reportsTo) {
        connections.push(`${ref} (reports_to)`);
      }

      graph[roleId] = connections;
    }

    graphCache.set(graph);
    return graph;
  });
}

/**
 * Validate the graph — report roles with zero connections and dangling references.
 * @param {Record<string, string[]>} graph
 * @returns {{ disconnected: string[], danglingRefs: Array<{ from: string, ref: string }>, totalEdges: number, avgConnections: number }}
 */
export function validateGraph(graph) {
  /** @type {string[]} */
  const disconnected = [];
  /** @type {Array<{ from: string, ref: string }>} */
  const danglingRefs = [];
  let totalEdges = 0;

  const allRoleIds = new Set(Object.keys(graph));

  for (const [node, connections] of Object.entries(graph)) {
    if (connections.length === 0) {
      disconnected.push(node);
    }
    totalEdges += connections.length;
    for (const conn of connections) {
      const refRole = conn.replace(/\s*\(reports_to\)/, '');
      if (!allRoleIds.has(refRole)) {
        danglingRefs.push({ from: node, ref: refRole });
      }
    }
  }

  const roleCount = Object.keys(graph).length;
  return {
    disconnected,
    danglingRefs,
    totalEdges,
    avgConnections: roleCount > 0 ? Math.round((totalEdges / roleCount) * 10) / 10 : 0,
  };
}

/**
 * Find all direct and reverse connections for a role.
 * @param {Record<string, string[]>} graph - The relationship graph
 * @param {string} roleId - Role identifier
 * @returns {{ roleId: string, collaborates_with: number, direct: string[], reverse_connections: number, reverse: string[] }}
 */
export function findConnections(graph, roleId) {
  const direct = graph[roleId] || [];
  /** @type {string[]} */
  const reverse = [];
  for (const [node, connections] of Object.entries(graph)) {
    if (node !== roleId && connections.some(c => c.includes(roleId))) {
      reverse.push(node);
    }
  }
  return { roleId, collaborates_with: direct.length, direct, reverse_connections: reverse.length, reverse };
}

/**
 * Find the most connected roles in the graph.
 * @param {Record<string, string[]>} graph - The relationship graph
 * @param {number} [topN=20] - Number of results
 * @returns {Array<{role: string, outbound: number, inbound: number, total: number}>}
 */
export function findMostConnected(graph, topN = 20) {
  /** @type {Array<{role: string, outbound: number, inbound: number, total: number}>} */
  const scores = [];
  for (const [node, connections] of Object.entries(graph)) {
    const unique = new Set(connections.map(c => c.replace(/\s*\(reports_to\)/, '')));
    let reverseCount = 0;
    for (const [other, otherConns] of Object.entries(graph)) {
      if (other !== node && otherConns.some(c => c.includes(node))) reverseCount++;
    }
    scores.push({ role: node, outbound: unique.size, inbound: reverseCount, total: unique.size + reverseCount });
  }
  return scores.sort((a, b) => b.total - a.total).slice(0, topN);
}

// ── CLI is in bin/cli/relationship-map.js ──────────────────────────
