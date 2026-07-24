#!/usr/bin/env node
// tests/agents/agent-naming-consistency.js — Check all naming is consistent
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { execSync } = await import('child_process');
let issues = 0;

// 1. Check for any remaining "orgframework" references (case insensitive)
const result = execSync(`grep -rn "orgframework" --include="*.md" --include="*.js" --include="*.json" --include="*.yml" --include="*.sh" "${ROOT}" --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null || true`, { encoding: 'utf-8' });
const lines = result.split('\n').filter(l => l.trim() && !l.includes('tests/agents/'));
const lines = result.split('\n').filter(l => l.trim());
if (lines.length > 0) {
  console.log(`✗ Found ${lines.length} references to "orgframework":`);
  for (const l of lines.slice(0, 10)) console.log(`  ${l}`);
  issues++;
} else {
  console.log('✓ No "orgframework" references remain');
}

// 2. Check package.json name matches
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
if (pkg.name === 'councilorg') console.log('✓ package.json name: councilorg');
else { console.log(`✗ package.json name: ${pkg.name}`); issues++; }

// 3. Check repo URL
const cloneUrl = execSync(`grep -m1 "github.com/korishnn" "${ROOT}/README.md"`, { encoding: 'utf-8' }).trim();
if (cloneUrl.includes('councilorg')) console.log('✓ README clone URL uses councilorg');
else { console.log(`✗ README clone URL: ${cloneUrl}`); issues++; }

// 4. Check package.json repo URL
if (pkg.repository?.url?.includes('councilorg')) console.log('✓ package.json repo URL uses councilorg');
else { console.log(`✗ package.json repo URL: ${pkg.repository?.url}`); issues++; }

console.log(`\n${issues} issues.`);
if (issues === 0) { console.log('✓ NAMING CONSISTENCY PASS'); process.exit(0); }
else { process.exit(1); }
