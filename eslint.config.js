import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import i18nJsonPlugin from 'eslint-plugin-i18n-json'
import path from 'path'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: [
      'tests/**/*.{j,t}s?(x)',
      'src/**/__tests__/*'
    ],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off'
    },
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['tests/e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  {
    files: ['src/locales/*.json'],
    plugins: { 'i18n-json': i18nJsonPlugin },
    processor: {
      meta: { name: '.json' },
      ...i18nJsonPlugin.processors['.json'],
    },
    rules: {
      'i18n-json/valid-json': 2,
      'i18n-json/identical-keys': [2, {
        filePath: path.resolve('src/locales/en.json'),
      }],
      'i18n-json/identical-placeholders': [2, {
        filePath: path.resolve('src/locales/en.json'),
        ignoreTags: true,
      }],
    },
  },

)
