import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config(
  {
    // Base ESLint recommended rules
    ...eslint.configs.recommended,
    ...tseslint.configs.recommended,
  },
  {
    // Custom rules for NestJS (4 spaces, trailing commas)
    rules: {
      'indent': ['error', 4], // Enforce 4-space indentation
      '@typescript-eslint/indent': ['error', 4], // TypeScript-specific indentation
      'comma-dangle': ['error', 'always-multiline'], // Trailing commas for multiline
    },
  },
  {
    // Prettier integration (must come last to override other rules)
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', {
        tabWidth: 4, // Prettier uses 4 spaces
        useTabs: false, // Force spaces instead of tabs
        trailingComma: 'all', // Always add trailing commas
        printWidth: 100, // Adjust line length as needed
      }],
    },
  },
  // Disable formatting rules that conflict with Prettier
  prettierConfig,
);