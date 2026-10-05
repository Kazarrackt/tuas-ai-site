import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { process: 'readonly', document: 'readonly', window: 'readonly', setInterval: 'readonly', clearInterval: 'readonly', URL: 'readonly', HTMLFormElement: 'readonly', HTMLElement: 'readonly', HTMLButtonElement: 'readonly', Event: 'readonly', PointerEvent: 'readonly', TouchEvent: 'readonly', SubmitEvent: 'readonly' },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: { ...tsPlugin.configs.recommended.rules },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: { process: 'readonly', module: 'readonly', __dirname: 'readonly', console: 'readonly', setInterval: 'readonly', clearInterval: 'readonly', document: 'readonly', window: 'readonly', TouchEvent: 'readonly', SubmitEvent: 'readonly', Event: 'readonly', HTMLFormElement: 'readonly', HTMLButtonElement: 'readonly', HTMLElement: 'readonly', ReturnType: 'readonly' } },
  },
  globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts', 'tests/**']),
]);
