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

The Docker setup serves the production build at `http://localhost:5173` and proxies `/api/` requests to the backend container. See [../docker-compose.yml](../docker-compose.yml).

For a separately deployed backend, copy [.env.example](./.env.example) to `.env` and set `VITE_API_BASE_URL` to its origin.
