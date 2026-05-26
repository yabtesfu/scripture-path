# Scripture Path

Scripture Path is a Bible reading plan tracker built with an Express and MongoDB backend, plus a React, Vite, and Tailwind frontend.

The current scaffold starts with the dashboard screen and uses local seed data in the client while the API structure is ready for MongoDB-backed plans and progress.

## Project Structure

```text
client/   React, Vite, Tailwind
server/   Express API, MongoDB models and routes
```

## Setup

```bash
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the API runs on `http://localhost:4000`.

Create `server/.env` when you are ready to connect MongoDB:

```bash
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/scripture-path
CLIENT_ORIGIN=http://localhost:5173
```

## First Screen

The dashboard follows the visual language from the prototype in `Scripture Path.html`: deep ink backgrounds, bone paper surfaces, burnished gold accents, editorial serif typography, thin rules, and compact reading-progress stats.
