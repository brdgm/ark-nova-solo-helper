import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'tests/e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      globals: true,
      coverage: {
        provider: 'istanbul',
        reporter: ['lcov']
      }
    }
  })
)
