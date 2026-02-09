¿Para qué sirve core/ aquí?
La carpeta core/ es para personalizar y extender el comportamiento base de Playwright, no para duplicar lo que ya hace el framework:

1. browser/BrowserFactory.ts
Centralizar configuración personalizada de navegadores
Crear instancias con opciones específicas de tu proyecto
Ejemplo: siempre usar headless, timeouts personalizados, extensiones, etc.
2. browser/TestContext.ts
Gestionar el ciclo de vida del contexto de prueba
Compartir estado entre tests
Implementar patrones como "Given-When-Then" con estado compartido
3. config/
Configuraciones centralizadas (URLs, credenciales desde ENV)
Constantes globales
Puede complementar al playwright.config.ts
4. hooks/
Hooks globales personalizados (beforeAll, afterAll)
Screenshots automáticos en fallos
Logging personalizado
Limpieza de datos