
import { Page } from '@playwright/test';
import { AddNewPartForm } from '@ui/forms/AddNewPartForm';
import { IParty } from '@contracts/IParty.type';

export async function fillPartyForm(page: Page, party: IParty, kind='Actor'): Promise<void> {
    const addNewPartForm = new AddNewPartForm(page);
    // Personal Data
    await addNewPartForm.personalSection.typeMultiselect.pickOption(party.type, false);
    await addNewPartForm.personalSection.nameInput.fill(party.names);
    await addNewPartForm.personalSection.paternalLastNameInput.fill(party.paternalLastName);
    await addNewPartForm.personalSection.maternalLastNameInput.fill(party.maternalLastName);
    await addNewPartForm.personalSection.dateOfBirthInput.fill(party.dateOfBirth)
    await addNewPartForm.personalSection.sexMultiselect.pickOption(party.sex);
    await addNewPartForm.personalSection.clasificationMultiselect.pickOption(party.classification);
    await addNewPartForm.personalSection.regimeMultiselect.pickOption(party.regime, false);
    await addNewPartForm.personalSection.aliasInput.fill(party.alias);
    await addNewPartForm.personalSection.ageInput.fill(party.age.toString());
    await addNewPartForm.personalSection.genderMultiselect.pickOption(party.gender);
    await addNewPartForm.personalSection.clasificationMultiselect.pickOption(party.classification);

    // Contact Information
    await addNewPartForm.contactSection.emailInput.fill(party.email);
    await addNewPartForm.contactSection.phoneNumberInput.fill(party.phone);
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
        await addNewPartForm.addPartyButton.click();
    } else if (kind === 'Representative') {
        await addNewPartForm.addRepresentativeButton.click();
    }
    
}