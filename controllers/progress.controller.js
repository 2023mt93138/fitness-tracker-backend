const ProgressModel = require('../models/progress.model');

exports.getProgress = async (req, res) => {
    try {
        const userId = req.user._id; 
        const progress = await ProgressModel.find({ userId });
        res.status(200).json({ success: true, progress });
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { goalId, currentProgress } = req.body;
        
        // Check if the user has already set progress for the goal
        let progress = await ProgressModel.findOne({ userId, goalId });
        if (!progress) {
            // If no progress exists, create a new entry
            progress = new ProgressModel({ userId, goalId, currentProgress });
        } else {
            // If progress exists, update the current progress
            progress.currentProgress = currentProgress;
        }
        
        // Save or update progress in the database
        await progress.save();

        res.status(200).json({ success: true, message: 'Progress updated successfully', progress });
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
