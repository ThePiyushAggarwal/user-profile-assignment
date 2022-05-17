import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import googleReducer from '../features/google/googleSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    google: googleReducer,
  },
})
