const express = require('express');
const UserRouter = express.Router()

const userController = require('../controllers/user.controller');

// Register New User
UserRouter.post('/register', userController.registerUser)

// Login
UserRouter.post('/login', userController.loginUser);

module.exports = UserRouter;