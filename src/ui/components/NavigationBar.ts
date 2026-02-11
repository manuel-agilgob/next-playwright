import { Page, Locator } from '@playwright/test';

export class NavigationBar {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get expedientsTab(): Locator {
        return this.getTab('Expedientes');
    }

    private getTab(tabName: string): Locator {
        return this.page.getByRole('banner').getByRole('link', { name: tabName, exact: true })
    }

}