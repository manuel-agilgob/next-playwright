import { Locator, Page } from "@playwright/test";
import { CreateNewExpedientPartsPage } from "./CreateNewExpedientPartsPage";
import { SummaryCard } from "@ui/components/SummaryCard";


export class CreateNewExpedientPage {
    private readonly page: Page;
    public readonly partsOfTheExpedientSection: CreateNewExpedientPartsPage;
    public readonly summaryCard: SummaryCard;
    
    constructor(page: Page) {
        this.page = page;
        this.partsOfTheExpedientSection = new CreateNewExpedientPartsPage(page);
        this.summaryCard = new SummaryCard(page);
    }
    
    public get addMainPartyButton(){
        return this.page.getByText('Agregar Parte Principal');
    }

    public get saveAndActivateButton(){
        return this.page.getByRole('button', { name: 'Guardar y Activar' })
    }

    public expedientActivatedMessage(expedientNumber: string): Locator{
        return this.page.getByLabel('Notifications', { exact: true })
            .getByText(`Expediente ${expedientNumber} creado y activado correctamente`)
    }

}   


