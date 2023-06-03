import {
  registeredAppRequest,
  registeredAppSuccess,
  registeredAppError,
} from '@/redux/slices/apps'
import Fetch from '../../../utils/fireAjax'

export const getRegisteredAppList = (dispatch) => {
  return async () => {
    // console.log('77777777777');
    dispatch(registeredAppRequest())
    try {
      const res = await Fetch.get('oauth/client/', {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        authToken: localStorage.getItem('auth__token'),
      })
      dispatch(registeredAppSuccess(res.data.msg))
    } catch (err) {
      dispatch(registeredAppError(err))
    }
  }
}
