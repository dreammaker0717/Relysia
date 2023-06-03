/* eslint-disable no-unused-vars */
import {
  firebaseLoginMfa,
  firebaseLogout,
  firebaseRegister,
  firebaseLogin,
} from '@/firebase/auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  checked: false,
  isPending: false,
  isUserPending: true,
  errorMessage: null,
  isError: false,
  isAuthenticated: false,
  isSuccess: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseLoginMfa(request).then(
        (userCredential) => userCredential,
      )
      console.log(user)
      if (user && !user?.error) {
        return user
      } else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await firebaseLogout()
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const register = createAsyncThunk(
  'user/signupUser',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseRegister(request)
      if (user && !user?.error) return user
      else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserDataAction: (state, action) => {
      ;(state.userData = action.payload), (state.checked = true)
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setUserPending: (state, action) => {
      state.isUserPending = action.payload
    },
    setResetAuth: (state) => {
      state.userData = null
      state.isPending = false
      state.errorMessage = null
      state.isError = false
      state.isAuthenticated = false
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload
    },
    setPending: (state, action) => {
      state.isPending = action.payload
    },
    setStateChecked: (state, action) => {
      state.checked = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
        state.isError = false
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false
        state.isUserPending = false
        state.errorMessage = action.payload
        state.isError = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false
        state.isUserPending = false
        state.userData = action.payload
      })
      .addCase(register.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
        state.isError = false
      })
      .addCase(register.rejected, (state, action) => {
        state.isUserPending = false
        state.errorMessage = action.payload
        state.isError = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isUserPending = false
        state.userData = action.payload
      })

      .addCase(logout.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
        state.isError = false
        state.isUserPending = true
      })
      .addCase(logout.rejected, (state, action) => {
        state.isPending = false
        state.isUserPending = false
        state.errorMessage = action.payload
        state.isError = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isPending = false
        state.userData = null
        state.isUserPending = false
        state.errorMessage = null
        state.isError = false
        state.isAuthenticated = false
        state.role = null
      })
  },
})

export default authSlice
export const {
  updateUserDataAction,
  setAuthenticated,
  setUserPending,
  setStateChecked,
  setResetAuth,
  setSuccess,
  setPending,
} = authSlice.actions
