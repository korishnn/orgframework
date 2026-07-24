// tests/unit/reverse-org.test.js — Unit tests for designReverseOrg()
import { describe, it, expect } from 'vitest';
import { designReverseOrg } from '../../.claude/councilorg/reverse-org/designer.js';

describe('designReverseOrg()', () => {
  it('returns fail for empty array', () => {
    const r = designReverseOrg([]);
    expect(r.isFail).toBe(true);
  });

  it('returns fail for non-array input', () => {
    const r = designReverseOrg('not an array');
    expect(r.isFail).toBe(true);
  });

  it('designs a startup for a single founder', () => {
    const r = designReverseOrg([{ title: 'CEO / Founder', count: 1 }]);
    expect(r.isOk).toBe(true);
    expect(r.value.total_people).toBe(1);
    expect(r.value.stage).toBe('startup');
  });

  it('designs a scaleup for a small team of 13', () => {
    const people = [
      { title: 'CEO', count: 1 },
      { title: 'Backend Engineer', count: 5 },
      { title: 'Frontend Engineer', count: 3 },
      { title: 'Product Manager', count: 2 },
      { title: 'Sales Lead', count: 2 },
    ];
    const r = designReverseOrg(people);
    expect(r.isOk).toBe(true);
    expect(r.value.total_people).toBe(13);
    expect(r.value.stage).toBe('scaleup');
  });

  it('designs an enterprise for a large team of 88', () => {
    const people = [
      { title: 'CEO', count: 1 },
      { title: 'CTO', count: 1 },
      { title: 'VP Engineering', count: 1 },
      { title: 'Backend Engineer', count: 25 },
      { title: 'Frontend Engineer', count: 15 },
      { title: 'DevOps Engineer', count: 8 },
      { title: 'VP Sales', count: 1 },
      { title: 'Account Executive', count: 20 },
      { title: 'SDR', count: 10 },
      { title: 'CFO', count: 1 },
      { title: 'Controller', count: 1 },
      { title: 'Accountant', count: 4 },
    ];
    const r = designReverseOrg(people);
    expect(r.isOk).toBe(true);
    expect(r.value.stage).toBe('enterprise');
    expect(r.value.orgDesign.layers).toBe(4);
  });

  it('classifies Engineer as Engineering department', () => {
    const r = designReverseOrg([{ title: 'Platform Engineer', count: 3 }]);
    expect(r.isOk).toBe(true);
    const deptNames = r.value.orgDesign.departments.map(d => d.name);
    expect(deptNames).toContain('Engineering');
  });

  it('classifies Nurse as Healthcare department', () => {
    const r = designReverseOrg([{ title: 'Registered Nurse', count: 5 }]);
    expect(r.isOk).toBe(true);
    const deptNames = r.value.orgDesign.departments.map(d => d.name);
    expect(deptNames).toContain('Healthcare');
  });

  it('handles mixed roles', () => {
    const people = [
      { title: 'Teacher', count: 10 },
      { title: 'Principal', count: 1 },
      { title: 'Custodian', count: 3 },
    ];
    const r = designReverseOrg(people);
    expect(r.isOk).toBe(true);
  });
});
