
import { Page, Locator } from '@playwright/test';

export class ExpedientReceivedTable {

    constructor(private readonly page: Page) {
    }

    get table(): Locator {
        return this.page.locator('table.w-full');
    }

    get expedientNumberHeader(): Locator {
        return this.page.locator('thead >> button:has-text("Número de expediente")');
    }

    get emitterHeader(): Locator {
        return this.page.locator('thead >> button:has-text("Emisor")');
    }

    get emitterRoleHeader(): Locator {
        return this.page.locator('thead >> button:has-text("Puesto del emisor")');
    }

    get dateOfReceptionHeader(): Locator {
        return this.page.locator('thead >> button:has-text("Fecha de recepción")');
    }

    get actionsHeader(): Locator {
        return this.page.locator('thead >> th:has-text("Acciones")');
    }

    findRowByExpedientNumber(page: Page, expedientNumber: string) : ExpedientReceivedRow {
        return new ExpedientReceivedRow(page, expedientNumber);
    }

    async getAllRows(): Promise<ExpedientReceivedRow[]> {
        const rowsText = await this.table.locator('tbody tr td a').allTextContents();
        
        return rowsText.map(expedientNumber => {
            return new ExpedientReceivedRow(this.page, expedientNumber);
        });
    }

    async isOrderedAscendingByDate(): Promise<boolean> {
        const rows = await this.getAllRows();
        const dates = await Promise.all(rows.map(row => row.dateOfReceptionAsDatetime));
        return dates.every((date, index) => index === 0 || date >= dates[index - 1]);
    }

    async isOrderedDescendingByDate(): Promise<boolean> {
        const rows = await this.getAllRows();
        const dates = await Promise.all(rows.map(row => row.dateOfReceptionAsDatetime));
        return dates.every((date, index) => index === 0 || date <= dates[index - 1]);
    }
}



export class ExpedientReceivedRow {

    private readonly _expedientNumber: string;

    constructor(private readonly page: Page, expedientNumber: string) {
        this._expedientNumber = expedientNumber;
    }

    get expedientNumber(): Locator {
        return this.row.locator('td:first-child a');
    }

    get emitter(): Locator {
        return this.row.locator('td:nth-child(2)');
    }

    get emitterRole(): Locator {
        return this.row.locator('td:nth-child(3)');
    }

    get dateOfReception(): Locator {
        return this.row.locator('td:nth-child(4)');
    }
    get dateOfReceptionAsDatetime(): Promise<Date> {
        return this.dateOfReception.textContent().then(text => {
            if (!text) throw new Error('Date text not found');
            const [datePart, timePart] = text.split(', ');
            const [day, month, year] = datePart.split('/').map(Number);
            const [time, period] = timePart.split(' ');
            const [hours, minutes, seconds] = time.split(':').map(Number);
            
            let adjustedHours = hours;
            if (period === 'p.m.' && hours !== 12) adjustedHours += 12;
            if (period === 'a.m.' && hours === 12) adjustedHours = 0;
            
            return new Date(year, month - 1, day, adjustedHours, minutes, seconds);
        });
    }

    get actionsButton(): Locator {
        return this.row.locator('td:nth-child(5) button');
    }

    get row(): Locator {
        return this.page.locator(`tr:has-text("${this._expedientNumber}")`);
    }

}