# Frontend Implementation Blueprint

## 1. Component Structure

- `/src/components/SwipeCard.js` — Swipe card (Framer Motion, Tailwind)
- `/src/components/Profile.js` — User profile display/edit
- `/src/components/Chat.js` — Real-time chat (Socket.io)
- `/src/components/Onboarding.js` — Signup, skill tags, location (Mapbox)
- `/src/components/MapView.js` — Mapbox map for nearby users
- `/src/components/AuthProvider.js` — Firebase Auth context

## 2. Tailwind Usage

- Utility classes for layout, spacing, color, and responsive design
- Example: `className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"`

## 3. Firebase Auth Integration

- Install Firebase SDK
- Initialize Firebase in `/src/firebase.js`
- Use `onAuthStateChanged` for session
- Protect routes with AuthProvider

## 4. Mapbox Integration

- Install `mapbox-gl` and `@mapbox/mapbox-gl-geocoder`
- Add Mapbox access token in `.env` or config
- Use Mapbox for location input (Onboarding) and displaying users (MapView)

## 5. Common Pitfalls

- Not wrapping app in AuthProvider (causes auth bugs)
- Forgetting to cleanup Mapbox/Socket.io listeners
- Not handling async errors in API calls

## 6. Optimization Tips

- Use React.memo for pure components
- Lazy load heavy components (MapView, Chat)
- Minimize re-renders with proper key usage

---

Refer to this structure when building out the frontend. See README for full plan.

- [x] Firebase Auth Implementation
- [x] Profile Editing Component
- [x] Swipe Interface Component
- [ ] Chat Interface Real-time Testing
- [ ] Mapbox Location Integration Testing
