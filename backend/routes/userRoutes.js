const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  loginGoogle,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/googlelogin', loginGoogle)

module.exports = router
