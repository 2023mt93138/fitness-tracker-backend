const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const consts = require('../static/constants');

exports.registerUser = async (req, res) => {
  const data = new UserModel({
    username: req.body.username,
    password: req.body.password
  })
  const checkUser = await UserModel.findOne({ username: req.body.username })
  if (checkUser) {
    res.status(400).json({ message: "Username already exists" })
  } else {
    try {
      await data.save();
      res.status(200).json({ success: true, message: 'User registered successfully' })
    }
    catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
};

exports.loginUser = async (req, res) => {
  const checkUser = await UserModel.findOne({ username: req.body.username })
  if (!checkUser) {
    return res.status(404).json({
      message: "Username Not Found"
    });
  }
  // Use the comparePassword method to compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(req.body.password, checkUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  // Generate JWT token
  const token = jwt.sign({ userId: checkUser._id }, consts.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
};
