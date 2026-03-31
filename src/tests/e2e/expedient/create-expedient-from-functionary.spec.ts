import { test, expect } from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { buildExpedient } from '@data-builders/expedientNumberBuilder';  
import { fillExpedientForm } from '@actions/createExpedient.action';
import { fillPartyForm } from '@actions/createParty.action';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { CreateNewExpedientPage } from '@ui/pages/CreateNewExpedientPage';
import { CreateNewExpedientPartsPage } from '@ui/pages/CreateNewExpedientPartsPage';
import { IParty } from '@contracts/IParty.interface';
import { buildParty } from '@data-builders/partyBuilder';


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

    test('should create expedient from functionary', async ({ page }) => {
       
        // Arrange
        const navigationBar = new NavigationBar(page);
        const createNewExpedientPage = new CreateNewExpedientPage(page);
        const createPartsPage = new CreateNewExpedientPartsPage(page);
        const expedientForm = new GeneralInformationAboutExpedientForm(page);
        
        // Act - Fill general information about expedient, at least 2 main parties
        await navigationBar.expedientsTab.click({timeout: 5000});
        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();

        expedient = await fillExpedientForm(page, expedient);
        await expedientForm.nextButton.click();
        
        await createNewExpedientPage.addMainPartyButton.click();
        await page.pause();
        await fillPartyForm(page, actor);
        await createPartsPage.addPartButton.click();        
        await fillPartyForm(page, demandado);
        await expedientForm.nextButton.click();

        
    });
});

