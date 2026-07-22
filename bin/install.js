#!/usr/bin/env node
// orgframework — Node.js installer (equivalent to install.sh)
// Usage: node bin/install.js [target-dir]

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT_DIR = join(__dirname, '..');
const TARGET = process.argv[2] || process.cwd();

const pkg = JSON.parse(readFileSync(join(SCRIPT_DIR, 'package.json'), 'utf-8'));
const VERSION = pkg.version || '5.0.0';

const CLAUDE_DIR = join(TARGET, '.claude');
const SKILL_DIR = join(CLAUDE_DIR, 'skills', 'orgframework');
const ORG_DIR = join(CLAUDE_DIR, 'orgframework');

// All subdirectories to create under ORG_DIR
const SUBDIRS = [
  'styles', 'regions', 'industries', 'stages', 'presets', 'definitions',
  'adaptations', 'diagnostics', 'visualizer', 'comparison', 'relationship-map',
  'compensation', 'maturity', 'expansion', 'hiring', 'role-to-task', 'crisis',
  'raci', 'reverse-org', 'budget', 'similarity', 'timeline', 'culture',
  'vacancy', 'health-monitor', 'conway', 'topologies', 'simulation', 'council',
];

// Directories that contain files to copy (relative to .claude/orgframework)
const DATA_DIRS = [
  'regions', 'industries', 'stages', 'presets', 'styles',
  'adaptations', 'diagnostics', 'visualizer', 'comparison', 'relationship-map',
  'compensation', 'maturity', 'expansion', 'hiring', 'role-to-task', 'crisis',
  'raci', 'reverse-org', 'budget', 'similarity', 'timeline', 'culture',
  'vacancy', 'health-monitor', 'conway', 'topologies', 'simulation', 'council',
];

// Individual files to copy (relative to .claude/orgframework)
const DATA_FILES = [
  'index.json', 'additions.json', 'recommendations.md',
];

console.log(`Installing orgframework into ${TARGET}...\n`);

// Create all directories
mkdirSync(SKILL_DIR, { recursive: true });
for (const subdir of SUBDIRS) {
  mkdirSync(join(ORG_DIR, subdir), { recursive: true });
}

// Copy skill definition
const skillSrc = join(SCRIPT_DIR, '.claude', 'skills', 'orgframework', 'SKILL.md');
if (existsSync(skillSrc)) {
  copyFileSync(skillSrc, join(SKILL_DIR, 'SKILL.md'));
  console.log('  ✓ Skill: .claude/skills/orgframework/SKILL.md');
}

// Copy individual data files
for (const file of DATA_FILES) {
  const src = join(SCRIPT_DIR, '.claude', 'orgframework', file);
  if (existsSync(src)) {
    copyFileSync(src, join(ORG_DIR, file));
    console.log(`  ✓ ${file}`);
  }
}

// Copy directory contents
for (const dir of DATA_DIRS) {
  const srcDir = join(SCRIPT_DIR, '.claude', 'orgframework', dir);
  const dstDir = join(ORG_DIR, dir);
  if (!existsSync(srcDir)) continue;

  const entries = readdirSync(srcDir);
  let count = 0;
  for (const entry of entries) {
    const srcPath = join(srcDir, entry);
    if (statSync(srcPath).isFile()) {
      copyFileSync(srcPath, join(dstDir, entry));
      count++;
    }
  }
  if (count > 0) {
    console.log(`  ✓ ${dir}: ${count} files`);
  }
}

// Count role files specifically
const allStyles = join(SCRIPT_DIR, '.claude', 'orgframework', 'styles');
if (existsSync(allStyles)) {
  const roleFiles = readdirSync(allStyles).filter(f => f.endsWith('.md'));
  console.log(`  ✓ Roles: ${roleFiles.length} reference role files`);
}

console.log(`\nDone! orgframework v${VERSION} installed.`);
console.log('');
console.log('Quick start:');
console.log('  /orgframework I need to hire a senior backend engineer in Berlin');
console.log('  /orgframework we\'re launching a new product in Brazil, what\'s the org plan');
console.log('  /orgframework our Series B fintech needs a compliance structure');
console.log('  /orgframework design a hospital respiratory therapy department');
console.log('  /orgframework what team structure for a remote-first design agency');
