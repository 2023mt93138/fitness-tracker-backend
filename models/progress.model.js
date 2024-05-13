const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    currentProgress: { type: Number, required: true }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
