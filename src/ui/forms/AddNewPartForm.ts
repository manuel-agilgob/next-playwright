import { Page, Locator } from '@playwright/test';
import { Multiselect } from '@ui/components/Multiselect.component';
import { RadioGroup } from '@ui/components/RadioGroup.component';

export class AddNewPartForm {
    private readonly page: Page;

    public readonly contactSection: ContactSection;
    public readonly transparencySection : TransparencyAndLegalInformationSection;
    public readonly personalSection: PersonalSection;

    constructor(page: Page) {

        this.page = page;
        this.contactSection = new ContactSection(page);
        this.transparencySection = new TransparencyAndLegalInformationSection(page);
        this.personalSection = new PersonalSection(page);
    }

}


class ContactSection {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get emailInput(): Locator {
        return this.page.getByLabel('Correo electrónico');
    }

    get phoneNumberInput(): Locator {
        return this.page.getByLabel('Teléfono');
    }

    get addressInput(): Locator {
        return this.page.getByLabel('Domicilio / residencia');
    }
}

class PersonalSection {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get clasificationMultiselect(): Multiselect {
        return new Multiselect(this.page, 'Clasificación');
    }

    get sexMultiselect(): Multiselect {
        return new Multiselect(this.page, 'Sexo');
    }

    get genderMultiselect(): Multiselect {
        return new Multiselect(this.page, 'Género');
    }


    get partyRegimeMultiselect(): Multiselect {
        return new Multiselect(this.page, 'Régimen de la Parte');
    }


    get occupationInput(): Locator {
        return this.page.getByLabel('Ocupación');
    }

    get nameInput(): Locator {
        return this.page.getByLabel('* Nombres');
    }

    get paternalLastNameInput(): Locator {
        return this.page.getByLabel('* Apellido Paterno');
    }
    
    get maternalLastNameInput(): Locator {
        return this.page.getByLabel('Apellido Materno');
    }

    get aliasInput(): Locator {
        return this.page.getByLabel('Alias');
    }
    
    // get dateOfBirthCalendar(): Locator {
        // TODO Crear el componente de calendarios
    // }

    get ageInput(): Locator {
        return this.page.getByLabel('Edad');
    }
}

class TransparencyAndLegalInformationSection {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get nationalityMultiselect(): Multiselect {
        return new Multiselect(this.page, 'Nacionalidad');
    }

    get speakesSpanishMultiselect(): Multiselect {
        return new Multiselect(this.page, '¿Sabe hablar español?');
    }

    get civilStatusMultiselect(): Multiselect {
        return new Multiselect(this.page, 'Estado Civil');
    }

    get belongsToIndigenousGroupRadioGroup(): RadioGroup {
        return new RadioGroup(this.page, '¿Pertenece a una comunidad indígena?');
    }

    get canReadAndWriteMultiselect(): Multiselect {
        return this.canReadAndWriteMultiselect;
    }

    get gradeOfStudiesMultiselect(): Multiselect {
        return new Multiselect(this.page, 'Grado de Estudios');
    }

    // get belongsToIndigenousGroupRadio(): RadioGroup {
    //     // TODO Crear el componente de RadioGroup
    // }
}