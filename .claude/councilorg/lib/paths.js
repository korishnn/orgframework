// lib/paths.js — Shared path resolution for councilorg modules
// Replaces duplicate `__dirname` boilerplate across all engine modules.

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORG_ROOT = join(__dirname, '..');

/**
 * Return the absolute path to the councilorg data root (.claude/councilorg).
 */
export function getOrgRoot() {
  return ORG_ROOT;
}

/**
 * Return the absolute path to a file or directory under .claude/councilorg/.
 * @param {string} subpath - Relative path inside .claude/councilorg (e.g. "styles" or "index.json")
 */
export function getDataPath(subpath) {
  return join(ORG_ROOT, subpath);
}

/**
 * Return the absolute path to the styles directory.
 */
export function getStylesDir() {
  return join(ORG_ROOT, 'styles');
}

/**
 * Return the absolute path to the presets directory.
 */
export function getPresetsDir() {
  return join(ORG_ROOT, 'presets');
}

/**
 * Return the absolute path to the definitions directory.
 */
export function getDefinitionsDir() {
  return join(ORG_ROOT, 'definitions');
}

/**
 * Return the absolute path to the definitions.json file.
 */
export function getDefinitionsPath() {
  return join(ORG_ROOT, 'definitions', 'definitions.json');
}

/**
 * Return the absolute path to the project root (where package.json lives).
 * Navigates two levels up from ORG_ROOT (.claude/councilorg/):
 *   .claude/councilorg/ → .claude/ → project root
 */
export function getProjectRoot() {
  return join(ORG_ROOT, '..', '..');
}
