const ActivityModel = require('../models/activity.model');

exports.addActivity = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { type, duration, distance, intensity, caloriesBurned } = req.body;
    const newActivity = new ActivityModel({ userId, type, duration, distance, intensity, caloriesBurned });
    await newActivity.save();
    res.status(201).json({ success: true, message: 'Activity added successfully', activity: newActivity });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const userId = req.user._id; 
    const activities = await ActivityModel.find({ userId });
    res.status(200).json({ success: true, activities });
  } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteActivityById = async (req, res) => {
  try {
    await ActivityModel.findByIdAndDelete(req.params.activityId)
    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully'
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};
