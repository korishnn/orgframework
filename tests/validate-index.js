#!/usr/bin/env node
// validate-index.js — Verify index.json and all profile files have correct structure

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INDEX_PATH = join(ROOT, '.claude', 'orgframework', 'index.json');
const ADDITIONS_PATH = join(ROOT, '.claude', 'orgframework', 'additions.json');

let errors = 0;

// Validate index.json
try {
  const index = JSON.parse(readFileSync(INDEX_PATH, 'utf-8'));

  if (!index.version) { console.log('✗ index.json missing version'); errors++; }
  if (!index.philosophy) { console.log('✗ index.json missing philosophy'); errors++; }

  // Validate regions field
  if (!index.regions) { console.log('✗ index.json missing regions'); errors++; }
  else if (!index.regions.options || !Array.isArray(index.regions.options)) { console.log('✗ regions.options not an array'); errors++; }
  else {
    console.log(`  ✓ ${index.regions.options.length} regions configured (${index.regions.options.join(', ')})`);
    for (const r of index.regions.options) {
      if (!index.regions.detection?.[r]) {
        console.log(`  ✗ region ${r} missing detection keywords`);
        errors++;
      }
    }
  }

  // Validate industries field
  if (!index.industries) { console.log('✗ index.json missing industries'); errors++; }
  else if (!index.industries.options || !Array.isArray(index.industries.options)) { console.log('✗ industries.options not an array'); errors++; }
  else {
    console.log(`  ✓ ${index.industries.options.length} industries configured (${index.industries.options.join(', ')})`);
    for (const ind of index.industries.options) {
      if (!index.industries.detection?.[ind]) {
        console.log(`  ✗ industry ${ind} missing detection keywords`);
        errors++;
      }
    }
  }

  // Validate stages field
  if (!index.stages) { console.log('✗ index.json missing stages'); errors++; }
  else if (!index.stages.options || !Array.isArray(index.stages.options)) { console.log('✗ stages.options not an array'); errors++; }
  else {
    console.log(`  ✓ ${index.stages.options.length} stages configured (${index.stages.options.join(', ')})`);
  }

  // Validate reference_roles (flat list, no grouping)
  if (!index.reference_roles) { console.log('✗ index.json missing reference_roles'); errors++; }
  else if (!Array.isArray(index.reference_roles)) { console.log('✗ reference_roles not an array'); errors++; }
  else {
    for (const role of index.reference_roles) {
      if (!role.match(/^[a-z]+-[a-z0-9-]+$/)) {
        console.log(`  ✗ Invalid role ID format: ${role}`);
        errors++;
      }
    }
    const unique = new Set(index.reference_roles);
    if (unique.size !== index.reference_roles.length) {
      console.log(`✗ Duplicate role IDs in reference_roles`);
      errors++;
    }
    console.log(`  ✓ ${index.reference_roles.length} reference roles (flat, ungrouped)`);
  }

  // Validate org_construction_guidance
  if (!index.org_construction_guidance) {
    console.log('✗ index.json missing org_construction_guidance');
    errors++;
  } else {
    if (!index.org_construction_guidance.how_it_works) { console.log('✗ org_construction_guidance missing how_it_works'); errors++; }
    if (!index.org_construction_guidance.what_to_consider) { console.log('✗ org_construction_guidance missing what_to_consider'); errors++; }
    if (!index.org_construction_guidance.what_you_can_create) { console.log('✗ org_construction_guidance missing what_you_can_create'); errors++; }
  }
} catch (e) {
  console.log(`✗ index.json parse error: ${e.message}`);
  errors++;
}

// Validate additions.json
try {
  const additions = JSON.parse(readFileSync(ADDITIONS_PATH, 'utf-8'));

  if (!additions.version) { console.log('✗ additions.json missing version'); errors++; }
  if (!Array.isArray(additions.additions)) { console.log('✗ additions.additions not an array'); errors++; }

  for (const add of additions.additions) {
    if (!add.id) { console.log('✗ addition missing id'); errors++; }
    if (!add.name) { console.log(`✗ addition ${add.id} missing name`); errors++; }
    if (!add.instruction) { console.log(`✗ addition ${add.id} missing instruction`); errors++; }
  }

  console.log(`  ✓ ${additions.additions.length} additions (v${additions.version})`);
} catch (e) {
  console.log(`✗ additions.json parse error: ${e.message}`);
  errors++;
}

// Validate region profile files exist
const regionsDir = join(ROOT, '.claude', 'orgframework', 'regions');
if (existsSync(regionsDir)) {
  const files = readdirSync(regionsDir).filter(f => f.endsWith('.json'));
  console.log(`  ✓ ${files.length} region profile files: ${files.join(', ')}`);
} else {
  console.log('✗ regions directory missing');
  errors++;
}

// Validate industry profile files exist
const industriesDir = join(ROOT, '.claude', 'orgframework', 'industries');
if (existsSync(industriesDir)) {
  const files = readdirSync(industriesDir).filter(f => f.endsWith('.json'));
  console.log(`  ✓ ${files.length} industry profile files: ${files.join(', ')}`);
} else {
  console.log('✗ industries directory missing');
  errors++;
}

// Validate stage profile files exist
const stagesDir = join(ROOT, '.claude', 'orgframework', 'stages');
if (existsSync(stagesDir)) {
  const files = readdirSync(stagesDir).filter(f => f.endsWith('.json'));
  console.log(`  ✓ ${files.length} stage profile files: ${files.join(', ')}`);
} else {
  console.log('✗ stages directory missing');
  errors++;
}

// Note: role definitions are read directly from the .md files
// No separate definitions file is needed — each .md file IS the definition

// Validate presets exist
const presetsDir = join(ROOT, '.claude', 'orgframework', 'presets');
if (existsSync(presetsDir)) {
  const files = readdirSync(presetsDir).filter(f => f.endsWith('.json'));
  console.log(`  ✓ Presets: ${files.length} org structure templates`);
} else {
  console.log('✗ presets directory missing');
  errors++;
}

if (errors > 0) {
  console.log(`\n✗ ${errors} validation error(s) found`);
  process.exit(1);
} else {
  console.log(`\n✓ All v3 validation checks passed.`);
}
