import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        baseURL,
        browserName: 'chromium',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.REQRES_BASE_URL || 'https://reqres.in',
        browserName: 'chromium',
        headless: true,
        ignoreHTTPSErrors: true,
      },
    },
  ],
});
