# SecurePDF frontend

React and TypeScript frontend for the SecurePDF conversion service.

## API contract

The frontend must follow the backend contract in [../securePDF/openapi.yaml](../securePDF/openapi.yaml).

The conversion request is:

- `POST /api/v1/convert`
- `multipart/form-data`
- `file`: selected source file
- `target_format`: `pdf`, `docx`, `png`, or `jpg`
- `options`: optional JSON string. PDF-to-image supports page and DPI; PDF-to-DOCX supports layout preservation as a best-effort option.

Successful responses are binary streams whose MIME type matches the selected target. The server supplies the download filename through `Content-Disposition`. Error responses are JSON objects containing `error` and `code`.

## Local development

```powershell
npm install
npm run dev
```

The Docker setup serves the production build at `http://localhost:8080` and proxies `/api/` requests to the backend container. See [docker-compose.yml](./docker-compose.yml); it expects the backend repository cloned at `../securePDF`.

For a separately deployed backend, copy [.env.example](./.env.example) to `.env` and set `VITE_API_BASE_URL` to its origin.

## Calidad de código

| Comando                                   | Qué hace                                                         |
| ----------------------------------------- | ---------------------------------------------------------------- |
| `npm run format` / `npm run format:check` | Prettier (escribe / comprueba)                                   |
| `npm run lint`                            | ESLint (typescript-eslint, react-hooks, react-refresh, jsx-a11y) |
| `npm run typecheck`                       | `tsc -b` en modo `strict`                                        |
| `npm test`                                | Vitest (+ Testing Library para hooks)                            |
| `npm run build`                           | Build de producción en `dist/`                                   |
| `npm audit`                               | Vulnerabilidades de dependencias                                 |
| `npm run check`                           | Formato, lint, tipos, tests y build en orden                     |

### Hooks de pre-commit

Requisitos: Node.js 22 y [pre-commit](https://pre-commit.com) (por ejemplo `uv tool install pre-commit`).

```bash
npm ci                        # los hooks usan las herramientas de node_modules
pre-commit install            # una vez por clon
pre-commit run --all-files    # ejecutar todos los hooks a mano
```

En cada commit se ejecutan:

- Hooks genéricos: espacios al final de línea, salto de línea final, marcadores de conflicto, YAML/TOML/JSON válidos, archivos de más de 1 MB y claves privadas.
- Prettier y `eslint --fix` sobre los archivos en stage.
- `tsc -b`, `vitest run` y `vite build` cuando cambian archivos de `src/` o de configuración.
- `npm audit` cuando cambian `package.json` o `package-lock.json` (necesita red).

Si un hook modifica archivos (Prettier o ESLint), el commit se detiene: revisa los cambios, haz `git add` y vuelve a hacer commit.

Problemas comunes:

- `npm error could not determine executable to run`: falta `node_modules`; ejecuta `npm ci`.
- `npm audit` se cuelga o falla sin red: reintenta más tarde. No uses `--no-verify` salvo en una emergencia.
- El hook usa otra versión de Node: git ejecuta los hooks con el `PATH` de tu shell; con nvm, `nvm use 22` antes de hacer commit.

## Despliegue en Netlify

`netlify.toml` define el build (`npm run build`, Node 22, carpeta `dist`), cabeceras de seguridad, caché larga para `assets/` y dos redirecciones:

- `/api/*` → `https://securepdf-api.onrender.com/api/:splat` (proxy: el navegador solo habla con Netlify, así que no hace falta CORS ni `VITE_API_BASE_URL`).
- `/*` → `/index.html` (fallback de la SPA).

Pasos:

1. Despliega primero el backend en Render (ver README del backend).
2. En Netlify: **Add new site → Import an existing project** y elige este repositorio. Netlify lee `netlify.toml`.
3. Si Render asigna otra URL distinta de `securepdf-api.onrender.com`, cámbiala en `netlify.toml`.

El `Dockerfile` y `nginx.conf` solo se usan con Docker; Netlify no los usa.
