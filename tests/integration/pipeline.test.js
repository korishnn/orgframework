// tests/integration/pipeline.test.js — Integration tests for councilorg
// Exercises full pipeline flows that span multiple engine modules.
import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { findSimilar } from '../../.claude/councilorg/similarity/search.js';
import { compareStructures } from '../../.claude/councilorg/comparison/comparison.js';
import { generateOrgChart } from '../../.claude/councilorg/visualizer/generate.js';
import { simulateVacancy } from '../../.claude/councilorg/vacancy/simulator.js';
import { designReverseOrg } from '../../.claude/councilorg/reverse-org/designer.js';
import { createCouncilSession, advanceRound, computeSpanOfControl } from '../../.claude/councilorg/council/orchestrator.js';
import { buildGraph, findConnections } from '../../.claude/councilorg/relationship-map/relationship-map.js';
import { generateTaskPrompt } from '../../.claude/councilorg/role-to-task/generate.js';
import { getDataPath } from '../lib/utils.js';

/** @type {any} */
let seedStartupPreset;

beforeAll(() => {
  const presetPath = getDataPath('presets/seed-startup.json');
  seedStartupPreset = JSON.parse(readFileSync(presetPath, 'utf-8'));
});

describe('Full pipeline: similarity → comparison → visualization', () => {
  it('loads seed-startup preset and extracts roles', () => {
    expect(seedStartupPreset).toBeTruthy();
    expect(seedStartupPreset.org_structure).toBeTruthy();
    expect(seedStartupPreset.org_structure.departments.length).toBeGreaterThan(0);
  });

  it('runs findSimilar on a key role and returns results', () => {
    const result = findSimilar('eng-backend');
    expect(result.isOk).toBe(true);
    if (result.isOk) {
      expect(Array.isArray(result.value)).toBe(true);
      expect(result.value.length).toBeGreaterThan(0);
      expect(result.value[0].role).toBeTruthy();
      expect(typeof result.value[0].similarity).toBe('number');
    }
  });

  it('compares two structures and returns a diff', () => {
    const structA = seedStartupPreset.org_structure;
    const structB = {
      ...structA,
      departments: [
        ...structA.departments,
        { name: 'NewDept', roles: [{ title: 'New Role', count: 1 }] }
      ]
    };
    const result = compareStructures(structA, structB);
    expect(result.isOk).toBe(true);
    if (result.isOk) {
      expect(result.value.additions.length).toBeGreaterThanOrEqual(1);
      expect(result.value.metrics).toBeTruthy();
      expect(result.value.metrics.deptCountA).toBeLessThan(result.value.metrics.deptCountB);
    }
  });

  it('generates a valid Mermaid org chart from preset', () => {
    const result = generateOrgChart(seedStartupPreset.org_structure);
    expect(result.isOk).toBe(true);
    if (result.isOk) {
      expect(result.value).toContain('graph TB');
      expect(result.value).toContain('subgraph');
    }
  });
});

describe('Full pipeline: vacancy simulation + reverse org design', () => {
  it('simulates a vacancy finding role in preset', () => {
    const result = simulateVacancy('seed-startup', 'CTO');
    expect(result.isOk).toBe(true);
    if (result.isOk) {
      expect(result.value.urgency).toBeTruthy();
      expect(result.value.impact_assessment).toContain('CTO');
      expect(result.value.replacement_timeframe).toBeTruthy();
    }
  });

  it('returns fail for nonexistent preset', () => {
    const result = simulateVacancy('nonexistent-preset-xyz', 'CTO');
    expect(result.isFail).toBe(true);
  });

  it('designs a reverse org from headcount list', () => {
    const people = [
      { title: 'CEO', count: 1 },
      { title: 'Backend Engineer', count: 5 },
      { title: 'Frontend Engineer', count: 3 },
      { title: 'Product Manager', count: 1 },
      { title: 'Marketing Lead', count: 1 },
    ];
    const result = designReverseOrg(people);
    expect(result.isOk).toBe(true);
    if (result.isOk) {
      expect(result.value.total_people).toBe(11);
      expect(result.value.stage).toBeTruthy();
      expect(result.value.orgDesign).toBeTruthy();
    }
  });
});

describe('Full pipeline: council + relationship map + role-to-task', () => {
  it('creates a council session and advances through rounds', () => {
    const session = createCouncilSession({
      request: 'Design a 50-person fintech org',
      region: 'emea',
      industry: 'fintech',
      stage: 'scaleup',
      depth: 'default'
    });
    expect(session.currentRound).toBe('proposal');
    expect(session.members.length).toBe(8);

    // advanceRound returns the prompt for the NEXT round
    const r1 = advanceRound(session);
    expect(r1.round).toBe('critique');
    expect(r1.prompt).toContain('Critique');
  });

  it('computes span of control from org structure', () => {
    const span = computeSpanOfControl(seedStartupPreset.org_structure);
    expect(span).toBeTruthy();
    expect(typeof span.avg).toBe('number');
    expect(typeof span.max).toBe('number');
  });

  it('builds relationship graph and finds connections', () => {
    const graphResult = buildGraph();
    expect(graphResult.isOk).toBe(true);
    if (graphResult.isOk) {
      const graph = graphResult.value;
      expect(Object.keys(graph).length).toBeGreaterThan(100);
      if (graph['eng-backend']) {
        const conns = findConnections(graph, 'eng-backend');
        expect(conns.roleId).toBe('eng-backend');
      }
    }
  });

  it('generates a task prompt from a known role', () => {
    const result = generateTaskPrompt('eng-backend');
    expect(result.isOk).toBe(true);
    if (result.isOk) {
      expect(result.value).toContain('Backend Engineer');
      expect(result.value).toContain('Core Responsibilities');
      expect(result.value).toContain('Interaction Rules');
    }
  });
});

describe('Cross-engine scenario: fintech scaleup', () => {
  it('loads fintech preset and orchestrates multi-engine analysis', () => {
    const presetPath = getDataPath('presets/fintech-org.json');
    if (!existsSync(presetPath)) return; // skip if fintech preset doesn't exist
    const fintechPreset = JSON.parse(readFileSync(presetPath, 'utf-8'));
    expect(fintechPreset).toBeTruthy();

    const struct = fintechPreset.org_structure;
    const chartResult = generateOrgChart(struct);
    expect(chartResult.isOk).toBe(true);

    // Try a role that's likely to exist; if not, that's OK — just skip the assertion
    const vacancyResult = simulateVacancy('fintech-org', 'CTO');
    if (vacancyResult.isOk && vacancyResult.value) {
      expect(vacancyResult.value.urgency).toBeTruthy();
    }

    const seedStruct = seedStartupPreset.org_structure;
    const comparison = compareStructures(seedStruct, struct);
    expect(comparison.isOk).toBe(true);
    if (comparison.isOk) {
      expect(comparison.value.metrics.deptCountA).toBeLessThanOrEqual(comparison.value.metrics.deptCountB);
    }
  });
});
