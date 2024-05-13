const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    target: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
