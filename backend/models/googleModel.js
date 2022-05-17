const mongoose = require('mongoose')

const googleSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 3,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    // validate: {
    //   validator: (val) => {
    //     return val === 'jeez'
    //   },
    //   message: 'This username existss',
    // },
  },
  email: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('GoogleUser', googleSchema)
