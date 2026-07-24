// tests/unit/comparison.test.js — Unit tests for compareStructures()
import { describe, it, expect } from 'vitest';
import { compareStructures } from '../../.claude/councilorg/comparison/comparison.js';

const smallOrg = {
  departments: [
    {
      name: 'Engineering',
      roles: [
        { title: 'CTO', count: 1, level: 'Head' },
        { title: 'Backend Engineer', count: 5, level: 'IC' },
        { title: 'Frontend Engineer', count: 3, level: 'IC' },
      ]
    },
    {
      name: 'Sales',
      roles: [
        { title: 'VP Sales', count: 1, level: 'Head' },
        { title: 'Account Executive', count: 4, level: 'IC' },
      ]
    }
  ]
};

const expandedOrg = {
  departments: [
    {
      name: 'Engineering',
      roles: [
        { title: 'CTO', count: 1, level: 'Head' },
        { title: 'Backend Engineer', count: 8, level: 'IC' },
        { title: 'Frontend Engineer', count: 5, level: 'IC' },
        { title: 'DevOps Engineer', count: 2, level: 'IC' },
      ]
    },
    {
      name: 'Sales',
      roles: [
        { title: 'VP Sales', count: 1, level: 'Head' },
        { title: 'Account Executive', count: 6, level: 'IC' },
        { title: 'SDR', count: 3, level: 'IC' },
      ]
    },
    {
      name: 'Marketing',
      roles: [
        { title: 'CMO', count: 1, level: 'Head' },
        { title: 'Content Writer', count: 2, level: 'IC' },
      ]
    }
  ]
};

describe('compareStructures()', () => {
  it('returns fail for null inputs', () => {
    const r = compareStructures(null, null);
    expect(r.isFail).toBe(true);
  });

  it('returns fail for non-object structA', () => {
    const r = compareStructures('string', { departments: [] });
    expect(r.isFail).toBe(true);
  });

  it('handles empty structures', () => {
    const r = compareStructures({ departments: [] }, { departments: [] });
    expect(r.isOk).toBe(true);
    expect(r.value.metrics.deptCountA).toBe(0);
    expect(r.value.metrics.deptCountB).toBe(0);
    expect(r.value.additions.length).toBe(0);
    expect(r.value.removals.length).toBe(0);
  });

  it('handles identical structures', () => {
    const r = compareStructures(smallOrg, smallOrg);
    expect(r.isOk).toBe(true);
    expect(r.value.additions.length).toBe(0);
    expect(r.value.removals.length).toBe(0);
    expect(r.value.metrics.deptCountA).toBe(r.value.metrics.deptCountB);
  });

  it('detects additions in expanded structure', () => {
    const r = compareStructures(smallOrg, expandedOrg);
    expect(r.isOk).toBe(true);
    expect(r.value.additions.length).toBeGreaterThanOrEqual(1);
    expect(r.value.metrics.deptCountB).toBeGreaterThan(r.value.metrics.deptCountA);
    expect(r.value.metrics.roleCountB).toBeGreaterThan(r.value.metrics.roleCountA);
    expect(r.value.metrics.headcountB).toBeGreaterThan(r.value.metrics.headcountA);
  });

  it('detects removals in shrunk structure', () => {
    const r = compareStructures(expandedOrg, smallOrg);
    expect(r.isOk).toBe(true);
    expect(r.value.removals.length).toBeGreaterThanOrEqual(1);
    expect(r.value.metrics.deptCountA).toBeGreaterThan(r.value.metrics.deptCountB);
  });

  it('calculates correct metrics for smallOrg', () => {
    const r = compareStructures(smallOrg, smallOrg);
    expect(r.isOk).toBe(true);
    expect(r.value.metrics.roleCountA).toBe(5);
    expect(r.value.metrics.deptCountA).toBe(2);
    // headcount: 1 + 5 + 3 + 1 + 4 = 14
    expect(r.value.metrics.headcountA).toBe(14);
  });

  it('builds department diff entries', () => {
    const r = compareStructures(smallOrg, expandedOrg);
    expect(r.isOk).toBe(true);
    expect(r.value.departmentDiff.length).toBeGreaterThanOrEqual(2);
    const engEntry = r.value.departmentDiff.find(([name]) => name === 'Engineering');
    expect(engEntry).toBeDefined();
  });

  it('calculates maxLayers from unique role levels', () => {
    // smallOrg has 2 unique levels (Head, IC) per department → maxLayers = 2
    const r = compareStructures(smallOrg, smallOrg);
    expect(r.isOk).toBe(true);
    expect(r.value.metrics.layersA).toBe(2);
    expect(r.value.metrics.layersB).toBe(2);
  });

  it('handles deeper org structures with more layers', () => {
    const deepOrg = {
      departments: [
        {
          name: 'Engineering',
          roles: [
            { title: 'CTO', count: 1, level: 'executive' },
            { title: 'VP Engineering', count: 1, level: 'vp' },
            { title: 'Engineering Manager', count: 2, level: 'manager' },
            { title: 'Senior Backend', count: 3, level: 'senior' },
            { title: 'Backend Engineer', count: 5, level: 'ic' },
            { title: 'Intern', count: 1, level: 'entry' },
          ]
        },
        {
          name: 'Marketing',
          roles: [
            { title: 'CMO', count: 1, level: 'executive' },
            { title: 'Content Writer', count: 2, level: 'ic' },
          ]
        }
      ]
    };
    const r = compareStructures(smallOrg, deepOrg);
    expect(r.isOk).toBe(true);
    // Engineering has 6 unique levels → maxLayers = 6
    expect(r.value.metrics.layersA).toBe(2);
    expect(r.value.metrics.layersB).toBe(6);
  });
});
