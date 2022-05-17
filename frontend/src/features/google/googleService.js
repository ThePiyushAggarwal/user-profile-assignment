import axios from 'axios'

const API_URL = '/api/users'

// Get User from Google, sent to the database for checking
const getUserFromGoogle = async (userData) => {
  const response = await axios.post(API_URL + '/googlelogin', userData)
  // login with the details
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout User
const logout = () => {
  localStorage.removeItem('user')
}

const googleService = { getUserFromGoogle, logout }

export default googleService
