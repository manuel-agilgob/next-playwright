import { test} from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { buildExpedient } from '@data-builders/expedientNumberBuilder';  
import { assertExpedientGeneralInformationIsCorrect } from '@assertions/createExpedientForm.assert';
import { CreateNewExpedientPage } from '@ui/pages/CreateNewExpedientPage';
import { CreateNewExpedientPartsPage } from '@ui/pages/CreateNewExpedientPartsPage';
import { IParty } from '@contracts/IParty.interface';
import { fillPartyForm } from '@actions/createParty.action';
import { fillExpedientForm } from '@actions/createExpedient.action';
import { buildPartyExample } from '@data-builders/partyBuilder';
import { submitLoginAction } from '@actions/submitLogin.action';
import { assertLoginSuccess } from '@assertions/login.assert';
import { assertSummaryCardInformationIsCorrect } from '@assertions/createExpedientForm.assert';

test.describe('Create expedient and parties', () => {

    let expedient = buildExpedient({expedientNumber: '5/2026'});

    test.beforeEach(async ({ page }) => {

        await page.goto(process.env.BASE_URL || '/');
        await page.waitForLoadState('networkidle');
        const email = process.env.USER_EMAIL || '';
        const password = process.env.USER_PASSWORD || '';
    
        if(!email || !password) {
            throw new Error('USER_EMAIL and USER_PASSWORD must be set in environment variables');
        }
        await submitLoginAction(page, email, password);
        await assertLoginSuccess(page);

        await page.goto('/expedientes');
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');
    });

    test('should create expedient from functionary', async ({ page }) => {
        // await assertLoginSuccess(page);
        const navigationBar = new NavigationBar(page);
        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        const createNewExpedientPage = new CreateNewExpedientPage(page);
        const createPartsPage = new CreateNewExpedientPartsPage(page);

        const actor : IParty = buildPartyExample({partyType: "Actor", belongsToIndigenousGroup: "No"});
        const demandado : IParty = buildPartyExample({partyType : "Demandado"});

        await navigationBar.expedientsTab.click();
        await judicialExpedientsPage.newExpedientButton.click();
        
        expedient = await fillExpedientForm(page, expedient);
        await assertExpedientGeneralInformationIsCorrect(page, expedient);
        await createNewExpedientPage.addMainPartyButton.click();

        await fillPartyForm(page, actor);
        await createPartsPage.addPartButton.click();        
        await fillPartyForm(page, demandado);

        await createPartsPage.nextButton.click();

        // await page.pause();
        await assertSummaryCardInformationIsCorrect(page, {
            totalParties: 2,
            actors: 1,
            defendants: 1,
            lawyers: 0
        });
        
         await page.pause();
        // await createNewExpedientPage.saveAndActivateButton.click();


        

    });
});