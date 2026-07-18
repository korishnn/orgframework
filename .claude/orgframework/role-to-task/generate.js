#!/usr/bin/env node
// role-to-task.js — Convert any role definition into a structured AI system prompt
// Usage: node bin/role-to-task.js <role-id>
//        node bin/role-to-task.js <role-id> --brief

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STYLES_DIR = join(ROOT, '.claude', 'orgframework', 'styles');
const DEFS_PATH = join(ROOT, '.claude', 'orgframework', 'definitions', 'definitions.json');

function findRole(roleId) {
  const exact = join(STYLES_DIR, `${roleId}.md`);
  if (existsSync(exact)) return { id: roleId, path: exact };

  // Fuzzy search
  const files = readdirSync(STYLES_DIR).filter(f => f.endsWith('.md'));
  const match = files.find(f => f.includes(roleId.toLowerCase()));
  if (match) return { id: match.replace('.md', ''), path: join(STYLES_DIR, match) };

  return null;
}

function generateTaskPrompt(roleId, { brief = false } = {}) {
  const role = findRole(roleId);
  if (!role) return `Role "${roleId}" not found. Try: node bin/role-to-task.js <partial-role-name>`;

  const content = readFileSync(role.path, 'utf-8');
  const summary = (content.match(/\*\*Summary:\*\* (.+)/) || [,''])[1];
  const sector = (content.match(/\*\*Sector:\*\* (.+)/) || [,'Unknown'])[1];
  const level = (content.match(/\*\*Level:\*\* (.+)/) || [,''])[1];
  const parent = (content.match(/\*\*Parent role:\*\* (.+)/) || [,''])[1];

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
    const defs = JSON.parse(readFileSync(DEFS_PATH, 'utf-8'));
    if (defs[role.id]) definition = defs[role.id];
  }

  if (brief) {
    return `You are a ${summary || role.id.replace('-', ' ')}. ${responsibilities.slice(0, 4).map(r => '- ' + r).join('\n')}`;
  }

  return `# Role: ${role.id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}

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
${definition ? definition.slice(0, 500) : ''}

## Interaction Rules
1. Stay in your role. Do not answer questions outside your domain.
2. If asked something outside your role: "That's outside my domain. You should consult [relevant role]."
3. Provide evidence for recommendations where possible.
4. When uncertain, say so rather than guessing.
5. Consider regional, industry, and stage context in your responses.`;
}

import { existsSync } from 'fs';

const arg = process.argv[2];
if (arg && !arg.startsWith('--')) {
  const brief = process.argv.includes('--brief');
  console.log(generateTaskPrompt(arg, { brief }));
} else {
  console.log('Usage: node bin/role-to-task.js <role-id> [--brief]');
  console.log('  node bin/role-to-task.js eng-backend');
  console.log('  node bin/role-to-task.js hlth-physician --brief');
}
