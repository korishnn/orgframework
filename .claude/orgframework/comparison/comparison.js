#!/usr/bin/env node
// comparison.js — Compare two org structures and output structured diff
// Usage: node bin/comparison.js <preset-a.json> <preset-b.json>

import { readFileSync } from 'fs';

export function compareStructures(structA, structB) {
  const deptsA = structA.departments || [];
  const deptsB = structB.departments || [];

  const countRoles = (depts) => depts.reduce((s, d) => s + (d.roles?.length || 0), 0);
  const countHeadcount = (depts) => depts.reduce((s, d) => {
    return s + (d.roles?.reduce((rs, r) => {
      const c = r.count;
      if (typeof c === 'string') {
        const parts = c.split('-').map(Number);
        return rs + Math.round((parts[0] + (parts[1] || parts[0])) / 2);
      }
      return rs + (c || 1);
    }, 0) || 0);
  }, 0);
  const maxLayers = (depts) => Math.max(...depts.map(d => {
    const levels = d.roles?.map(r => r.level || '').filter(Boolean) || [];
    return levels.length;
  }), 0);

  const metrics = {
    headcountA: countHeadcount(deptsA),
    headcountB: countHeadcount(deptsB),
    deptCountA: deptsA.length,
    deptCountB: deptsB.length,
    roleCountA: countRoles(deptsA),
    roleCountB: countRoles(deptsB),
    layersA: maxLayers(deptsA),
    layersB: maxLayers(deptsB),
  };

  const deptMap = new Map();
  for (const d of deptsA) deptMap.set(d.name, { ...d, side: 'A' });
  for (const d of deptsB) {
    if (deptMap.has(d.name)) deptMap.set(d.name, { ...deptMap.get(d.name), sideB: d });
    else deptMap.set(d.name, { side: 'B', ...d });
  }

  return { metrics, departmentDiff: [...deptMap.entries()] };
}

if (process.argv[1]?.includes('comparison')) {
  const [pathA, pathB] = process.argv.slice(2);
  if (!pathA || !pathB) {
    console.error('Usage: node bin/comparison.js <preset-a.json> <preset-b.json>');
    process.exit(1);
  }
  const structA = JSON.parse(readFileSync(pathA, 'utf-8')).org_structure;
  const structB = JSON.parse(readFileSync(pathB, 'utf-8')).org_structure;
  const result = compareStructures(structA, structB);
  console.log(JSON.stringify(result, null, 2));
}
