import { AddNewPartForm } from '@ui/forms/AddNewPartForm';
import { Page } from '@playwright/test';


export async function assertButtonCreateIsEnabledWhenDataIsFilled(page: Page): Promise<void> {
    const addNewPartForm = new AddNewPartForm(page);
    if (!(await addNewPartForm.addPartyButton.isEnabled())) {
        throw new Error('The "Agregar Parte" button should be enabled when all required data is filled.');
    }
}