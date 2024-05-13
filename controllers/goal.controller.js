const GoalModel = require('../models/goal.model');

exports.setGoal = async (req, res) => {
    try {
        const userId = req.user._id;
        const { type, target, startDate, endDate } = req.body;
        const newGoal = new GoalModel({ userId, type, target, startDate, endDate });
        await newGoal.save();
        res.status(201).json({ success: true, message: 'Goal set successfully', goal: newGoal });
    } catch (error) {
        console.error('Error setting goal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const userId = req.user._id; 
        const goals = await GoalModel.find({ userId });
        res.status(200).json({ success: true, goals });
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getGoalById = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await GoalModel.findById(id);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.status(200).json({ success: true, goal });
    } catch (error) {
        console.error('Error fetching goal by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

