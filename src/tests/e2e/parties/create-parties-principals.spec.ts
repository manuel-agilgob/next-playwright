import { test, expect} from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { buildExpedient } from '@data-builders/expedientNumberBuilder';  
import { assertExpedientGeneralInformationIsCorrect, assertSummaryCardInformationIsCorrect } from '@assertions/createExpedientForm.assert';
import { CreateNewExpedientPage } from '@ui/pages/CreateNewExpedientPage';
import { CreateNewExpedientPartsPage } from '@ui/pages/CreateNewExpedientPartsPage';
import { IParty } from '@contracts/IParty.interface';
import { fillPartyForm } from '@actions/createParty.action';
import { fillExpedientForm } from '@actions/createExpedient.action';
import { buildParty } from '@data-builders/partyBuilder';
import { submitLoginAction } from '@actions/submitLogin.action';
import { assertLoginSuccess } from '@assertions/login.assert';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { AddNewPartForm } from '@ui/forms/AddNewPartForm';
import { assertPartyInformationIsCorrectlyDisplayed } from '@assertions/createParty.assert';

test.describe('Create expedient and parties', () => {

    let expedient = buildExpedient({expedientNumber: '5/2026'});
    const actor : IParty = buildParty({partyType: "Actor", belongsToIndigenousGroup: "No"});
    const demandado : IParty = buildParty({partyType : "Demandado"});
    

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

        const navigationBar = new NavigationBar(page);
        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        const expedientForm = new GeneralInformationAboutExpedientForm(page);

        await navigationBar.expedientsTab.click();
        await judicialExpedientsPage.newExpedientButton.click();
        expedient = await fillExpedientForm(page, expedient);
        await expedientForm.nextButton.click();
    });

    test('Company name field is shown when the party is kind Moral', async ({ page }) => {
        const createNewExpedientPage = new CreateNewExpedientPage(page);
        const form = new AddNewPartForm(page);

        await createNewExpedientPage.addMainPartyButton.click();
        const moralParty : IParty = buildParty({partyType: "Actor", partyRegime: 'Persona Moral'});

        await form.personalSection.regimeMultiselect.pickOption(moralParty.partyRegime, true);
        expect( await form.personalSection.companyNameInput).toBeVisible();
        await form.personalSection.companyNameInput.fill( moralParty.companyName!);
        expect( await form.personalSection.companyNameInput.inputValue()).toBe(moralParty.companyName!);
    })

    test('Indigenous group question is shown when the party is classified as indigenous', async ({ page }) => {
        const createNewExpedientPage = new CreateNewExpedientPage(page);
        const form = new AddNewPartForm(page);

        await createNewExpedientPage.addMainPartyButton.click();
        const moralParty : IParty = buildParty({partyType: "Actor", belongsToIndigenousGroup: "Sí"});
        await form.transparencySection.belongsToIndigenousGroupRadioGroup.chooseOption( moralParty.belongsToIndigenousGroup);
        expect( await form.transparencySection.ingenousCommunityLabel).toBeVisible();
    })

    test('Principal information is shown correctly in party card.', async ({ page }) => {
        const createNewExpedientPage = new CreateNewExpedientPage(page);

        await createNewExpedientPage.addMainPartyButton.click();
        await fillPartyForm(page, actor);

        await assertPartyInformationIsCorrectlyDisplayed(page, actor);
    })


    test('Parties summary card should reflect the correct number of parties added', async ({ page }) => {
        const createNewExpedientPage = new CreateNewExpedientPage(page);
        const createPartsPage = new CreateNewExpedientPartsPage(page);
        const expedientForm = new GeneralInformationAboutExpedientForm(page);

        await assertExpedientGeneralInformationIsCorrect(page, expedient);
        await createNewExpedientPage.addMainPartyButton.click();

        await fillPartyForm(page, actor);
        await createPartsPage.addPartButton.click();        
        await fillPartyForm(page, demandado);

        await expedientForm.nextButton.click();
        await assertSummaryCardInformationIsCorrect(page, {
            totalParties: 2,
            actors: 1,
            defendants: 1,
            lawyers: 0
        });
    });



});