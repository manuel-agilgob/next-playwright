import { test, expect } from '@playwright/test';

import { submitLoginAction } from '../../actions/submitLogin.action';
import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '../../ui/forms/GeneralInformationAboutExpedientForm';
import { 
    assertExpedientNumberIsNotValid, 
    assertExpedientNumberIsEmpty, 
    assertExpedientNumberIsValid } from '../../assertions/createExpedientForm.assert'

import { assertLoginSuccess} from '../../assertions/login.assert';


test.describe('Expedient format when create expedient', () => {

    test.beforeEach(async ({ page, baseURL }) => {
        // Navegar a la página de inicio (las cookies del storageState se aplicarán automáticamente)
        await page.goto('/expedientes');
        // await page.waitForLoadState('networkidle');
        
        // Debug: verificar cookies
        const cookies = await page.context().cookies();
        console.log('Cookies loaded:', cookies.map(c => c.name));
        
        // Navegar a la página de expedientes
        const navigationBar = new NavigationBar(page);
        await navigationBar.expedientsTab.click();

        const judicialExpedientsPage = new JudicialExpedientsPage(page);
        await judicialExpedientsPage.newExpedientButton.click();
    });

    const lastYear = new Date().getFullYear() - 1;
    const currentYear = new Date().getFullYear();
    const nextYear = new Date().getFullYear() + 1;
    const futureYear = new Date().getFullYear() + 2;

    test.describe('Expedient number input should admit', () => {

        const validFormats = [
            {
                description: 'valid format at same year',
                expedientFormat : `1/${currentYear}`
            },
            {
                description: 'valid format at next year',
                expedientFormat : `1/${nextYear}`
            },
            {
                description: 'valid format with suffix at same year',
                expedientFormat : `1/${currentYear}BIS`
            },
            {
                description: 'valid format with suffix at next year',
                expedientFormat : `1/${nextYear}BIS`
            }
        ]

        validFormats.forEach(({description, expedientFormat}) => {
            test( description , async ({ page }) => {
                const expedientForm = new GeneralInformationAboutExpedientForm(page);
                await expedientForm.expedientNumberInput.fill(expedientFormat);
                assertExpedientNumberIsValid(page, expedientFormat);

                await expedientForm.nextButton.click();
                
            });
        });
    
    })

    test.describe('Expedient number input should not admit', () => {

        const invalidFormats = [
            {
                description: 'characters only',
                expedientFormat : 'abcdefg'
            },
            // {
            //     description: 'year with three digits',
            //     expedientFormat : `1/${currentYear.toString().slice(1)}`
            // },
            {
                description: 'year with five digits',
                expedientFormat : `1/${currentYear}0`
            },
            {
                description: 'separator different than /',
                expedientFormat : `1-${currentYear}`
            },
            {   
                description: 'format without separator',
                expedientFormat : `1${currentYear}`
            },
            {
                description: 'valid format two years later',
                expedientFormat : `1/${futureYear}`
            },
            {
                description: 'valid format two years later and posfix',
                expedientFormat : `1/${futureYear}BIS`
            },
            {
                description: 'suffix with special characters #',
                expedientFormat : `1/${currentYear}#`
            },
            {
                description: 'suffix with special characters $%^',
                expedientFormat : `1/${currentYear}$%^`
            },
            {
                description: 'suffix with special characters &*()',
                expedientFormat : `1/${currentYear}&*()`
            },
            {
                description: 'suffix with special character @',
                expedientFormat : `1/${currentYear}@`
            },
            {
                description: 'text with more than 1 / slashes',
                expedientFormat : `1///`
            }
        ]

        invalidFormats.forEach(({description, expedientFormat}) => {
            test( description , async ({ page }) => {
                const expedientForm = new GeneralInformationAboutExpedientForm(page);
                await expedientForm.expedientNumberInput.fill(expedientFormat);
                assertExpedientNumberIsNotValid(page, expedientFormat);
            });
        });

    })

    test.describe('Should show error' , () => {
        test('when input is empty', async ({ page }) => {})
        
        // when year is incomplete 
        // when only number is filled
        // when expedient number is duplicated 
        // when expedient number contains . dot
        // when year is not in valid range <=2024 or >=2027 

    })
});
