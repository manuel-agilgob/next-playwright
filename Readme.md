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
- [domain](./src/domain/Readme.md)

### Instalacion 

``` bash
npm install -D @playwright/test@latest
npx playwright install --with-deps

```


# Limitantes en las pruebas
Dado que las pruebas se ejecutan con Persistent Test Data, algunos datos generados (como expedientes o documentos) no pueden eliminarse. Esto provoca acumulación de información en la aplicación, lo que condiciona la ejecución de ciertas pruebas, ya que dependen de estados o datos previamente creados.

Esta situación introduce riesgos como la contaminación de datos y la posibilidad de falsos positivos o negativos, debido a la falta de aislamiento entre escenarios.

Para mitigar estas dependencias, se utiliza un archivo de seguimiento temporal (.tmp) que actúa como mecanismo de control. Este archivo registra banderas sobre el estado de ejecución de pruebas previas y permite omitir aquellas que, por sus dependencias no satisfechas, están destinadas a fallar. Con esto se evita la ejecución innecesaria y la pérdida de tiempo.

Es importante señalar que este enfoque funciona como un workaround temporal, no como una solución definitiva. A futuro, se debe considerar una estrategia que permita el aislamiento y/o limpieza de datos de prueba, garantizando independencia entre escenarios y mayor confiabilidad en los resultados.



# Notas personales 
[interceptions - saveAndActivate](src/actions/createExpedient.action.ts)