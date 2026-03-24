# ¿Cómo funciona `domain/`?

La carpeta `domain/` contiene **reglas de negocio puras** del proyecto.

En este repositorio de pruebas E2E, el dominio no debería depender de Playwright ni del DOM. Su objetivo es modelar conceptos de negocio (por ejemplo: usuario, expediente, estados, validaciones y transiciones) para que luego otras capas (`actions/`, `fixtures/`, `assertions/`) los consuman.

## Principios de esta capa

1. **Sin dependencias de UI**
   - No importar `Page`, `Locator` ni clases de `src/ui`.
2. **Sin side-effects de infraestructura**
   - Evitar llamadas de red, filesystem o acceso directo a variables de entorno aquí.
3. **Modelos y reglas explícitas**
   - Representar entidades, value objects y enums de forma tipada.
4. **Reutilizable por cualquier test**
   - Cualquier suite (`smoke`, `regression`, `e2e`) puede usar estas reglas.

## Estructura sugerida

```bash
src/domain/
├── user/
│   ├── User.ts
│   ├── UserRole.ts
│   └── UserRules.ts
├── expediente/
│   ├── Expedient.ts
│   ├── ExpedientStatus.ts
│   └── ExpedientRules.ts
└── enums/
    ├── Country.ts
    └── DocumentType.ts
```

## ¿Cómo crear archivos en `domain/` y subcarpetas?

### 1) Crear subcarpeta por subdominio
Ejemplo: si la funcionalidad es de expediente, usar `src/domain/expediente/`.

### 2) Separar por responsabilidad
- `Entidad.ts`: estructura principal del concepto de negocio.
- `*Status.ts` o `*Type.ts`: enums y catálogos de estados/tipos.
- `*Rules.ts`: funciones puras de validación/transición.

### 3) Convención de nombres
- Archivos en **PascalCase** (`Expedient.ts`, `UserRules.ts`).
- Un archivo con una responsabilidad clara.
- Exportaciones explícitas (evitar utilidades “cajón de sastre”).

### 4) Mantener funciones puras
Una regla de dominio debería recibir datos y devolver resultado sin tocar UI.

```ts
// src/domain/expediente/ExpedientRules.ts
import { ExpedientStatus } from './ExpedientStatus';

export function canMoveToReview(current: ExpedientStatus): boolean {
  return current === ExpedientStatus.DRAFT;
}
```

### 5) Integración desde `actions/`
`actions/` usa estas reglas antes de interactuar con formularios o páginas.

