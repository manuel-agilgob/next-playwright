import {Page, Locator} from '@playwright/test';

export class JudicialExpedientsPage {
    private readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    public get newExpedientButton(): Locator {
        return this.page.getByRole('button', { name: 'Nuevo Expediente' }).first();
    }
}