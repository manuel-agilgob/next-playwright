

import {Page, Locator} from '@playwright/test';


export class AddPartToExpedientCard {
    
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get container(): Locator {
        return this.page.locator('.text-card-foreground').filter({ hasText: 'Agregar Partes al Expediente' });
    }

    get addMainPartButton(): Locator {
        return this.container.getByRole('button', { name: 'Agregar Parte Principal' });
    }
}