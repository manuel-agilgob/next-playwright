import { Page } from '@playwright/test';
import { MyExpedientsExpedientsTable } from '@ui/components/MyExpedientsExpedients.table';

export class MyExpedientsPage {
    public readonly page: Page
    public readonly expedientsTable: MyExpedientsExpedientsTable;

    constructor(page: Page) {
        this.page = page;
        this.expedientsTable = new MyExpedientsExpedientsTable(page);
    }

    get myExpedientsTitle() {
        return this.page.getByRole('heading', { level: 1, name: 'Mis expedientes' });
    }

    get subTitle(){
        return this.page.getByText('Expedientes de mi juzgado asignados a mi')
    }

    get inputSearchBar() {
        return this.page.locator('input[placeholder*="expediente"]');
    }

    get notFoundExpedientMessage(){
        return this.page.getByText('No se encontraron expedientes con los criterios ingresados')
    }

    get searchButton() {
        return this.page.getByRole('button', { name: 'Buscar' })
    }

    get clearSearchButton() {
        return this.page.getByRole('button', { name: 'Limpiar' })
    }


    public getExpedientRowByNumber(expedientNumber: string) {
        return this.page.getByRole('cell', { name: expedientNumber, exact: true })
    }

} 