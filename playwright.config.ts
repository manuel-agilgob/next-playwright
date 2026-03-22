import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.ENV || 'local'}`
});

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  // reporter: 'list',
  // reporter: 'dot',
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3002',
    // trace: 'on-first-retry',
    // screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    screenshot: 'on',
    trace: 'on'
  },

  projects: [

    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.tmp/auth.json'
       },
      dependencies : ['setup']
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
