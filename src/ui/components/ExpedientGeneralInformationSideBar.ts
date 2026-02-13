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
    get kindExpedientLabel(): Locator {
        return this.page.getByText('Tipo de Expediente');
    }
    get kindExpedientValue(): Locator {
        return this.kindExpedientLabel.locator('..').locator('p.font-semibold');
    }

    // Tipo de Juicio
    get kindJudgementLabel(): Locator {
        return this.page.getByText('Tipo de Juicio');
    }
    get kindJudgementValue(): Locator {
        return this.kindJudgementLabel.locator('..').locator('p.font-semibold');
    }

    // Materia
    get matterLabel(): Locator {
        return this.page.getByText('Materia', { exact: true });
    }
    get matterValue(): Locator {
        return this.matterLabel.locator('..').locator('p.font-semibold');
    }

    // Vía
    get legalWayLabel(): Locator {
        return this.page.getByText('Vía', { exact: true });
    }
    get legalWayValue(): Locator {
        return this.legalWayLabel.locator('..').locator('p.font-semibold');
    }

    // Accion Principal
    get mainActionLabel(): Locator {
        return this.page.getByText('Acción Principal');
    }
    get mainActionValue(): Locator {
        return this.mainActionLabel.locator('..').locator('p.font-semibold');
    }
}