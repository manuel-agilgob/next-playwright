import { expect, Page} from '@playwright/test';
import { HomePage } from '../ui/pages/HomePage';
import { LoginForm} from '../ui/forms/LoginForm';

export async function assertLoginSuccess(page: Page) {
    const homePage = new HomePage(page);
    await expect(homePage.pageTitle).toBeVisible();
}


// FIXME assertrion requires to be more specific.
export async function assertLoginFailure(page: Page) {
    const loginForm = new LoginForm(page);
    await expect(loginForm.errorMessageInvalidCredentials).toBeVisible();
}