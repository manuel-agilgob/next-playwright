import { test, expect} from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { buildExpedient } from '@data-builders/expedientNumberBuilder';  
import { buildPartyExample } from '@data-builders/partyBuilder';
import { assertExpedientGeneralInformationIsCorrect, assertSummaryCardInformationIsCorrect } from '@assertions/createExpedientForm.assert';
import { CreateNewExpedientPage } from '@ui/pages/CreateNewExpedientPage';
import { IParty } from '@contracts/IParty.interface';
import { fillPartyForm } from '@actions/createParty.action';

test.describe('Create expedient and parties', () => {

    const expedient = buildExpedient({expedientNumber: '5/2026'});

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

    test('should create expedient from functionary', async ({ page }) => {
        // await assertLoginSuccess(page);
        const navigationBar = new NavigationBar(page);
        await navigationBar.expedientsTab.click();

        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();

        const expedientForm = new GeneralInformationAboutExpedientForm(page);

        await expedientForm.nextExpedientButton.click();
        expedient.expedientNumber = await expedientForm.expedientNumberInput.textContent() || '';
        expect(expedient.expedientNumber).not.toBe('');

        await expedientForm.matterMultiselect.pickOption(expedient.matter);
        await expedientForm.legalWayMultiselect.pickOption(expedient.legalWay);
        await expedientForm.kindExpedientMultiselect.pickOption(expedient.kindExpedient);
        await expedientForm.kindJudgementMultiselect.pickOption(expedient.kindJudgement);
        await expedientForm.mainActionMultiselect.pickOption(expedient.mainAction);
        await page.screenshot({ path: `.tmp/screenshot/expedient_form_filled.png` });
        await expedientForm.nextButton.click();

        await assertExpedientGeneralInformationIsCorrect(page, expedient);

        const createNewExpedientPage = new CreateNewExpedientPage(page);
        await createNewExpedientPage.addMainPartyButton.click();

        const principalParty : IParty =  buildPartyExample({"partyType" : "Actor"});
        
        const actorRepresentative : IParty = {...principalParty, ...{
            "email" : "woutVanAert@jumbovisma.com",
            "partyType" : "Abogado patrono del actor",
            "names" : "Wout",
            "paternalSurname" : "Van Aert",
            "age" : 34,
            "occupation" : "Ciclista profesional"
                    }
            } as IParty;


        await fillPartyForm(page, principalParty);
        const principalPartyCard = createNewExpedientPage.partsOfTheExpedientSection.getPartyCard(principalParty);

        await principalPartyCard.addLegalRepresentativeButton.click();
        await fillPartyForm(page, actorRepresentative, 'Representative');

        // await principalPartyCard.addLegalRepresentativeButton.click();
        // await fillPartyForm(page, actorSecondRepresentative, 'Representative');
        await expedientForm.nextButton.click();
        // await page.pause();
        await assertSummaryCardInformationIsCorrect(page, {
            totalParties: 1,
            actors: 1,
            defendants: 0,
            lawyers: 0
        });
        
        await createNewExpedientPage.saveAndActivateButton.click();


        

    });
});