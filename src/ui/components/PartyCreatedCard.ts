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

    get partyFullName(): Locator {
        return this.getContainerByEmail.locator('h4.font-bold.text-gray-900.text-lg');
    }

    get partyEmail(): Locator {
        return this.getContainerByEmail.locator('span.truncate').filter({
            hasText: /@/
        });
    }

    get partyPhone(): Locator {
        return this.getContainerByEmail.locator('.grid.grid-cols-2 span').filter({
            hasText: /^\d+$/
        });
    }

    get partyAge(): Locator {
        return this.getContainerByEmail.locator('.grid.grid-cols-2 span').filter({
            hasText: /años/
        });
    }

    get partyNationality(): Locator {
        return this.getContainerByEmail.locator('span.text-xs.bg-gray-100');
    }

    get partyAddress(): Locator {
        return this.getContainerByEmail.locator('span.leading-relaxed');
    }
}
