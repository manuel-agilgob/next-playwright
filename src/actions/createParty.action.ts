
import { Page, expect } from '@playwright/test';
import { AddNewPartForm } from '@ui/forms/AddNewPartForm';
import { IParty } from '@contracts/IParty.interface';

export async function fillPartyForm(page: Page, party: IParty, kind='Actor'): Promise<void> {
    console.log(`Starting the form filling for ${party.names} with email ${party.email}, kind (${kind})`);
    const form = new AddNewPartForm(page);
    // Personal Data
    await form.personalSection.typeMultiselect.pickOption(party.partyType, false);
    await form.personalSection.nameInput.fill(party.names);
    await form.personalSection.paternalLastNameInput.fill(party.paternalSurname);
    await form.personalSection.maternalLastNameInput.fill(party.maternalSurname);
    await form.personalSection.dateOfBirthInput.fill(party.birthDate)
    await form.personalSection.sexMultiselect.pickOption(party.sex);
    await form.personalSection.clasificationMultiselect.pickOption(party.classification);
    await form.personalSection.regimeMultiselect.pickOption(party.partyRegime, false);
    await form.personalSection.aliasInput.fill(party.alias);
    await form.personalSection.ageInput.fill(party.age.toString());
    await form.personalSection.genderMultiselect.pickOption(party.gender);
    await form.personalSection.clasificationMultiselect.pickOption(party.classification);

    // Contact Information
    await form.contactSection.emailInput.fill(party.email);
    await form.contactSection.phoneNumberInput.fill(party.phoneNumber);
    await form.contactSection.addressInput.fill(party.address)

    // Transparency and Legal Information
    await form.transparencySection.canReadAndWriteMultiselect.pickOption(party.canReadAndWrite);
    await form.transparencySection.speakesSpanishMultiselect.pickOption(party.speaksSpanish);
    await form.transparencySection.gradeOfStudiesMultiselect.pickOption(party.gradeOfStudies);
    await form.transparencySection.civilStatusMultiselect.pickOption(party.civilStatus);
    await form.transparencySection.nationalityMultiselect.pickOption(party.nationality);
    await form.transparencySection.occupationInput.fill(party.occupation);
    // for( const val of Object.values(["Sí", "No", "Sí", "No"])) {
    //     await form.transparencySection.belongsToIndigenousGroupRadioGroup.chooseOption( val );
    // }
    if( kind === 'Actor' ) {
        await expect(form.addPartyButton).toBeVisible();
        await expect(form.addPartyButton).toBeEnabled();
        await form.addPartyButton.click();
    } else if (kind === 'Representative') {
        await expect(form.addRepresentativeButton).toBeVisible();
        await expect(form.addRepresentativeButton).toBeEnabled();
        await form.addRepresentativeButton.click();
    }
    console.log(`Filled the form for ${party.names} with email ${party.email}, kind (${kind})`);
    await page.screenshot({ path: `.tmp/screenshot/${party.names}_filled_form.png` });

}