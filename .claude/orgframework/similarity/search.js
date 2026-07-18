#!/usr/bin/env node
// similarity.js — Find roles similar to a given role using text overlap scoring
// Usage: node bin/similarity.js <role-id>

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STYLES_DIR = join(ROOT, '.claude', 'orgframework', 'styles');
const DEFS_PATH = join(ROOT, '.claude', 'orgframework', 'definitions', 'definitions.json');

function tokenize(str) {
  return str.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 2 && !['the', 'and', 'for', 'with', 'that', 'this'].includes(t));
}

function computeSimilarity(idA, contentA, idB, contentB) {
  const tokensA = tokenize(`${idA} ${contentA}`);
  const tokensB = tokenize(`${idB} ${contentB}`);
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  const intersection = [...setA].filter(t => setB.has(t));
  const union = new Set([...setA, ...setB]);
  return union.size > 0 ? Math.round((intersection.length / union.size) * 100) : 0;
}

function findSimilar(roleId, topN = 10) {
  const targetPath = join(STYLES_DIR, `${roleId}.md`);
  const defs = existsSync(DEFS_PATH) ? JSON.parse(readFileSync(DEFS_PATH, 'utf-8')) : {};
  const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md') && f !== `${roleId}.md`);

  if (!existsSync(targetPath)) {
    // Try fuzzy match
    const match = files.find(f => f.includes(roleId.toLowerCase()));
    if (!match) return null;
    roleId = match.replace('.md', '');
  }

  const targetContent = defs[roleId] || readFileSync(join(STYLES_DIR, `${roleId}.md`), 'utf-8').slice(0, 1000);
  const scores = [];

  for (const f of files.slice(0, 500)) {
    const id = f.replace('.md', '');
    const content = defs[id] || readFileSync(join(STYLES_DIR, f), 'utf-8').slice(0, 1000);
    const score = computeSimilarity(roleId, targetContent, id, content);
    if (score > 15) scores.push({ role: id, similarity: score });
  }

  scores.sort((a, b) => b.similarity - a.similarity);
  return scores.slice(0, topN);
}

import { existsSync } from 'fs';

const arg = process.argv[2];
if (arg) {
  const results = findSimilar(arg);
  if (!results) {
    console.log(`Role "${arg}" not found.`);
    process.exit(1);
  }
  console.log(`\n  Roles similar to "${arg}":\n`);
  results.forEach((r, i) => {
    const bar = '█'.repeat(Math.floor(r.similarity / 5));
    console.log(`  ${String(i + 1).padStart(2)}. ${r.role.padEnd(35)} ${String(r.similarity).padStart(2)}%  ${bar}`);
  });
}
