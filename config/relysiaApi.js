import { logout } from '@/redux/slices/auth'
import { destroyWalletAction } from '@/redux/slices/wallet'
import axios from 'axios'
import { toast } from 'react-toastify'
import { store } from '../redux'
const instance = axios.create({
  baseURL: 'https://api.relysia.com',
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // if (error.response.status == 401) {
    //   await store.dispatch(logout()).unwrap()
    //   store.dispatch(destroyWalletAction(null))
    //   localStorage.setItem('auth__token', '')
    //   toast.error('User Token has been expired')
    // }
    return error
  },
)

export default instance
