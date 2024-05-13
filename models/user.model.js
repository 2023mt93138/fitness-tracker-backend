const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensures usernames are unique
    },
    password: {
        type: String,
        required: true
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    try {
        // Hash the password only if it's new or modified
        if (!this.isModified('password')) {
            return next();
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Replace the plain password with the hashed one
        this.password = hashedPassword;

        // Call the next middleware
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Use bcrypt to compare the candidate password with the hashed password
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
};

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;