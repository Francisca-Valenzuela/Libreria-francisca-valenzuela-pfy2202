# Librería Online – Frontend II (Semana 4)

Actividad formativa de **Desarrollo Frontend II (PFY2202)**: "Utilizando tecnologías de integración entre frontend y backend".

Tienda de libros donde las personas exploran categorías y ven los libros de cada una. Los datos vienen de una **API REST mock** creada con [MSW (Mock Service Worker)](https://mswjs.io/) y la navegación usa **React Router**.

**Autora:** Francisca Valenzuela

## Tecnologías

- React 19 + Vite
- React Router (`HashRouter`)
- MSW 2 como API REST mock
- HTML, CSS y JavaScript

## Cómo ejecutar

Requisitos: Node.js instalado.

```bash
npm install
npm run dev
```

Con la configuración de `base`, la aplicación queda en:

```
http://localhost:5173/Libreria-francisca-valenzuela-pfy2202/
```

Para probar la versión construida (igual a la que se publica):

```bash
npm run build
npm run preview
```

## API mock (MSW)

El mock se activa automáticamente al iniciar la aplicación (tanto en desarrollo como en la versión construida), por lo que no hay que levantar ningún servidor aparte. Las respuestas llevan un retraso simulado para poder ver los indicadores de carga.

| Método | Ruta | Descripción | Retraso |
|---|---|---|---|
| GET | `/api/categories` | Lista de categorías | 800 ms |
| GET | `/api/books?genre=<id>` | Libros de una categoría | 1000 ms |

Las definiciones están en `src/mocks/handlers.js`.

## Estructura del proyecto

```
src/
├── components/
│   ├── ErrorMessage.jsx   # Mensajes de error según el tipo de fallo
│   └── Loader.jsx         # Indicador de carga
├── hooks/
│   └── useApi.js          # Estado de la petición: datos, carga, error y reintento
├── mocks/
│   ├── browser.js         # Configuración del worker de MSW
│   └── handlers.js        # Endpoints del mock
├── pages/
│   ├── Categorias.jsx     # Listado de categorías (inicio)
│   ├── Libros.jsx         # Libros de una categoría
│   └── NotFound.jsx       # Página 404
├── services/
│   └── api.js             # Cliente HTTP con manejo de errores y caché
├── App.jsx                # Rutas de la aplicación
└── main.jsx               # Punto de entrada (activa MSW y el router)
```

## Rutas

| Ruta | Página |
|---|---|
| `/#/` | Categorías |
| `/#/categoria/:genre` | Libros de la categoría (por ejemplo `/#/categoria/ficcion`) |
| cualquier otra | Página no encontrada |

Se usa `HashRouter` para que las rutas funcionen al recargar la página en GitHub Pages.

## Funcionamiento de la integración

- **Control de carga:** cada petición muestra un indicador mientras espera la respuesta y lo retira al terminar, ya sea con datos o con error.
- **Manejo de errores:** se distinguen el error 404 (recurso inexistente), los errores 5xx (falla del servidor), otros errores HTTP y la falta de conexión. Cada uno muestra un mensaje claro y ofrece alternativas: **Reintentar** (cuando tiene sentido) y **Volver a categorías**.
- **Estados vacíos:** si una categoría no tiene libros, se informa con un mensaje en lugar de dejar la pantalla en blanco.
- **Optimización:** `src/services/api.js` guarda en memoria la promesa de cada URL, así que una misma consulta no se repite al navegar entre páginas. Las peticiones fallidas no se guardan, para que el reintento funcione. Además, `useApi` evita actualizar el estado si el componente ya se desmontó.

## Casos de prueba incluidos

| Qué probar | Resultado esperado |
|---|---|
| Entrar al inicio | Indicador "Cargando categorías..." y luego las 6 categorías |
| Ficción, Ciencia Ficción, Fantasía, Misterio | Lista de libros con autor y precio en CLP |
| Drama | Mensaje "No hay libros disponibles en esta categoría por el momento" (lista vacía a propósito) |
| Terror | Error 500 simulado con botón **Reintentar** |
| `/#/categoria/inexistente` | Error 404 "No encontrado" (sin botón de reintentar) |
| `/#/ruta-que-no-existe` | Página no encontrada |
| Volver al inicio tras visitarlo | Las categorías aparecen sin nueva espera (caché) |

> Las categorías **Drama** y **Terror** existen a propósito para demostrar la lista vacía y el manejo de error 500.

