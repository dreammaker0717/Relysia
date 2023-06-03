import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  walletData: null,
  walletAddress: null,
  transactionHistory: {},
  balance: {
    id: null,
    dollarBal: 0,
    bsvBal: 0,
  },
  mnemonic: null,
  checked: 1,
  currentWalletId: '00000000-0000-0000-0000-000000000000',
  checkedAllBalances: false,
  checkedAllAddresses: false,
  checkedsingleBalance: false,
  checkedsingleAddresse: false,
  currencyUsd: null,
  walletStasTokens: null,
  invoice: null,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletDataAction: (state, action) => {
      ;(state.walletData =
        action.payload === null ? null : { ...action.payload }),
        (state.checked = state.checked + 1)
    },
    updateCurrentWalletID: (state, action) => {
      ;(state.currentWalletId = action.payload
        ? action.payload
        : '00000000-0000-0000-0000-000000000000'),
        (state.checked = state.checked + 1)
    },
    updateMnemonic: (state, action) => {
      state.mnemonic = action.payload
    },
    updateStasTokens: (state, action) => {
      ;(state.walletStasTokens = action.payload ? action.payload : null),
        (state.checked = state.checked + 1)
    },
    updateInvoice: (state, action) => {
      state.invoice = action.payload ? action.payload : null;
      state.checked += 1;
    },
    updateWalletNameRedux: (state, action) => {
      ;(state.walletData = {
        ...state.walletData,
        [action.payload.id]: {
          ...state.walletData[action.payload.id],
          walletTitle: action.payload.walletTitle,
        },
      }),
        (state.checked = state.checked + 1)
    },
    updateWalletTransactions: (state, action) => {
      ;(state.transactionHistory = {
        ...state.transactionHistory,
        [action.payload.id]: {
          ...action.payload.transactions,
        },
      }),
        (state.checked = state.checked + 1),
        (state.checkedsingleBalance = true)
    },
    updateCurrency: (state, action) => {
      ;(state.currencyUsd = action.payload), (state.checked = state.checked + 1)
    },
    updateWalletBalancesAction: (state, action) => {
      ;(state.balance = {
        walletID: action.payload.id,
        dollarBal: action.payload.dollarBal,
        bsvBal: action.payload.bsvBal,
      }),
        (state.checked = state.checked + 1),
        (state.checkedsingleBalance = true)
    },
    updateAllWalletAddressesAction: (state, action) => {
      let data = [...action.payload]
      if (data.length > 0) {
        for (var single of data) {
          state.walletData[`${single.id}`] = {
            ...state.walletData[`${single.id}`],
            address: single.address,
            paymail: single.paymail,
          }
        }
      }
      ;(state.checked = state.checked + 1),
        (state.checkedAllAddresses = true),
        (state.checkedsingleAddresse = true)
    },
    checkWalletAddressAction: (state, action) => {
      ;(state.walletAddress = {
        address: action.payload.address,
        paymail: action.payload.paymail,
      }),
        (state.checked = state.checked + 1),
        (state.checkedsingleAddresse = true)
    },
    pushNewWalletAction: (state, action) => {
      state.walletData = {
        ...state.walletData,
        [action.payload.id]: { ...action.payload.data },
      }
    },
    destroyWalletAction: (state, action) => {
      ;(state.walletData = null),
        (state.walletAddress = null),
        (state.transactionHistory = {}),
        (state.balance = null),
        (state.mnemonic = null),
        (state.checked = 1),
        (state.currentWalletId = '00000000-0000-0000-0000-000000000000'),
        (state.checkedAllBalances = false),
        (state.checkedAllAddresses = false),
        (state.checkedsingleBalance = false),
        (state.checkedsingleAddresse = false),
        (state.currencyUsd = null),
        (state.walletStasTokens = null),
        (state.invoice = null)
    },
    updateWalletPaymailRedux: (state, action) => {
      if (state.walletData[action.payload.id]) {
        ;(state.walletData = {
          ...state.walletData,
          [action.payload.id]: {
            ...state.walletData[action.payload.id],
            paymail: action.payload.paymail,
          },
        }),
          (state.checked = state.checked + 1),
          (state.checkedsingleBalance = true)
      }

      ;(state.checked = state.checked + 1), (state.checkedsingleBalance = true)
    },
  },
})

export default walletSlice
export const {
  updateWalletDataAction,
  updateCurrentWalletID,
  updateMnemonic,
  updateStasTokens,
  updateInvoice,
  updateWalletNameRedux,
  updateWalletTransactions,
  updateCurrency,
  updateWalletBalancesAction,
  updateAllWalletAddressesAction,
  checkWalletAddressAction,
  pushNewWalletAction,
  destroyWalletAction,
  updateWalletPaymailRedux,
} = walletSlice.actions
