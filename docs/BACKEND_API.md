# Backend Implementation Blueprint

## 1. API Endpoints

### User Profile CRUD

- `POST /api/users` — Create user
- `GET /api/users/:id` — Get user by ID
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

### Swipe/Match Logic

- `POST /api/swipe` — Swipe action (like/reject)

### Proximity Search

- `GET /api/users/nearby?lng={lng}&lat={lat}&maxDistance={m}` — Find users nearby

## 2. MongoDB Geospatial Query Example

javascript
// Find users within 10km of a point
User.find({
location: {
$near: {
$geometry: { type: 'Point', coordinates: [lng, lat] },
$maxDistance: 10000
}
}
});

## 3. Real-time Match Notification (Socket.io)

javascript
// On match
io.to(userSocketId).emit('match', { matchedUser });

## 4. Error Handling Best Practices

- Validate all input (use Joi or express-validator)
- Use try/catch for async/await
- Return consistent error responses: `{ error: message }`
- Log errors server-side
- Never expose stack traces or sensitive info to clients

## 5. Deployment Checklist

- [ ] Set environment variables (MONGO_URI, PORT)
- [ ] Use process.env in code
- [ ] Enable CORS for frontend domain
- [ ] Use HTTPS in production
- [ ] Monitor logs (Heroku, etc.)
- [ ] Scale MongoDB (Atlas recommended)

## 6. Common Pitfalls

- Not creating 2dsphere index for location (breaks proximity search)
- Forgetting to handle async errors (causes server crashes)
- Not validating user input (security risk)
- Hardcoding secrets (use .env)

## 7. Optimization Tips

- Use lean() for read-only queries
- Paginate large queries
- Use indexes for frequent queries
- Minimize payloads in API responses

---

Refer to this guide when building backend features. See README for full plan.
