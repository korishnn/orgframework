#!/usr/bin/env node
// tests/agents/agent-role-integrity.js — Verify all 555 roles have required sections
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const STYLES_DIR = join(ROOT, '.claude/councilorg/styles');
const REQUIRED_SECTIONS = ['## Responsibilities', '## Core Competencies', '## KPIs & Success Metrics', '## Career Progression', '## Cross-Functional Relationships'];

const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
let issues = 0;
let totalChecks = 0;

for (const file of files) {
  const content = readFileSync(join(STYLES_DIR, file), 'utf-8');
  for (const section of REQUIRED_SECTIONS) {
    totalChecks++;
    if (!content.includes(section)) {
      console.log(`✗ ${file}: missing section "${section}"`);
      issues++;
    }
  }
}

console.log(`\n${files.length} roles checked, ${totalChecks} section checks.`);
if (issues === 0) {
  console.log('✓ ALL ROLES PASS — all required sections present');
  process.exit(0);
} else {
  console.log(`✗ ${issues} issues found`);
  process.exit(1);
}
