import { Page, Locator } from '@playwright/test';
import { Multiselect } from '@ui/components/Multiselect.component';

export class GeneralInformationAboutExpedientForm {
    private readonly page: Page;
    public readonly matterMultiselect: Multiselect;
    public readonly legalWayMultiselect: Multiselect;
    public readonly kindExpedientMultiselect: Multiselect;
    public readonly kindJudgementMultiselect: Multiselect;
    public readonly mainActionMultiselect: Multiselect;



    constructor(page: Page) {
        this.page = page;
        this.matterMultiselect = new Multiselect(page, 'Materia *');
        this.legalWayMultiselect = new Multiselect(page, 'Vía *');
        this.kindExpedientMultiselect = new Multiselect(page, 'Tipo de Expediente');
        this.kindJudgementMultiselect = new Multiselect(page, 'Tipo de Juicio');
        this.mainActionMultiselect = new Multiselect(page, 'Acción Principal');
    }

    public get title(): Locator {
        return this.page.getByText('Información General del Expediente' );
    }

    public get container(): Locator {
        return this.title.locator('..').locator('..');
    }

    public get expedientNumberLabel(): Locator {
        return this.container.getByText('Número de Expediente', { exact: false });
    }   

    public get expedientNumberInput(): Locator {
        return this.page.locator('#expedientNumber');
    }

    // public get kindExpedientButton(): Locator {
    //     return this.page.getByText('Escribe para buscar tipo de expediente...')
    //         .locator('..');
    // }

    // public get matterButton(): Locator {
    //     return this.page.getByText('Escribe para buscar materia...')
    //         .locator('..');
    // }

    // public get kindJudgementButton(): Locator {
    //     return this.page.getByText('Escribe para buscar tipo de juicio...')
    //         .locator('..');
    // }

    // public get legayWayButton(): Locator {
    //     return this.page.getByText('Seleccione la vía del proceso.')
    //         .locator('..');
    // }


    // public get mainActionButton(): Locator {
    //     return this.page.getByText('Escribe para buscar acción principal...')
    //         .locator('..');
    // }

    public get nextButton(): Locator {
        return this.page.getByRole('button', { name: 'Siguiente' });
    }   

    
    private optionsList(): Locator {
        return this.page.locator('.text-popover-foreground');
    }

    public optionByText(text: string): Locator {
        return this.optionsList().getByText(text, { exact: true });
    }

}