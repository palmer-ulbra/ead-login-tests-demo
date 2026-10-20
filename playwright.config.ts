import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  testMatch: "*.e2e.ts", // nome diferente de .test.ts para o Vitest não pegar
  use: {
    baseURL: "http://localhost:3000",
    // headless: false,
    // launchOptions: { slowMo: 2000 },
  },
  webServer: {
    command: "npm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
