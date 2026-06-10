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

    test.describe('The expedients are ordered by date of receipt.', () => {
        
        // test(`CASE : The expedients are ordered by date of receipt.`, async ({ page }) => {
        //     const myExpedients = new MyExpedientsPage(page);

        //     const [response] = await Promise.all([
        //         page.waitForResponse(res =>
        //             res.url().includes('/api/judicial/expedients?'),
        //             {timeout: 5000} 
        //         ),
        //         page.goto('/mis-expedientes')
        //     ]);

        //     console.log('Response status:', response.body() );

        //     const expedientRows = myExpedients.expedientsTable.tableRows;

        // })


            
        
    })



})

