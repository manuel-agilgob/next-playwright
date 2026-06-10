import { Page, Locator } from "@playwright/test";


export class SummaryCard {
    public readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get container(): Locator {
        return this.page.locator('.bg-card').filter({
            has: this.page.getByRole('heading', { name: 'Resumen' })
        });
    }

    getRow(label: string): Locator {
        return this.container.locator('div.flex', {
            has: this.page.getByText(label)
        });
    }

    getValue(label: string): Locator {
        return this.getRow(label).locator('span.font-medium');
    }
}
