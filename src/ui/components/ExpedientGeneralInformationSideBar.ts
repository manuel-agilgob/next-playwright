import {Page, Locator} from '@playwright/test';


export class ExpedientGeneralInformationSideBar {
    
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get container(): Locator {
        return this.page.locator('.rounded-lg.border.sticky');
    }

    get title(): Locator {
        return this.page.getByRole('heading', { name: 'Información General' });
    }

    get description(): Locator {
        return this.page.getByText('Datos básicos del expediente');
    }

    get editButton(): Locator {
        return this.page.getByRole('button', { name: 'Editar' });
    }

    // Número de Expediente
    get expedientNumberLabel(): Locator {
        return this.page.getByText('Expediente', { exact: true });
    }
    get expedientNumberValue(): Locator {
        return this.expedientNumberLabel
        .locator('..')
        .locator('p.font-semibold');
    }

    // Tipo de Expediente
    get expedientTypeLabel(): Locator {
        return this.page.getByText('Tipo de Expediente');
    }
    get expedientTypeValue(): Locator {
        return this.expedientTypeLabel.locator('..').locator('p.font-semibold');
    }

    // Tipo de Juicio
    get trialTypeLabel(): Locator {
        return this.page.getByText('Tipo de Juicio');
    }
    get trialTypeValue(): Locator {
        return this.trialTypeLabel.locator('..').locator('p.font-semibold');
    }

    // Materia
    get matterLabel(): Locator {
        return this.page.getByText('Materia', { exact: true });
    }
    get matterValue(): Locator {
        return this.matterLabel.locator('..').locator('p.font-semibold');
    }

    // Vía
    get pathLabel(): Locator {
        return this.page.getByText('Vía', { exact: true });
    }
    get pathValue(): Locator {
        return this.pathLabel.locator('..').locator('p.font-semibold');
    }

    // Accion Principal
    get mainActionLabel(): Locator {
        return this.page.getByText('Acción Principal');
    }
    get mainActionValue(): Locator {
        return this.mainActionLabel.locator('..').locator('p.font-semibold');
    }
}