const express = require('express');
const ActivityRouter = express.Router()

const activityController = require('../controllers/activity.controller');

// ADD a new activity
ActivityRouter.post('/', activityController.addActivity);

// GET all activities for a user
ActivityRouter.get('/', activityController.getActivities);

// DELETE an activity
ActivityRouter.delete('/:activityId', activityController.deleteActivityById);

module.exports = ActivityRouter;