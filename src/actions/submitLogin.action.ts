import { LoginForm } from "@ui/forms/LoginForm";
import { Page } from '@playwright/test';

export async function submitLoginAction(page:Page , email: string, password: string) {
    const loginForm = new LoginForm(page);
    await loginForm.emailInput.fill(email);
    await loginForm.passwordInput.fill(password);
    await loginForm.loginButton.click();
}