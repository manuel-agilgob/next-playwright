# Estructura del proyecto 

``` bash
src/
├── core/                       # Infraestructura
│   ├── browser/
│   │   ├── BrowserFactory.ts
│   │   └── TestContext.ts
│   ├── config/
│   └── hooks/
│
├── domain/                     # Dominio puro (sin UI)
│   ├── user/
│   ├── expediente/
│   └── enums/
│
├── ui/                         # UI = solo representación
│   ├── pages/
│   │   └── LoginPage.ts
│   │
│   ├── components/
│   │   ├── forms/
│   │   │   └── LoginForm.ts
│   │   ├── buttons/
│   │   │   └── SubmitButton.ts
│   │   └── tables/
│   │
│   └── locators/               # Opcional pero recomendado
│       └── login.locators.ts
│
├── actions/                    # Casos de uso (intención)
│   ├── auth/
│   │   └── submitLogin.action.ts
│   └── expediente/
│
├── assertions/                 # Validaciones
│   ├── auth/
│   │   └── login.assert.ts
│   └── common/
│
├── fixtures/                   # Datos de prueba
│   ├── users.fixture.ts
│   └── expediente.fixture.ts
│
├── tests/                      # Tests delgados
│   ├── smoke/
│   ├── regression/
│   └── e2e/
│
├── contracts/                  # 👈 clave para agentes
│   └── ActionContract.ts
│
└── index.ts
```



### Instalacion 

``` bash
# Instala las dependencias
npm i

# Instala las dependencias del navegador de playwright
npx playwright install
```