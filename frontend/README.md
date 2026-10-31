# Python Web Agentic Frontend

Starter React (Vite + JavaScript) frontend for the FastAPI backend in the repo root.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Backend

The backend is expected at `http://localhost:8000` (FastAPI/Uvicorn).

If it runs elsewhere, set the `VITE_API_URL` environment variable before starting Vite, e.g.:

```bash
VITE_API_URL=http://localhost:8000 npm run dev
```

## Endpoints used

- `GET /` — welcome message
- `GET /items/{item_id}?q=...` — item lookup
- `GET /random` — random number
