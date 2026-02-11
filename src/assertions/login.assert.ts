import { HomePage } from '../ui/pages/HomePage';
import { expect, Page} from '@playwright/test';


export async function assertLoginSuccess(page: Page) {
    const homePage = new HomePage(page);
    await expect(homePage.pageTitle).toBeVisible();
}

