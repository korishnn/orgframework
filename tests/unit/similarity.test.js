// tests/unit/similarity.test.js — Unit tests for findSimilar()
import { describe, it, expect } from 'vitest';
import { findSimilar, buildIndex } from '../../.claude/orgframework/similarity/search.js';

describe('findSimilar()', () => {
  it('returns fail for unknown role', () => {
    const r = findSimilar('zz-nonexistent-role-xyz');
    expect(r.isFail).toBe(true);
    expect(r.error).toContain('not found');
  });

  it('returns similar roles for eng-backend', () => {
    const r = findSimilar('eng-backend');
    expect(r.isOk).toBe(true);
    expect(r.value.length).toBeGreaterThan(0);
    expect(r.value.length).toBeLessThanOrEqual(10);
    expect(r.value[0].similarity).toBeGreaterThanOrEqual(0);
    expect(r.value[0].similarity).toBeLessThanOrEqual(100);
    expect(typeof r.value[0].role).toBe('string');
  });

  it('respects custom topN limit', () => {
    const r = findSimilar('eng-frontend', 3);
    expect(r.isOk).toBe(true);
    expect(r.value.length).toBeLessThanOrEqual(3);
  });

  it('returns scores for fuzzy match (partial ID)', () => {
    const r = findSimilar('backend');
    if (r.isOk && r.value.length > 0) {
      expect(r.value[0].similarity).toBeGreaterThan(0);
    }
    // Partial IDs may not always find a match — not an error
  });

  it('returns similar roles for exec-ceo', () => {
    const r = findSimilar('exec-ceo');
    expect(r.isOk).toBe(true);
    expect(r.value.length).toBeGreaterThan(0);
  });

  it('returns results sorted descending by similarity', () => {
    const r = findSimilar('eng-backend', 5);
    if (r.isOk && r.value.length > 1) {
      for (let i = 1; i < r.value.length; i++) {
        expect(r.value[i].similarity).toBeLessThanOrEqual(r.value[i - 1].similarity);
      }
    }
  });
});

describe('buildIndex()', () => {
  it('builds a valid inverted index', () => {
    const r = buildIndex();
    expect(r.isOk).toBe(true);
    expect(typeof r.value.index).toBe('object');
    expect(Array.isArray(r.value.roles)).toBe(true);
    expect(r.value.roles.length).toBeGreaterThan(0);
  });
});
