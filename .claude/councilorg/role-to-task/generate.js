#!/usr/bin/env node
// role-to-task.js — Convert any role definition into a structured AI system prompt
// Usage: node bin/role-to-task.js <role-id>
//        node bin/role-to-task.js <role-id> --brief

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { getStylesDir, getDataPath } from '../lib/paths.js';
import { Result, tryCatch } from '../lib/errors.js';
import { readJson } from '../lib/fs.js';
import { MAX_ROLE_DEFINITION_CHARS } from '../lib/constants.js';

const STYLES_DIR = getStylesDir();
const DEFS_PATH = join(getDataPath('definitions'), 'definitions.json');

/**
 * @param {string} roleId
 * @returns {Result<{id: string, path: string}, string>}
 */
function findRole(roleId) {
  const exact = join(STYLES_DIR, `${roleId}.md`);
  if (existsSync(exact)) return Result.ok({ id: roleId, path: exact });

  // Fuzzy search
  const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
  const match = files.find(f => f.includes(roleId.toLowerCase()));
  if (match) return Result.ok({ id: match.replace('.md', ''), path: join(STYLES_DIR, match) });

  return Result.fail(`Role "${roleId}" not found. Try: node bin/role-to-task.js <partial-role-name>`);
}

/**
 * Convert any role definition into a structured AI system prompt.
 * @param {string} roleId - Role identifier (e.g. "eng-backend")
 * @param {{ brief?: boolean }} [options] - Options (default: {})
 * @returns {Result<string, string>} Generated system prompt text or error
 */
export function generateTaskPrompt(roleId, { brief = false } = {}) {
  const roleResult = findRole(roleId);
  if (roleResult.isFail) return /** @type {Result<string, string>} */ (/** @type {unknown} */ (roleResult));
  const role = /** @type {{id: string, path: string}} */ (roleResult.value);

  const readResult = tryCatch(() => readFileSync(role.path, 'utf-8'));
  if (readResult.isFail) return Result.fail(`Cannot read role file "${role.path}": ${readResult.error?.message ?? readResult.error}`);
  const content = /** @type {string} */ (readResult.value);
  const summary = (content.match(/\*\*Summary:\*\* (.+)/) || [])[1] || '';
  const sector = (content.match(/\*\*Sector:\*\* (.+)/) || [])[1] || 'Unknown';
  const level = (content.match(/\*\*Level:\*\* (.+)/) || [])[1] || '';
  const parent = (content.match(/\*\*Parent role:\*\* (.+)/) || [])[1] || '';

  const respSection = content.match(/## Responsibilities\n([\s\S]*?)(?=## |$)/);
  const responsibilities = respSection
    ? respSection[1].split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/, '')).filter(Boolean)
    : [];

  const compSection = content.match(/(?:## Core Competencies|Core competencies:)\n([\s\S]*?)(?=## |$)/);
  const competencies = compSection
    ? compSection[1].split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/, '')).filter(Boolean)
    : [];

  // Load definition for depth
  let definition = '';
  if (existsSync(DEFS_PATH)) {
    const defsResult = readJson(DEFS_PATH);
    if (defsResult.isOk) {
      const defs = /** @type {Record<string, string>} */ (defsResult.value);
      if (defs[role.id]) definition = defs[role.id];
    }
  }

  if (brief) {
    return Result.ok(`You are a ${summary || role.id.replace(/-/g, ' ')}. ${responsibilities.slice(0, 4).map(r => '- ' + r).join('\n')}`);
  }

  return Result.ok(`# Role: ${role.id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}

## Identity
You are an expert ${summary || role.id.replace(/-/g, ' ')}. ${sector !== 'Unknown' ? `You work in the ${sector} sector.` : ''} ${level ? `Your level is ${level}.` : ''} ${parent ? `Your parent role is ${parent.replace(/-/g, ' ')}. You can escalate to them when needed.` : ''}

## Core Responsibilities
${responsibilities.map(r => `- ${r}`).join('\n')}

## Expertise
${competencies.map(c => `- ${c}`).join('\n')}

## Work Style
- Think step by step before responding
- Provide specific, actionable recommendations
- If you don't have enough information, ask clarifying questions
- Respect your domain boundaries — escalate cross-domain issues
- Be concise but thorough

## Context
${definition ? definition.slice(0, MAX_ROLE_DEFINITION_CHARS) : ''}

## Interaction Rules
1. Stay in your role. Do not answer questions outside your domain.
2. If asked something outside your role: "That's outside my domain. You should consult [relevant role]."
3. Provide evidence for recommendations where possible.
4. When uncertain, say so rather than guessing.
5. Consider regional, industry, and stage context in your responses.`);
}

// ── CLI is in bin/cli/role-to-task.js ───────────────────────────────
