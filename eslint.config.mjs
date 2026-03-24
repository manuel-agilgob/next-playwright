import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: ['*.config.ts', '*.config.*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        ...globals.node  // ← Agrega esta línea
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      // Naming convention rules for classes
      '@typescript-eslint/naming-convention': [
        'error',
        // Page classes must end with "Page"
        {
          selector: 'class',
          filter: {
            regex: '^.*Page$',
            match: true
          },
          format: ['PascalCase'],
          suffix: ['Page']
        },
        // Component classes must end with "Component"
        {
          selector: 'class',
          filter: {
            regex: '^.*Component$',
            match: true
          },
          format: ['PascalCase'],
          suffix: ['Component']
        },
        // Form classes must end with "Form"
        {
          selector: 'class',
          filter: {
            regex: '^.*Form$',
            match: true
          },
          format: ['PascalCase'],
          suffix: ['Form']
        },
        // Button classes must end with "Button"
        {
          selector: 'class',
          filter: {
            regex: '^.*Button$',
            match: true
          },
          format: ['PascalCase'],
          suffix: ['Button']
        },
        // Table classes must end with "Table"
        {
          selector: 'class',
          filter: {
            regex: '^.*Table$',
            match: true
          },
          format: ['PascalCase'],
          suffix: ['Table']
        },
        // Dialog classes must end with "Dialog"
        {
          selector: 'class',
          filter: {
            regex: '^.*Dialog$',
            match: true
          },
          format: ['PascalCase'],
          suffix: ['Dialog']
        },
        // Input classes must end with "Input"
        {
          selector: 'class',
          filter: {
            regex: '^.*Input$',
            match: true
          },
          format: ['PascalCase'],
          suffix: ['Input']
        },
        // All other classes must use PascalCase
        {
          selector: 'class',
          format: ['PascalCase']
        },
        // Interfaces must use PascalCase
        {
          selector: 'interface',
          format: ['PascalCase']
        },
        // Type aliases must use PascalCase
        {
          selector: 'typeAlias',
          format: ['PascalCase']
        },
        // Variables must use camelCase
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE']
        },
        // Functions must use camelCase
        {
          selector: 'function',
          format: ['camelCase']
        },
        // Methods must use camelCase
        {
          selector: 'method',
          format: ['camelCase']
        }
      ]
    }
  },
  // Config files at root without project reference
  {
    files: ['*.config.ts', '*.config.*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'playwright-report/**', 'test-results/**', '.tmp/**']
  }
];
