import { test } from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { assertExpedientNumberIsValid, assertExpedientNumberIsInvalid, 
    assertExpedientNumberIsDuplicate, assertExpedientNumberShouldNotAcceptFormat} from '@assertions/createExpedientForm.assert';
import { ExpedientsSubMenu } from '@ui/components/ExpedientsSubMenu';


test.describe('Expedient form', () => {
    
    const validExpedientNumbers = [
        // Se espera que se muestre igual en el input
        // son valores validos de número de expediente, aunque no se garantiza que sean únicos en el sistema
        '123/2026',
        '999/2026',
        '001/2026',
    ]

    const invalidExpedientNumbers = [
        // Espera que no se muestre igual en el input
        '1-2026',
        '1.2026',
        '1_2026',
        '1 2026',
        'abc/2026',
        '1/abc'
    ];

    const invalidFormatsShouldBeCut = [
        // Espera que el formato no sea aceptado y que se corte al formato correcto
        '1/2026-Otro',
        '1/2026/Extra',
        '1/20267'
    ]

    const validButDuplicatedExpedientNumbers = [
        // Se asume que el número '1/2026' ya existe en el sistema antes de correr el test
        // Expera que muestre un error explicito, que es duplicado
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

        const expSubmenu = new ExpedientsSubMenu(page);
        await expSubmenu.myExpedientsOption.click();

        // await page.pause();
        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();
    });



    for(const expedient of validExpedientNumbers) {
        test(`Expedient number is valid: ${expedient}`, async ({ page }) => {    
            const expedientForm = new GeneralInformationAboutExpedientForm(page);
            console.log('Testing with expedient number: ', expedient);
            await expedientForm.expedientNumberInput.fill( expedient );
            // await page.pause();
            await page.waitForTimeout(1000); // Wait for potential debounce or async validation to complete
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

    test('Expedient number fills automatically using recomendation button', async ({ page }) => {
        // Arrange
        const form = new GeneralInformationAboutExpedientForm(page);

        // Action
        // await judicialExpedientsPage.newExpedientButton.click();
        await form.nextExpedientButton.click();
        const expedient = await form.expedientNumberInput.textContent();

        // Assertion
        assertExpedientNumberIsValid(page, expedient!);


    })
})