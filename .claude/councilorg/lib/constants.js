// lib/constants.js — Shared constants for councilorg engine modules
// Centralizes magic numbers and thresholds so they can be tuned in one place.

/**
 * Maximum characters to read from a role content file for analysis.
 */
export const MAX_CONTENT_READ_CHARS = 1000;

/**
 * Minimum similarity score (0-100) for a role to be considered "similar".
 */
export const MIN_SIMILARITY_THRESHOLD = 15;

/**
 * Default number of top-N results to return from similarity search.
 */
export const DEFAULT_SIMILARITY_TOP_N = 10;

/**
 * Maximum number of coverage options to suggest for a vacancy.
 */
export const MAX_COVERAGE_OPTIONS = 3;

/**
 * Maximum characters to include from a definition in the generated task prompt.
 */
export const MAX_ROLE_DEFINITION_CHARS = 500;

/**
 * Virtual role ID used as a placeholder for "reports to department head" (not an actual person).
 */
export const VIRTUAL_REPORT = 'Department Head';
