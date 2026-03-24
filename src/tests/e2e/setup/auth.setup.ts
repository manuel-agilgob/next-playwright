
import { submitLoginAction } from '@actions/submitLogin.action';
import { assertLoginSuccess} from '@assertions/login.assert';
import { test as setup } from '@playwright/test';


setup('authenticate', async ({ page, baseURL }) => {
    await page.goto(baseURL || '/');
    await page.waitForLoadState('networkidle');
    const email = process.env.USER_EMAIL || '';
    const password = process.env.USER_PASSWORD || '';

    await page.pause();
    if(!email || !password) {
        throw new Error('USER_EMAIL and USER_PASSWORD must be set in environment variables');
    }
    await submitLoginAction(page, email, password);
    await assertLoginSuccess(page);
    await page.context().storageState({ path: process.env.STORAGE_STATE_PATH || '.tmp/auth.json' });
    console.log('Authentication successful, storage state saved.');
});

