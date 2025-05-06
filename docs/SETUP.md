# SkillSwap Setup Instructions

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB
- Mapbox account (API key)
- Firebase project (Web app, Auth enabled)

## 1. Backend Setup

1. `cd backend`
2. `npm install`
3. Create `.env` with:
   - `MONGO_URI=your_mongodb_uri`
   - `PORT=5000`
4. `npm run dev` (for development)

## 2. Frontend Setup

1. `cd frontend`
2. `npm install`
3. Configure Tailwind: `npx tailwindcss init`
4. Add your Mapbox and Firebase config to `.env` or directly in code
5. `npm start`

## 3. Firebase Auth Integration

- Go to Firebase Console > Auth > Enable Email/Google providers
- Copy config to frontend

## 4. Mapbox Integration

- Get API key from Mapbox dashboard
- Add to frontend config

## 5. Deployment

- Backend: Deploy to Heroku (set env vars)
- Frontend: Deploy to Netlify (set env vars)

---

Refer to the README for architecture and implementation details.
