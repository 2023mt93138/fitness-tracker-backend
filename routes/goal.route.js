const express = require('express');
const GoalRouter = express.Router()

const goalController = require('../controllers/goal.controller');

GoalRouter.post('/', goalController.setGoal);
GoalRouter.get('/', goalController.getGoals);
GoalRouter.get('/:id', goalController.getGoalById);

module.exports = GoalRouter;