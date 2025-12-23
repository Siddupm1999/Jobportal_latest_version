Purpose

This file gives an AI coding agent the concrete, repo-specific knowledge needed to be productive quickly.

Big picture
- Backend: Node.js + Express API in `backend/server.js` serving routes under `/api/*` and static uploads from `/uploads`.
  - Key folders: `backend/controllers/`, `backend/models/`, `backend/routes/`, `backend/middleware/`.
  - Data store: MongoDB via `MONGODB_URI` (see `backend/config/database.js`).
  - File uploads: `uploads/` and `uploads/resumes/` (multer configured in `backend/routes/users.js`).
- Frontend: React (Create React App) in `frontend_final/` using MUI and `react-router`.
  - Entry: `frontend_final/src/index.js` and `frontend_final/src/App.js`.
  - Auth context and API integration: `frontend_final/src/context/AuthContext.js` (axios interceptors, token in `localStorage`).

Developer workflows / commands
- Backend
  - Install: run `npm install` in `backend/`.
  - Start dev server: `npm run dev` (uses `nodemon server.js`).
  - Start prod: `npm start` (runs `node server.js`).
  - Health check: GET `http://localhost:5000/api/health` (useful for CI and local checks).
- Frontend
  - Install: run `npm install` in `frontend_final/`.
  - Start dev server: `npm start` (CRA on port 3000).

API and auth conventions
- All API responses follow a `{ success: boolean, ... }` envelope. Controllers consistently return `success: true|false` and `message` on errors.
- Authentication: JWT in `Authorization: Bearer <token>` header. Server middleware is `backend/middleware/authMiddleware.js` (`protect` and `authorizeUser`).
- Frontend stores JWT in `localStorage` under `token` and uses axios interceptors in `AuthContext.js` to add `Authorization` headers. See `frontend_final/src/context/AuthContext.js` and `frontend_final/src/components/ProtectedRoute.js`.

Data model notes
- `backend/models/User.js` uses many embedded subdocuments (employments, educations, projects, certifications). Expect updates to mutate sub-doc arrays and call `.save()` or `findByIdAndUpdate`.
- `backend/models/Job.js` embeds `applications` and indexes on `{ employer, createdAt }`, `isActive`, and `location` for queries.

File upload specifics and limits
- Profile pictures: endpoint `POST /api/users/:id/upload-pic`, multer accepts images only, max 5MB. See `backend/routes/users.js` (profilePicStorage + `profilePicFilter`).
- Resumes: endpoint `POST /api/users/:id/upload-resume`, allowed types: PDF, DOC, DOCX, RTF, TXT; max 5MB; stored under `uploads/resumes/` (accessible via `/uploads/resumes/<file>`).

Env vars and runtime
- Important env vars: `MONGODB_URI` (database), `JWT_SECRET` (token signing), `PORT` (backend port). `backend/server.js` has a fallback connection string — prefer setting `MONGODB_URI` in local/dev `.env`.

Common patterns & gotchas for agents
- Use the `success` envelope when returning API responses to match existing clients.
- Controllers are synchronous-looking async/await functions—preserve existing error shapes (status codes and `{ success:false, message }`).
- Authentication flow: front-end expects `redirectTo` and `token` in login response. See `backend/controllers/authController.js` for returned shape.
- The frontend sometimes reads `API_BASE_URL` in components (e.g., `src/pages/Login.js` Forgot Password uses `API_BASE_URL`), but the `AuthContext` currently hardcodes `http://localhost:5000` in axios calls. If you change API origin, update `AuthContext.js` and any fetch calls in UI.
- Protect routes with `protect` middleware and check ownership with `authorizeUser` where used. Many routes call `authorizeUser` for `/:id` user operations.

Where to look first for changes
- Add/modify API endpoints: `backend/routes/*.js` and `backend/controllers/*Controller.js`.
- Schema changes: `backend/models/*.js` (User and Job are core).
- Auth / tokens: `backend/middleware/authMiddleware.js` and `frontend_final/src/context/AuthContext.js`.
- File uploads: `backend/routes/users.js` and front-end upload components in `frontend_final/src/components/`.

Quick examples
- Health check: GET `http://localhost:5000/api/health` (verifies DB and server status).
- Login flow: POST `http://localhost:5000/api/auth/login` -> response contains `{ success:true, token, user, redirectTo }` used by frontend to store token and route user.

If you modify behavior
- Keep response envelope and status codes consistent to avoid breaking the React client.
- If you add new env vars, document them in repo README and avoid committing secrets.

Next step
- I added these instructions to `.github/copilot-instructions.md`. Review for missing details or add any project-specific CI/CD or external integrations you want included.
