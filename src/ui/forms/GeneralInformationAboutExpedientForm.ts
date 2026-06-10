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

    get expedientNumberTextbox() : Locator {
        return this.page.getByText('Número de Expediente', { exact: true })
            .locator('..')
            .locator('p.tracking-tight')
    }

    get nextExpedientButton(): Locator {
        return this.page.getByText('Siguiente sugerido: ');
    }

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