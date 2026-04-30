import { ExpedientReceivedPage } from '@ui/pages/ExpedientReceivedPage';
import { NavigationBar } from '@ui/components/NavigationBar';
import { test, expect } from '@playwright/test';


test.describe('Expedients received searchbar', () => {

    const expedientNumber = '11/2026';
    const emmiter = 'FAMILIAR TERCERO'


    test.beforeEach(async ({ page }) => {
        await page.goto('/expedientes/received');
    });

    const casesByExpedientNumber = [
        { description: 'prefix consecutive only', caseInput: expedientNumber.split('/')[0] },
        { description: 'prefix "L"', caseInput: "L" + expedientNumber },
        { description: 'exact match', caseInput:  expedientNumber },
        { description: 'posfix space', caseInput: expedientNumber + " " },
        { description: 'prefix space', caseInput:  " " + expedientNumber },
    ]

    for( const { description, caseInput } of casesByExpedientNumber) {

        test(`should find using ${description}` , async ({ page }) => {
            const expedientReceivedPage = new ExpedientReceivedPage(page);
            await expedientReceivedPage.searchInput.fill(caseInput);
            await expedientReceivedPage.searchInput.press('Enter');
            await page.waitForTimeout(1000); // Esperar a que se actualice la tabla

            const row = expedientReceivedPage.table.findRowByExpedientNumber(page, expedientNumber);
            await expect(row.expedientNumber).toHaveText(expedientNumber);
        })

    }


    test('should find using emmiter' , async ({ page }) => {
        const expedientReceivedPage = new ExpedientReceivedPage(page);

        await expedientReceivedPage.searchInput.fill(emmiter);
        await expedientReceivedPage.searchInput.press('Enter');
        await page.waitForTimeout(1000); // Esperar a que se actualice la tabla

        const row = expedientReceivedPage.table.findRowByExpedientNumber(page, expedientNumber);
        await expect(row.expedientNumber).toHaveText(expedientNumber);
    })

    test('should find using emmiter partially' , async ({ page }) => {
        const expedientReceivedPage = new ExpedientReceivedPage(page);

        await expedientReceivedPage.searchInput.fill(emmiter.split(' ')[0]);
        await expedientReceivedPage.searchInput.press('Enter');
        await page.waitForTimeout(1000); // Esperar a que se actualice la tabla

        const row = expedientReceivedPage.table.findRowByExpedientNumber(page, expedientNumber);
        await expect(row.expedientNumber).toHaveText(expedientNumber);
    })

    const nameCases = [
        { caseType: 'upper case', input: emmiter.toUpperCase() },
        { caseType: 'lower case', input: emmiter.toLowerCase() },
        { caseType: 'capitalized', input: emmiter.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }
    ];
    for( const { caseType, input } of nameCases) {
        test(`should find using emitter with ${caseType}`, async ({ page }) => {
            
            const expedientReceivedPage = new ExpedientReceivedPage(page);

            await expedientReceivedPage.searchInput.fill(input);
            await expedientReceivedPage.searchInput.press('Enter');

            const row = expedientReceivedPage.table.findRowByExpedientNumber(page, expedientNumber);

            await expect(row.expedientNumber).toBeVisible();
            await expect(row.expedientNumber).toHaveText(expedientNumber);
        });
    }


})



test.describe('Expedients received table', () => {
    test.beforeEach(async ({ page }) => {
        const expedientReceivedPage = new ExpedientReceivedPage(page);
        await page.goto('/expedientes/received');
        await page.waitForLoadState('domcontentloaded')
        await expect(expedientReceivedPage.table.table).toBeVisible();
    });

    test('Table is ordered by date of reception descending by default', async ({ page }) => {
        const expedientReceivedPage = new ExpedientReceivedPage(page);
        const isDescending = await expedientReceivedPage.table.isOrderedDescendingByDate();
        expect(isDescending).toBeTruthy();
    })

    test('reorders by date of reception when clicking the header', async ({ page }) => {
        const expedientReceivedPage = new ExpedientReceivedPage(page);

        expect(await expedientReceivedPage.table.isOrderedDescendingByDate()).toBeTruthy();

        await expedientReceivedPage.table.dateOfReceptionHeader.click();
        await page.waitForTimeout(1000); // Esperar a que se actualice la tabla

        expect(await expedientReceivedPage.table.isOrderedAscendingByDate()).toBeTruthy();
    })

    test.skip('keep order when navigate to other views', async ({ page }) => {
        // TODO El caso de prueba me parece que era al paginador, no a la vista :(
        test.setTimeout(25_000)
        const expedientReceivedPage = new ExpedientReceivedPage(page);
        const navigationBar = new NavigationBar(page);

        expect(await expedientReceivedPage.table.isOrderedDescendingByDate()).toBeTruthy();

        await navigationBar.proceduresTab.click();
        await page.waitForTimeout(1000); 

        expect(await expedientReceivedPage.table.isOrderedAscendingByDate()).toBeTruthy();

        await page.goBack();
        expect(expedientReceivedPage.table.table).toBeVisible({timeout: 5000});
        expect(await expedientReceivedPage.table.isOrderedAscendingByDate()).toBeTruthy();
    })
})
