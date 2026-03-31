import { test, expect } from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { buildExpedient } from '@data-builders/expedientNumberBuilder';  
import { fillExpedientForm } from '@actions/createExpedient.action';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { IParty } from '@contracts/IParty.interface';
import { buildParty } from '@data-builders/partyBuilder';
import { assertSubmitButtonIsDisbled, assertSubmitButtonIsEnabled} from '@assertions/createExpedientForm.assert';


test.describe('Create expedient from functionary', () => {

    let expedient = buildExpedient({expedientNumber: '5/2026'});
    const actor : IParty = buildParty({partyType: "Actor", belongsToIndigenousGroup: "No"});
    const demandado : IParty = buildParty({partyType : "Demandado"});

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


    for(const n of [
        'abc/2026',
        '123/206',
        '1/2026', // Assuming number already exists so it is duplicate, not invalid
    ]){
        test(`Submit button should be disabled with invalid expedient numbers, case : ${n}`, async ({ page }) => {
            // Arrange
            const navigationBar = new NavigationBar(page);
            const expedientForm = new GeneralInformationAboutExpedientForm(page);
            expedient.expedientNumber = n;
            
            // Act - Fill general information about expedient, at least 2 main parties
            await navigationBar.expedientsTab.click({timeout: 5000});
            const judicialExpedientsPage = new JudicialExpedientsPage(page);
            await judicialExpedientsPage.newExpedientButton.click();
            expedient = await fillExpedientForm(page, expedient, false);
            await page.waitForTimeout(1000); // Wait for potential debounce or async validation to complete

            // Assert
            expect(expedientForm.nextButton).toBeDisabled({timeout: 3000});

        })
    }

    for(const n of [
        '100/2026',
        '300/2026',
        '500/2026',
        'next'
    ]){
        test(`Submit button should be enabled with data filled and valid expedient numbers only, case : ${n}`, async ({ page }) => {
            // Arrange
            const navigationBar = new NavigationBar(page);
            const expedientForm = new GeneralInformationAboutExpedientForm(page);
            expedient.expedientNumber = n;
            
            // Act - Fill general information about expedient, at least 2 main parties
            await navigationBar.expedientsTab.click({timeout: 5000});
            const judicialExpedientsPage = new JudicialExpedientsPage(page);
            await judicialExpedientsPage.newExpedientButton.click();
            expedient = await fillExpedientForm(page, expedient,
                n === 'next' ? true : false // If the case is 'next', we want to click the next consecutive button, otherwise we fill the expedient number input
            );
            await page.waitForTimeout(1000); // Wait for potential debounce or async validation to complete

            // Assert
            expect(expedientForm.nextButton).toBeEnabled({timeout: 3000});

        })
    }
    
});

