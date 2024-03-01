import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './redux/counterSlicetest'
import LoginInfoSlice from './redux/LoginInfoSlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    loginInfo:LoginInfoSlice
  },
})