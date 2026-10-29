# App users · Administración de usuarios

Proyecto académico basado en la transcripción entregada del tutorial de Angular Material. Implementado con Angular 21, TypeScript estricto, formularios reactivos y componentes standalone.

## Ejecutar en Visual Studio Code

Abre esta carpeta en VS Code. En su terminal:

```powershell
npm ci --legacy-peer-deps
npm start
```

Visita http://localhost:4200. Si las dependencias ya están instaladas, solo necesitas `npm start`.

Requisitos: Node 22.12 o superior dentro de la rama 22 (probado con 22.15.0), npm 10. Se usa `--legacy-peer-deps` por un fallo interno de Arborist en la resolución inicial; las versiones reales se verifican con compilación y pruebas. El lockfile fija las dependencias.

**Usuarios:** `jperez` o `italosanchez` · **Contraseña:** `admin123`.

## Alcance implementado

- Login centrado, formulario reactivo, validaciones, contraseña oculta, spinner y mensajes de error.
- Navegación dinámica desde `public/data/menu.json`, cargada mediante HttpClient.
- Dashboard de bienvenida y Reportes con totales, distribución por sexo y descarga CSV.
- Rutas hijas y lazy loading; guard de acceso y cierre de sesión.
- Tabla Material con seis usuarios de ejemplo: usuario, nombre, apellido, sexo y acciones.
- Búsqueda por todos los campos, sin distinguir mayúsculas ni tildes; incluye masculino/femenino.
- Ordenamiento, paginación en español y tamaños de página 5, 10 y 20.
- Crear, consultar, editar y eliminar usuarios. Confirmación antes de eliminar.
- Formularios validados, mensajes con MatSnackBar, tooltips y estados vacíos.
- Diseño adaptable a móvil, etiquetas accesibles y navegación por teclado.

Los datos y la sesión viven **solo en memoria**. Al recargar la página se restablecen los seis usuarios iniciales y se vuelve al login. El login es simulado y no es autenticación para producción. No se agregó backend, registro ni roles. A pedido del usuario, Reportes incluye un resumen visual y exportación CSV.

## Arquitectura orientada al dominio

```text
src/app/
  iam/
    domain/model/                  # SignInRequest
    domain/repositories/           # Contrato de autenticación
    application/                   # Casos de uso, estado de sesión y guard
    infrastructure/                # Adaptador de autenticación demo
    pages/sign-in/                 # Formulario de login
  users/
    domain/model/                  # Entidad User y sus invariantes
    domain/repositories/           # Contrato UserRepository
    application/                   # Casos de uso y validación de unicidad
    infrastructure/                # Repositorio en memoria
    components/                    # Diálogo de eliminación
    pages/                         # Listado, formulario y consulta
    users.routes.ts
  dashboard/
    components/shell/              # Layout y menú
    model/                         # Modelo del menú
    services/                      # Lectura del JSON
    pages/home/
    dashboard.routes.ts
  reports/pages/
  shared/presentation/             # Notificaciones y paginador español
  app.config.ts                    # Composición e inyección de adaptadores
  app.routes.ts
```

Se conserva la organización por contexto, modelos, páginas y componentes de Electrolink, adaptada al alcance del ejercicio. No se copiaron sus funciones de negocio.

El dominio no importa Angular. Los casos de uso dependen de contratos; la configuración de la aplicación conecta esos contratos con los adaptadores en memoria. La interfaz no modifica el array directamente. Los IDs estables evitan editar o eliminar la fila equivocada después de ordenar o filtrar. Esta es una aplicación proporcionada de principios DDD, sin agregados, eventos ni capas vacías innecesarias para este CRUD.

El tutorial utiliza NgModules. Aquí se utiliza su equivalente moderno: componentes standalone con imports locales, `loadComponent` y `loadChildren`. Los componentes de Material se importan donde se usan; no hay un módulo global que cargue toda la biblioteca. Los estilos usan SCSS para configurar el tema de Material, y CSS Grid para adaptar el formulario a pantallas pequeñas.

## Verificación

```powershell
npm run build
npm test -- --watch=false
```

Las pruebas cubren creación, normalización, usuarios duplicados, edición/eliminación por ID, campos vacíos, registros inexistentes, login correcto/incorrecto, logout y guard de rutas.

Para comprobar la interfaz: entra con las credenciales demo, abre Usuarios, filtra por `femenino`, ordena una columna, cambia de página, crea un usuario, consulta sus datos, edítalo y elimínalo. Prueba Cancelar en el diálogo, un usuario duplicado y un filtro sin resultados. Cierra sesión y comprueba que `/dashboard/usuarios` redirige a login.

## Referencias

- Tutorial: https://www.youtube.com/watch?v=rWOwTVSMfPw&t=7815s. YouTube no permitió la consulta directa durante el desarrollo; se usó la transcripción adjunta como fuente funcional.
- Estructura y modelos de referencia: https://github.com/Open-Source-4341/Electrolink-Frontend/blob/main/src/app/iam/model/profile.request.ts
- Compatibilidad: https://angular.dev/reference/versions
- Tabla Material: https://material.angular.dev/components/table/overview

## Resultado de la verificación realizada

- Compilación de producción: correcta, sin advertencias; bundle inicial 300.04 kB.
- Pruebas automatizadas: 14 aprobadas en 3 archivos.
- Navegador: login, filtro femenino (3 registros), segunda página (sexto registro), creación, edición, eliminación y ordenamiento por nombre comprobados.
- Consola del navegador: sin errores durante ese recorrido.


- Actualización App users: barra superior azul, imagen users.jfif, resumen por sexo y exportación CSV verificados en navegador. CSV descargado con seis usuarios y encabezados correctos.


## Fotos y ficha de salud

Cada usuario permite seleccionar, cambiar o quitar una foto JPG, PNG o WebP de hasta 2 MB. La imagen se comprueba antes de mostrarla y solo se guarda al pulsar Aceptar. La ficha incluye estado de salud, alergias, antecedentes clínicos y observaciones/tratamiento (opcionales, hasta 2000 caracteres por campo). Se puede consultar desde Ver usuario. Volver descarta los cambios no guardados.

La información se conserva en memoria durante la ejecución; no se envía a un servidor ni se incluye en la exportación CSV. Es una ficha académica de demostración, no una historia clínica de producción. Utiliza datos ficticios para las demostraciones.

Se retiraron los textos inferiores de la interfaz a pedido del usuario.

