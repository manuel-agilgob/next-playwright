import { Page, Locator } from '@playwright/test';

export class Multiselect {
    private readonly page: Page;
    public readonly label: string;

    constructor(
        page: Page,
        label: string,
    ){
        this.page = page;
        this.label= label;
    }

    public get container() : Locator {
        return this.page.locator('.space-y-2')
            .filter({ hasText: this.label });
    }

    public get button() : Locator {
        return this.container.getByRole('combobox').or(
            this.container.getByRole('button')
);
    }

    public findOptionByText(text: string, exact: boolean = true): Locator {
        return this.page.getByRole('option', { name: text, exact: exact })
            .or(this.page.getByRole('button', { name: text, exact: exact }));
    }



    /**
     * Selects an option from the multiselect dropdown by exact text match.
     * @param text - The exact text of the option to select (case-sensitive)
     * @returns A promise that resolves when the option has been clicked
     */
    public async pickOption(text: string, exact: boolean = true): Promise<void> {
        await this.button.click();
        await this.findOptionByText(text, exact).click();
    }
}

    // public get placeholder() : Locator {
    //     return this.container.locator('span.truncate').first();
    // }

    // public get hintText() : Locator {
    //     return this.container.locator('p.text-muted-foreground').first();
    // }