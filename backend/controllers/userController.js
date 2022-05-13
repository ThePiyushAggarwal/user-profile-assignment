const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (request, response) => {
  const { first_name, last_name, username, email, password } = request.body

  // Validation
  if (!first_name || !last_name || !username || !email || !password) {
    response.status(400)
    throw new Error('Please enter all fields!')
  }

  // Checking if the user credentials exist
  const usernameExists = await User.findOne({ username })
  const emailExists = await User.findOne({ email })

  if (usernameExists || emailExists) {
    response.status(400)
    throw new Error('User already exists')
  }

  // Hashing the password using bcrypt and jwt
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Creating the user with hashed password
  const user = await User.create({
    first_name,
    last_name,
    username,
    email,
    password: hashedPassword,
  })

  if (user) {
    response.status(201).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    response.status(400)
    throw new Error('Invalid user data')
  }
})

// Generating token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '1d',
  })
}

module.exports = { registerUser }
