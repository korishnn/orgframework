#!/usr/bin/env node
// org-chart.mermaid.js — Generate Mermaid.js org chart diagrams from any structure
// Usage: node .claude/councilorg/visualizer/generate.js <preset-json-path>

import { existsSync } from 'fs';
import { Result } from '../lib/errors.js';
import { readJson } from '../lib/fs.js';
import { VIRTUAL_REPORT } from '../lib/constants.js';

/**
 * Generate a Mermaid.js org chart diagram from an org structure object.
 * @param {Object} orgStructure - Org structure with departments and relationships
 * @param {Array<any>} orgStructure.departments - Array of department objects
 * @param {Array<any>} [orgStructure.relationships] - Optional cross-dept relationships
 * @returns {Result<string, string>} Mermaid.js graph source
 */
export function generateOrgChart(orgStructure) {
  if (!orgStructure || typeof orgStructure !== 'object') return Result.fail('orgStructure must be an object.');
  const { departments, relationships } = orgStructure;
  if (!Array.isArray(departments)) return Result.fail('orgStructure.departments must be an array.');
  if (departments.length === 0) return Result.fail('orgStructure.departments is empty — nothing to visualize.');

  let mermaid = ['graph TB;'];

  // Define subgraphs per department
  for (const dept of departments) {
    if (!dept.name) continue;
    if (!Array.isArray(dept.roles) || dept.roles.length === 0) continue;

    const deptId = dept.name.replace(/[^a-zA-Z0-9]/g, '_');
    if (dept.roles.length > 1) {
      mermaid.push(`  subgraph ${deptId}["${dept.name}"]`);
    }

    for (const role of dept.roles) {
      if (!role.title) continue;
      const id = role.title.replace(/[^a-zA-Z0-9]/g, '_');
      const label = `${role.title}${role.count ? ` (${role.count})` : ''}`;
      mermaid.push(`    ${id}["${label}"];`);

      if (role.reports_to && role.reports_to !== VIRTUAL_REPORT) {
        const parentId = role.reports_to.replace(/[^a-zA-Z0-9]/g, '_');
        mermaid.push(`    ${id} --> ${parentId};`);
      } else if (dept.reports_to) {
        const parentId = dept.reports_to.replace(/[^a-zA-Z0-9]/g, '_');
        mermaid.push(`    ${id} --> ${parentId};`);
      }
    }

    if (dept.roles.length > 1) {
      mermaid.push('  end');
    }
  }

  // Cross-department relationships (dotted lines)
  if (Array.isArray(relationships)) {
    for (const rel of relationships) {
      const parts = typeof rel === 'string' ? rel.split('→') : [];
      if (parts.length !== 2) continue;
      const [from, to] = parts.map(s => s.trim());
      const fromId = from.replace(/[^a-zA-Z0-9]/g, '_');
      const toId = to.replace(/[^a-zA-Z0-9]/g, '_');
      mermaid.push(`  ${fromId} -.-> ${toId};`);
    }
  }

  return Result.ok(mermaid.join('\n'));
}

/**
 * Generate an org chart from a preset JSON file path.
 * @param {string} presetPath - Path to a preset JSON file
 * @returns {Result<string, string>} Mermaid.js graph source
 */
export function generateFromPreset(presetPath) {
  if (!presetPath) return Result.fail('Preset path is required.');
  if (!existsSync(presetPath)) return Result.fail(`File not found: ${presetPath}`);

  const parseResult = readJson(presetPath);
  if (parseResult.isFail) return Result.fail(`Cannot parse "${presetPath}": ${parseResult.error?.message ?? parseResult.error}`);

  const data = parseResult.value;
  if (!data.org_structure) return Result.fail(`"${presetPath}" is missing org_structure field.`);

  return generateOrgChart(data.org_structure);
}

// ── CLI is in bin/cli/visualizer.js ───────────────────────────────
