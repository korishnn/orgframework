// tests/unit/council.test.js — Unit tests for council/orchestrator.js
import { describe, it, expect } from 'vitest';
import { createCouncilSession, advanceRound, recordProposal, recordCritique, recordFinalPosition, generateDivergenceNote, COUNCIL_MEMBERS } from '../../.claude/councilorg/council/orchestrator.js';

describe('COUNCIL_MEMBERS', () => {
  it('has exactly 10 members', () => {
    expect(COUNCIL_MEMBERS).toHaveLength(10);
  });

  it('each member has required fields', () => {
    for (const m of COUNCIL_MEMBERS) {
      expect(m.id).toBeDefined();
      expect(m.name).toBeDefined();
      expect(m.signature).toBeDefined();
      expect(m.focus).toBeDefined();
      expect(m.bias).toBeDefined();
      expect(m.prompt).toBeDefined();
    }
  });
});

describe('createCouncilSession()', () => {
  it('creates session with default depth', () => {
    const session = createCouncilSession({ request: 'test' });
    expect(session.context.request).toBe('test');
    expect(session.context.depth).toBe('default');
    expect(session.members).toHaveLength(10);
    expect(session.currentRound).toBe('proposal');
    expect(session.startedAt).toBeDefined();
  });

  it('fills in default values for missing context', () => {
    const session = createCouncilSession({});
    expect(session.context.request).toBe('');
    expect(session.context.region).toBe('unknown');
    expect(session.context.industry).toBe('unknown');
    expect(session.context.stage).toBe('unknown');
  });
});

describe('advanceRound()', () => {
  it('advances from proposal to critique', () => {
    const session = createCouncilSession({ request: 'test' });
    const result = advanceRound(session);
    expect(result.round).toBe('critique');
    expect(result.prompt).toContain('Critique Round');
  });

  it('advances from critique to synthesis', () => {
    const session = createCouncilSession({ request: 'test', depth: 'deep' });
    // Skip to critique
    advanceRound(session);
    const result = advanceRound(session);
    expect(result.round).toBe('synthesis');
    expect(result.prompt).toContain('Synthesis');
  });

  it('reaches complete on third advance', () => {
    const session = createCouncilSession({ request: 'test' });
    advanceRound(session); // proposal → critique
    advanceRound(session); // critique → synthesis
    const result = advanceRound(session); // synthesis → complete
    expect(result.round).toBe('complete');
    expect(session.completedAt).toBeDefined();
  });
});

describe('recordProposal()', () => {
  it('records proposal for a valid member', () => {
    const session = createCouncilSession({ request: 'test' });
    recordProposal(session, 'strategist', 'We need a flat structure');
    expect(session.members.find(m => m.id === 'strategist').proposal).toBe('We need a flat structure');
  });

  it('ignores invalid member id', () => {
    const session = createCouncilSession({ request: 'test' });
    recordProposal(session, 'nonexistent', 'test');
    // No error — just no-op
    expect(session.members.find(m => m.id === 'strategist').proposal).toBeNull();
  });
});

describe('recordCritique()', () => {
  it('appends critique for a valid member', () => {
    const session = createCouncilSession({ request: 'test' });
    recordCritique(session, 'operator', 'The strategist ignores execution');
    expect(session.members.find(m => m.id === 'operator').critiques).toHaveLength(1);
    expect(session.members.find(m => m.id === 'operator').critiques[0]).toBe('The strategist ignores execution');
  });
});

describe('recordFinalPosition()', () => {
  it('records final position', () => {
    const session = createCouncilSession({ request: 'test' });
    recordFinalPosition(session, 'pessimist', 'This will break', true);
    const member = session.members.find(m => m.id === 'pessimist');
    expect(member.final_position).toBe('This will break');
    expect(session.divergence).toHaveLength(1);
    expect(session.divergence[0].type).toBe('dissent');
  });

  it('non-dissenting position does not add divergence', () => {
    const session = createCouncilSession({ request: 'test' });
    recordFinalPosition(session, 'strategist', 'I agree');
    expect(session.divergence).toHaveLength(0);
  });
});

describe('generateDivergenceNote()', () => {
  it('generates divergence note with default depth', () => {
    const session = createCouncilSession({ request: 'test' });
    const note = generateDivergenceNote(session);
    expect(note.council_members).toBe(10);
    expect(note.dissenting_opinions).toBe(0);
    expect(note.assumptions).toBeDefined();
    expect(note.what_would_change).toBeDefined();
  });

  it('shows correct depth label for fast mode', () => {
    const session = createCouncilSession({ request: 'test', depth: 'fast' });
    const note = generateDivergenceNote(session);
    expect(note.depth).toContain('1-round');
  });
});
