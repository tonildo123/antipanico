import { configureStore } from '@reduxjs/toolkit'
import ProfileSlice from './ProfileSlice'
import AddressSlice from './AddressSlice'


export const store = configureStore({
  reducer: {
    user:ProfileSlice,
    address: AddressSlice
  },
})