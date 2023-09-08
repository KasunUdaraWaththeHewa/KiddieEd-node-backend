const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, image, userEmail, userPassword } = req.body

  if (!userName || !userEmail || !userPassword) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ userEmail })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(userPassword, salt)

  // Create user
  const user = await User.create({
    userName,
    image,
    userEmail,
    userPassword: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      image: user.image,
      userEmail: user.userEmail,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body

  // Check for user userEmail
  const user = await User.findOne({ userEmail })

  if (user && (await bcrypt.compare(userPassword, user.userPassword))) {
    req.session.userId = user._id;

    res.json({
      _id: user.id,
      userName: user.userName,
      image: user.image,
      userEmail: user.userEmail,
      token: generateToken(user._id),
    })

  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


const logoutUser = (req, res) => {
  // if (!req.session.userId) {
  //   return res.status(401).json({ success: false, message: 'already logged out' });
  // }
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logout successful' });
  });
};

// @desc    Get user data
// @route   GET /users/
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const authenticate = (req, res) => {
  const isAuthenticated = !!req.session.userId; // Check if a session exists
  res.json({ isAuthenticated });
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  authenticate,
}
