# Angular Material · Administración de Usuarios

Aplicación web desarrollada con **Angular 21, TypeScript y Angular Material** como práctica académica de desarrollo frontend y aplicación de conceptos básicos de **arquitectura de software**.

El proyecto fue desarrollado de manera **individual** con el objetivo de practicar la creación de componentes, formularios reactivos, navegación, gestión de usuarios, organización del código por responsabilidades y uso de Angular Material.

## Funcionalidades principales

- Inicio de sesión con credenciales de demostración.
- Dashboard principal.
- Navegación mediante rutas y Lazy Loading.
- Menú dinámico.
- Registro de nuevos usuarios.
- Consulta de usuarios.
- Edición de usuarios.
- Eliminación de usuarios.
- Búsqueda y filtrado de usuarios.
- Ordenamiento de registros.
- Paginación con Angular Material.
- Formularios reactivos con validaciones.
- Mensajes de confirmación y error.
- Reportes generales de usuarios.
- Resumen de usuarios registrados.
- Distribución de usuarios por sexo.
- Exportación de reportes en formato CSV.
- Registro y visualización de fotografía del usuario.
- Ficha de salud asociada a cada usuario.
- Diseño adaptable a diferentes tamaños de pantalla.

## Ficha de salud

Cada usuario puede registrar información complementaria mediante una ficha de salud.

La ficha permite almacenar de forma demostrativa:

- Estado de salud.
- Alergias.
- Antecedentes clínicos.
- Observaciones o tratamiento.
- Fotografía del usuario.

Esta funcionalidad fue implementada únicamente con fines académicos y utiliza datos ficticios.

## Tecnologías utilizadas

- Angular 21
- TypeScript
- Angular Material
- Angular CDK
- Reactive Forms
- Angular Router
- RxJS
- SCSS
- HTML
- Git
- GitHub

## Arquitectura y organización

El proyecto también fue utilizado como práctica para organizar una aplicación Angular separando responsabilidades.

La estructura principal incluye:

```text
src/app/

├── iam/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── pages/
│
├── users/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   ├── components/
│   └── pages/
│
├── dashboard/
│   ├── components/
│   ├── model/
│   ├── services/
│   └── pages/
│
├── reports/
│   ├── application/
│   └── pages/
│
└── shared/
    └── presentation/
```

La finalidad de esta organización es practicar conceptos como:

- Separación de responsabilidades.
- Organización por funcionalidades.
- Componentes reutilizables.
- Servicios.
- Interfaces y modelos.
- Inyección de dependencias.
- Repositorios.
- Routing.
- Lazy Loading.
- Componentes Standalone.

No busca representar una arquitectura empresarial completa, sino aplicar de manera práctica conceptos de arquitectura de software dentro de un proyecto académico.

## Credenciales de demostración

Para ingresar al sistema se pueden utilizar las siguientes credenciales:

```text
Usuario: jperez
Contraseña: admin123
```

También:

```text
Usuario: italosanchez
Contraseña: admin123
```

## Cómo ejecutar el proyecto

### Requisitos

Se recomienda utilizar:

```text
Node.js 22.12 o superior dentro de la versión 22
npm 10
```

El proyecto fue probado con:

```text
Node.js 22.15.0
npm 10.9.2
```

### 1. Clonar el repositorio

```bash
git clone https://github.com/ItaloSanche/angular-material-italo.git
```

### 2. Entrar a la carpeta

```bash
cd angular-material-italo
```

### 3. Instalar dependencias

```bash
npm ci --legacy-peer-deps
```

### 4. Ejecutar el proyecto

```bash
npm start
```

También se puede utilizar:

```bash
npx ng serve
```

### 5. Abrir la aplicación

Ingresar desde el navegador a:

```text
http://localhost:4200
```

## Reportes

El módulo de reportes permite visualizar información general de los usuarios registrados.

Entre sus funciones se encuentran:

- Total de usuarios.
- Resumen de usuarios por sexo.
- Información consolidada.
- Descarga de los registros en formato CSV.

## Gestión de usuarios

El módulo de usuarios permite realizar operaciones de administración sobre los registros:

```text
Crear usuario
     ↓
Consultar usuario
     ↓
Editar usuario
     ↓
Eliminar usuario
```

También incluye:

- búsqueda;
- filtros;
- paginación;
- ordenamiento;
- validación de formularios;
- confirmación antes de eliminar.

## Almacenamiento de datos

Este proyecto no utiliza un backend ni una base de datos externa.

Los usuarios, las fotografías, las fichas de salud y la sesión se manejan **en memoria** durante la ejecución de la aplicación.

Por esta razón, al recargar completamente la aplicación los datos regresan a su estado inicial.

El sistema fue desarrollado de esta manera porque su objetivo principal es demostrar el funcionamiento del frontend, Angular Material y la organización arquitectónica del proyecto.

## Ejecución de pruebas

Para ejecutar las pruebas:

```bash
npm test
```

Para generar una compilación del proyecto:

```bash
npm run build
```

## Objetivo académico

Este proyecto fue realizado **individualmente** como ejercicio práctico para reforzar conocimientos en:

- Angular.
- TypeScript.
- Angular Material.
- Formularios reactivos.
- Routing.
- Lazy Loading.
- Gestión de usuarios.
- Reportes.
- Componentes Standalone.
- Servicios.
- Arquitectura de software.
- Separación de responsabilidades.
- Organización de proyectos frontend.
- Git y GitHub.

El propósito principal del proyecto es servir como práctica técnica y como demostración de los conocimientos adquiridos durante la formación en **Ingeniería de Software**.

## Autor

**Italo Sánchez Manrique**  
Estudiante de Ingeniería de Software  
Universidad Peruana de Ciencias Aplicadas (UPC)

GitHub:  
https://github.com/ItaloSanche