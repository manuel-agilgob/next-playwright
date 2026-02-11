import { Page, Locator } from '@playwright/test';

export class GeneralInformationAboutExpedientForm {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    public get expedientNumberInput(): Locator {
        return this.page.locator('#expedientNumber');
    }

    public get expedientTypeButton(): Locator {
        return this.page.getByText('Escribe para buscar tipo de expediente...')
            .locator('..');
    }

    public get matterButton(): Locator {
        return this.page.getByText('Escribe para buscar materia...')
            .locator('..');
    }

    public get judgementTypeButton(): Locator {
        return this.page.getByText('Seleccione primero una materia')
            .locator('..');
    }

    public get legayWayButton(): Locator {
        return this.page.getByText('Seleccione la vía del proceso.')
            .locator('..');
    }


    public get mainActionButton(): Locator {
        return this.page.getByText('Seleccione primero una materia')
            .locator('..');
    }


    
}