# QuickHire Job Portal Client

Frontend for the QuickHire job portal.

Live Demo: https://quickhire-job-portal-client.vercel.app/

## What this app includes
- Job listing page with search and filters
- Job details page with application form
- Admin dashboard UI to manage jobs and review applications

## Tech Stack
- React + Vite
- Tailwind CSS + DaisyUI
- Axios
- React Router

## Local Setup
1. Go to project:
   - `cd quickhire-job-board-client`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - `cp .env.example .env`
4. Set env values in `.env`:
   - `VITE_API_BASE_URL=http://localhost:5000`
   - `VITE_ADMIN_TOKEN=quickhire_admin_2026_secure`
5. Run development server:
   - `npm run dev`

Client runs on: `http://localhost:5173`

## Admin Token (Required)
Use this token in admin operations:

`ADMIN_TOKEN=quickhire_admin_2026_secure`

On frontend, either:
- enter it manually in `/admin`, or
- set `VITE_ADMIN_TOKEN=quickhire_admin_2026_secure` in `.env`.

## Build
- `npm run build`
- `npm run preview`
