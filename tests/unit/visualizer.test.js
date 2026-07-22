// tests/unit/visualizer.test.js — Unit tests for visualizer/generate.js
import { describe, it, expect } from 'vitest';
import { generateOrgChart, generateFromPreset } from '../../.claude/orgframework/visualizer/generate.js';

describe('generateOrgChart()', () => {
  it('returns fail for null input', () => {
    const r = generateOrgChart(null);
    expect(r.isFail).toBe(true);
  });

  it('returns fail for missing departments', () => {
    const r = generateOrgChart({});
    expect(r.isFail).toBe(true);
  });

  it('returns fail for empty departments', () => {
    const r = generateOrgChart({ departments: [] });
    expect(r.isFail).toBe(true);
  });

  it('generates Mermaid chart for valid structure', () => {
    const org = {
      departments: [
        {
          name: 'Engineering',
          roles: [
            { title: 'CTO', count: 1 },
            { title: 'Backend Engineer', count: 5 },
          ]
        }
      ]
    };
    const r = generateOrgChart(org);
    expect(r.isOk).toBe(true);
    expect(r.value).toContain('graph TB');
    expect(r.value).toContain('Engineering');
    expect(r.value).toContain('CTO');
  });

  it('renders cross-department relationships', () => {
    const org = {
      departments: [
        {
          name: 'Engineering',
          roles: [
            { title: 'CTO', count: 1 },
            { title: 'Backend Engineer', count: 5 },
          ]
        }
      ],
      relationships: ['Backend Engineer → CTO']
    };
    const r = generateOrgChart(org);
    expect(r.isOk).toBe(true);
    expect(r.value).toContain('-.->');
  });

  it('handles reports_to field for roles', () => {
    const org = {
      departments: [
        {
          name: 'Engineering',
          roles: [
            { title: 'CTO', count: 1, reports_to: 'CEO' },
            { title: 'Backend Engineer', count: 5, reports_to: 'CTO' },
          ]
        }
      ]
    };
    const r = generateOrgChart(org);
    expect(r.isOk).toBe(true);
  });

  it('skips roles without title', () => {
    const org = {
      departments: [
        {
          name: 'Test',
          roles: [
            { title: 'Has Title', count: 1 },
            { title: '', count: 1 },
          ]
        }
      ]
    };
    const r = generateOrgChart(org);
    expect(r.isOk).toBe(true);
  });
});

describe('generateFromPreset()', () => {
  it('returns fail for missing path', () => {
    const r = generateFromPreset(null);
    expect(r.isFail).toBe(true);
  });

  it('returns fail for nonexistent file', () => {
    const r = generateFromPreset('/nonexistent/preset.json');
    expect(r.isFail).toBe(true);
  });
});
