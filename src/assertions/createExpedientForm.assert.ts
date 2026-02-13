import { Page, expect } from '@playwright/test';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';
import { Expedient } from '../data-builders/expedient.interface';
import { ExpedientGeneralInformationSideBar } from '@ui/components/ExpedientGeneralInformationSideBar';

export async function assertExpedientNumberIsValid(page : Page, textContent : string) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    expect( await expedientForm.expedientNumberInput
        .inputValue()).toContain( textContent )
    
}

export async function assertExpNumberNotContainsInvalidChars(page : Page, invalidChars : string) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    expect( await expedientForm.expedientNumberInput
        .inputValue()).not.toContain( invalidChars )
}

export async function assertExpedientNumberShouldNotAcceptFormat(page : Page, invalidFormat : string) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    expect( await expedientForm.expedientNumberInput
        .inputValue()).not.toContain( invalidFormat )
}

export async function assertExpedientGeneralInformationIsCorrect(page : Page, expedient : Expedient) {

        const expedientSideBar = new ExpedientGeneralInformationSideBar(page);

        await expect(expedientSideBar.expedientNumberValue).toHaveText(expedient.expedientNumber);
        await expect(expedientSideBar.kindExpedientValue).toHaveText(expedient.kindExpedient);
        await expect(expedientSideBar.kindJudgementValue).toHaveText(expedient.kindJudgement);
        await expect(expedientSideBar.matterValue).toHaveText(expedient.matter);
        await expect(expedientSideBar.legalWayValue).toHaveText(expedient.legalWay);
        await expect(expedientSideBar.mainActionValue).toHaveText(expedient.mainAction);
}

export async function assertExpLabelIsVisibleAndRed(page : Page) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    await expect(expedientForm.expedientNumberLabel).toBeVisible();
    await expect(expedientForm.expedientNumberLabel).toHaveClass(/text-red-500/);

}


