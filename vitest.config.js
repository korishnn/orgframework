import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    exclude: ['node_modules', 'tests/validate-*.js'],
    globals: true,
  },
  coverage: {
    provider: 'v8',
    enabled: true,
    reportsDirectory: './coverage',
    include: ['.claude/orgframework/**/*.js'],
    exclude: ['node_modules'],
    thresholds: {
      lines: 80,
      branches: 80,
      functions: 80,
      statements: 80,
    },
  },
});
