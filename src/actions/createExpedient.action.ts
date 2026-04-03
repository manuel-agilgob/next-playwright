import { IExpedient } from '@contracts/IExpedient.interface';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { Page } from '@playwright/test';
import { CreateNewExpedientPage } from '@ui/pages/CreateNewExpedientPage';

export async function fillExpedientForm(page: any, expedient:IExpedient, chooseNextConsecutive:boolean = true): Promise<IExpedient> {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);

    if(chooseNextConsecutive){
        await expedientForm.nextExpedientButton.click();
    } else {
        await expedientForm.expedientNumberInput.fill(expedient.expedientNumber);
    }

    await expedientForm.matterMultiselect.pickOption(expedient.matter);
    await expedientForm.legalWayMultiselect.pickOption(expedient.legalWay);
    await expedientForm.kindExpedientMultiselect.pickOption(expedient.kindExpedient);
    await expedientForm.kindJudgementMultiselect.pickOption(expedient.kindJudgement);
    await expedientForm.mainActionMultiselect.pickOption(expedient.mainAction);
    
    expedient.expedientNumber = (await expedientForm.expedientNumberTextbox.textContent()) || '';
    console.log('Expedient number obtained from form:', expedient.expedientNumber);
    // await expedientForm.nextButton.click();

    return expedient;
}

export async function  saveAndActivate(page:Page) {
    const createNewExpedientPage = new CreateNewExpedientPage(page);
  const [response] = await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/api/judicial/expedients'),
      {timeout: 20000} 
    ),
    createNewExpedientPage.saveAndActivateButton.click()
  ]);

  return response;
}

