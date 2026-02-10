# UI Folder Naming Convention

This document defines the file and folder naming standards for the UI layer of the project, which represents the interface using the Page Object Model (POM) pattern and identifies DOM elements using OOP principles.

## General Rules

- All files must use PascalCase for classes and interfaces
- File extensions must be `.ts` for TypeScript files
- Files should have a single responsibility and export one main class
- Folder names use lowercase with hyphens for multi-word names

## Folder Structure

### pages/
Contains page objects that represent complete application pages.

**Naming Pattern:** `{PageName}Page.ts`

**Examples:**
- `LoginPage.ts`
- `DashboardPage.ts`
- `UserProfilePage.ts`
- `ExpedienteDetailPage.ts`

**Rules:**
- Each file represents one complete page
- Class name must match filename: `export class LoginPage`
- Pages should contain methods that return components or perform page-level navigation

### components/
Contains reusable UI components that can be shared across different pages.

**Naming Pattern:** `{ComponentName}Component.ts`

**Examples:**
- `HeaderComponent.ts`
- `SidebarComponent.ts`
- `ModalComponent.ts`
- `NavigationComponent.ts`
- `AlertComponent.ts`

**Rules:**
- Each file represents a reusable UI component
- Class name must match filename: `export class HeaderComponent`
- Components should be independent and reusable across multiple pages

### forms/
Contains form objects that encapsulate form-specific interactions and validations.

**Naming Pattern:** `{FormName}Form.ts`

**Examples:**
- `LoginForm.ts`
- `RegistrationForm.ts`
- `SearchForm.ts`
- `ExpedienteForm.ts`
- `UserProfileForm.ts`

**Rules:**
- Each file represents a complete form with its fields and submission logic
- Class name must match filename: `export class LoginForm`
- Forms should contain methods for filling fields and submitting

## Subfolders in Components

If components grow large, they can be organized into subfolders:

### components/buttons/
**Naming Pattern:** `{ButtonName}Button.ts`

**Examples:**
- `SubmitButton.ts`
- `CancelButton.ts`
- `DeleteButton.ts`

### components/tables/
**Naming Pattern:** `{TableName}Table.ts`

**Examples:**
- `UserTable.ts`
- `ExpedienteTable.ts`
- `DataTable.ts`

### components/dialogs/
**Naming Pattern:** `{DialogName}Dialog.ts`

**Examples:**
- `ConfirmationDialog.ts`
- `ErrorDialog.ts`
- `SuccessDialog.ts`

### components/inputs/
**Naming Pattern:** `{InputName}Input.ts`

**Examples:**
- `TextInput.ts`
- `EmailInput.ts`
- `DatePickerInput.ts`

## Class Structure Guidelines

### Page Objects
```typescript
export class LoginPage {
  constructor(private page: Page) {}
  
  // Locators as private properties
  private readonly usernameInput = this.page.locator('#username');
  
  // Public methods for interactions
  async navigateTo(): Promise<void> { }
  async fillUsername(username: string): Promise<void> { }
}
```

### Form Objects
```typescript
export class LoginForm {
  constructor(private page: Page) {}
  
  // Form-specific locators
  private readonly form = this.page.locator('form#login-form');
  
  // Form interaction methods
  async fill(data: LoginData): Promise<void> { }
  async submit(): Promise<void> { }
}
```

### Component Objects
```typescript
export class HeaderComponent {
  constructor(private page: Page) {}
  
  // Component-specific locators
  private readonly container = this.page.locator('header');
  
  // Component interaction methods
  async clickLogo(): Promise<void> { }
  async getUserName(): Promise<string> { }
}
```

## File Organization Best Practices

1. **Single Responsibility:** Each file should represent one page, component, or form
2. **Clear Naming:** Names should clearly indicate what the file represents
3. **Consistent Suffixes:** Always use Page, Component, or Form suffixes
4. **No Abbreviations:** Use full words for better readability
5. **Logical Grouping:** Group related files in subfolders when the folder grows beyond 10 files

## Examples of Complete File Paths

```
src/ui/pages/LoginPage.ts
src/ui/pages/DashboardPage.ts
src/ui/pages/ExpedienteDetailPage.ts

src/ui/components/HeaderComponent.ts
src/ui/components/SidebarComponent.ts
src/ui/components/buttons/SubmitButton.ts
src/ui/components/tables/ExpedienteTable.ts

src/ui/forms/LoginForm.ts
src/ui/forms/RegistrationForm.ts
src/ui/forms/SearchForm.ts
```

## Anti-Patterns to Avoid

- Mixing lowercase and PascalCase: `loginPage.ts` (incorrect)
- Missing suffixes: `Login.ts` (ambiguous - is it a page, form, or component?)
- Generic names without context: `Form.ts`, `Component.ts`
- Abbreviations: `LgnPg.ts`, `UsrPrflPage.ts`
- Special characters or spaces in filenames

## Maintenance

This naming convention should be followed by all team members. When adding new files to the UI layer, refer to this document to ensure consistency across the codebase.
