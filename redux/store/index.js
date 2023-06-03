import { configureStore } from '@reduxjs/toolkit'
import appsSlice from '../slices/apps'
import authSlice from '../slices/auth'
import walletSlice from '../slices/wallet'

const reducer = {
  // Add your reducers here
  auth: authSlice.reducer,
  wallet: walletSlice.reducer,
  apps: appsSlice.reducer,
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
