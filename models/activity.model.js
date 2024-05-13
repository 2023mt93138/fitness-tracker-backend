const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    intensity: { type: String },
    caloriesBurned: { type: Number },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('activity', activitySchema)
