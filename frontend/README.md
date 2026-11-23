# Car Show 2027 — Frontend Dashboard

## Running the Frontend
1. Open terminal in `frontend/`
2. Run `npm install`
3. Run `npm run dev`

## Switching Between Sample Data and Real C# API
Open `frontend/src/pages/RegistrationsPage.jsx` (lines 11–12):
- **Offline / Sample Data mode:** Uncomment `import { getRegistrations, getSummary } from '../api/sample-data';`
- **Live C# Backend mode:** Uncomment `import { getRegistrations, getSummary } from '../api/registrationsApi';` and make sure `VITE_API_BASE_URL` in `.env.development` matches your running C# API port (e.g., `http://localhost:5205`).

# Car Show Registration System (Car Show 2027)

## Team Members & Roles
| MEMBER | ROLE |
| :--- | :--- |
| Airo Denise J. Evasco| Backend Developer |
| Novie Joy M. Haz | Frontend Developer |

## How to Run
- **Backend:** `cd backend` then `dotnet run --project Api`
- **Frontend:** `cd frontend` then `npm install` and `npm run dev`