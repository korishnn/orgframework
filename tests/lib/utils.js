// tests/lib/utils.js — Shared test utilities for councilorg
// Provides consistent project root resolution and file helpers.

import { existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

/**
 * Return the absolute path to the project root.
 */
export function getRootDir() {
  return PROJECT_ROOT;
}

/**
 * Return the absolute path to a file or directory under .claude/councilorg/.
 * @param {string} subpath — relative path inside .claude/councilorg (e.g. "index.json")
 */
export function getDataPath(subpath) {
  return join(PROJECT_ROOT, '.claude', 'councilorg', subpath);
}

/**
 * Count files with a given extension in a directory under .claude/councilorg/.
 * Returns 0 if the directory does not exist.
 * @param {string} dir — subdirectory name inside .claude/councilorg
 * @param {string} ext — file extension to filter by (e.g. ".json", ".md")
 */
export function countFiles(dir, ext) {
  const fullPath = getDataPath(dir);
  if (!existsSync(fullPath)) return 0;
  return readdirSync(fullPath).filter(f => f.endsWith(ext)).length;
}
