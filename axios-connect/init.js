import { createWalletfromApi } from './wallet'
import { updateWalletDataAction } from '@/redux/slices/wallet'
import apiConfig from '@/config/relysiaApi'
import store from '@/redux/store'
import { toast } from 'react-toastify'
import { updateCurrency } from '@/redux/slices/wallet'
export const createNewDefaultWallet = (authToken) => {
  toast.info('Generating Default Wallet Keys..', {
    position: 'top-left',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
  createWalletfromApi({
    authToken,
    walletTitle: 'default',
    walletPassword: 'default',
    walletLogo:
      'https://relysia.com/images/newWallets/icons/walletinfinityicons.svg',
    type: 'standard',
  })
    .then((walletRes) => {
      if (walletRes && walletRes.status === 'success') {
        toast.success('Wallet created Successfully!', {
          position: 'top-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      } else {
        console.log(walletRes)
        console.log('error ', walletRes)
        toast.error('An error occures, Try again!', {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    })
    .catch((err) => {
      console.log('catch err', err)
      toast.error(err.message, {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    })
}

export const checkCurrencyfromAPI = async () => {
  apiConfig
    .get('/v1/currencyConversion', {
      headers: {
        satoshis: `1`,
        currency: `usd`,
      },
    })
    .then((balanceData) => {
      if (
        balanceData &&
        balanceData.data &&
        balanceData.data.data &&
        balanceData.data.data.status === 'success'
      ) {
        const balance = balanceData.data.data.balance
        store.dispatch(updateCurrency(balance))
      }
    })
}

export const getWallets = async (accessToken) => {
  const defaultWallet = '00000000-0000-0000-0000-000000000000'
  await apiConfig
    .get('/v1/wallets')
    .then((data) => {
      if (
        data &&
        data.data &&
        data.data.data &&
        data.data.data.status === 'success'
      ) {
        const wallet = [...data.data.data.wallets]

        if (wallet.length === 0) {
          createNewDefaultWallet(accessToken)
          return
        } else {
          const checkDefault = wallet.find((a) => a.walletID === defaultWallet)
          if (!checkDefault) {
            createNewDefaultWallet(accessToken)
            return
          }

          store.dispatch(updateWalletDataAction(wallet))
        }
      }
    })
    .catch((err, data) => {
      console.log(data)
      console.log(err)
    })
}

export const refreshWallets = async () => {
  await apiConfig
    .get('/v1/wallets')
    .then((data) => {
      if (
        data &&
        data.data &&
        data.data.data &&
        data.data.data.status === 'success'
      ) {
        const wallet = [...data.data.data.wallets]
        store.dispatch(updateWalletDataAction(wallet))
      }
    })
    .catch((err, data) => {
      console.log(data)
      console.log(err)
    })
}
