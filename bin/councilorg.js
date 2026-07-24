#!/usr/bin/env node
// bin/councilorg.js — Unified CLI entrypoint for councilorg engine modules
// Usage: node bin/councilorg.js <command> [options]

const COMMANDS = {
  search:     { desc: 'Find roles similar to a given role',              path: './cli/similarity.js' },
  vacancy:    { desc: 'Simulate impact of a key role vacancy',           path: './cli/vacancy.js' },
  compare:    { desc: 'Compare two org structure presets',               path: './cli/comparison.js' },
  reverse:    { desc: 'Design org bottom-up from headcount list',        path: './cli/reverse-org.js' },
  visualize:  { desc: 'Generate Mermaid.js org chart from preset',       path: './cli/visualizer.js' },
  council:    { desc: 'Run LLM Council deliberation',                    path: './cli/council.js' },
  relations:  { desc: 'Query role relationship graph',                   path: './cli/relationship-map.js' },
  role2task:  { desc: 'Convert a role definition to an AI prompt',       path: './cli/role-to-task.js' },
  diagnose:   { desc: 'Run system diagnostics',                          path: './diagnose.js' },
};

const cmd = process.argv[2];
if (!cmd || cmd === '--help' || cmd === '-h') {
  console.log('\n  councilorg — Unified CLI\n');
  console.log('  Usage: node bin/councilorg.js <command> [options]\n');
  console.log('  Commands:\n');
  for (const [name, info] of Object.entries(COMMANDS)) {
    console.log(`    ${name.padEnd(15)} ${info.desc}`);
  }
  console.log('\n  For command-specific help: node bin/councilorg.js <command> --help\n');
  process.exit(cmd ? 0 : 1);
}

if (cmd === 'list') {
  console.log(JSON.stringify(Object.keys(COMMANDS), null, 2));
  process.exit(0);
}

const command = COMMANDS[cmd];
if (!command) {
  console.error(`\n  Unknown command: "${cmd}"`);
  console.error('  Available commands: ' + Object.keys(COMMANDS).join(', '));
  console.error('  Run: node bin/councilorg.js --help\n');
  process.exit(1);
}

// Forward to the module CLI via import(), passing remaining args
const { fileURLToPath } = await import('url');
const { dirname, join } = await import('path');

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulePath = join(__dirname, command.path);

try {
  await import(modulePath);
} catch (err) {
  console.error(`Error: Failed to run "${cmd}": ${err.message}`);
  process.exit(1);
}
