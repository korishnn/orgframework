// lib/fs.js — Shared filesystem utilities for councilorg engine modules
// Centralizes file I/O patterns so every module doesn't repeat tryCatch+readFileSync+JSON.parse.

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { tryCatch } from './errors.js';
import { getStylesDir, getPresetsDir, getDataPath } from './paths.js';

const STYLES_DIR = getStylesDir();
const PRESETS_DIR = getPresetsDir();

/**
 * Safely read and parse a JSON file, returning a Result.
 * @param {string} path - Absolute file path
 * @returns {import('./errors.js').Result<any, Error>}
 */
export function readJson(path) {
  return tryCatch(() => JSON.parse(readFileSync(path, 'utf-8')));
}

/**
 * Read a role markdown file from the styles directory.
 * @param {string} roleId - Role identifier (e.g. "eng-backend")
 * @returns {import('./errors.js').Result<string, Error>} Full file content
 */
export function readRoleFile(roleId) {
  const filePath = join(STYLES_DIR, `${roleId}.md`);
  return tryCatch(() => readFileSync(filePath, 'utf-8'));
}

/**
 * Read a preset JSON file from the presets directory.
 * @param {string} presetName - Preset name (without .json)
 * @returns {import('./errors.js').Result<any, Error>} Parsed preset object
 */
export function readPresetFile(presetName) {
  const presetPath = join(PRESETS_DIR, `${presetName}.json`);
  return readJson(presetPath);
}

/**
 * Read a JSON data file from a subpath under .claude/councilorg/.
 * @param {string} subpath - Relative path inside .claude/councilorg (e.g. "regions/na.json")
 * @returns {import('./errors.js').Result<any, Error>}
 */
export function readDataFile(subpath) {
  return readJson(getDataPath(subpath));
}

/**
 * Check if a role file exists in the styles directory.
 * @param {string} roleId
 * @returns {boolean}
 */
export function roleFileExists(roleId) {
  return existsSync(join(STYLES_DIR, `${roleId}.md`));
}

/**
 * Check if a preset file exists in the presets directory.
 * @param {string} presetName
 * @returns {boolean}
 */
export function presetFileExists(presetName) {
  return existsSync(join(PRESETS_DIR, `${presetName}.json`));
}
