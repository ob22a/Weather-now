# WeatherNow

A full-stack weather application that detects your location, lets you search for cities, and displays current conditions with daily and hourly forecasts.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, Redux Toolkit, Axios |
| Backend | Node.js, Express, MongoDB (Mongoose) |
| Weather data | Open-Meteo API |
| Testing | Jest |

## Project structure

```
WeatherNow/
├── client/          # React SPA (Redux state, feature slices, UI components)
└── server/          # Express API (routes, services, providers, MongoDB models)
```

### Frontend architecture

- **Redux Toolkit** stores location, weather, search, and unit preferences in feature slices.
- **Async thunks** handle API calls for geolocation, search, and weather fetching.
- **ErrorBoundary** and **ErrorPage** prevent crashes and surface fetch failures with retry support.

### Backend architecture

- **Routes** expose `/api/weather`, `/api/location`, and `/api/countries`.
- **Services** orchestrate database lookups and external provider calls.
- **Providers** integrate Open-Meteo (weather), IP geolocation, and geocoding APIs.
- Weather responses are cached in MongoDB for 15 minutes.

## Getting started

### Prerequisites

- Node.js 20+
- MongoDB running locally or a connection string in `.env`

### Server

```bash
cd server
npm install
npm run build
# Create server/.env with MONGODB_URI and optional PORT, CLIENT_ORIGIN
npm run dev
```

The API listens on `http://localhost:3000` by default.

### Client

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173` and calls the API at `http://localhost:3000/api`.

Optional: set `VITE_API_BASE_URL` in `client/.env` for a custom API endpoint.

## Scripts

| Location | Command | Description |
| --- | --- | --- |
| `server/` | `npm run dev` | Start API with nodemon |
| `server/` | `npm test` | Run backend Jest tests |
| `client/` | `npm run dev` | Start Vite dev server |
| `client/` | `npm test` | Run frontend Jest tests |
| `client/` | `npm run build` | Production build |

## API overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/location/my-location` | Detect user location via IP |
| `GET` | `/api/location/search/:text` | Search cities and countries |
| `GET` | `/api/weather?country=&city=` | Fetch weather for a location |

## License

MIT © [Obssa Degefu](LICENSE)
