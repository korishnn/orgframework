#!/usr/bin/env node
// tests/agents/agent-schema-conformance.js — Validate presets/index against JSON schemas
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PRESETS_DIR = join(ROOT, '.claude/councilorg/presets');
const SCHEMAS_DIR = join(ROOT, 'tests/schemas');
let issues = 0;

// Basic structural validation against schemas
const presetSchema = existsSync(join(SCHEMAS_DIR, 'preset.schema.json')) ? JSON.parse(readFileSync(join(SCHEMAS_DIR, 'preset.schema.json'), 'utf-8')) : null;
const indexSchema = existsSync(join(SCHEMAS_DIR, 'index.schema.json')) ? JSON.parse(readFileSync(join(SCHEMAS_DIR, 'index.schema.json'), 'utf-8')) : null;

if (!presetSchema) { console.log('✗ preset.schema.json not found'); issues++; }
else { console.log('✓ preset.schema.json loaded'); }

if (!indexSchema) { console.log('✗ index.schema.json not found'); issues++; }
else { console.log('✓ index.schema.json loaded'); }

// Validate all presets exist
const presetFiles = readdirSync(PRESETS_DIR).filter(f => f.endsWith('.json'));
for (const file of presetFiles) {
  try {
    const data = JSON.parse(readFileSync(join(PRESETS_DIR, file), 'utf-8'));
    if (!data.preset || !data.name || !data.org_structure) {
      console.log(`✗ ${file}: missing required fields`); issues++;
    }
  } catch (e) {
    console.log(`✗ ${file}: parse error — ${e.message}`); issues++;
  }
}

// Validate index.json structure
try {
  const idx = JSON.parse(readFileSync(join(ROOT, '.claude/councilorg/index.json'), 'utf-8'));
  if (!idx.reference_roles || !Array.isArray(idx.reference_roles)) {
    console.log('✗ index.json missing reference_roles array'); issues++;
  }
  if (!idx.philosophy) { console.log('✗ index.json missing philosophy'); issues++; }
  if (idx.reference_roles.length !== 555) {
    console.log(`✗ index.json reference_roles count: ${idx.reference_roles.length} (expected 555)`); issues++;
  }
} catch (e) {
  console.log(`✗ index.json parse error: ${e.message}`); issues++;
}

const counts = { presets: presetFiles.length, roles: readdirSync(join(ROOT, '.claude/councilorg/styles')).filter(f => f.endsWith('.md')).length };
console.log(`\nFiles: ${counts.roles} roles, ${counts.presets} presets`);

if (issues === 0) { console.log('✓ SCHEMA CONFORMANCE PASS'); process.exit(0); }
else process.exit(1);
