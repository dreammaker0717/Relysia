import io from 'socket.io-client'
import store from '@/redux/store'
import { toast } from 'react-toastify'
import { envMODE } from '@/config/envMode'
import { updateBalanceSocket } from '@/axios-connect/wallet'

var relysiaSocket = null

export const connectToRelysiaSocket = async (token) => {
  const relysiaEndpoint = 'api.relysia.com'

  if (relysiaSocket) {
    return null
  }
  let socketParams = {
    authtoken: token,
    serviceid: '3a1958c1-929b-438b-8228-e9008501f703',
  }
  if (envMODE !== 'DEV') {
    delete socketParams.serviceid
  }
  relysiaSocket = io(`wss://${relysiaEndpoint}`, {
    auth: socketParams,
    transports: ['websocket', 'polling'],
  })
  try {
    relysiaSocket.on('connect', () => {
      console.log('relysiaSocket connected')
    })
    relysiaSocket.on('disconnect', () => {
      console.log('relysiaSocket disconnected')
    })
    relysiaSocket.on('balance', async function (balance) {
      await updateBalanceSocket(balance, null)
      console.log('event received balance', balance)
    })
  } catch (error) {
    console.log('socket error', error)
  }
}

export const disconnectRelysiaSocket = async (id) => {
  try {
    if (relysiaSocket) {
      console.log('disconnecting socket')
      relysiaSocket.off('balance')
      relysiaSocket = null
    }
  } catch (err) {
    relysiaSocket = null

    console.log('disconnect err', err)
  }
}
