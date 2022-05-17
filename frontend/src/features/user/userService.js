import axios from 'axios'

const API_URL = '/api/users'

// Register User
const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData)
  return response.data
}

// Resend Verification Email
const resendEmail = async (tempUserData) => {
  const response = await axios.post(
    API_URL + '/register/resend-email',
    tempUserData
  )
  return response.data
}

// Login User
const loginUser = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)
  // login
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Verify and login user
const verifyUser = async (hash) => {
  const response = await axios.get(API_URL + '/verify/' + hash)
  // Login
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout User
const logout = () => {
  localStorage.removeItem('user')
}

const userService = {
  registerUser,
  loginUser,
  verifyUser,
  logout,
  resendEmail,
}

export default userService
