import { test, expect } from '@playwright/test';
import { GeneralInformationAboutExpedientForm } from '../../ui/forms/GeneralInformationAboutExpedientForm';
import { submitLoginAction } from '../../actions/submitLogin.action';
import { assertLoginSuccess} from '../../assertions/login.assert';

test.describe('Create expedient from functionary', () => {

    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL || '/');
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');
    });

    test('should create expedient from functionary', async ({ page }) => {
        // Check if the page loaded correctly
        const title = await page.title();
        console.log('Page title:', title);
        
        // Wait for the login form to be visible before attempting login
        // await page.waitForSelector('[data-testid="email"]', { state: 'visible', timeout: 10000 });
        
        await submitLoginAction(page, 'familiar@cjj.com', '12345678');
        await assertLoginSuccess(page);
        
        // Add some assertion to verify login was successful
        // Example: await expect(page).toHaveURL(/dashboard/);
        
        // const expedientForm = new GeneralInformationAboutExpedientForm(page);
        // await expedientForm.expedientNumberInput.fill('123456');
    });
});