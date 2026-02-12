import { Page, expect } from '@playwright/test';
import { GeneralInformationAboutExpedientForm } from '@ui/forms/GeneralInformationAboutExpedientForm';

export async function assertExpedientNumberIsValid(page : Page, textContent : string) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    expect( await expedientForm.expedientNumberInput
        .inputValue()).toContain( textContent )
    
}

export async function assertExpedientNumberIsNotValid(page : Page, textContent : string) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    expect( await expedientForm.expedientNumberInput
        .inputValue()).not.toContain( textContent )
    
}

export async function assertExpedientNumberIsEmpty(page : Page) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    expect( await expedientForm.expedientNumberInput
        .inputValue()).toBe('')
    
}

export async function assertExpedientNumberWraperIsRed(page : Page) {
    const expedientForm = new GeneralInformationAboutExpedientForm(page);
    expect( expedientForm.expedientNumberInput.locator('..')).toHaveClass(/text-red-500/)    
}

// export async function assertLoginSuccess(page: Page) {
//     const homePage = new HomePage(page);
//     await expect(homePage.pageTitle).toBeVisible();
// }

