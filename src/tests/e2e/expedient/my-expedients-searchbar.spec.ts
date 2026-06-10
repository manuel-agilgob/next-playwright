import { expect, test} from '@playwright/test';
import { MyExpedientsPage } from '@ui/pages/MyExpedientsPage';

test.describe('Mis Expedientes - Searchbar', () => {

    test.beforeEach(async ({ page }) => {
        const myExpedients = new MyExpedientsPage(page);

        await page.goto('/mis-expedientes');
    
        await expect(myExpedients.myExpedientsTitle).toBeVisible();
        await expect(myExpedients.subTitle).toBeVisible();
        await myExpedients.inputSearchBar.waitFor({ state: 'visible', timeout: 3000 });

        await page.waitForLoadState('networkidle');
    })

        test.describe('Should find expedient by exact number', () => {
        for( const expedient of ['1/2026', '10/2026', '18/2026']){
            test(`CASE : ${expedient}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(expedient);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000);
                const expedientRow = await myExpedients.getExpedientRowByNumber(expedient);

                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( expedientRow ).toBeVisible();

            })
        }
    })

    test.describe('Searchbar should not find expedient that does not exist', () => {
        for( const expedient of ['999/2026', 'abc/2026', '@/2026' ]){
            test(`CASE : ${expedient}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(expedient);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000);

                await myExpedients.notFoundExpedientMessage.waitFor({ state: 'attached', timeout: 3000 })
                await myExpedients.notFoundExpedientMessage.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( myExpedients.notFoundExpedientMessage ).toBeVisible();

            })
        }
    })

    type CaseBySurname = {expedientNumber: string, surname: string};

    test.describe('Should search expedient by paternal surname', () => {
        for( const {expedientNumber, surname} of [
            {expedientNumber: '1/2026', surname: 'Barrios Reyna'},
            {expedientNumber: '3/2026', surname: 'Raya de Muñoz'},
            {expedientNumber: '5/2026', surname: 'Yami Cintrón'},
        ] as CaseBySurname[]){
            test(`CASE : ${expedientNumber} - ${surname}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(surname);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000); // Do not remove, because row can be found 
                // before search results are updated, causing test to fail

                const expedientRow = await myExpedients.getExpedientRowByNumber(expedientNumber);
                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( expedientRow ).toBeVisible();

            })
        }
    })

    test.describe('Should search cases by name without accents', () => {
        for( const {expedientNumber, surname} of [
            // Accents are removed in search, but should find expedient
            {expedientNumber: '5/2026', surname: 'Yami Cintron'}, 
            {expedientNumber: '1/2026', surname: 'Quevedo Hernadez'}, 
            {expedientNumber: '5/2026', surname: 'de Anda Jaquez'}, 
            {expedientNumber: '19/2026', surname: 'Monica Gomez Vega'},

        ] as CaseBySurname[]){
            test(`CASE : ${expedientNumber} - ${surname}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(surname);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000); // Do not remove, because row can be found 
                // before search results are updated, causing test to fail

                const expedientRow = await myExpedients.getExpedientRowByNumber(expedientNumber);
                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( expedientRow ).toBeVisible();
            })
        }
    })

    test.describe('Should search expedient by paternal surname in UPPERCASE', () => {
        for( const {expedientNumber, surname} of [
            {expedientNumber: '1/2026', surname: 'BARRIOS REYNA'},
            {expedientNumber: '3/2026', surname: 'RAYA DE MUÑOZ'},
            {expedientNumber: '5/2026', surname: 'YAMI CINTRÓN'},
        ] as CaseBySurname[]){
            test(`CASE : ${expedientNumber} - ${surname}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(surname);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000); // Do not remove, because row can be found 
                // before search results are updated, causing test to fail

                const expedientRow = await myExpedients.getExpedientRowByNumber(expedientNumber);
                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( expedientRow ).toBeVisible();

            })
        }
    })

    type CaseByKind = {expedientNumber: string, surname: string, kind: string};

    test.describe('Should search by Actor and Defendant', () => {
        for( const {expedientNumber, surname, kind} of [
            {expedientNumber: '2/2026', surname: 'Benjamín Araña Pichardo', kind : 'Actor'},
            {expedientNumber: '3/2026', surname: 'Benito Raya de Muñoz', kind : 'Actor'},
            {expedientNumber: '1/2026', surname: 'Claudia Kanzaki Casares', kind : 'Defendant'},
            {expedientNumber: '2/2026', surname: 'Emilio Prado Nava', kind : 'Defendant'},
        ] as CaseByKind[]){
            test(`CASE : ${expedientNumber} - ${surname} - ${kind}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(surname);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000); // Do not remove, because row can be found 
                // before search results are updated, causing test to fail

                const expedientRow = await myExpedients.getExpedientRowByNumber(expedientNumber);
                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( expedientRow ).toBeVisible();

            })
        }
    })

    test.describe('Should search expedient by maternal surname', () => {
        for( const {expedientNumber, surname} of [
            {expedientNumber: '6/2026', surname: 'Quiroz Henríquez'},
            {expedientNumber: '7/2026', surname: 'Duarte de Lerma'},
            {expedientNumber: '8/2026', surname: 'Carbajal Cortés'},
        ] as CaseBySurname[]){
            test(`CASE : ${expedientNumber} - ${surname}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(surname);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000); // Do not remove, because row can be found 
                // before search results are updated, causing test to fail

                const expedientRow = await myExpedients.getExpedientRowByNumber(expedientNumber);
                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( expedientRow ).toBeVisible();

            })
        }
    })

    test.describe('Should search expedient by fullname', () => {
        for( const {expedientNumber, surname} of [
            {expedientNumber: '8/2026', surname: 'MARGARITA SOSA MOTA CARBAJAL CORTÉS'},
            {expedientNumber: '9/2026', surname: 'Ana Luisa Muñiz Mercado Perea Menchaca'},
            {expedientNumber: '11/2026', surname: 'Luis Loya de Zarate Mojica de Khalid'},
        ] as CaseBySurname[]){
            test(`CASE : ${expedientNumber} - ${surname}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(surname);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000); // Do not remove, because row can be found 
                // before search results are updated, causing test to fail

                const expedientRow = await myExpedients.getExpedientRowByNumber(expedientNumber);
                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                // Assert
                expect( expedientRow ).toBeVisible();

            })
        }
    })

    test.describe('Should clear search button and show all expedients', () => {
        for( const expedient of ['1/2026', '10/2026', '18/2026']){
            test(`CASE : ${expedient}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                // Actions
                await myExpedients.inputSearchBar.fill(expedient);
                await myExpedients.inputSearchBar.press('Enter');
                await page.waitForTimeout(1000);

                const expedientRow = await myExpedients.getExpedientRowByNumber(expedient);
                await expedientRow.waitFor({ state: 'attached', timeout: 3000 })
                await expedientRow.waitFor({ state: 'visible', timeout: 3000 });

                expect( expedientRow ).toBeVisible();

                await myExpedients.clearSearchButton.waitFor({'state' : 'visible', timeout: 1500});
                await myExpedients.clearSearchButton.click();
                await page.waitForTimeout(1000);

                await expect( myExpedients.expedientsTable.tableRows ).toHaveCount(10);
            })
        }
    })

    test.describe('Should navigate to expedient details', () => {
        for( const expedient of ['1/2026', '10/2026', '18/2026']){
            test(`CASE : ${expedient}`, async ({ page }) => {
                // Arrange
                const myExpedients = new MyExpedientsPage(page);
                
                
                await myExpedients.inputSearchBar.fill(expedient);
                await myExpedients.inputSearchBar.press('Enter');

                const expedientRow = myExpedients.expedientsTable.getExpedientRowByNumber(expedient);
                await expect(expedientRow.number).toBeVisible();
                await expedientRow.number.click();

                await expect(page.getByText(`Expediente ${expedient}`)).toBeVisible();
                await expect(page).toHaveURL(/\/expedientes\/\d+/);

                // const printCoverButton = expedientDetails.expedientActionsMenuCard.printCoverButton;
                // await expect(printCoverButton).toBeVisible();

                // await expect(expedientDetails.title)
                //     .toHaveText(`Expediente ${expedient}`);

            })
        }
    })


})