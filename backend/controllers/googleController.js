const GoogleUser = require('../models/googleModel')
const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const { sendGoogleAcknowledgementEmail } = require('../mailer/mailer')
const jwt = require('jsonwebtoken')

// Signing In with the user details received from Google API
const signInOrSignUpWithGoogle = asyncHandler(async (request, response) => {
  const { given_name, family_name, email } = request.body

  // Extra Check for the details provided
  if (!given_name || !family_name || !email) {
    console.log('Details not received from Google')
    throw new Error('Details not received from Google')
  }

  try {
    // Check if the USER ALREADY EXISTS and sign in
    const existingUser = await GoogleUser.findOne({ email })
    if (existingUser) {
      response.json({
        id: existingUser._id,
        email: existingUser.email,
        token: generateToken(existingUser._id),
      })
    } else {
      // Making up a username
      const username =
        given_name.toLowerCase() +
        '_' +
        family_name.toLowerCase() +
        uuid.v4().slice(0, 4)

      // Register Google user with our database
      const user = await GoogleUser.create({
        first_name: given_name,
        last_name: family_name,
        username,
        email,
        uuid: uuid.v4(),
      })

      // Send Acknowledgement email and send user token to google slice
      if (user) {
        await sendGoogleAcknowledgementEmail(user.email)

        response.json({
          id: user._id,
          email: user.email,
          token: generateToken(user._id),
        })
      }
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

module.exports = { signInOrSignUpWithGoogle }
