import { Page, Locator } from '@playwright/test';

import { Multiselect } from '@ui/components/Multiselect.component';

export class GeneralInformationAboutExpedientForm {
    private readonly page: Page;

    public readonly partyTypeMultiselect: Multiselect;
    public readonly clasificationMultiselect: Multiselect;
    public readonly partyRegimeMultiselect: Multiselect;
    public readonly genderMultiselect: Multiselect;
    public readonly canReadAndWriteMultiselect: Multiselect;
    public readonly gradeOfStudiesMultiselect: Multiselect;
    public readonly nationalityMultiselect: Multiselect;
    public readonly speakesSpanishMultiselect: Multiselect;
    public readonly civilStatusMultiselect: Multiselect;
    public readonly occupationMultiselect: Multiselect;


    constructor(page: Page) {
        this.page = page;

        this.partyTypeMultiselect = new Multiselect(this.page, 'Tipo de Parte');
        this.clasificationMultiselect = new Multiselect(this.page, 'Clasificación');
        this.partyRegimeMultiselect = new Multiselect(this.page, 'Régimen de la Parte');
        this.genderMultiselect = new Multiselect(this.page, 'Género');
        this.canReadAndWriteMultiselect = new Multiselect(this.page, '¿Puede Leer y Escribir?');
        this.gradeOfStudiesMultiselect = new Multiselect(this.page, 'Grado de Estudios');
        this.nationalityMultiselect = new Multiselect(this.page, 'Nacionalidad');
        this.speakesSpanishMultiselect = new Multiselect(this.page, '¿Sabe hablar español?');
        this.civilStatusMultiselect = new Multiselect(this.page, 'Estado Civil');
        this.occupationMultiselect = new Multiselect(this.page, 'Ocupación');
    }

    

}