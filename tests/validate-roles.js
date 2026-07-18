#!/usr/bin/env node
// validate-roles.js — Verify all role files exist and match the reference list

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INDEX_PATH = join(ROOT, '.claude', 'orgframework', 'index.json');
const STYLES_DIR = join(ROOT, '.claude', 'orgframework', 'styles');

const index = JSON.parse(readFileSync(INDEX_PATH, 'utf-8'));
const referenceRoles = new Set(index.reference_roles || []);

console.log(`Index references ${referenceRoles.size} roles.\n`);

// Check every reference role has a file
let missing = 0;
let expanded = 0;

for (const role of referenceRoles) {
  const filePath = join(STYLES_DIR, `${role}.md`);
  if (!existsSync(filePath)) {
    console.log(`  MISSING: ${role}.md`);
    missing++;
    continue;
  }

  const content = readFileSync(filePath, 'utf-8');
  const isExpanded = content.includes('## Responsibilities') || content.includes('Key responsibilities:');
  const hasCompetencies = content.includes('## Core Competencies') || content.includes('Core competencies:');
  if (isExpanded && hasCompetencies) {
    expanded++;
  }
}

const actualFiles = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
const extraFiles = actualFiles
  .map(f => f.replace(/\.md$/, ''))
  .filter(name => !referenceRoles.has(name));

if (missing > 0) {
  console.log(`\n✗ ${missing} role files MISSING!`);
  process.exit(1);
} else {
  console.log(`✓ All ${referenceRoles.size} reference role files exist.`);
}

if (expanded > 0) {
  console.log(`✓ ${expanded}/${referenceRoles.size} expanded with full v3 template.`);
}

if (extraFiles.length > 0) {
  console.log(`\n⚠ ${extraFiles.length} extra files (not in reference_roles):`);
  extraFiles.forEach(f => console.log(`  ${f}.md`));
}

const totalLines = actualFiles.reduce((sum, f) => sum + readFileSync(join(STYLES_DIR, f), 'utf-8').split('\n').length, 0);
const avgLines = Math.round(totalLines / actualFiles.length);
console.log(`\n📊 Stats: ${actualFiles.length} files, ${totalLines} total lines, avg ${avgLines} lines/file`);
console.log(`\n✓ Validation complete. These files are reference material — the AI constructs custom orgs dynamically.`);
