import { IExpedient } from '@contracts/IExpedient.interface';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';



export async function fillExpedientForm(page: any, expedient:IExpedient): Promise<IExpedient> {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);

    await expedientForm.nextExpedientButton.click();
    await expedientForm.matterMultiselect.pickOption(expedient.matter);
    await expedientForm.legalWayMultiselect.pickOption(expedient.legalWay);
    await expedientForm.kindExpedientMultiselect.pickOption(expedient.kindExpedient);
    await expedientForm.kindJudgementMultiselect.pickOption(expedient.kindJudgement);
    await expedientForm.mainActionMultiselect.pickOption(expedient.mainAction);
    
    expedient.expedientNumber = (await expedientForm.expedientNumberTextbox.textContent()) || '';
    console.log('Expedient number obtained from form:', expedient.expedientNumber);
    await expedientForm.nextButton.click();

    return expedient;
}