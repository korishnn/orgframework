#!/usr/bin/env node
// tests/agents/agent-import-resolution.js — Verify all imports resolve
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { execSync } = await import('child_process');
let issues = 0;

// Check all .js files import resolution
const files = execSync(`find "${ROOT}" -name "*.js" -not -path "*/node_modules/*" -not -path "*/.git/*"`, { encoding: 'utf-8' }).split('\n').filter(Boolean);

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const imports = [...content.matchAll(/from\s+['"]([^'"]+)['"]/g)].map(m => m[1]);
  for (const imp of imports) {
    if (imp.startsWith('.')) {
      // Resolve relative path
      const resolved = join(dirname(file), imp);
      // Check if file exists (with .js extension if missing)
      if (!existsSync(resolved) && !existsSync(resolved + '.js')) {
        console.log(`✗ Import resolution failed: ${file} → ${imp}`);
        issues++;
      }
    }
  }
}

// Check package.json exports map
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
if (pkg.exports) {
  for (const [key, val] of Object.entries(pkg.exports)) {
    const fullPath = join(ROOT, val);
    if (!existsSync(fullPath)) {
      console.log(`✗ package.json export "${key}" → "${val}" not found`);
      issues++;
    }
  }
}

if (issues === 0) console.log('✓ IMPORT RESOLUTION PASS');
else console.log(`✗ ${issues} import issues`);
process.exit(issues > 0 ? 1 : 0);
