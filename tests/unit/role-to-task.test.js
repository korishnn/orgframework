// tests/unit/role-to-task.test.js — Unit tests for role-to-task/generate.js
import { describe, it, expect } from 'vitest';
import { generateTaskPrompt } from '../../.claude/orgframework/role-to-task/generate.js';

describe('generateTaskPrompt()', () => {
  it('returns fail for nonexistent role', () => {
    const r = generateTaskPrompt('role-that-does-not-exist-xyz');
    expect(r.isFail).toBe(true);
    expect(r.error).toContain('not found');
  });

  it('returns ok for a known role', () => {
    const r = generateTaskPrompt('eng-backend');
    expect(r.isOk).toBe(true);
    expect(r.value).toContain('Role:');
    expect(r.value).toContain('Backend Engineer');
  });

  it('generates brief prompt with --brief', () => {
    const r = generateTaskPrompt('eng-backend', { brief: true });
    expect(r.isOk).toBe(true);
    expect(r.value).not.toContain('## Identity');
    expect(r.value).not.toContain('## Core Responsibilities');
  });

  it('finds role via fuzzy match', () => {
    const r = generateTaskPrompt('backend');
    expect(r.isOk).toBe(true);
    expect(r.value).toBeTruthy();
  });

  it('returns structured prompt with responsibilities and competencies', () => {
    const r = generateTaskPrompt('eng-backend');
    expect(r.isOk).toBe(true);
    if (r.isOk) {
      expect(r.value).toContain('## Core Responsibilities');
      expect(r.value).toContain('## Expertise');
      expect(r.value).toContain('## Interaction Rules');
    }
  });

  it('handles empty input gracefully', () => {
    const r = generateTaskPrompt('');
    // Empty input may fuzzy match a role; should not crash
    expect(r.isOk || r.isFail).toBe(true);
  });
});
