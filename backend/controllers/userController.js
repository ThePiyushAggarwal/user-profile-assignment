const User = require('../models/userModel')
const GoogleUser = require('../models/googleModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendConfirmationEmail } = require('../mailer/mailer')
const uuid = require('uuid')

// REGISTER USER
// Route: POST /api/users/
const registerUser = asyncHandler(async (request, response) => {
  const { first_name, last_name, username, email, password } = request.body

  // Checking if the use already exists in googleusers collection
  if (email && (await GoogleUser.exists({ email }))) {
    response.status(400)
    throw new Error(
      'You are already registered using Google. Please go to login page.'
    )
  }

  // Validation
  if (!first_name || !last_name || !username || !email || !password) {
    response.status(400)
    throw new Error('Please enter all fields!')
  }

  // Checking if the user credentials exist
  const usernameExists = await User.exists({ username })
  const emailExists = await User.exists({ email })

  if (usernameExists || emailExists) {
    response.status(400)
    throw new Error('User already exists')
  }

  // Hashing the password using bcrypt and jwt
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Creating the user with hashed password
  try {
    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      uuid: uuid.v4(),
    })

    // This will ensure mongoose validation
    if (user) {
      // Sending confirmation email
      await sendConfirmationEmail(user)

      // Sending this data only for if resend email is requested
      response.status(201).json({
        id: user._id,
        email: user.email,
        uuid: user.uuid,
      })
    }
  } catch (error) {
    response.status(400).send(error)
  }
})

// LOGIN USER
// POST /login
const loginUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body

  // Checking if the user exists
  const user1 = await User.findOne({ username })
  const user2 = await User.findOne({ email })
  const user = user1 || user2

  // try {
  // Checking user credentials
  if (user && (await bcrypt.compare(password, user.password))) {
    // Checking Verification Status
    if (user.verification === 'Active') {
      response.status(200).json({
        id: user._id,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      response.status(400)
      throw new Error(
        'User is not verified! Please click on link sent in verification.'
      )
    }
  } else {
    response.status(400)
    throw new Error('Invalid login credentials')
  }
})

// USER VERIFICATION
const verifyUserEmail = asyncHandler(async (request, response) => {
  try {
    const hash = request.params.hash.replace(/aslash/g, '/')
    const users = await User.find().select('uuid')

    // Here we map through all the promises of comparison
    const promises = await Promise.all(
      users.map((user) => bcrypt.compare(user.uuid, hash))
    )

    // Getting the index of the 'true' promise to get the matched user
    const index = promises.indexOf(true)
    if (users[index].uuid) {
      const user = await User.findOneAndUpdate(
        { uuid: users[index].uuid },
        { verification: 'Active' },
        { new: true }
      )

      response.json({
        id: user._id,
        email: user.email,
        token: generateToken(user._id),
      })
    }
  } catch (error) {
    console.log(error)
    response.send(error)
  }
})

// Generating token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '10d',
  })
}

// Sending verification Email again
const resendVerification = asyncHandler(async (request, response) => {
  const user = request.body
  try {
    await sendConfirmationEmail(user)
    response.send('Email Sent!')
  } catch (error) {
    console.log(error)
    response.send(error)
  }
})

module.exports = {
  registerUser,
  loginUser,
  verifyUserEmail,
  resendVerification,
}
