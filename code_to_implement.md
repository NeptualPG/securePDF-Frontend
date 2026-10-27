# Implementar módulo de productos: filtros persistentes y selección múltiple

## Objetivo

Agregar al frontend (securePDF-Frontend, React 19 + TypeScript + Vite) un módulo de listado de productos/inventario con:

1. Filtros combinables (estado de inventario, búsqueda por nombre/código, categoría), con lógica AND entre criterios.
2. Selección múltiple de productos (individual, "seleccionar todo" de la vista y de resultados filtrados, contador, limpiar selección) que persista al cambiar filtros, paginación, búsqueda y orden.
3. Persistencia del estado de filtros y selección (URL search params para filtros/orden; estrategia en memoria para la selección, sin datos sensibles).
4. Zona de acciones masivas preparada para el futuro (contador + espacio reservado, sin operaciones de negocio inventadas).
5. Respeto estricto al sistema de permisos: solo el gerente accede; nada nuevo de permisos.

El módulo se implementa sobre el código existente, no como un módulo paralelo, reutilizando componentes, servicios, estilos y pruebas del proyecto.

## Contexto del código

- Stack: React 19, TypeScript (strict, `tsc -b`), Vite, Vitest + Testing Library, lucide-react, i18n (es/en), Prettier + ESLint.
- Scripts: `npm run dev`, `npm run typecheck`, `npm run lint`, `npm run format`, `npm test`, `npm run build`, `npm run check`.
- Convenciones vistas en `src/App.tsx`, `src/components/*`, `src/hooks/*`, `src/services/*`, `src/types/*` y `src/i18n.ts`.
- No existe todavía un listado de productos ni un backend de inventario en este repo; si se requiere un endpoint, usar un servicio en `src/services/` siguiendo el patrón de `conversionApi.ts` y documentar el contrato asumido.

## Requisitos

### 1. Filtros combinables
- Filtros: estado del inventario (stock bajo / sin existencias / disponible u otros que soporte el diseño), búsqueda por nombre (y código/referencia si aplica), categoría (una o varias).
- Los filtros activos se combinan con lógica AND.
- Resultados se actualizan sin recarga innecesaria de página.
- Indicadores de filtros activos + botón "limpiar filtros".
- Mensaje de resultados vacíos cuando no coincida nada.

### 2. Selección múltiple
- Casilla de selección accesible por producto.
- Selección individual, deselección individual sin afectar a las demás.
- "Seleccionar todos" de la página actual y (si es viable con el alcance de datos) de todos los resultados filtrados; distinguir visualmente ambos comportamientos.
- Contador de productos seleccionados.
- Botón/acción para limpiar la selección.
- La selección persiste al cambiar página, búsqueda, filtros y orden.
- Los productos seleccionados que dejen de ser visibles por un filtro siguen contando como seleccionados.

### 3. Persistencia del estado
- Filtros y orden en parámetros de URL (search params), para conservarse al recargar o compartir.
- Selección persistente durante la interacción (cambios de página, filtros, búsqueda, orden).
- La selección se limpia con acción explícita del usuario o al abandonar el contexto de trabajo, según el diseño.
- No almacenar información sensible innecesaria.

### 4. Preparación para acciones masivas futuras
- Zona de acciones masivas visible cuando haya productos seleccionados: muestra el número de seleccionados y reserva espacio para futuras acciones.
- No ejecutar cambios de inventario ni modificar productos automáticamente.
- Estructura extensible para agregar acciones sin rehacer la selección.

### 5. Permisos y seguridad
- Mantener la restricción actual: solo el gerente.
- No modificar la matriz de permisos existente.
- Ocultar en el frontend no es suficiente: futuras operaciones masivas validarán permisos en el backend.

### 6. Experiencia de usuario
- Filtros visibles y fáciles de combinar, consistentes con el diseño existente.
- Casillas accesibles, estados de carga, vacíos y error.
- Confirmaciones para futuras operaciones masivas.

### 7. Pruebas
- Agregar o actualizar pruebas para filtros, selección, paginación y permisos (Vitest + Testing Library).

## Criterios de aceptación

- Filtros por estado, nombre y categoría funcionan individual y combinados.
- La búsqueda existente sigue funcionando.
- Selección individual y múltiple correcta.
- Selección conservada al cambiar filtros y paginación.
- Contador refleja el número correcto de seleccionados.
- Limpiar filtros y selección de forma independiente.
- Interfaz distingue seleccionar visibles vs. seleccionar todos los resultados filtrados.
- No se habilitan permisos nuevos; no hay acciones masivas ejecutadas.
- Solución extensible para operaciones masivas futuras.
- `npm run check` pasa (formato, lint, tipos, tests, build).

## Entrega

Al finalizar, explicar:
1. Qué archivos se modificaron/crearon.
2. Cómo se combinan los filtros.
3. Cómo se conserva la selección.
4. Cómo se respetan los permisos del gerente.
5. Qué pruebas se ejecutaron y el resultado.
6. Qué queda pendiente para acciones masivas futuras.