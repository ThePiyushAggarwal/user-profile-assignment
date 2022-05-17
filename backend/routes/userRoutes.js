const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  verifyUserEmail,
  resendVerification,
} = require('../controllers/userController')

const { signInOrSignUpWithGoogle } = require('../controllers/googleController')

//
router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/register/resend-email', resendVerification)
router.get('/verify/:hash', verifyUserEmail)

//
router.post('/googlelogin', signInOrSignUpWithGoogle)

module.exports = router
