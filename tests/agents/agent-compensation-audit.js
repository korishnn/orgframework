#!/usr/bin/env node
// tests/agents/agent-compensation-audit.js — Verify compensation data integrity
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BANDS_FILE = join(ROOT, '.claude/councilorg/compensation/bands.json');
let issues = 0;

if (!existsSync(BANDS_FILE)) {
  console.log('✗ compensation/bands.json not found'); process.exit(1);
}

const bands = JSON.parse(readFileSync(BANDS_FILE, 'utf-8'));
if (!bands.bands || typeof bands.bands !== 'object') {
  console.log('✗ bands.json missing "bands" object'); issues++;
} else {
  const roleCount = Object.keys(bands.bands).length;
  console.log(`✓ ${roleCount} roles with compensation data`);
  
  for (const [roleId, data] of Object.entries(bands.bands)) {
    if (!data.breakdown) { console.log(`✗ ${roleId}: missing breakdown`); issues++; continue; }
    for (const [level, levelData] of Object.entries(data.breakdown)) {
      for (const region of ['na', 'emea', 'apac', 'latam']) {
        if (!levelData[region]) {
          console.log(`✗ ${roleId}/${level}: missing ${region}`); issues++;
        } else {
          const val = String(levelData[region]);
          // Check for NaN by parsing
          const cleaned = val.replace(/[^0-9.-]/g, ' ').trim().split(/[\s-]+/).map(Number);
          if (cleaned.some(isNaN)) {
            console.log(`✗ ${roleId}/${level}/${region}: invalid value "${val}"`); issues++;
          }
        }
      }
    }
  }
}

// Check deriveDefaultBands handles edge cases
const orchestrator = readFileSync(join(ROOT, '.claude/councilorg/council/orchestrator.js'), 'utf-8');
if (orchestrator.includes('deriveDefaultBands')) {
  console.log('✓ deriveDefaultBands function found');
  if (orchestrator.includes('K/gi') && orchestrator.includes('M/gi')) {
    console.log('✓ K/M suffix parsing implemented');
  } else {
    console.log('✗ K/M suffix parsing not found'); issues++;
  }
  if (orchestrator.includes('[\\s-]+')) {
    console.log('✓ Salary range splitting handles dashes');
  } else {
    console.log('✗ Salary range may not handle dashes'); issues++;
  }
}

if (issues === 0) { console.log('✓ COMPENSATION AUDIT PASS'); process.exit(0); }
else process.exit(1);
