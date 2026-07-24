import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Count actual files
const stylesDir = join(__dirname, '.claude/councilorg/styles');
const actualFiles = readdirSync(stylesDir).filter(f => f.endsWith('.md'));
console.log(`Actual role files: ${actualFiles.length}`);

// Count entries in index
const index = JSON.parse(readFileSync(join(__dirname, '.claude/councilorg/index.json'), 'utf-8'));
console.log(`Index reference_roles: ${index.reference_roles.length}`);
console.log(`Index presets: ${index.presets ? index.presets.length : 'N/A'}`);

// Find missing/surplus
const indexed = new Set(index.reference_roles);
const missing = actualFiles.filter(f => !indexed.has(f.replace('.md', '')));
const extra = index.reference_roles.filter(r => !actualFiles.includes(r + '.md'));
if (missing.length) console.log(`Files not in index: ${missing.join(', ')}`);
if (extra.length) console.log(`Index entries not as files: ${extra.join(', ')}`);
