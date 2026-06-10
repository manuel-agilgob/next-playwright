import { Locator, Page } from '@playwright/test';

export class MyExpedientsExpedientsTable {
    public readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    get table(){
        return this.page.locator('table[class*="md:table"]');
    }

    public getExpedientRowByNumber(expedientNumber: string) {
        return new ExpedientRow(this.page, expedientNumber);
    }

    get tableBody(){
        return this.table.locator('tbody');
    }

    get tableRows() {
        return this.tableBody.locator('tr');
    }

}


export class ExpedientRow {
    public readonly page: Page
    private readonly expedientNumber: string;

    constructor(page: Page, expedientNumber: string) {
        this.page = page;
        this.expedientNumber = expedientNumber;
    }

    get table(){
        return this.page.locator('table[class*="md:table"]');
    }

    get root(): Locator {
        return this.table.locator('tr').filter({ 
            has: this.page.getByRole('cell', { name: this.expedientNumber, exact: true }) 
        });
    }

    get checkbox() {
        return this.root.getByRole('checkbox', { name: `Seleccionar expediente ${this.expedientNumber}` });
    }

    get number() {
        return this.root.getByText(this.expedientNumber, { exact: true });
    }

    get dateReceived() {
        return this.root.locator('td').nth(3).locator('span').first();
    }

    get expiration() {
        return this.root.locator('td').nth(5).locator('div.inline-flex').first();
    }

    get turn() {
        return this.root.getByRole('button', { name: 'Turnar' });
    }

    get details() {
        return this.root.getByRole('button', { name: 'Ver detalles' });
    }

}