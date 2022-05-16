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

// Logout User
const logout = () => {
  localStorage.removeItem('user')
}

// Get User from Google, sent to the database for checking
const getUserFromGoogle = async (userData) => {
  const response = await axios.post(API_URL + '/googlelogin', userData)
  // login with the details
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const userService = {
  registerUser,
  loginUser,
  logout,
  getUserFromGoogle,
  resendEmail,
}

export default userService
