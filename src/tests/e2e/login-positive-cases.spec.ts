import { test, expect } from '@playwright/test';

import { submitLoginAction } from '../../actions/submitLogin.action';
import { assertLoginSuccess } from '../../assertions/login.assert';


test.describe('Login Negative Test Cases - Security and Validation', () => {

    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL || '/');
        await page.waitForLoadState('networkidle');
    });

    test.describe('Empty Fields Validation', () => {
        const userEmail = process.env.USER_EMAIL || 'NOT SET';
        const userPassword = process.env.USER_PASSWORD || 'NOT SET';

        if (userEmail === 'NOT SET') {
            throw new Error('USER_EMAIL environment variable is not set');
        }
        if (userPassword === 'NOT SET') {
            throw new Error('USER_PASSWORD environment variable is not set');
        }

        test('should login with valid credentials', async ({ page }) => {           
            await submitLoginAction(page, userEmail, userPassword);
            await assertLoginSuccess(page);

        });

    });

  
});
