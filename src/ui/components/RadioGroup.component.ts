import { Page, Locator } from '@playwright/test';


export class RadioGroup {
  constructor(
    private readonly page: Page,
    private readonly groupLabel: string
  ) {}

    private get container(): Locator {
        return this.page
            .getByText(this.groupLabel)
            .locator('..'); 
    }


    public option(value: string): Locator {
        return this.container.getByRole('radio', { name: value });
    }

    public async select(value: string): Promise<void> {
        await this.option(value).check();
    }
}
