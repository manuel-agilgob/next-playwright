import { IParty } from "@contracts/IParty.interface";
import { Page } from "@playwright/test";
import { AddPartToExpedientCard } from "@ui/components/AddPartToExpedientCard";
import { ExpedientGeneralInformationSideBar } from "@ui/components/ExpedientGeneralInformationSideBar";
import { PartyCreatedCard } from "@ui/components/PartyCreatedCard";


export class CreateNewExpedientPartsPage {
    private readonly page: Page;
    private readonly addPartToExpedientCard: AddPartToExpedientCard;
    private readonly generalInformationCard: ExpedientGeneralInformationSideBar;

    constructor(page: Page) {
        this.page = page;
        this.addPartToExpedientCard = new AddPartToExpedientCard(page);
        this.generalInformationCard = new ExpedientGeneralInformationSideBar(page);
    }

    getPartyCard(party: IParty): PartyCreatedCard {
        return new PartyCreatedCard(this.page, party);
    }

    get addPartButton() {
        return this.page.getByRole('button', { name: 'Agregar Parte' });
    }

}



