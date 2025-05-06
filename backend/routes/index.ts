import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import User from '../models/User';

const router = Router();

// User profile CRUD
router.put('/profile',
  body('displayName').trim().isLength({ min: 2 }),
  body('teachSkills').isArray({ min: 1 }),
  body('learnSkills').isArray({ min: 1 }),
  body('location.coordinates')
    .isArray({ min: 2, max: 2 })
    .custom(([lng, lat]) => Math.abs(lng) <= 180 && Math.abs(lat) <= 90),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          ...req.body,
          location: {
            type: 'Point',
            coordinates: req.body.location.coordinates
          }
        },
        { new: true, runValidators: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Profile update failed' });
    }
});

// Swipe/match endpoint
router.post('/swipe/:userId',
  body('direction').isIn(['left', 'right']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const [swiper, targetUser] = await Promise.all([
        User.findById(req.user.id),
        User.findById(req.params.userId)
      ]);

      // Add null check for user lookup
      if (!swiper || !targetUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (req.body.direction === 'right') {
        swiper.swipes.set(req.params.userId, new Date());
        if (targetUser.swipes.get(swiper.id)) {
          swiper.matches.push(targetUser.id);
          targetUser.matches.push(swiper.id);
          await targetUser.save();
        }
        await swiper.save();
      }

      res.json({ matches: swiper.matches });
    } catch (error) {
      res.status(500).json({ error: 'Swipe processing failed' });
    }
});

// Proximity search with pagination
router.get('/nearby',
  query('lng').isFloat({ min: -180, max: 180 }),
  query('lat').isFloat({ min: -90, max: 90 }),
  query('radius').optional().isInt({ min: 100, max: 10000 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const users = await User.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [
                parseFloat(req.query.lng),
                parseFloat(req.query.lat)
              ]
            },
            $maxDistance: req.query.radius || 10000
          }
        }
      }).select('-swipes -matches');

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
});

export default router;
