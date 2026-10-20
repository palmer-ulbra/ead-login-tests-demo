import { defineConfig } from 'vitest/config'

// ponytail: só cala o aviso "SQLite is experimental" do node:sqlite
export default defineConfig({ test: { execArgv: ['--no-warnings=ExperimentalWarning'] } })
