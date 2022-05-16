const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendConfirmationEmail } = require('../mailer/mailer')
const uuid = require('uuid')

// REGISTER USER
const registerUser = asyncHandler(async (request, response) => {
  const { first_name, last_name, username, email, password } = request.body

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

    // Sending confirmation email
    await sendConfirmationEmail(user)

    response.status(201).json({
      id: user._id,
      email: user.email,
      uuid: user.uuid,
      token: generateToken(user._id),
    })
  } catch (error) {
    response.status(400).send(error)
  }
})

// LOGIN USER
const loginUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body

  const user1 = await User.exists({ username })
  const user2 = await User.exists({ email })

  const user = user1 || user2

  if (user && (await bcrypt.compare(password, user.password))) {
    response.status(200).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    response.status(400)
    throw new Error('Invalid login credentials')
  }
})

// Generating token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '10d',
  })
}

// User verification from Email
const verifyUserEmail = asyncHandler(async (request, response) => {
  try {
    const hash = request.params.hash.replace(/aslash/g, '/')
    const users = await User.find().select('uuid')

    console.log(users)

    // Here we map through all the promises of comparison
    const promises = await Promise.all(
      users.map((user) => bcrypt.compare(user.uuid, hash))
    )

    // Getting the index of the 'true' promise
    const index = promises.indexOf(true)
    if (users[index].uuid) {
      await User.findOneAndUpdate(
        { uuid: users[index].uuid },
        { verification: 'Active' },
        { new: true }
      )
      response.send('Email Verified!!')
    }
  } catch (error) {
    console.log(error)
    response.send(error)
  }
})

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

const loginGoogle = asyncHandler(async (request, response) => {
  const { email, given_name, family_name } = request.body
})

module.exports = {
  registerUser,
  loginUser,
  loginGoogle,
  verifyUserEmail,
  resendVerification,
}
