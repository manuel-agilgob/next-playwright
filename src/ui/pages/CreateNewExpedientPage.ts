import { Page } from "@playwright/test";


export class CreateNewExpedientPage {
    private readonly page: Page;

    
    constructor(page: Page) {
        this.page = page;
    }
    
    public get addMainPartyButton(){
        return this.page.getByText('Agregar Parte Principal');
    }

}   
