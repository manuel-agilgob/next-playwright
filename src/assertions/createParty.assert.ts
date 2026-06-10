import { AddNewPartForm } from '@ui/forms/AddNewPartForm';
import { PartyCreatedCard } from '@ui/components/PartyCreatedCard';
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';


export async function assertButtonCreateIsEnabledWhenDataIsFilled(page: Page): Promise<void> {
    const addNewPartForm = new AddNewPartForm(page);
    if (!(await addNewPartForm.addPartyButton.isEnabled())) {
        throw new Error('The "Agregar Parte" button should be enabled when all required data is filled.');
    }
}

export async function assertPartyCardIsVisible(page: Page, partyEmail: string): Promise<void> {
    const card = new PartyCreatedCard(page, { email: partyEmail } as any);

    await expect(card.getContainerByEmail).toBeVisible();
}

export async function assertPartyFullNameIsDisplayed(page: Page, party: any): Promise<void> {
    const card = new PartyCreatedCard(page, { email: party.email } as any);
    
    const fullName = `${party.names} ${party.paternalSurname} ${party.maternalSurname}`.trim();
    await expect(card.partyFullName).toContainText(fullName);
}

export async function assertPartyEmailIsDisplayed(page: Page, party: any): Promise<void> {
    const card = new PartyCreatedCard(page, { email: party.email } as any);
    
    await expect(card.partyEmail).toContainText(party.email);
}

export async function assertPartyPhoneIsDisplayed(page: Page, party: any): Promise<void> {
    const card = new PartyCreatedCard(page, { email: party.email } as any);
    
    await expect(card.partyPhone).toContainText(party.phoneNumber);
}

export async function assertPartyAgeIsDisplayed(page: Page, party: any): Promise<void> {
    const card = new PartyCreatedCard(page, { email: party.email } as any);
    
    await expect(card.partyAge).toContainText(`${party.age} años`);
}

export async function assertPartyNationalityIsDisplayed(page: Page, party: any): Promise<void> {
    const card = new PartyCreatedCard(page, { email: party.email } as any);
    
    await expect(card.partyNationality).toContainText(party.nationality);
}

export async function assertPartyAddressIsDisplayed(page: Page, party: any): Promise<void> {
    const card = new PartyCreatedCard(page, { email: party.email } as any);
    
    await expect(card.partyAddress).toContainText(party.address);
}

export async function assertPartyInformationIsCorrectlyDisplayed(page: Page, party: any): Promise<void> {
    const card = new PartyCreatedCard(page, { email: party.email } as any);

    const fullName = `${party.names} ${party.paternalSurname} ${party.maternalSurname}`.trim();
    
    await expect(card.partyFullName).toContainText(fullName);
    await expect(card.partyEmail).toContainText(party.email);
    await expect(card.partyPhone).toContainText(party.phoneNumber);
    await expect(card.partyAge).toContainText(`${party.age} años`);
    await expect(card.partyNationality).toContainText(party.nationality);
    await expect(card.partyAddress).toContainText(party.address);
}