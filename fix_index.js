import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const stylesDir = join(__dirname, '.claude/councilorg/styles');
const indexFile = join(__dirname, '.claude/councilorg/index.json');

// Get all role files
const actualRoles = readdirSync(stylesDir)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''))
  .sort();

// Read, update, write index
const index = JSON.parse(readFileSync(indexFile, 'utf-8'));
const oldCount = index.reference_roles.length;
index.reference_roles = actualRoles;
writeFileSync(indexFile, JSON.stringify(index, null, 2) + '\n');

console.log(`Index updated: ${oldCount} → ${actualRoles.length} roles`);
console.log(`Added ${actualRoles.length - oldCount} missing roles`);

// Verify
const reRead = JSON.parse(readFileSync(indexFile, 'utf-8'));
console.log(`Verification: ${reRead.reference_roles.length} roles in index`);
