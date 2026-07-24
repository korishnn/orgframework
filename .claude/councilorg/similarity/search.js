#!/usr/bin/env node
// similarity.js — Find roles similar to a given role using text overlap scoring
// Usage: node .claude/councilorg/similarity/search.js <role-id>

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { getStylesDir } from '../lib/paths.js';
import { tryCatch, Result } from '../lib/errors.js';
import { createCache } from '../lib/cache.js';
import { MAX_CONTENT_READ_CHARS, MIN_SIMILARITY_THRESHOLD, DEFAULT_SIMILARITY_TOP_N } from '../lib/constants.js';

const STYLES_DIR = getStylesDir();

// ── TTL Cache ─────────────────────────────────────────────────────────
const indexCache = createCache(60_000);

/**
 * Clear the cached index. Call when the styles directory changes.
 */
export function clearCache() {
  indexCache.clear();
}

// ── Stop-word set ──────────────────────────────────────────────────────
const STOP_WORDS = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'are', 'was', 'but', 'not', 'you', 'all', 'can', 'has', 'had']);

/**
 * Tokenize a string into a set of significant tokens.
 * @param {string} str
 * @returns {string[]}
 */
function tokenize(str) {
  if (!str) return [];
  return str.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 2 && !STOP_WORDS.has(t));
}

/**
 * Compute inverse-document-frequency weights for an inverted index.
 * @param {Map<string, Set<string>>} index - Token → set of role IDs
 * @param {number} totalDocs - Total number of documents
 * @returns {Map<string, number>}
 */
function computeIdf(index, totalDocs) {
  const idf = new Map();
  for (const [token, docs] of index) {
    // Smooth IDF: log((N+1)/(df+1)) + 1  prevents zero division
    idf.set(token, Math.log((totalDocs + 1) / (docs.size + 1)) + 1);
  }
  return idf;
}

/**
 * Compute TF-IDF cosine similarity between two role profiles.
 * @param {string} idA
 * @param {string} contentA
 * @param {string} idB
 * @param {string} contentB
 * @param {Map<string, number>} idf - Inverse document frequency weights
 * @returns {number} Similarity percentage (0-100)
 */
function computeSimilarityTfIdf(idA, contentA, idB, contentB, idf) {
  const tokensA = tokenize(`${idA} ${contentA}`);
  const tokensB = tokenize(`${idB} ${contentB}`);

  // Build TF vectors
  /** @type {Map<string, number>} */
  const tfA = new Map();
  for (const t of tokensA) tfA.set(t, (tfA.get(t) || 0) + 1);
  /** @type {Map<string, number>} */
  const tfB = new Map();
  for (const t of tokensB) tfB.set(t, (tfB.get(t) || 0) + 1);

  // Compute TF-IDF cosine similarity
  const allTokens = new Set([...tfA.keys(), ...tfB.keys()]);
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const t of allTokens) {
    const wA = (tfA.get(t) || 0) * (idf.get(t) || 1);
    const wB = (tfB.get(t) || 0) * (idf.get(t) || 1);
    dotProduct += wA * wB;
    normA += wA * wA;
    normB += wB * wB;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator > 0 ? Math.round((dotProduct / denominator) * 100) : 0;
}

/**
 * Pre-build an in-memory inverted index for fast similarity lookups.
 * Maps each token → set of role IDs that contain it.
 * @returns {Result<{ index: Map<string, Set<string>>, roles: string[], idf: Map<string, number> }, Error>}
 */
export function buildIndex() {
  // Check cache first
  const cached = indexCache.get();
  if (cached) return Result.ok(cached);

  return tryCatch(() => {
    const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
    const index = new Map();
    for (const f of files) {
      const roleId = f.replace('.md', '');
      const content = readFileSync(join(STYLES_DIR, f), 'utf-8').slice(0, MAX_CONTENT_READ_CHARS);
      const tokens = new Set(tokenize(`${roleId} ${content}`));
      for (const t of tokens) {
        if (!index.has(t)) index.set(t, new Set());
        index.get(t).add(roleId);
      }
    }
    const data = { index, roles: files.map(f => f.replace('.md', '')), idf: computeIdf(index, files.length) };
    indexCache.set(data);
    return data;
  });
}

/**
 * Find roles similar to a given role using text overlap scoring.
 * Uses pre-built inverted index for O(n) comparison instead of O(n²).
 * @param {string} roleId - Role identifier (e.g. "eng-backend")
 * @param {number} [topN=10] - Number of top results to return
 * @returns {Result<Array<{role: string, similarity: number}>, string>}
 */
export function findSimilar(roleId, topN = DEFAULT_SIMILARITY_TOP_N) {
  const targetPath = join(STYLES_DIR, `${roleId}.md`);

  let actualRoleId = roleId;
  if (!existsSync(targetPath)) {
    // Try fuzzy match
    const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
    const match = files.find(f => f.includes(roleId.toLowerCase()));
    if (!match) return Result.fail(`Role "${roleId}" not found.`);
    actualRoleId = match.replace('.md', '');
  }

  const readResult = tryCatch(() => {
    return readFileSync(join(STYLES_DIR, `${actualRoleId}.md`), 'utf-8').slice(0, MAX_CONTENT_READ_CHARS);
  });
  if (readResult.isFail) return Result.fail(`Cannot read role file: ${readResult.error?.message ?? readResult.error}`);
  const targetContent = /** @type {string} */ (readResult.value);

  const indexResult = buildIndex();
  if (indexResult.isFail) return Result.fail(`Cannot build index: ${indexResult.error?.message ?? indexResult.error}`);
  const { index, idf } = /** @type {{ index: Map<string, Set<string>>, roles: string[], idf: Map<string, number> }} */ (indexResult.value);

  // Compute the candidate set as all roles sharing at least one token with target
  const targetTokens = new Set(tokenize(`${actualRoleId} ${targetContent}`));
  const candidates = new Set();
  for (const t of targetTokens) {
    const roles = index.get(t);
    if (roles) for (const r of roles) candidates.add(r);
  }
  candidates.delete(actualRoleId);

  const scores = [];
  for (const candidateId of candidates) {
    const contentResult = tryCatch(() => readFileSync(join(STYLES_DIR, `${candidateId}.md`), 'utf-8').slice(0, MAX_CONTENT_READ_CHARS));
    if (contentResult.isFail) continue;
    const score = computeSimilarityTfIdf(actualRoleId, targetContent, candidateId, /** @type {string} */ (contentResult.value), idf);
    if (score > MIN_SIMILARITY_THRESHOLD) scores.push({ role: candidateId, similarity: score });
  }

  scores.sort((a, b) => b.similarity - a.similarity);
  return Result.ok(scores.slice(0, topN));
}

// ── CLI is in bin/cli/similarity.js ─────────────────────────────────
