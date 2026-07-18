#!/usr/bin/env node
// org-chart.mermaid.js — Generate Mermaid.js org chart diagrams from any structure
// Usage: node bin/org-chart.mermaid.js < preset | custom >
// Or import into the SKILL for auto-generation

export function generateOrgChart(orgStructure) {
  const { departments, relationships } = orgStructure;
  let mermaid = ['graph TB;'];

  // Define subgraphs per department
  for (const dept of departments) {
    if (dept.roles.length > 1) {
      mermaid.push(`  subgraph ${dept.name}[${dept.name}]`);
    }

    for (const role of dept.roles) {
      const id = role.title.replace(/[^a-zA-Z0-9]/g, '_');
      const label = `${role.title} (${role.count})`;
      mermaid.push(`    ${id}["${label}"];`);

      if (role.reports_to && role.reports_to !== 'Department Head') {
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
  if (relationships) {
    for (const rel of relationships) {
      const [from, to] = rel.split('→').map(s => s.trim());
      const fromId = from.replace(/[^a-zA-Z0-9]/g, '_');
      const toId = to.replace(/[^a-zA-Z0-9]/g, '_');
      mermaid.push(`  ${fromId} -.-> ${toId};`);
    }
  }

  return mermaid.join('\n');
}

// Example: Generate from a preset file
export function generateFromPreset(presetPath) {
  const data = JSON.parse(require('fs').readFileSync(presetPath, 'utf-8'));
  return generateOrgChart(data.org_structure);
}

// CLI
if (process.argv[1]?.includes('org-chart')) {
  const fs = require('fs');
  const path = process.argv[2];
  if (path && fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    console.log(generateOrgChart(data.org_structure));
  } else {
    console.error('Usage: node bin/org-chart.mermaid.js <preset-json-path>');
    process.exit(1);
  }
}
