import { IParty } from "@contracts/IParty.interface";
import { Locator, Page } from "@playwright/test";


export class CreateNewExpedientPage {
    private readonly page: Page;
    public readonly partsOfTheExpedientSection: PartsOfTheExpedientSection;
    public readonly summaryCard: SummaryCard;
    
    constructor(page: Page) {
        this.page = page;
        this.partsOfTheExpedientSection = new PartsOfTheExpedientSection(page);
        this.summaryCard = new SummaryCard(page);
    }
    
    public get addMainPartyButton(){
        return this.page.getByText('Agregar Parte Principal');
    }

    public get saveAndActivateButton(){
        return this.page.getByRole('button', { name: 'Guardar y Activar' })
    }

}   


class PartsOfTheExpedientSection {
    private readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    getPartyCard(party: IParty): PartyCard {
        return new PartyCard(this.page, party);
    }

}


class PartyCard {
    private readonly page: Page;
    private readonly party: IParty;
    
    constructor(page: Page, party: IParty) {
        this.page = page;
        this.party = party;
    }

    get getContainerByEmail(): Locator {
        return this.page.locator('.space-y-4 .bg-card .p-6').filter({
            hasText: this.party.email
        });
    }

    get addLegalRepresentativeButton() : Locator {
        return this.getContainerByEmail.getByText('Agregar Representante Legal');
    }

    get editPartyButton() : Locator {
        return this.getContainerByEmail.locator('.flex.gap-2 button').first();
    }

    get deletePartyButton() : Locator {
        return this.getContainerByEmail.locator('.flex.gap-2 button').last();
    }
}


class SummaryCard {
    public readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get container(): Locator {
        return this.page.locator('.bg-card').filter({
            has: this.page.getByRole('heading', { name: 'Resumen' })
        })
    }
    
    getRow(label: string): Locator {
        return this.container.locator('div.flex', {
            has: this.page.getByText(label)
        });
    }

    getValue(label: string): Locator {
        return this.getRow(label).locator('span.font-medium');
    }
}