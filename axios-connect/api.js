import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { firebaseAuthFunc } from '@/config/init'

export const api = axios.create({ baseURL: 'https://api.relysia.com/' })
delete api.defaults.headers.common.serviceID

export async function setup(requestBody) {
  const { currentUser } = getAuth()
  const token = await currentUser.getIdToken()
  return await api.post('admin/v1/setup', requestBody, {
    headers: {
      authToken: token,
      'Content-Type': 'application/json',
    },
    transformRequest: [
      (data, headers) => {
        delete headers.common['serviceId']
        return JSON.stringify(data)
      },
    ],
  })
}

export async function getServiceIDs(currentUser) {
  const token = await currentUser.getIdToken()
  return await api.get('admin/v1/setup/serviceIds', {
    headers: {
      authToken: token,
      'Content-Type': 'application/json',
    },
    transformRequest: [
      (data, headers) => {
        // delete headers.common['serviceId'];
        return JSON.stringify(data)
      },
    ],
  })
}

export async function getService(currentUser, id) {
  const token = await currentUser.getIdToken()
  const response = await api.get(`admin/v1/setup/${id}`, {
    headers: {
      authToken: token,
      'Content-Type': 'application/json',
    },
    transformRequest: [
      (data, headers) => {
        delete headers.common['serviceId']
        return JSON.stringify(data)
      },
    ],
  })

  response.data.data = { ...response.data.data, id }

  return response
}

export async function deleteService(id) {
  const { currentUser } = firebaseAuthFunc
  const token = await currentUser.getIdToken()
  const response = await api.delete(`admin/v1/setup/${id}`, {
    headers: {
      authToken: token,
      'Content-Type': 'application/json',
    },
    transformRequest: [
      (data, headers) => {
        delete headers.common['serviceId']
        return JSON.stringify(data)
      },
    ],
  })

  response.data.data = { ...response.data.data, id }

  return response
}
