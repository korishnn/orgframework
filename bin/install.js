#!/usr/bin/env node
// orgframework — Node.js installer (alternative to install.sh)

import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT_DIR = join(__dirname, '..');
const TARGET = process.argv[2] || process.cwd();

const CLAUDE_DIR = join(TARGET, '.claude');
const SKILL_DIR = join(CLAUDE_DIR, 'skills', 'orgframework');
const ORG_DIR = join(CLAUDE_DIR, 'orgframework');
const STYLES_DIR = join(ORG_DIR, 'styles');

console.log(`Installing orgframework into ${TARGET}...`);

// Create dirs
mkdirSync(SKILL_DIR, { recursive: true });
mkdirSync(STYLES_DIR, { recursive: true });

// Copy skill
const skillSrc = join(SCRIPT_DIR, '.claude', 'skills', 'orgframework', 'SKILL.md');
if (existsSync(skillSrc)) {
  copyFileSync(skillSrc, join(SKILL_DIR, 'SKILL.md'));
  console.log('  ✓ Skill: .claude/skills/orgframework/SKILL.md');
}

// Copy index
const indexSrc = join(SCRIPT_DIR, '.claude', 'orgframework', 'index.json');
if (existsSync(indexSrc)) {
  copyFileSync(indexSrc, join(ORG_DIR, 'index.json'));
  console.log('  ✓ Index: index.json');
}

// Copy additions
const additionsSrc = join(SCRIPT_DIR, '.claude', 'orgframework', 'additions.json');
if (existsSync(additionsSrc)) {
  copyFileSync(additionsSrc, join(ORG_DIR, 'additions.json'));
  console.log('  ✓ Additions: additions.json');
}

// Copy role files
const allStyles = join(SCRIPT_DIR, '.claude', 'orgframework', 'styles');
if (existsSync(allStyles)) {
  const files = readdirSync(allStyles).filter(f => f.endsWith('.md'));
  for (const f of files) {
    copyFileSync(join(allStyles, f), join(STYLES_DIR, f));
  }
  console.log(`  ✓ Roles: ${files.length} role files`);
}

console.log('\nDone! Use /orgframework in your Claude Code project.');
