const express = require('express');

const userRoutes = require('./user.route');
const activityRoutes = require('./activity.route');
const goalRoutes = require('./goal.route');
const progressRoutes = require('./progress.route');
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.use('/user', userRoutes);
router.use('/activity', authMiddleware, activityRoutes);
router.use('/goals', authMiddleware, goalRoutes);
router.use('/progress', authMiddleware, progressRoutes);

module.exports = router;