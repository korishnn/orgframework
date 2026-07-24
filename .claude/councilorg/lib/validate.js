// lib/validate.js — Runtime input validation for councilorg engine modules
// Uses JSON Schemas from tests/schemas/ for structured error messages.

import { createRequire } from 'node:module';
import { readDataFile } from './fs.js';
import { Result } from './errors.js';

const _require = createRequire(import.meta.url);

/** @type {Map<string, import('ajv').ValidateFunction>} */
const compiledCache = new Map();

/**
 * Validate data against a named schema from tests/schemas/.
 * @param {string} schemaName - Schema file name (without .schema.json suffix), e.g. "preset"
 * @param {any} data - The data to validate
 * @returns {Promise<Result<any, string>>} Ok(data) on success, Fail(message) on error
 */
export async function validate(schemaName, data) {
  if (!schemaName || !data) return Result.ok(data); // skip if no schema specified

  let validateFn = compiledCache.get(schemaName);
  if (!validateFn) {
    try {
      const { default: Ajv } = await import('ajv');
      const schemaResult = readDataFile(`../../tests/schemas/${schemaName}.schema.json`);
      if (schemaResult.isFail) return Result.ok(data); // skip if schema file not found

      const ajv = new Ajv();
      validateFn = ajv.compile(schemaResult.value);
      compiledCache.set(schemaName, validateFn);
    } catch {
      return Result.ok(data); // skip validation on error (graceful degradation)
    }
  }

  const valid = validateFn(data);
  if (!valid) {
    const errors = validateFn.errors || [];
    const messages = errors.map(e => `${e.instancePath} ${e.message}`).join('; ');
    return Result.fail(`Validation failed: ${messages}`);
  }

  return Result.ok(data);
}

/**
 * Synchronous validation for use at module init.
 * @param {string} schemaName
 * @param {any} data
 * @returns {Result<any, string>}
 */
export function validateSync(schemaName, data) {
  if (!schemaName || !data) return Result.ok(data);

  let validateFn = compiledCache.get(schemaName);
  if (!validateFn) {
    try {
      const Ajv = _require('ajv').default || _require('ajv');
      const schemaResult = readDataFile(`../../tests/schemas/${schemaName}.schema.json`);
      if (schemaResult.isFail) return Result.ok(data);

      const ajv = new Ajv();
      validateFn = ajv.compile(schemaResult.value);
      compiledCache.set(schemaName, validateFn);
    } catch {
      return Result.ok(data);
    }
  }

  const valid = validateFn(data);
  if (!valid) {
    const errors = validateFn.errors || [];
    const messages = errors.map(e => `${e.instancePath} ${e.message}`).join('; ');
    return Result.fail(`Validation failed: ${messages}`);
  }
  return Result.ok(data);
}
