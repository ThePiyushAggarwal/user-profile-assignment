import axios from 'axios'

const API_URL = '/api/users'

const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData)
  // logging in right after registering
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const userService = {
  registerUser,
}

export default userService
