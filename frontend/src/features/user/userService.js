import axios from 'axios'

const API_URL = '/api/users'

const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData)

  return response.data
}

const userService = {
  registerUser,
}

export default userService
