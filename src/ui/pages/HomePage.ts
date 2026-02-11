

import { Page, Locator } from '@playwright/test';

export class HomePage {
    
    // Expedients with expirations 

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get pageTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Expedientes con Vencimiento' })
    }

}