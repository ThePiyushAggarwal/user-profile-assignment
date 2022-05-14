import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isError: false,
  isLoading: false,
  message: '',
}

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      return await userService.registerUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      return await userService.loginUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Logout user
export const logout = createAsyncThunk('user/logout', async () => {
  await userService.logout()
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isError = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload
      state.user = null
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload
      state.user = null
    },
    [logout.fulfilled]: (state) => {
      state.user = null
    },
  },
})

export const { resetState } = userSlice.actions

export default userSlice.reducer
