#!/usr/bin/env node
// validate-presets.js — Verify all preset files have valid structure

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { getRootDir, getDataPath } from './lib/utils.js';
import Ajv from 'ajv';

const ROOT = getRootDir();
const PRESETS_DIR = getDataPath('presets');

// Load JSON Schema
const presetSchema = JSON.parse(readFileSync(join(ROOT, 'tests', 'schemas', 'preset.schema.json'), 'utf-8'));
const ajv = new Ajv();
const validatePreset = ajv.compile(presetSchema);

let errors = 0;
const files = readdirSync(PRESETS_DIR).filter(f => f.endsWith('.json'));

console.log(`Validating ${files.length} preset files...\n`);

for (const f of files) {
  try {
    const data = JSON.parse(readFileSync(join(PRESETS_DIR, f), 'utf-8'));
    const id = data.preset || f.replace('.json', '');
    let fileErrors = 0;

    if (!validatePreset(data)) {
      for (const err of validatePreset.errors) {
        console.log(`  ✗ ${f}: schema ${err.instancePath} ${err.message}`);
        fileErrors++;
      }
    }

    if (!data.preset) { console.log(`✗ ${f}: missing preset field`); fileErrors++; }
    if (!data.name) { console.log(`✗ ${f}: missing name`); fileErrors++; }
    if (!data.description) { console.log(`✗ ${f}: missing description`); fileErrors++; }
    if (!data.applicability) { console.log(`✗ ${f}: missing applicability`); fileErrors++; }
    if (!data.headcount_range) { console.log(`✗ ${f}: missing headcount_range`); fileErrors++; }

    if (!data.org_structure) { console.log(`✗ ${f}: missing org_structure`); fileErrors++; }
    else {
      if (!data.org_structure.overview) { console.log(`✗ ${f}: missing org_structure.overview`); fileErrors++; }
      if (!Array.isArray(data.org_structure.departments)) { console.log(`✗ ${f}: departments not an array`); fileErrors++; }
      else {
        for (const dept of data.org_structure.departments) {
          if (!dept.name) { console.log(`✗ ${f}: department missing name`); fileErrors++; }
          if (!Array.isArray(dept.roles)) { console.log(`✗ ${f}: department ${dept.name || '?'} roles not array`); fileErrors++; }
        }
      }
    }

    if (fileErrors === 0) {
      const deptCount = data.org_structure?.departments?.length || 0;
      const roleCount = data.org_structure?.departments?.reduce((s, d) => s + (d.roles?.length || 0), 0) || 0;
      console.log(`  ✓ ${id}: ${deptCount} depts, ${roleCount} roles, ${data.headcount_range} people`);
    } else {
      errors += fileErrors;
    }
  } catch (e) {
    console.log(`✗ ${f}: parse error — ${e.message}`);
    errors++;
  }
}

console.log(`\nAll presets have a matching JSON file.`);

const totalDepartments = files.reduce((sum, f) => {
  try {
    const data = JSON.parse(readFileSync(join(PRESETS_DIR, f), 'utf-8'));
    return sum + (data.org_structure?.departments?.length || 0);
  } catch { return sum; }
}, 0);

const totalRoles = files.reduce((sum, f) => {
  try {
    const data = JSON.parse(readFileSync(join(PRESETS_DIR, f), 'utf-8'));
    return sum + (data.org_structure?.departments?.reduce((s, d) => s + (d.roles?.length || 0), 0) || 0);
  } catch { return sum; }
}, 0);

console.log(`  Total: ${totalDepartments} departments, ${totalRoles} roles across ${files.length} presets`);

if (errors > 0) {
  console.log(`\n✗ ${errors} validation error(s) found`);
  process.exit(1);
} else {
  console.log(`\n✓ All preset validation checks passed.`);
}
