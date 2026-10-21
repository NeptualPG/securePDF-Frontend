# SecurePDF frontend

React and TypeScript frontend for the SecurePDF conversion service.

## API contract

The frontend must follow the backend contract in [../securePDF/openapi.yaml](../securePDF/openapi.yaml).

The conversion request is:

- `POST /api/v1/convert`
- `multipart/form-data`
- `file`: selected source file
- `target_format`: `pdf`
- `options`: optional JSON string

Successful responses are PDF binary streams (`application/pdf`). Error responses are JSON objects containing `error` and `code`. The frontend should distinguish `INVALID_FILE`, `PAYLOAD_TOO_LARGE`, and `UNSUPPORTED_FORMAT` when the conversion endpoint is implemented.

## Local development

```powershell
npm install
npm run dev
```

The Docker setup serves the production build at `http://localhost:5173` and proxies `/api/` requests to the backend container. See [../docker-compose.yml](../docker-compose.yml).

For a separately deployed backend, copy [.env.example](./.env.example) to `.env` and set `VITE_API_BASE_URL` to its origin.
