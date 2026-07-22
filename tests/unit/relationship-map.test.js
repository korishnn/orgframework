// tests/unit/relationship-map.test.js — Unit tests for relationship-map.js
import { describe, it, expect } from 'vitest';
import { buildGraph, findConnections, findMostConnected } from '../../.claude/orgframework/relationship-map/relationship-map.js';

describe('buildGraph()', () => {
  it('builds a graph with role entries', () => {
    const r = buildGraph();
    expect(r.isOk).toBe(true);
    expect(typeof r.value).toBe('object');
    expect(Object.keys(r.value).length).toBeGreaterThan(100); // many roles
  });
});

describe('findConnections()', () => {
  it('finds connections for a known role', () => {
    const g = buildGraph();
    expect(g.isOk).toBe(true);
    const result = findConnections(g.value, 'exec-ceo');
    expect(result.roleId).toBe('exec-ceo');
    expect(Array.isArray(result.direct)).toBe(true);
    expect(Array.isArray(result.reverse)).toBe(true);
  });
});

describe('findMostConnected()', () => {
  it('returns top connected roles sorted by total', () => {
    const g = buildGraph();
    expect(g.isOk).toBe(true);
    const top = findMostConnected(g.value, 10);
    expect(top.length).toBeLessThanOrEqual(10);
    if (top.length > 1) {
      expect(top[0].total).toBeGreaterThanOrEqual(top[1].total);
    }
  });

  it('each entry has expected fields', () => {
    const g = buildGraph();
    expect(g.isOk).toBe(true);
    const top = findMostConnected(g.value, 5);
    for (const entry of top) {
      expect(typeof entry.role).toBe('string');
      expect(typeof entry.outbound).toBe('number');
      expect(typeof entry.inbound).toBe('number');
      expect(typeof entry.total).toBe('number');
    }
  });
});
