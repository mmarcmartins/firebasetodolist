module.exports = {
    clearMocks: true,
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    testRegex: '((\\.|/*.)(test))\\.[tj]sx?$',
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.styles.ts',
      '!src/main.tsx',
      '!src/globalStyle.ts',
      '!src/**/*.d.ts',
      '!src/config',
      '!src/mixins',
    ],
    coverageThreshold: {
      global: {
        branches: 100,
        lines: 100,
        functions: 100,
        statements: 100,
      },
      './**/': {
        branches: 100,
        lines: 100,
        functions: 100,
        statements: 100,
      },
    }
  };