import { Page, Locator } from '@playwright/test';


export class RadioGroup {
  constructor(
    private readonly page: Page,
    private readonly groupLabel: string
  ) {}

  private get container(): Locator {
    return this.page.locator('div').filter({
      has: this.page.getByText(this.groupLabel)
    }).getByRole('radiogroup')
  }

  public getOption(value: string): Locator {
    return this.container.getByRole('radio', { name: value })
  }

  public async chooseOption(value: string) {
    await this.getOption(value).click()
  }
}
