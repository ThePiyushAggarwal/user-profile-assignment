import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import googleService from './googleService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isError: false,
  isLoading: false,
  message: '',
}

// Get User from Google and Sign In Or Sign Up
export const getUserFromGoogle = createAsyncThunk(
  'google/signin',
  async (userData, thunkAPI) => {
    try {
      return await googleService.getUserFromGoogle(userData)
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
export const logout = createAsyncThunk('google/logout', () => {
  googleService.logout()
})

export const googleSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isError = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: {
    [getUserFromGoogle.pending]: (state) => {
      state.isLoading = true
    },
    [getUserFromGoogle.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
    },
    [getUserFromGoogle.rejected]: (state, { payload }) => {
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

export const { resetState } = googleSlice.actions

export default googleSlice.reducer
