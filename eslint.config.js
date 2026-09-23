import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  console: 'readonly',
  requestAnimationFrame: 'readonly',
  cancelAnimationFrame: 'readonly',
  HTMLCanvasElement: 'readonly',
  HTMLElement: 'readonly',
  Event: 'readonly',
  MouseEvent: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  fetch: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
}

const nodeGlobals = {
  __dirname: 'readonly',
  __filename: 'readonly',
  process: 'readonly',
  module: 'readonly',
  require: 'readonly',
  exports: 'readonly',
}

export default [
  // ── Ignorar completamente ─────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.min.js',
      'api/**',
    ],
  },

  // ── Reglas JS base ────────────────────────────────────────────────
  eslint.configs.recommended,

  // ── Archivos de configuración de Node.js (vite, vitest, etc.) ────
  {
    files: ['*.config.ts', '*.config.js', 'playwright.config.ts'],
    languageOptions: {
      parser: tsParser,
      globals: { ...nodeGlobals },
    },
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-undef': 'off', // Node globals manejados arriba
    },
  },

  // ── Archivos TypeScript del src/ (entorno browser) ───────────────
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: { ...browserGlobals },
    },
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-undef': 'off', // Los tipos de browser los provee TypeScript
    },
  },

  // ── Vue SFC (parser compuesto: vue-eslint-parser + ts) ───────────
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: { ...browserGlobals },
    },
    rules: {
      ...pluginVue.configs['flat/recommended'].rules,

      // ── Desactivadas: sin impacto en correctitud ─────────────────
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      // v-html solo contiene SVG hardcodeado que controlamos nosotros
      'vue/no-v-html': 'off',
      // Mantener como advertencia, no bloquea CI
      'vue/attributes-order': 'warn',

      // TypeScript dentro de SFCs
      '@typescript-eslint/no-unused-vars': 'warn',
      // Los globals browser los resuelve el parser de TS, no ESLint
      'no-undef': 'off',
    },
  },
]
