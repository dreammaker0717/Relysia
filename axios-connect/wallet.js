import { CancelToken } from 'axios'
import store from '@/redux/store'
import apiConfig from '@/config/relysiaApi'
import {
  pushNewWalletAction,
  updateWalletBalancesAction,
  checkWalletAddressAction,
  updateMnemonic,
  updateWalletTransactions,
  updateInvoice,
  updateStasTokens,
} from '@/redux/slices/wallet'
import ComingSoon from '@/components/common/soon/soon'
import { refreshWallets } from './init'

const source = CancelToken.source()

export const checkBalancefromApi = async (walletID, curr) => {
  let balance = 0.0
  let currency = 'USD'
  if (curr) {
    currency = curr
  }

  if (walletID) {
    try {
      const { data } = await apiConfig.get('/v2/balance', {
        cancelToken: source.token,
        headers: {
          walletID,
          currency,
        },
      })
      balance = data.data.totalBalance.balance || 0
      const bsv = data.data.coins[0].balance || 0
      const calculatedBsv = bsv === 0 ? 0 : (bsv / 100000000).toFixed(8)
      const calculatedBalance = Number.parseFloat(balance).toFixed(2)
      store.dispatch(
        updateWalletBalancesAction({
          id: walletID,
          dollarBal: calculatedBalance,
          bsvBal: calculatedBsv,
        }),
      )
      const cointData = data.data.coins.filter(
        (coin) => coin.protocol === 'STAS',
      )
      if (cointData.length) {
        store.dispatch(updateStasTokens(cointData))
      } else {
        store.dispatch(updateStasTokens([]))
      }
    } catch (err) {
      console.error(err)
    }
  }
}
export const updateBalanceSocket = async (data, curr) => {
  let balance = 0.0
  let currency = 'USD'
  if (curr) {
    currency = curr
  }
  let walletID = data?.walletId

  if (walletID) {
    try {
      balance = data.totalBalance.balance || 0
      const bsv = data.coins[0].balance || 0
      const calculatedBsv = bsv === 0 ? 0 : (bsv / 100000000).toFixed(8)
      const calculatedBalance = Number.parseFloat(balance).toFixed(2)
      store.dispatch(
        updateWalletBalancesAction({
          id: walletID,
          dollarBal: calculatedBalance,
          bsvBal: calculatedBsv,
        }),
      )
      const cointData = data.coins.filter((coin) => coin.protocol === 'STAS')
      if (cointData.length) {
        store.dispatch(updateStasTokens(cointData))
      } else {
        store.dispatch(updateStasTokens([]))
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const getwalletBal = async (walletid) => {
  const {
    data: { data },
  } = await apiConfig.get('/v1/currencyConversion', {
    headers: {
      satoshis: '1',
      currency: 'USD',
    },
  })

  const bsvRate = parseFloat(data.balance) * 100000000
  //wallet balance
  await apiConfig
    .get('/v1/metrics', {
      headers: {
        walletID: `${walletid}`,
      },
    })
    .then((res) => {
      const balInBsv =
        res?.data?.data?.data?.balance / 100000000
          ? res.data.data.data.balance / 100000000
          : 0
      const balance = (balInBsv * bsvRate).toFixed(2)
      store.dispatch(
        updateWalletBalancesAction({
          id: walletid,
          dollarBal: balance,
          bsvBal: balInBsv,
        }),
      )
    })
    .catch((err) => {
      console.log('metrics error', err, err.response)
    })
}

export const deleteWallet = async (walletid) => {
  const res = await apiConfig
    .delete('/v1/wallet', {
      headers: {
        walletID: walletid,
      },
    })
    .then(() => {
      refreshWallets()
      return true
    })
    .catch((err) => {
      console.log('metrics error', err, err.response)
      return false
    })
  return res
}

export const checkTransactionsfromApi = async (
  walletID,
  nextPageToken,
  currentTransactions = [],
) => {
  console.log('checking Transactions')
  if (walletID) {
    try {
      const { data } = await apiConfig.get(
        `/v2/history?nextPageToken=${nextPageToken || ''}`,
        {
          cancelToken: source.token,
          headers: {
            walletID: `${walletID}`,
          },
        },
      )
      console.log(data, 'proper')
      if (data.data.status === 'success') {
        const transactionList = data.data.histories
        const newL =
          currentTransactions.length > 0
            ? [...Object.values(currentTransactions[0]), ...transactionList]
            : [...transactionList]
        store.dispatch(
          updateWalletTransactions({
            id: walletID,
            transactions: newL,
          }),
        )
        return data.data
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const getMnemonicfromApi = async (walletID) => {
  if (walletID) {
    const {
      data: { data },
    } = await apiConfig.get('/v1/mnemonic', {
      cancelToken: source.token,
      headers: {
        walletID,
      },
    })

    if (data && data.status === 'success') {
      const mnemonicData = data.mnemonic
      return mnemonicData
    }
  }
}

export const createWalletfromApi = async (data) => {
  if (!data) {
    return { error: 'error' }
  }

  const headers = {
    walletTitle: data.walletTitle,
    type: data.type,
    walletLogo: data.walletLogo,
  }

  if (data.mnemonicPhrase) {
    headers.mnemonicPhrase = data.mnemonicPhrase
  }

  if (data.walletPassword) headers['walletPassword'] = data.walletPassword

  const res = await apiConfig
    .get('/v1/createWallet', {
      cancelToken: source.token,
      headers,
    })
    .catch((err, data) => {
      console.log(data)
      return err.response
    })
  if (res && res.data && res.data.data && res.data.data.status === 'success') {
    const resdata = res.data.data
    store.dispatch(
      pushNewWalletAction({
        id: resdata.walletID,
        data: {
          walletID: resdata.walletID,
          walletLogo: data.walletLogo,
          walletTitle: data.walletTitle,
          bsvBal: 0.0,
          dollarBal: 0.0,
          transactions: [],
        },
      }),
    )
    getMnemonicfromApi(resdata.walletID).then((res) => {
      if (res) {
        store.dispatch(updateMnemonic(res.split(' ')))
      }
    })
    return res.data.data
  } else {
    let msg = res?.data?.data?.msg || 'Can not create wallet'
    return msg
  }
}

export const checkAdressfromApi = (walletID) => {
  apiConfig
    .get('/v1/address', {
      cancelToken: source.token,
      headers: {
        walletID,
      },
    })
    .then((addressData) => {
      if (addressData?.data?.data?.status === 'success') {
        const address = addressData.data.data.address
        const paymail = addressData.data.data.paymail
        var injectedData = { id: walletID, address, paymail }
        store.dispatch(checkWalletAddressAction(injectedData))
      }
    })
}

export const getInvoice = async (invoiceId) => {
  try {
    const { data } = await apiConfig.get('/v1/paymentRequest/' + invoiceId, {
      cancelToken: source.token,
    })
    const response = data
    console.log(response)
    if (response) {
      console.log('success wallet.js')
      return response
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

export const payInvoice = async (walletId, paymentRequest) => {
  try {
    const { data } = await apiConfig.get('/v1/paymentRequest/' + invoiceId, {
      cancelToken: source.token,
    })
    const response = data
    console.log(response)
    if (response) {
      console.log('success wallet.js')
      return response
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

export const uploadNft = async (formData, walletID, setData) => {
  try {
    const data = await apiConfig.post('upload', formData, {
      headers: {
        walletID,
      },
    })
    const { response: { data: { data: { msg } = '' } = {} } = {} } = data || {}
    if (data?.data?.statusCode >= 200 && data?.data?.statusCode < 300) {
      if (data?.data?.data?.status === 'success') {
        return data?.data?.data?.uploadObj
      }
    }
    throw new Error(`${msg}`)
  } catch (err) {
    throw err
  }
}

export const sendToken = async (walletID, to, note, amount, tokenId) => {
  const data = {
    to: to,
    amount: amount,
    notes: note,
    ...(tokenId ? { tokenId: tokenId } : { type: 'BSV' }),
  }

  const sendData = await apiConfig.post(
    '/v1/send',
    { dataArray: [data] },
    {
      cancelToken: source?.token,
      headers: {
        walletID,
        'Content-Type': 'application/json',
      },
    },
  )

  if (sendData?.data?.data?.status === 'success') {
    return sendData?.status
  } else {
    return sendData?.response?.data?.data?.msg
      ? sendData?.response?.data?.data?.msg
      : 'Failed to transfer tokens'
  }
}

/**
 *
 * @param {*} data
 * @param {string} currentWalletId current selected wallet id
 */
export const issueTokenAPI = async (data, currentWalletId) => {
  const issueApi = await apiConfig
    .post('/v1/issue', {
      cancelToken: source.token,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        walletID: currentWalletId,
      },
    })
    .catch((err, data) => {
      // throw new Error(err.response)
      return err.response
    })
  if (
    issueApi &&
    issueApi.data &&
    issueApi.data.data &&
    issueApi.data.data.status === 'success'
  ) {
    return { data: issueApi.data.data, status: issueApi.data.data.status }
  } else {
    return { data: issueApi.data.data, status: 'fail' }
  }
}

export const updatePaymail = async (data, walletId) => {
  try {
    const renamePaymailApi = await apiConfig.put('/v1/paymail', data, {
      headers: {
        'Content-Type': 'application/json',
        walletID: walletId,
      },
    })

    if (renamePaymailApi.data.data.status === 'success') {
      return {
        data: renamePaymailApi.data.data,
        status: renamePaymailApi.status,
      }
    } else {
      return {
        data: renamePaymailApi.data.data,
        status: renamePaymailApi.status,
      }
    }
  } catch (error) {
    console.error(error)
    return { data: error.response.data, status: error.response.status }
  }
}

export const getProjectSetup = async (serviceId) => {
  const setUpApiRes = await apiConfig
    .get('/admin/v1/setup/' + serviceId, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((err, data) => {
      console.log('get error api error', err, data)

      return err.response
    })

  if (
    setUpApiRes &&
    setUpApiRes.data &&
    setUpApiRes.data.data &&
    setUpApiRes.data.data.status === 'success'
  ) {
    let cObj = { ...setUpApiRes.data.data }

    if (cObj.domain) {
      cObj.paymailDomain = cObj.domain
    }
    if (cObj?.type && cObj.type === 1) {
      cObj.type = 'CLASSIC_MODE'
    } else {
      cObj.type = 'FEE_MANAGER'
    }
    delete cObj.userId
    delete cObj.msg
    delete cObj.domain
    delete cObj.updationDate
    delete cObj.creationDate
    delete cObj.serviceIdRef
    delete cObj.serviceIdStatus
    delete cObj.serviceId
    delete cObj.status
    delete cObj.feeManagerConfig

    if (cObj.tokenConfig) {
      let legalObj = { ...cObj.tokenConfig }
      if (legalObj.satsPerToken) {
        delete legalObj.satsPerToken
      }
      cObj.legal = legalObj
      delete cObj.tokenConfig
    }
    return {
      data: cObj,
      status: setUpApiRes.data.data.status,
    }
  } else {
    return { data: setUpApiRes.data.data, status: 'fail' }
  }
}

export const setProjectSetup = async (serviceId, dataBody) => {
  const setUpApiRes = await apiConfig
    .put('/admin/v1/setup/' + serviceId, dataBody)
    .catch((err, data) => {
      console.log('get error api error', err, data)

      return err.response
    })

  if (
    setUpApiRes &&
    setUpApiRes?.data &&
    setUpApiRes?.data?.data &&
    setUpApiRes?.data?.data?.status === 'success'
  ) {
    return {
      data: setUpApiRes?.data?.data,
      status: setUpApiRes?.data?.data?.status,
    }
  } else {
    let errorResponse =
      setUpApiRes?.response?.data?.data || 'Unable to Update details'
    return { data: errorResponse, status: 'fail' }
  }
}

export const cancelAllAPIS = () => {
  source.cancel('Operation canceled by the user.')
}
