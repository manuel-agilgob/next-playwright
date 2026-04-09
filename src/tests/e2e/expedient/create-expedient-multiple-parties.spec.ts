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
import { saveAndActivate } from '@actions/createExpedient.action';
import { assertExpedientActivatedMessageIsShown } from '@assertions/createExpedientForm.assert';

test.describe('Create expedient with multiple parties [3-3]', () => {

    let expedient = buildExpedient({
        expedientNumber: '5/2026', matter: 'Familiar', legalWay: 'Control de Detenciones', 
        kindExpedient: 'PRINCIPAL', kindJudgement: 'Concurso Civil', mainAction: 'ALIMENTOS'
    });

    const actor : IParty = buildParty({partyType: "Actor", belongsToIndigenousGroup: "No"});
    const actor2 : IParty = buildParty({partyType: "Actor", belongsToIndigenousGroup: "No"});
    const actor3 : IParty = buildParty({partyType: "Actor", belongsToIndigenousGroup: "No"});

    const demandado : IParty = buildParty({partyType : "Demandado"});
    const demandado2 : IParty = buildParty({partyType : "Demandado"});
    const demandado3 : IParty = buildParty({partyType : "Demandado"});


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
    test.slow();
    test('should create expedient from functionary with its parties [3-3]', async ({ page }) => {
       
        // Arrange
        const navigationBar = new NavigationBar(page);
        const createNewExpedientPage = new CreateNewExpedientPage(page);
        const createPartsPage = new CreateNewExpedientPartsPage(page);
        const expedientForm = new GeneralInformationAboutExpedientForm(page);
        
        // Act - Fill general information about expedient, at least 2 main parties
        await navigationBar.expedientsTab.click({timeout: 5000});
        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();

        expedient = await fillExpedientForm(page, expedient, true);

        await expedientForm.nextButton.click();
        
        await createNewExpedientPage.addMainPartyButton.click();

        await fillPartyForm(page, actor);

        await createPartsPage.addPartButton.click();  
        await fillPartyForm(page, demandado);

        await createPartsPage.addPartButton.click();  
        await fillPartyForm(page, demandado2);

        await createPartsPage.addPartButton.click();  
        await fillPartyForm(page, demandado3);

        await createPartsPage.addPartButton.click();  
        await fillPartyForm(page, actor2);

        await createPartsPage.addPartButton.click();  
        await fillPartyForm(page, actor3);

        await expedientForm.nextButton.click();

        const response = await saveAndActivate(page);

        // Assertions 
        // 1 - API response status should be 201
        expect([200, 201]).toContain(response.status());

        // 2 - Expedient activated message should be shown with correct expedient number
        await assertExpedientActivatedMessageIsShown(page, expedient.expedientNumber);

        // - Expedient is shown in My Expedients list with correct information 
        // - Expedient number should be displayed in the UI
        // - All parties information should be correct in the summary card and in the general information section of the expedient form
        
        
    });
});

