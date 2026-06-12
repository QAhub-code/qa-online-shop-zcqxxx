const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://qa-challenge.codesubmit.io',
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
  },
});