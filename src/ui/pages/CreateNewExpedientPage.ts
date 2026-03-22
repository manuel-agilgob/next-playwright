import { IParty } from "@contracts/IParty.type";
import { Locator, Page } from "@playwright/test";


export class CreateNewExpedientPage {
    private readonly page: Page;
    public readonly partsOfTheExpedientSection: PartsOfTheExpedientSection;
    
    constructor(page: Page) {
        this.page = page;
        this.partsOfTheExpedientSection = new PartsOfTheExpedientSection(page);
    }
    
    public get addMainPartyButton(){
        return this.page.getByText('Agregar Parte Principal');
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