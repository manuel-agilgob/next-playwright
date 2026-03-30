
import { Page, expect } from '@playwright/test';
import { AddNewPartForm } from '@ui/forms/AddNewPartForm';
import { IParty } from '@contracts/IParty.interface';

export async function fillPartyForm(page: Page, party: IParty, kind='Actor'): Promise<void> {
    console.log(`Starting the form filling for ${party.names} with email ${party.email}, kind (${kind})`);
    const addNewPartForm = new AddNewPartForm(page);
    // Personal Data
    await addNewPartForm.personalSection.typeMultiselect.pickOption(party.partyType, false);
    await addNewPartForm.personalSection.nameInput.fill(party.names);
    await addNewPartForm.personalSection.paternalLastNameInput.fill(party.paternalSurname);
    await addNewPartForm.personalSection.maternalLastNameInput.fill(party.maternalSurname);
    await addNewPartForm.personalSection.dateOfBirthInput.fill(party.birthDate)
    await addNewPartForm.personalSection.sexMultiselect.pickOption(party.sex);
    await addNewPartForm.personalSection.clasificationMultiselect.pickOption(party.classification);
    await addNewPartForm.personalSection.regimeMultiselect.pickOption(party.partyRegime, false);
    await addNewPartForm.personalSection.aliasInput.fill(party.alias);
    await addNewPartForm.personalSection.ageInput.fill(party.age.toString());
    await addNewPartForm.personalSection.genderMultiselect.pickOption(party.gender);
    await addNewPartForm.personalSection.clasificationMultiselect.pickOption(party.classification);

    // Contact Information
    await addNewPartForm.contactSection.emailInput.fill(party.email);
    await addNewPartForm.contactSection.phoneNumberInput.fill(party.phoneNumber);
    await addNewPartForm.contactSection.addressInput.fill(party.address)

    // Transparency and Legal Information
    await addNewPartForm.transparencySection.canReadAndWriteMultiselect.pickOption(party.canReadAndWrite);
    await addNewPartForm.transparencySection.speakesSpanishMultiselect.pickOption(party.speaksSpanish);
    await addNewPartForm.transparencySection.gradeOfStudiesMultiselect.pickOption(party.gradeOfStudies);
    await addNewPartForm.transparencySection.civilStatusMultiselect.pickOption(party.civilStatus);
    await addNewPartForm.transparencySection.nationalityMultiselect.pickOption(party.nationality);
    await addNewPartForm.transparencySection.occupationInput.fill(party.occupation);
    for( const val of Object.values(["Sí", "No", "Sí", "No"])) {
        await addNewPartForm.transparencySection.belongsToIndigenousGroupRadioGroup.chooseOption( val );
    }
    if( kind === 'Actor' ) {
        await expect(addNewPartForm.addPartyButton).toBeVisible();
        await expect(addNewPartForm.addPartyButton).toBeEnabled();
        await addNewPartForm.addPartyButton.click();
    } else if (kind === 'Representative') {
        await expect(addNewPartForm.addRepresentativeButton).toBeVisible();
        await expect(addNewPartForm.addRepresentativeButton).toBeEnabled();
        await addNewPartForm.addRepresentativeButton.click();
    }
    console.log(`Filled the form for ${party.names} with email ${party.email}, kind (${kind})`);
    await page.screenshot({ path: `.tmp/screenshot/${party.names}_filled_form.png` });

}