import { Page, Locator } from '@playwright/test';
import { ExpedientReceivedTable } from '@ui/components/ExpedientReceivedTable';


enum PaginatorOption {
    Ten = 'Mostrar 10',
    TwentyFive = 'Mostarar 25',
    Fifty = 'Mostrar 50',
    OneHundred = 'Mostrar 100'
}

export class ExpedientReceivedPage {

    public readonly table: ExpedientReceivedTable;

    constructor(private readonly page: Page) {
        this.table = new ExpedientReceivedTable(page);
    }

    get searchInput(): Locator {
        return this.page.locator('.relative input');
    }

    get paginatorSelect(): Locator {
        return this.page.locator('select[aria-label="Tamaño de página"]');
    }

    public pickPaginatorOption(option: PaginatorOption): void {
        this.paginatorSelect.selectOption({ label: option });
    }
}


