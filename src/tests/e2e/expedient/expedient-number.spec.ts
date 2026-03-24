import { test } from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { buildExpedient } from '@data-builders/expedients/expedient-number-validation';  
import { assertExpedientNumberIsValid, assertExpedientNumberIsInvalid, 
    assertExpedientNumberIsDuplicate, assertExpedientNumberShouldNotAcceptFormat} from '@assertions/createExpedientForm.assert';
import { CreateNewExpedientPage } from '@ui/pages/CreateNewExpedientPage';
import { IParty } from '@contracts/IParty.type';
import { fillPartyForm } from '@actions/createParty.action';

test.describe('Expedient form', () => {

    // const expedient = buildExpedient({expedientNumber: '5/2026'});

    const validExpedientNumbers = [
        '123/2026',
        '999/2026',
        '1/2026BIS',
        '1/2026CUADERNILLO'
    ]

    const invalidExpedientNumbers = [
        '1-2026',
        '1.2026',
        '1_2026',
        '1 2026'
    ];

    const invalidFormatsShouldBeCut = [
        '1/2026-Otro',
        '1/2026/Extra',
        '1/20267'
    ]

    const validButDuplicatedExpedientNumbers = [
        '1/2026'
    ]

    test.beforeEach(async ({ page }) => {

        // await page.goto(process.env.BASE_URL || '/');
        // await page.waitForLoadState('networkidle');
        // const email = process.env.USER_EMAIL || '';
        // const password = process.env.USER_PASSWORD || '';
    
        // if(!email || !password) {
        //     throw new Error('USER_EMAIL and USER_PASSWORD must be set in environment variables');
        // }

        await page.goto('/expedientes');

        await page.waitForLoadState('networkidle');

        const navigationBar = new NavigationBar(page);
        await navigationBar.expedientsTab.click();

        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();
    });

    for(const expedient of validExpedientNumbers) {
        test(`Expedient number is valid: ${expedient}`, async ({ page }) => {    
            const expedientForm = new GeneralInformationAboutExpedientForm(page);
            console.log('Testing with expedient number: ', expedient);
            await expedientForm.expedientNumberInput.fill( expedient );
            assertExpedientNumberIsValid(page, expedient);
            // await page.pause();
        });
    }

    for( const expedient of invalidExpedientNumbers) {
        test(`Expedient number should not accept invalid format: ${expedient}`, async ({ page }) => {
            const expedientForm = new GeneralInformationAboutExpedientForm(page);
            console.log('Testing with expedient number: ', expedient);
            await expedientForm.expedientNumberInput.fill( expedient );
            assertExpedientNumberIsInvalid(page, expedient);
            // await page.pause();
        })
    }

    for( const expedient of invalidFormatsShouldBeCut) {
        test(`Expedient number should not accept invalid format and cut it: ${expedient}`, async ({ page }) => {
            const expedientForm = new GeneralInformationAboutExpedientForm(page);
            console.log('Testing with expedient number: ', expedient);
            await expedientForm.expedientNumberInput.fill( expedient );
            assertExpedientNumberShouldNotAcceptFormat(page, expedient);
            // await page.pause();
        })
    }


    for( const expedient of validButDuplicatedExpedientNumbers) {
        test(`Expedient number should not accept duplicate number: ${expedient}`, async ({ page }) => {
            const expedientForm = new GeneralInformationAboutExpedientForm(page);
            console.log('Testing with expedient number: ', expedient);
            
            await expedientForm.expedientNumberInput.fill(expedient);
            await expedientForm.expedientNumberInput.press('Enter');

            assertExpedientNumberIsDuplicate(page, expedient);

            // await page.pause();
        })
    }
});