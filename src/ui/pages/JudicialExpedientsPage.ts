import {Page, expect, Locator} from '@playwright/test';

export class JudicialExpedientsPage {
    private readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    public get nexExpedientButton(): Locator {
        return this.page.getByRole('button', { name: 'Nuevo Expediente' });
    }
}