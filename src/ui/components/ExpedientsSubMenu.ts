
import { Page, Locator } from '@playwright/test';

export class ExpedientsSubMenu {
    private readonly wrapper: Locator;

    constructor(page: Page) {
        this.wrapper = page.locator('div.pointer-events-auto');
    }

    private getOptionButton(optionName: string): Locator {
        return this.wrapper.getByText(optionName, {exact: true});
    }

    get myExpedientsOption(): Locator {
        return this.getOptionButton('Mis Expedientes');
    }

    get expedientsToReceiveOption(): Locator {
        return this.getOptionButton('Expedientes Por Recibir');
    }

    get sentExpedientsOption(): Locator {
        return this.getOptionButton('Expedientes Enviados');
    }

    get receivedExpedientsOption(): Locator {
        return this.getOptionButton('Expedientes recibidos');
    }

    get searchTransferenceOption(): Locator {
        return this.getOptionButton('Buscar Transferencia');
    }

    get promotionsOption(): Locator {
        return this.getOptionButton('Promociones');
    }
}