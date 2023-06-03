import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  isLoading: false,
  isSucess: false,
  isError: false,
  message: '',
}

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    registeredAppRequest: (state, action) => {
      ;(state.isLoading = true),
        (state.isError = false),
        (state.isSucess = false),
        (state.message = '')
    },
    registeredAppSuccess: (state, action) => {
      ;(state.data = action.payload),
        (state.isLoading = false),
        (state.isError = false),
        (state.isSucess = true),
        (state.message = '')
    },
    registeredAppError: (state, action) => {
      ;(state.message = action.payload),
        (state.isLoading = false),
        (state.isError = true),
        (state.isSucess = false),
        (state.data = [])
    },
  },
})

export default appsSlice
export const {
  registeredAppRequest,
  registeredAppSuccess,
  registeredAppError,
} = appsSlice.actions
