import { test, expect } from '@playwright/test';

import { submitLoginAction } from '../../actions/submitLogin.action';
import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '../../ui/forms/GeneralInformationAboutExpedientForm';

import { assertLoginSuccess} from '../../assertions/login.assert';

test.describe('Create expedient from functionary', () => {

    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL || '/');
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');
    });

    test('should create expedient from functionary', async ({ page }) => {
        await submitLoginAction(page, 'familiar@cjj.com', '12345678');
        // await assertLoginSuccess(page);
        const navigationBar = new NavigationBar(page);
        await navigationBar.expedientsTab.click();

        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.nexExpedientButton.click();

        const expedientForm = new GeneralInformationAboutExpedientForm(page);
        await expedientForm.expedientNumberInput.fill('123456');
    });
});