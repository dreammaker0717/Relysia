import axios from 'axios'

const _apiHost = 'https://wallet.vaionex.com/v1/'

async function request(url, headersData, params = {}, method = 'GET') {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...headersData,
    },
  }

  if (params) {
    if (method === 'POST' || method === 'PATCH') {
      options.data = JSON.stringify(params)
    }
  }
  options.url = _apiHost + url
  const response = await axios(options)

  if (response.status === 200) {
    return response.data
  } else {
    const error = new Error()
    error.info = response.data
    return error
  }
}

function get(url, headersData, params) {
  return request(url, headersData, params)
}

function post(url, headersData, params) {
  return request(url, headersData, params, 'POST')
}

function patch(url, headersData, params) {
  return request(url, headersData, params, 'PATCH')
}

export default {
  get,
  post,
  patch,
}
