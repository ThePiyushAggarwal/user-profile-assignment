const User = require('../models/userModel')

const registerUser = async (request, response) => {
  const newUser = await User.create(request.body)
  response.json(newUser)
}

module.exports = { registerUser }
