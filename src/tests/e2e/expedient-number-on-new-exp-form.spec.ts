import { test, expect } from '@playwright/test';


import { NavigationBar } from '@ui/components/NavigationBar';
import { JudicialExpedientsPage } from '@ui/pages/JudicialExpedientsPage';
import { GeneralInformationAboutExpedientForm } from '../../ui/forms/GeneralInformationAboutExpedientForm';
import { 
    assertExpedientNumberIsValid,
    assertExpNumberNotContainsInvalidChars,
    assertExpedientNumberShouldNotAcceptFormat,
    assertExpLabelIsVisibleAndRed 
} from '../../assertions/createExpedientForm.assert';

import { assertExpedientGeneralInformationIsCorrect } from '@assertions/createExpedientForm.assert';
import { buildExpedient } from '../../data-builders/expedients/expedient-number-validation';  


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

    test.describe('Input valid formats', () => {

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
                page.screenshot();
            });
        });
    
    })

    test.describe('Input invalid formats', () => {

        const invalidFormats = [

            {
                description: 'separator different than /',
                expedientFormat : `1-${currentYear}`
            },
            {   
                description: 'format without separator',
                expedientFormat : `1${currentYear}`
            },
            {
                description: 'year too old',
                expedientFormat : `1/1500`
            },
            {
                description: 'year in the far future',
                expedientFormat : `1/3000`
            },
            {
                description: 'year too old with suffix',
                expedientFormat : `1/1500BIS`
            },
            {
                description: 'valid format two years later',
                expedientFormat : `1/${futureYear}`
            },
            {
                description: 'valid format two years later with posfix',
                expedientFormat : `1/${futureYear}BIS`
            }
        ]

        invalidFormats.forEach(({description, expedientFormat}) => {
            test( description , async ({ page }) => {
                const expedientForm = new GeneralInformationAboutExpedientForm(page);
                await expedientForm.expedientNumberInput.fill(expedientFormat);
                assertExpedientNumberShouldNotAcceptFormat(page, expedientFormat);
                page.screenshot();
            });
        });

    })

    test.describe('Input invalid characters' , () => {

        const invalidCharsFormats = [
            {
                description: 'dot character',
                expedientFormat : `1/.`,
                invalidChars: '.'
            },
            {
                description: 'comma character',
                expedientFormat : `1/,`,
                invalidChars: ','
            },
            {
                description: 'semicolon character',
                expedientFormat : `1/;`,
                invalidChars: ';'
            }, 
            {
                description: 'double separator' ,
                expedientFormat : `1//`,
                invalidChars: '//'
            },
            {
                description: 'space character',
                expedientFormat : `1/ `,
                invalidChars: ' '
            },
            {
                description: 'backslash character',
                expedientFormat : `1/\\`,
                invalidChars: '\\'
            },
            {
                description: 'five digits ',
                expedientFormat : `1/20259`,
                invalidChars: '9'
            },
            {
                description: 'characters after separator without year',
                expedientFormat : `1/abc`,
                invalidChars: 'abc'
            },
            {
                description: 'characters before separator without year',
                expedientFormat : `abc/2025`,
                invalidChars: 'abc'
            }
        ];

        invalidCharsFormats.forEach(testCase => {
            test(testCase.description, async ({ page }) => {
                const expedientForm = new GeneralInformationAboutExpedientForm(page);
                await expedientForm.expedientNumberInput.fill(testCase.expedientFormat);
                assertExpNumberNotContainsInvalidChars(page, testCase.invalidChars);
                page.screenshot();
            });
        });
    })


    test.describe('Form invalid formats on submit', () => {

        const invalidFormats = [

            {
                description: 'separator different than /',
                expedientFormat : `1-${currentYear}`
            },
            {   
                description: 'format without separator',
                expedientFormat : `1${currentYear}`
            },
            {
                description: 'year too old',
                expedientFormat : `1/1500`
            },
            {
                description: 'year in the far future',
                expedientFormat : `1/3000`
            },
            {
                description: 'year too old with suffix',
                expedientFormat : `1/1500BIS`
            },
            {
                description: 'valid format two years later',
                expedientFormat : `1/${futureYear}`
            },
            {
                description: 'valid format two years later with posfix',
                expedientFormat : `1/${futureYear}BIS`
            },
            {
                description: 'incomplete year',
                expedientFormat : `1/20`
            },
            {
                description: 'non numeric year',
                expedientFormat : `1/ABCD`
            },
            {
                description: 'missing number before separator',
                expedientFormat : `/2025`
            }
        ]

        invalidFormats.forEach(({description, expedientFormat}) => {
            test( description , async ({ page }) => {

                const expedientForm = new GeneralInformationAboutExpedientForm(page);
                let expedient = buildExpedient({expedientNumber: expedientFormat});

                await expedientForm.expedientNumberInput.fill( expedient.expedientNumber );
                await expedientForm.matterMultiselect.pickOption(expedient.matter);
                await expedientForm.legalWayMultiselect.pickOption(expedient.legalWay);
                await expedientForm.kindExpedientMultiselect.pickOption(expedient.kindExpedient);
                await expedientForm.kindJudgementMultiselect.pickOption(expedient.kindJudgement);
                await expedientForm.mainActionMultiselect.pickOption(expedient.mainAction);
            
                await expedientForm.nextButton.click();
                page.screenshot();
                await assertExpLabelIsVisibleAndRed(page);
                
            });
        });

    })



});
