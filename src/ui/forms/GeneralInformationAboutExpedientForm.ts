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

    get title(): Locator {
        return this.page.getByText('Información General del Expediente' );
    }

    get container(): Locator {
        return this.title.locator('..').locator('..');
    }

    get expedientNumberLabel(): Locator {
        return this.container.getByText('Número de Expediente', { exact: false });
    }   

    get expedientNumberInput(): Locator {
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

    get nextButton(): Locator {
        return this.page.getByRole('button', { name: 'Siguiente' });
    }   

    
    private optionsList(): Locator {
        return this.page.locator('.text-popover-foreground');
    }

    public optionByText(text: string): Locator {
        return this.optionsList().getByText(text, { exact: true });
    }

    // Icon located inside expedient number input
    get expedientNumberGreenIcon(): Locator {
        return this.page.locator('.lucide.lucide-circle-check.h-4');
    }

    get expedientNumberRedIcon(): Locator {
        return this.page.locator('.lucide.lucide-circle-alert.h-4');
    }

    get expedientDuplicatedAlert(): Locator {
        return this.page.getByText('Este número de expediente ya');
    }
    
    // Icon located in header of form, next to title
    get expedientNumberInvalidIcon(): Locator {
        return this.page.locator('.lucide.lucide-circle-alert').first();
    }

    get expedientNumberValidIcon(): Locator {
        return this.page.locator('.lucide.lucide-circle-check').first();
    }




}