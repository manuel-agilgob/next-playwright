import { test } from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '../../../ui/forms/GeneralInformationAboutExpedientForm';
import { buildExpedient } from '@data-builders/expedientNumberBuilder';  
import { assertExpedientGeneralInformationIsCorrect, assertExpedientNumberIsValid } 
    from '@assertions/createExpedientForm.assert';
import { IExpedient } from '@contracts/IExpedient.interface';
import { fillExpedientForm } from '@actions/createExpedient.action';


test.describe('Create expedient from functionary', () => {

    let expedient = buildExpedient({expedientNumber: '5/2026'});

    test.beforeEach(async ({ page }) => {

        // await page.goto(process.env.BASE_URL || '/');
        // await page.waitForLoadState('networkidle');
        // const email = process.env.USER_EMAIL || '';
        // const password = process.env.USER_PASSWORD || '';
    
        // if(!email || !password) {
        //     throw new Error('USER_EMAIL and USER_PASSWORD must be set in environment variables');
        // }
        // await submitLoginAction(page, email, password);
        // await assertLoginSuccess(page);

        await page.goto('/expedientes');
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');
    });

    test('should create expedient from functionary', async ({ page }) => {
       
        // await assertLoginSuccess(page);
        const navigationBar = new NavigationBar(page);
        
        await navigationBar.expedientsTab.click({timeout: 5000});

        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();

        expedient = await fillExpedientForm(page, expedient);
        
        assertExpedientNumberIsValid(page, expedient.expedientNumber);
    
        await assertExpedientGeneralInformationIsCorrect(page, expedient);


    });
});

