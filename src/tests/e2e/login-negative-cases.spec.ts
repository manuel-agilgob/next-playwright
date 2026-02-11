import { test, expect } from '@playwright/test';
import { LoginForm } from '../../ui/forms/LoginForm';
import { submitLoginAction } from '../../actions/submitLogin.action';
import { assertLoginFailure } from '../../assertions/login.assert';

test.describe('Login Negative Test Cases - Security and Validation', () => {

    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL || '/');
        await page.waitForLoadState('networkidle');
    });

    test.describe('Empty Fields Validation', () => {
        
        test('should not login with empty email and empty password', async ({ page }) => {
            const loginForm = new LoginForm(page);
            
            await loginForm.emailInput.fill('');
            await loginForm.passwordInput.fill('');
            await loginForm.loginButton.click();
            
            await assertLoginFailure(page);
        });

        test('should not login with empty email and valid password', async ({ page }) => {
            const loginForm = new LoginForm(page);
            
            await loginForm.emailInput.fill('');
            await loginForm.passwordInput.fill('12345678');
            await loginForm.loginButton.click();
            
            await assertLoginFailure(page);
        });

        test('should not login with valid email and empty password', async ({ page }) => {
            const loginForm = new LoginForm(page);
            
            await loginForm.emailInput.fill('familiar@cjj.com');
            await loginForm.passwordInput.fill('');
            await loginForm.loginButton.click();
            
            await assertLoginFailure(page);
        });
    });

    test.describe('Invalid Email Format', () => {
        
        test('should not login with email without @ symbol', async ({ page }) => {
            await submitLoginAction(page, 'invalidemail.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with email without domain', async ({ page }) => {
            await submitLoginAction(page, 'user@', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with email without local part', async ({ page }) => {
            await submitLoginAction(page, '@domain.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with email with spaces', async ({ page }) => {
            await submitLoginAction(page, 'user @domain.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with email with multiple @ symbols', async ({ page }) => {
            await submitLoginAction(page, 'user@@domain.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with email with invalid characters', async ({ page }) => {
            await submitLoginAction(page, 'user#name@domain.com', '12345678');
            await assertLoginFailure(page);
        });
    });

    test.describe('Invalid Credentials', () => {
        
        test('should not login with wrong password', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', 'wrongpassword');
            await assertLoginFailure(page);
        });

        test('should not login with non-existent email', async ({ page }) => {
            await submitLoginAction(page, 'nonexistent@email.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with correct email but wrong case in password', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', 'WRONGCASE');
            await assertLoginFailure(page);
        });

        test('should not login with password with trailing spaces', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', '12345678 ');
            await assertLoginFailure(page);
        });

        test('should not login with password with leading spaces', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', ' 12345678');
            await assertLoginFailure(page);
        });
    });

    test.describe('Security - SQL Injection Attempts', () => {
        
        test('should not login with SQL injection in email field', async ({ page }) => {
            await submitLoginAction(page, "' OR '1'='1", '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with SQL injection in password field', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', "' OR '1'='1");
            await assertLoginFailure(page);
        });

        test('should not login with SQL injection DROP TABLE attempt', async ({ page }) => {
            await submitLoginAction(page, "admin@test.com'; DROP TABLE users;--", '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with SQL UNION injection', async ({ page }) => {
            await submitLoginAction(page, "' UNION SELECT * FROM users--", '12345678');
            await assertLoginFailure(page);
        });
    });

    test.describe('Security - XSS Attempts', () => {
        
        test('should not allow XSS script tag in email', async ({ page }) => {
            await submitLoginAction(page, '<script>alert("XSS")</script>', '12345678');
            await assertLoginFailure(page);
        });

        test('should not allow XSS script tag in password', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', '<script>alert("XSS")</script>');
            await assertLoginFailure(page);
        });

        test('should not allow XSS with event handlers', async ({ page }) => {
            await submitLoginAction(page, '<img src=x onerror=alert("XSS")>', '12345678');
            await assertLoginFailure(page);
        });
    });

    test.describe('Boundary Testing - Field Length', () => {
        
        test('should not login with extremely long email', async ({ page }) => {
            const longEmail = 'a'.repeat(500) + '@domain.com';
            await submitLoginAction(page, longEmail, '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with extremely long password', async ({ page }) => {
            const longPassword = 'a'.repeat(1000);
            await submitLoginAction(page, 'familiar@cjj.com', longPassword);
            await assertLoginFailure(page);
        });

        test('should not login with single character password', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', 'a');
            await assertLoginFailure(page);
        });

        test('should not login with password less than minimum length', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', '123');
            await assertLoginFailure(page);
        });
    });

    test.describe('Special Characters and Encoding', () => {
        
        test('should not login with unicode characters in email', async ({ page }) => {
            await submitLoginAction(page, '用户@domain.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with emoji in email', async ({ page }) => {
            await submitLoginAction(page, '😀@domain.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with null bytes in email', async ({ page }) => {
            await submitLoginAction(page, 'user\x00@domain.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with HTML entities in credentials', async ({ page }) => {
            await submitLoginAction(page, '&lt;user&gt;@domain.com', '12345678');
            await assertLoginFailure(page);
        });
    });

    test.describe('Case Sensitivity', () => {
        
        test('should not login with email in different case if case-sensitive', async ({ page }) => {
            await submitLoginAction(page, 'FAMILIAR@CJJ.COM', '12345678');
            // Note: This might pass if email is case-insensitive, adjust based on your app behavior
            await assertLoginFailure(page);
        });

        test('should not login with mixed case in email local part', async ({ page }) => {
            await submitLoginAction(page, 'FaMiLiAr@cjj.com', '12345678');
            await assertLoginFailure(page);
        });
    });

    test.describe('Multiple Login Attempts', () => {
        
        test('should handle multiple failed login attempts', async ({ page }) => {
            // Attempt 1
            await submitLoginAction(page, 'familiar@cjj.com', 'wrong1');
            await assertLoginFailure(page);
            
            // Attempt 2
            await submitLoginAction(page, 'familiar@cjj.com', 'wrong2');
            await assertLoginFailure(page);
            
            // Attempt 3
            await submitLoginAction(page, 'familiar@cjj.com', 'wrong3');
            await assertLoginFailure(page);
            
            // Check if account gets locked or rate limited (adjust based on your app)
            await expect(page.locator('body')).toContainText(/error|locked|attempts/i);
        });
    });

    test.describe('Form Manipulation', () => {
        
        test('should not login when submitting form without filling fields', async ({ page }) => {
            const loginForm = new LoginForm(page);
            await loginForm.loginButton.click();
            await assertLoginFailure(page);
        });

        test('should validate client-side before submission', async ({ page }) => {
            const loginForm = new LoginForm(page);
            
            // Try to submit with invalid email
            await loginForm.emailInput.fill('invalid-email');
            await loginForm.passwordInput.fill('12345678');
            
            // Check if HTML5 validation prevents submission
            const emailInput = await loginForm.emailInput.elementHandle();
            const validationMessage = await emailInput?.evaluate((el: HTMLInputElement) => el.validationMessage);
            
            expect(validationMessage).toBeTruthy();
        });
    });

    test.describe('Whitespace Handling', () => {
        
        test('should not login with only whitespace in email', async ({ page }) => {
            await submitLoginAction(page, '   ', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with only whitespace in password', async ({ page }) => {
            await submitLoginAction(page, 'familiar@cjj.com', '   ');
            await assertLoginFailure(page);
        });

        test('should not login with tab characters in credentials', async ({ page }) => {
            await submitLoginAction(page, 'familiar\t@cjj.com', '12345678');
            await assertLoginFailure(page);
        });

        test('should not login with newline characters in credentials', async ({ page }) => {
            await submitLoginAction(page, 'familiar\n@cjj.com', '12345678');
            await assertLoginFailure(page);
        });
    });
});
