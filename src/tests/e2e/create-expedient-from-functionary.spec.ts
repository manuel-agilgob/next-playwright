import { test } from '@playwright/test';

import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '../../ui/forms/GeneralInformationAboutExpedientForm';
import { buildExpedient } from '../../data-builders/expedients/expedient-number-validation';  
import { assertExpedientGeneralInformationIsCorrect } from '@assertions/createExpedientForm.assert'
import { Multiselect } from '@ui/components/Multiselect.component';

import { submitLoginAction } from '@actions/submitLogin.action';
import { assertLoginSuccess} from '@assertions/login.assert';
import { test as setup } from '@playwright/test';

test.describe('Create expedient from functionary', () => {

    const expedient = buildExpedient({expedientNumber: '5/2026'});

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
        await navigationBar.expedientsTab.click();

        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();

        const expedientForm = new GeneralInformationAboutExpedientForm(page);

        await expedientForm.expedientNumberInput.fill( expedient.expedientNumber );
        await expedientForm.matterMultiselect.pickOption(expedient.matter);
        await expedientForm.legalWayMultiselect.pickOption(expedient.legalWay);
        await expedientForm.kindExpedientMultiselect.pickOption(expedient.kindExpedient);
        await expedientForm.kindJudgementMultiselect.pickOption(expedient.kindJudgement);
        await expedientForm.mainActionMultiselect.pickOption(expedient.mainAction);
    

        await expedientForm.nextButton.click();

        await assertExpedientGeneralInformationIsCorrect(page, expedient);


    });
});