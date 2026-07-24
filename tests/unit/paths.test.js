// tests/unit/paths.test.js — Unit tests for lib/paths.js
import { describe, it, expect } from 'vitest';
import { getOrgRoot, getDataPath, getStylesDir, getPresetsDir, getDefinitionsDir, getDefinitionsPath, getProjectRoot } from '../../.claude/councilorg/lib/paths.js';

describe('paths', () => {
  it('getOrgRoot() returns absolute path ending with councilorg', () => {
    const root = getOrgRoot();
    expect(root).toContain('councilorg');
    expect(root).toMatch(/^\//); // absolute path
  });

  it('getDataPath() joins subpath onto org root', () => {
    const dataPath = getDataPath('styles');
    expect(dataPath).toContain('councilorg');
    expect(dataPath).toMatch(/styles$/);
  });

  it('getStylesDir() returns path ending with styles', () => {
    expect(getStylesDir()).toMatch(/styles$/);
  });

  it('getPresetsDir() returns path ending with presets', () => {
    expect(getPresetsDir()).toMatch(/presets$/);
  });

  it('getDefinitionsDir() returns path ending with definitions', () => {
    expect(getDefinitionsDir()).toMatch(/definitions$/);
  });

  it('getDefinitionsPath() returns path to definitions.json', () => {
    expect(getDefinitionsPath()).toMatch(/definitions\.json$/);
  });

  it('getProjectRoot() returns path two levels above lib/', () => {
    const projectRoot = getProjectRoot();
    expect(projectRoot).toMatch(/CouncilOrg$/);
  });
});
