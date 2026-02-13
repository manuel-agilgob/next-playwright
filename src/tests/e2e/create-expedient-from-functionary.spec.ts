import { test, expect } from '@playwright/test';

import { submitLoginAction } from '../../actions/submitLogin.action';
import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '../../ui/forms/GeneralInformationAboutExpedientForm';
import { ExpedientGeneralInformationSideBar } from '../../ui/components/ExpedientGeneralInformationSideBar';
import { buildExpedient } from '../../data-builders/expedients/expedient-number-validation';  

import { assertLoginSuccess} from '../../assertions/login.assert';

test.describe('Create expedient from functionary', () => {

    const expedient = buildExpedient({expedientNumber: '5/2026'});

    test.beforeEach(async ({ page, baseURL }) => {

        await page.goto('/expedientes');
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');
    });

    test('should create expedient from functionary', async ({ page }) => {
       
        // await assertLoginSuccess(page);
        const navigationBar = new NavigationBar(page);
        await navigationBar.expedientsTab.click();

        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.nexExpedientButton.click();

        const expedientForm = new GeneralInformationAboutExpedientForm(page);

        await expedientForm.expedientNumberInput.fill( expedient.expedientNumber );

        await expedientForm.matterButton.click();
        await expedientForm.optionByText(expedient.matter).click();

        await expedientForm.legayWayButton.click();
        await expedientForm.optionByText(expedient.legalWay).click();
        
        await expedientForm.kindExpedientButton.click();
        await expedientForm.optionByText(expedient.kindExpedient).click();

        await expedientForm.kindJudgementButton.click();
        await expedientForm.optionByText(expedient.kindJudgement).click();

        await expedientForm.mainActionButton.click();
        await expedientForm.optionByText(expedient.mainAction).click();

        await expedientForm.nextButton.click();

        const expedientSideBar = new ExpedientGeneralInformationSideBar(page);

        // TODO : move to a assertion file
        await expect(expedientSideBar.expedientNumberValue).toHaveText(expedient.expedientNumber);
        await expect(expedientSideBar.kindExpedientValue).toHaveText(expedient.kindExpedient);
        await expect(expedientSideBar.kindJudgementValue).toHaveText(expedient.kindJudgement);
        await expect(expedientSideBar.matterValue).toHaveText(expedient.matter);
        await expect(expedientSideBar.legalWayValue).toHaveText(expedient.legalWay);
        await expect(expedientSideBar.mainActionValue).toHaveText(expedient.mainAction);

        page.pause();


    });
});