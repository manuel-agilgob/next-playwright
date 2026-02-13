import { Page, Locator } from '@playwright/test';

export class Multiselect {
    private readonly page: Page;
    public readonly label: string;
    // public readonly placeholder: string;
    // public readonly hintText: string;


    constructor(
        page: Page,
        label: string,
        // placeholder: string,
        // hintText: string
    ){
        this.page = page;
        this.label= label;
        // this.placeholder = placeholder;
        // this.hintText = hintText;
    }

    public get container() : Locator {
        return this.page.locator('.space-y-2')
            .filter({ hasText: this.label });
    }

    public get button() : Locator {
        return this.container.getByRole('button');
    }

    public findOptionByText(text: string) : Locator {
        return this.container.getByRole('button', { name: text, exact: true });
    }

    /**
     * Selects an option from the multiselect dropdown by exact text match.
     * @param text - The exact text of the option to select (case-sensitive)
     * @returns A promise that resolves when the option has been clicked
     */
    public async pickOption(text: string) : Promise<void> {
        await this.button.click();
        await this.findOptionByText(text).click();
    }

    public get placeholder() : Locator {
        return this.container.locator('span.truncate').first();
    }

    public get hintText() : Locator {
        return this.container.locator('p.text-muted-foreground').first();
    }

}