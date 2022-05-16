const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  loginGoogle,
  verifyUserEmail,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/googlelogin', loginGoogle)
router.get('/verify/:hash', verifyUserEmail)

module.exports = router
