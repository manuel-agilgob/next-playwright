import { Page, Locator } from '@playwright/test';

export class LoginForm {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get emailInput(): Locator {
        return this.page.locator('#email');
    }
    
    public get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    public get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Ingresar' });
    }

    public get forgotPasswordLink(): Locator {
        return this.page.getByRole('link', { name: '¿Olvidaste tu contraseña? Para recuperarla haz clic aquí' });
    }   


    // Error messages
    public get errorMessageInvalidCredentials(): Locator {
        return this.page.getByText('Email o contraseña incorrectos')
    }

    // TODO. Add selectors for every error message
    public get errorMessageInvalidEmailFormat(): Locator {
        // return this.page.getByText('Email o contraseña incorrectos')
    }

    public get errorMessageEmptyPassword(): Locator {
        
    }

    public get errorMessageEmptyEmail(): Locator {
        
    }



}