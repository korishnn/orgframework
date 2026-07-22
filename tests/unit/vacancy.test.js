// tests/unit/vacancy.test.js — Unit tests for simulateVacancy()
import { describe, it, expect } from 'vitest';
import { simulateVacancy } from '../../.claude/orgframework/vacancy/simulator.js';

describe('simulateVacancy()', () => {
  it('returns fail for missing arguments', () => {
    const r = simulateVacancy();
    expect(r.isFail).toBe(true);
    expect(r.error).toContain('required');
  });

  it('returns fail for missing role title', () => {
    const r = simulateVacancy('series-b-saas');
    expect(r.isFail).toBe(true);
    expect(r.error).toContain('required');
  });

  it('returns fail for unknown preset', () => {
    const r = simulateVacancy('nonexistent-preset', 'CEO');
    expect(r.isFail).toBe(true);
    expect(r.error).toContain('not found');
  });

  it('returns fail for unknown role in known preset', () => {
    const r = simulateVacancy('seed-startup', 'Nuclear Physicist');
    expect(r.isFail).toBe(true);
    expect(r.error).toContain('not found');
  });

  it('returns vacancy details for Head of People in series-b-saas', () => {
    const r = simulateVacancy('series-b-saas', 'Head of People');
    expect(r.isOk).toBe(true);
    expect(r.value).toBeDefined();
    expect(typeof r.value.urgency).toBe('string');
    expect(Array.isArray(r.value.risks) && r.value.risks.length > 0).toBe(true);
    expect(typeof r.value.recommendation).toBe('string');
    expect(typeof r.value.replacement_timeframe).toBe('string');
  });

  it('returns vacancy details for VP of Engineering in series-b-saas', () => {
    const r = simulateVacancy('series-b-saas', 'VP of Engineering');
    expect(r.isOk).toBe(true);
    expect(typeof r.value.urgency).toBe('string');
    expect(typeof r.value.dept).toBe('string');
  });

  it('returns vacancy details for Engineer in seed-startup', () => {
    const r = simulateVacancy('seed-startup', 'Engineer');
    expect(r.isOk).toBe(true);
    expect(typeof r.value.urgency).toBe('string');
    expect(typeof r.value.coverage).toBe('object');
    expect(typeof r.value.recommendation).toBe('string');
  });

  it('finds CEO role via fuzzy match in hospital-system', () => {
    const r = simulateVacancy('hospital-system', 'Chief Executive Officer');
    expect(r.isOk).toBe(true);
    expect(typeof r.value.urgency).toBe('string');
    expect(r.value.role).toContain('CEO');
  });

  it('returns details for Marketing Lead in seed-startup', () => {
    const r = simulateVacancy('seed-startup', 'Marketing Lead');
    expect(r.isOk).toBe(true);
    expect(typeof r.value.role).toBe('string');
    expect(typeof r.value.impact_assessment).toBe('string');
  });
});
