import { IParty } from "@contracts/IParty.interface";
import { Page, Locator } from "@playwright/test";


export class PartyCreatedCard {
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

    get addLegalRepresentativeButton(): Locator {
        return this.getContainerByEmail.getByText('Agregar Representante Legal');
    }

    get editPartyButton(): Locator {
        return this.getContainerByEmail.locator('.flex.gap-2 button').first();
    }

    get deletePartyButton(): Locator {
        return this.getContainerByEmail.locator('.flex.gap-2 button').last();
    }
}
