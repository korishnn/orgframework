# Contributing to councilorg

## Getting Started

```bash
git clone <repo>
cd councilorg
npm install
```

## Scripts

| Command | Description |
|---|---|
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:validate` | Run data validators (roles, presets, index) |
| `npm run test:all` | Run both unit tests and validators |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run diagnose` | Run self-diagnostic |

## Project Structure

```
councilorg/
  .claude/councilorg/        # Core data and engines
    lib/                       # Shared utilities (errors.js, paths.js, constants.js)
    styles/*.md                # Reference role definitions (555 roles)
    presets/*.json             # Org structure templates (35 presets)
    similarity/                # Role similarity search engine
    vacancy/                   # Role vacancy simulator
    comparison/                # Org structure comparison engine
    reverse-org/               # Bottom-up org designer
    visualizer/                # Mermaid.js org chart generator
    council/                   # LLM Council deliberation engine
    relationship-map/          # Role relationship graph engine
    role-to-task/              # Role-to-prompt converter
    regions/                   # Regional context profiles
    industries/                # Industry context profiles
    stages/                    # Stage (startup/scaleup/enterprise) profiles
  bin/                         # Installer and diagnostic tools
  tests/                       # Tests and validators
    unit/                      # Vitest unit tests
    schemas/                   # JSON Schema files for data validation
```

## Adding a New Role

1. Create a new `.md` file in `.claude/councilorg/styles/`
2. Use the v3 template format (see any existing role for reference)
3. Add the role ID to `index.json` under `reference_roles`
4. Run `npm run test:validate` to verify

## Adding a New Preset

1. Create a new `.json` file in `.claude/councilorg/presets/`
2. Follow the preset schema (see `tests/schemas/preset.schema.json`)
3. Run `npm run test:validate` to verify

## Adding a New Engine Module

1. Create a directory under `.claude/councilorg/`
2. Create your module as an ESM `.js` file
3. Import shared utilities from `lib/errors.js` and `lib/paths.js`
4. Add `--help` CLI support following the pattern in existing engines
5. Add tests in `tests/unit/`
6. Add the export to `exports` in `package.json`

## Code Standards

- **ESM modules** only (type: "module" in package.json)
- **JSDoc** annotations on all public functions (`@param`, `@returns`)
- **Error handling**: Use `Result.ok()` / `Result.fail()` from `lib/errors.js`
- **No hardcoded magic numbers**: Use named constants from `lib/constants.js`
- **CLI pattern**: Wrap CLI code in `if (process.argv[1]?.endsWith('your-file.js'))`
- **Test**: Add Vitest tests for all new functionality

## Running Tests Before Commit

```bash
npm run lint        # Check code style
npm run typecheck   # Check types
npm run test:all    # Run all tests + validators
```
