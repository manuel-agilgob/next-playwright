import {Page, expect, Locator} from '@playwright/test';


export class JudicialExpedientsPage {
    private readonly page: Page;
    public ExpedientActionsMenuCard: ExpedientActionsMenuCard;
    
    constructor(page: Page) {
        this.page = page;
        this.ExpedientActionsMenuCard = new ExpedientActionsMenuCard(this.page);
    }
    

}   


export class ExpedientActionsMenuCard {
    private readonly page: Page;
    readonly printCoverButton: Locator;
    readonly downloadCoverButton: Locator;
    readonly transferExpedientButton: Locator;
    readonly indicatorsButton: Locator;
    readonly expedientPermissionsButton: Locator;
    readonly addDocumentButton: Locator;
    readonly viewCompleteBookButton: Locator;
    readonly downloadExpedientButton: Locator;
    readonly generateQRButton: Locator;
    readonly listPartsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.printCoverButton = page.getByRole('button', { name: /Imprimir carátula/ });
        this.downloadCoverButton = page.getByRole('button', { name: /Descargar carátula/ });
        this.transferExpedientButton = page.getByRole('button', { name: /Turnar expediente/ });
        this.indicatorsButton = page.getByRole('button', { name: /Indicadores/ });
        this.expedientPermissionsButton = page.getByRole('button', { name: /Permisos de expediente/ });
        this.addDocumentButton = page.getByRole('button', { name: /Agregar documento/ });
        this.viewCompleteBookButton = page.getByRole('button', { name: /Ver Libro Completo/ });
        this.downloadExpedientButton = page.getByRole('button', { name: /Descarga expediente/ });
        this.generateQRButton = page.getByRole('button', { name: /Generar código QR/ });
        this.listPartsButton = page.getByRole('button', { name: /Listar Partes/ });
    }
}