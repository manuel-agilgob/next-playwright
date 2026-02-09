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
├── domain/                     # Reglas de negocio
│   ├── user/
│   ├── expediente/
│   └── enums/
│
├── ui/                         # Representacion de la interfaz en modelo POM, solo identifica el DOM en OOP 
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
│   └── locators/  # Se omite esta capa para reducir los niveles de abstraccion
│      
│
├── actions/                    # Casos de uso
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
├── contracts/                  # FUTURE, Pensado para fusion con proyecto de LLM
│   │                           # agentic, por ahora no se toma en consideracion
│   └── ActionContract.ts
│
└── index.ts
```

Para profundizar en la funcion de la carpeta sigue el readme correspondiente:
- [core](./src/core/Readme.md)

### Instalacion 

``` bash
npm install -D @playwright/test@latest
npx playwright install --with-deps

```