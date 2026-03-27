import { Page, Locator } from '@playwright/test';

export class NavigationBar {
    private readonly page: Page;
    private readonly nav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nav = page.locator('div.items-center nav');
    }

    public navigationBar(tabName: string): Locator {
        return this.nav.getByRole('button', { name: tabName, exact: true });
    }

    public get initTab(): Locator {
        return this.navigationBar('Inicio');
    }

    public get proceduresTab(): Locator {
        return this.navigationBar('Trámites');
    }

    public get expedientsTab(): Locator {
        return this.navigationBar('Expedientes');
    }

    public get externalTurnTab(): Locator {
        return this.navigationBar('Turnado externo de expedientes');
    }

    public get modifyExpedientTab(): Locator {
        return this.navigationBar('Modificar expedientes');
    }

    public get reportsTab(): Locator {
        return this.navigationBar('Reportes');
    }

    public get permissionsTab(): Locator {
        return this.navigationBar('Permisos');
    }

    public get userManualButton(): Locator {
        return this.page.getByRole('button', { name: 'Manual de usuario', exact: true });
    }
}

