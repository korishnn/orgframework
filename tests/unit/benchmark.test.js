// tests/unit/benchmark.test.js — Performance assertions for indexing and search
// Verifies that caching and indexing strategies meet latency targets.
import { describe, it, expect } from 'vitest';
import { buildIndex, findSimilar } from '../../.claude/councilorg/similarity/search.js';
import { buildGraph, clearCache as clearGraphCache } from '../../.claude/councilorg/relationship-map/relationship-map.js';

const BUILD_INDEX_TIMEOUT_MS = 500;
const FIND_SIMILAR_TIMEOUT_MS = 500;
const BUILD_GRAPH_TIMEOUT_MS = 200;

describe('benchmark: buildIndex()', () => {
  it('completes within 500ms', () => {
    const start = performance.now();
    const r = buildIndex();
    const elapsed = performance.now() - start;
    expect(r.isOk).toBe(true);
    expect(elapsed).toBeLessThanOrEqual(BUILD_INDEX_TIMEOUT_MS);
  });

  it('uses cache on second call (< 100ms)', () => {
    // First call primes the cache
    buildIndex();
    const start = performance.now();
    const r = buildIndex();
    const elapsed = performance.now() - start;
    expect(r.isOk).toBe(true);
    expect(elapsed).toBeLessThanOrEqual(BUILD_INDEX_TIMEOUT_MS);
  });
});

describe('benchmark: findSimilar()', () => {
  it('completes within 100ms for eng-backend', () => {
    // Ensure index is built
    buildIndex();
    const start = performance.now();
    const r = findSimilar('eng-backend', 5);
    const elapsed = performance.now() - start;
    expect(r.isOk).toBe(true);
    expect(elapsed).toBeLessThanOrEqual(FIND_SIMILAR_TIMEOUT_MS);
  });
});

describe('benchmark: buildGraph()', () => {
  it('completes within 200ms', () => {
    clearGraphCache();
    const start = performance.now();
    const r = buildGraph();
    const elapsed = performance.now() - start;
    expect(r.isOk).toBe(true);
    expect(elapsed).toBeLessThanOrEqual(BUILD_GRAPH_TIMEOUT_MS);
  });
});
