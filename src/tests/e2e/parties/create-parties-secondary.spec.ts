import { test, expect} from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { CreateNewExpedientPartsPage } from '@ui/pages/CreateNewExpedientPartsPage';
import { fillExpedientForm } from '@actions/createExpedient.action';
import { buildExpedient } from '@data-builders/expedientNumberBuilder';  
import { buildParty } from '@data-builders/partyBuilder';
import { assertExpedientGeneralInformationIsCorrect, assertSummaryCardInformationIsCorrect } from '@assertions/createExpedientForm.assert';
import { CreateNewExpedientPage } from '@ui/pages/CreateNewExpedientPage';
import { IParty } from '@contracts/IParty.interface';
import { fillPartyForm } from '@actions/createParty.action';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';

test.describe('Secondary parties', () => {

    let expedient = buildExpedient({expedientNumber: '5/2026'});

    test.beforeEach(async ({ page }) => {

        await page.goto(process.env.BASE_URL || '/');
        await page.waitForLoadState('networkidle');
        const email = process.env.USER_EMAIL || '';
        const password = process.env.USER_PASSWORD || '';
    
        if(!email || !password) {
            throw new Error('USER_EMAIL and USER_PASSWORD must be set in environment variables');
        }
        // await submitLoginAction(page, email, password);
        // await assertLoginSuccess(page);

        await page.goto('/expedientes');
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');
    });
    
    test('secondary parties can be attached to primary parties', async ({ page }) => {
        // await assertLoginSuccess(page);
        const navigationBar = new NavigationBar(page);
        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        const createNewExpedientPage = new CreateNewExpedientPage(page);
        const expedientForm = new GeneralInformationAboutExpedientForm(page);

        await navigationBar.expedientsTab.click();
        await judicialExpedientsPage.newExpedientButton.click();
        
        expedient = await fillExpedientForm(page, expedient);

        await assertExpedientGeneralInformationIsCorrect(page, expedient);
        await createNewExpedientPage.addMainPartyButton.click();


        const actor : IParty =  buildParty({"partyType" : "Actor"});
        
        const actorRepresentative : IParty = {...actor, ...{
            "email" : "woutVanAert@jumbovisma.com",
            "partyType" : "Abogado patrono del actor",
            "names" : "Wout",
            "paternalSurname" : "Van Aert",
            "age" : 34,
            "occupation" : "Ciclista profesional"
                    }
            } as IParty;


        await fillPartyForm(page, actor);
        const principalPartyCard = createNewExpedientPage.partsOfTheExpedientSection.getPartyCard(actor);
        await principalPartyCard.addLegalRepresentativeButton.click({timeout: 10000});
        await fillPartyForm(page, actorRepresentative, 'Representative');

        await expedientForm.nextButton.click();

        await assertSummaryCardInformationIsCorrect(page, {
            totalParties: 1,
            actors: 1,
            defendants: 0,
            lawyers: 0
        });
        // await page.pause();
        await createNewExpedientPage.saveAndActivateButton.click();


        

    });



});