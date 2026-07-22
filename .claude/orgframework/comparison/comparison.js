#!/usr/bin/env node
// comparison.js — Compare two org structures and output structured diff
// Usage: node .claude/orgframework/comparison/comparison.js <preset-a.json> <preset-b.json>

import { Result, ErrorCode } from '../lib/errors.js';

/**
 * Count total roles across departments.
 * @param {Array<any>} depts
 * @returns {number}
 */
function countRoles(depts) {
  return depts.reduce((s, d) => s + (d.roles?.length || 0), 0);
}

/**
 * Resolve a role's effective headcount, handling range strings like "3-5".
 * @param {{ count?: string | number }} role
 * @returns {number}
 */
function resolveRoleCount(role) {
  const c = role.count;
  if (typeof c === 'string') {
    const parts = c.split('-').map(Number);
    return Math.round((parts[0] + (parts[1] || parts[0])) / 2);
  }
  return c || 1;
}

/**
 * Count total headcount across departments, handling range strings like "3-5".
 * @param {Array<any>} depts
 * @returns {number}
 */
function countHeadcount(depts) {
  return depts.reduce((/** @type {number} */ s, /** @type {any} */ d) => {
    return s + (d.roles?.reduce((/** @type {number} */ rs, /** @type {any} */ r) => rs + resolveRoleCount(r), 0) || 0);
  }, 0);
}

/**
 * Compute the maximum number of unique organizational layers across departments.
 * @param {Array<any>} depts
 * @returns {number}
 */
function maxLayers(depts) {
  if (depts.length === 0) return 0;
  return Math.max(...depts.map(/** @param {any} d */ d => {
    const levels = d.roles?.map(/** @param {any} r */ r => r.level || '').filter(Boolean) || [];
    return new Set(levels).size;
  }));
}

/**
 * Build a per-department diff map comparing two org structures.
 * @param {Array<any>} deptsA
 * @param {Array<any>} deptsB
 * @returns {Map<string, { sideA?: { roles: number, headcount: number }, sideB?: { roles: number, headcount: number } }>}
 */
function buildDeptDiff(deptsA, deptsB) {
  /** @type {Map<string, any>} */
  const deptMap = new Map();
  for (const dept of deptsA) {
    deptMap.set(dept.name, { sideA: { roles: dept.roles?.length || 0, headcount: dept.roles?.reduce((/** @type {number} */ s, /** @type {any} */ r) => s + resolveRoleCount(r), 0) || 0 } });
  }
  for (const dept of deptsB) {
    const existing = deptMap.get(dept.name);
    if (existing) {
      deptMap.set(dept.name, { ...existing, sideB: { roles: dept.roles?.length || 0, headcount: dept.roles?.reduce((/** @type {number} */ s, /** @type {any} */ r) => s + resolveRoleCount(r), 0) || 0 } });
    } else {
      deptMap.set(dept.name, { sideB: { roles: dept.roles?.length || 0, headcount: dept.roles?.reduce((/** @type {number} */ s, /** @type {any} */ r) => s + resolveRoleCount(r), 0) || 0 } });
    }
  }
  return deptMap;
}

/**
 * Validate the structure of a department/roles object for required fields.
 * @param {any} struct - The org structure to validate
 * @param {string} label - Label for error messages
 * @returns {Result<true, string>}
 */
function validateOrgStructure(struct, label) {
  if (!struct || typeof struct !== 'object') {
    return Result.failWithCode(ErrorCode.VALIDATION, `${label} must be an object with a departments array.`);
  }
  if (!Array.isArray(struct.departments)) {
    return Result.failWithCode(ErrorCode.VALIDATION, `${label}.departments must be an array.`);
  }
  for (let i = 0; i < struct.departments.length; i++) {
    const dept = struct.departments[i];
    if (!dept || typeof dept !== 'object') {
      return Result.failWithCode(ErrorCode.VALIDATION, `${label}.departments[${i}] must be an object.`);
    }
    if (!dept.name || typeof dept.name !== 'string') {
      return Result.failWithCode(ErrorCode.VALIDATION, `${label}.departments[${i}] must have a string "name".`);
    }
    if (dept.roles !== undefined && !Array.isArray(dept.roles)) {
      return Result.failWithCode(ErrorCode.VALIDATION, `${label}.departments[${i}].roles must be an array.`);
    }
    if (dept.roles) {
      for (let j = 0; j < dept.roles.length; j++) {
        const role = dept.roles[j];
        if (!role || typeof role !== 'object') {
          return Result.failWithCode(ErrorCode.VALIDATION, `${label}.departments[${i}].roles[${j}] must be an object.`);
        }
        if (!role.title || typeof role.title !== 'string') {
          return Result.failWithCode(ErrorCode.VALIDATION, `${label}.departments[${i}].roles[${j}] must have a string "title".`);
        }
      }
    }
  }
  return Result.ok(true);
}

/**
 * Compare two org structures and output a structured diff with metrics.
 * @param {{ departments: Array<any> }} structA - First org structure (with departments array)
 * @param {{ departments: Array<any> }} structB - Second org structure (with departments array)
 * @returns {Result<{ metrics: Object, departmentDiff: Array<any>, additions: Array<any>, removals: Array<any> }, string>}
 */
export function compareStructures(structA, structB) {
  // Validate inputs
  const validA = validateOrgStructure(structA, 'structA');
  if (validA.isFail) return /** @type {Result<any, string>} */ (validA);
  const validB = validateOrgStructure(structB, 'structB');
  if (validB.isFail) return /** @type {Result<any, string>} */ (validB);

  const deptsA = structA.departments || [];
  const deptsB = structB.departments || [];

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

  // Build department-level diff
  const deptNamesA = new Set(deptsA.map(d => d.name));
  const deptNamesB = new Set(deptsB.map(d => d.name));
  const additions = deptsB.filter(d => !deptNamesA.has(d.name)).map(d => ({ name: d.name, roles: d.roles?.length || 0 }));
  const removals = deptsA.filter(d => !deptNamesB.has(d.name)).map(d => ({ name: d.name, roles: d.roles?.length || 0 }));

  const deptMap = buildDeptDiff(deptsA, deptsB);

  return Result.ok({ metrics, departmentDiff: [...deptMap.entries()], additions, removals });
}

// ── CLI is in bin/cli/comparison.js ─────────────────────────────────
