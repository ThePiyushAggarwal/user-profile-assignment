import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  tempUserData: null,
  resendCount: 0,
  isError: false,
  isLoading: false,
  sentVerificationLink: false,
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
export const logout = createAsyncThunk('user/logout', () => {
  userService.logout()
})

// Resend email to the user
export const resendEmail = createAsyncThunk(
  'user/resend',
  async (tempUserData, thunkAPI) => {
    try {
      return await userService.resendEmail(tempUserData)
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
      state.sentVerificationLink = true
      state.tempUserData = payload
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
    [resendEmail.pending]: (state) => {
      state.isLoading = true
      state.sentVerificationLink = false
    },
    [resendEmail.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.message = payload
      state.resendCount += 1
    },
    [resendEmail.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload
    },
  },
})

export const { resetState } = userSlice.actions

export default userSlice.reducer
