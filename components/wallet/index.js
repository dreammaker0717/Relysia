import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'
import DepositDialog from './depositDialog'
import WithdrawDialog from './withdrawDialog'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Divider, Skeleton, Tooltip } from 'antd'
import WalletGraph from './walletGraph'
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useMediaQuery } from '@material-ui/core'
import Icon from '@ant-design/icons/lib/components/Icon'
import { depositIcon } from './icons'
import BalanceGraph from './balanceChart'
import {
  checkAdressfromApi,
  checkBalancefromApi,
  checkTransactionsfromApi,
  getwalletBal,
} from '../../axios-connect/wallet'
import { updateCurrentWalletID, updateMnemonic } from '@/redux/slices/wallet'
import WalletGrids from '../common/walletGrid'
import WalletDropDown from '../common/walletDropDown'
import TokenSideBar from './tokenSideBar'
import MaterialUiCustomButtom from '../common/materialUi-button'
import InfiniteScroll from 'react-infinite-scroll-component'
import Mnemonic from '../mnemonic'
import { tokenConverter, stepSize, getTokenAmount } from '../../utils/helper'
import { ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'
// import FilterDropdown from 'components/common/dropdown'
const FilterDropdown = dynamic(import('components/common/dropdown'))
import Image from 'next/image'
import dynamic from 'next/dynamic'

const filterNames = {
  withdraw: 'debit',
  deposit: 'credit',
  tokens: 'STAS',
}

function WalletPage(props) {
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width:700px)')
  const {
    walletData,
    currencyUsd,
    currentWalletId,
    walletStasTokens,
    transactionHistory,
    walletAddress,
    balance,
    mnemonic,
  } = useSelector(walletSelector)
  const { userData } = useSelector(authSelector)
  const [depositDialogState, setDepositDialogState] = useState(false)
  const [withdrawDialogState, setwithdrawDialogState] = useState(false)
  const [refreshBalance, setrefreshBalance] = useState(false)
  const [tokensList, settokensList] = useState([])

  const [nextPageToken, setNextPageToken] = useState(null)
  const canTransactionLoadMore = Boolean(nextPageToken)

  const userDataRedux = userData
  const [filtersTransactionsByType, setfiltersTransactionsByType] = useState({
    withdraw: true,
    deposit: true,
    tokens: true,
  })
  const filterTransactions = () => {
    if (transactionHistory && currentWalletId in transactionHistory) {
      if (Object.values(filtersTransactionsByType).every((flter) => flter)) {
        return transactionHistory[currentWalletId]
      } else {
        const newFilter = Object.keys(filterNames).reduce((prev, acc) => {
          if (filtersTransactionsByType[acc]) {
            return [...prev, filterNames[acc]]
          } else {
            return [...prev]
          }
        }, [])
        return Object.values(transactionHistory[currentWalletId]).filter(
          (index) =>
            (newFilter.includes(index.type) &&
              index.to[0].protocol === 'BSV') ||
            newFilter.includes(index.to[0].protocol),
        )
      }
    } else {
      return []
    }
  }

  const optionHandler = (e) => {
    e.stopPropagation()
    if (e.target.checked === true) {
      setfiltersTransactionsByType({
        ...filtersTransactionsByType,
        [e.target.value]: true,
      })
    } else {
      setfiltersTransactionsByType({
        ...filtersTransactionsByType,
        [e.target.value]: false,
      })
    }
  }

  useEffect(() => {
    if (userData) {
      ; (async () => {
        setrefreshBalance(true)
        await checkBalancefromApi(currentWalletId, null)
        setrefreshBalance(false)
      })()
    }
  }, [currentWalletId, userData])

  const refreshBalanceHandler = async () => {
    setrefreshBalance(true)
    if (currentWalletId) {
      await getwalletBal(currentWalletId)
      checkBalancefromApi(currentWalletId, null)
    }
    setrefreshBalance(false)
  }

  const refreshTransactions = () => {
    if (currentWalletId) {
      checkTransactionsfromApi(currentWalletId, nextPageToken, [
        transactionHistory[currentWalletId],
      ])
        .then((res) => {
          if (res.meta) {
            setNextPageToken(res.meta.nextPageToken)
          } else {
            setNextPageToken(null)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }

  useEffect(() => {
    if (walletData && currentWalletId) {
      checkTransactionsfromApi(currentWalletId, nextPageToken)
        .then((res) => {
          if (res.meta.nextPageToken) {
            setNextPageToken(res.meta.nextPageToken)
          } else {
            setNextPageToken(null)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }, [walletData, currentWalletId])

  useEffect(() => {
    if (walletData && currentWalletId) {
      checkAdressfromApi(currentWalletId, dispatch)
    }
  }, [walletData, currentWalletId])

  let toastId = 'customId'

  const handleClose = () => {
    dispatch(updateMnemonic(null))
  }

  const dataforReports = (e) => {
    e.preventDefault()
    let csv
    const items = Object.values(transactionHistory[currentWalletId]).map(
      (datas) => ({
        ...datas,
        timestamp: new Date(datas.timestamp).toDateString(),
      }),
    )
    for (let row = 0; row < items.length; row++) {
      let keysAmount = Object.keys(items[row]).length
      let keysCounter = 0

      // If this is the first row, generate the headings
      if (row === 0) {
        // Loop each property of the object
        for (let key in items[row]) {
          // This is to not add a comma at the last cell
          // The '\r\n' adds a new line
          csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
          keysCounter++
        }
      } else {
        for (let key in items[row]) {
          csv += items[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
          keysCounter++
        }
      }

      keysCounter = 0
    }
    console.log(items)
    let blob = new Blob([csv], { type: 'text/csv' })
    let url = window.URL.createObjectURL(blob)
    window.open(url)
  }

  const routerPush = (e) => {
    setNextPageToken(null)
    dispatch(updateCurrentWalletID(e.currentTarget.getAttribute('value')))
  }

  const walletComponent = walletData &&
    Object.values(walletData).length > 0 &&
    Object.values(walletData)[0].walletTitle && (
      <WalletGrids
        currentWalletId={currentWalletId}
        walletData={Object.values(walletData)}
        onClick={routerPush}
        className="col-span-12 md:col-span-7 box-border flex flex-row mt-1"
      />
    )

  const walletDropdown = walletData &&
    Object.values(walletData).length > 0 &&
    Object.values(walletData)[0].walletTitle && (
      <WalletDropDown
        currentWalletId={currentWalletId}
        walletData={Object.values(walletData)}
        onClick={routerPush}
        className={"col-span-12 md:col-span-7 box-border flex flex-row mt-1" + (isMobile ? " justify-center mb-2" : "")}
      />
    )
  return (
    <>
      <div className="xl:px-12 px-5 pt-2 fontSofiaPro">
        {/* 2xl:grid-cols-10  3xl:grid-cols-10  */}
        <div className="grid fontSofiaPro grid-cols-12  md:grid-cols-10 gap-5    w-full ">
          {/* 2xl:col-span-4 3xl:col-span-4 */}
          {/* {isMobile && walletComponent} */}
          <div
            className="col-span-12 md:col-span-4 flex flex-col flex-auto" //style={{border:'5px solid red'}}
          >
            <div className="wallet-content z-[999] relative">
              <div className="fontSofiaPro wallet-head">
                <h2 className={'fontSofiaPro text-gray-300 text-xl font-bold' + (isMobile ? " text-center" : "")}>
                  Wallet
                </h2>

                {walletDropdown}

                {/* <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>
                    {walletData && currentWalletId ? (
                      Object.values(walletData)?.find(
                        (wallet) => wallet.walletID === currentWalletId,
                      )?.walletTitle
                    ) : (
                      <Skeleton.Button
                        active={true}
                        size="default"
                        shape="default"
                        block={true}
                      />
                    )}
                  </h1> */}
              </div>
              {!isMobile &&
                <div className="balance-Head">
                  <div className="your-wallet">
                    <div
                      style={{
                        fontSize: 14,
                        alignSelf: 'end',
                        fontWeight: 450,
                      }}
                    >
                      Your Balance
                    </div>
                    <div>
                      {' '}
                      <Tooltip title="Refresh">
                        <IconButton
                          aria-label="Refresh"
                          disabled={refreshBalance}
                          onClick={refreshBalanceHandler}
                          size="small"
                          style={{
                            marginLeft: 6,
                            backgroundColor: 'rgba(133, 139, 173, .4)',
                            color: 'rgba(133, 139, 173, 1)',
                            borderRadius: '4px',
                            height: 18,
                            width: 18,
                          }}
                        >
                          <ArrowPathIcon
                            className={`h-6 w-6 text-gray-500 ${refreshBalance && 'animate-spin'
                              }`}
                          />
                        </IconButton>
                      </Tooltip>{' '}
                    </div>
                  </div>
                  <div>
                    {balance && !refreshBalance ? (
                      <div className="h-20">
                        <h1 style={{ fontSize: 56 }}>
                          <span>
                            <span className="balance-Head">$ </span>
                            {balance.dollarBal}
                          </span>
                        </h1>
                        <h1
                          style={{
                            opacity: '0.6',
                            fontSize: '24px',
                            fontWeight: 'bolder',
                          }}
                        >
                          {balance?.bsvBal} BSV
                        </h1>{' '}
                      </div>
                    ) : (
                      <div className="h-[60px] mt-5">
                        <h1>
                          {' '}
                          <Skeleton.Button
                            active={true}
                            size="large"
                            shape="round"
                            block={false}
                          />
                        </h1>
                        <h1>
                          {' '}
                          <Skeleton.Button
                            active={true}
                            size="large"
                            shape="round"
                            block={false}
                          />
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              }
            </div>

            {isMobile &&
              <div>
                <BalanceGraph
                  activities={transactionHistory ? transactionHistory : []}
                  refreshBalance={refreshBalance}
                  balance={balance}
                  currentWalletData={
                    walletData &&
                    Object.values(walletData)?.find(
                      (wallet) => wallet.walletID === currentWalletId,
                    )
                  }
                  refreshBalanceHandler={refreshBalanceHandler}
                />
              </div>
            }

            <div className="mt-12 xl:mt-16 flex justify-center md:justify-start z-30 mb-1">
              <MaterialUiCustomButtom
                background="linear-gradient(135deg, rgba(61,184,245,1) 0%, rgba(31,66,239,1) 97%)"
                label="Deposit"
                disablefullWidth
                marginRight={20}
                height={50}
                iconState={<Icon className="mx-2" component={depositIcon} />}
                onClick={(e) => {
                  e.preventDefault()
                  setDepositDialogState(true)
                }}
              />
              <MaterialUiCustomButtom
                disablefullWidth
                height={50}
                background={
                  'linear-gradient(113deg, rgba(231,0,96,1) 0%, rgba(252,143,12,1) 100%)'
                }
                iconState={
                  <Icon className="mx-2 rotate-180" component={depositIcon} />
                }
                label="Withdraw"
                onClick={(e) => {
                  if (!refreshBalance) {
                    e.preventDefault()
                    setwithdrawDialogState(true)
                  }
                }}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 z-50">
            <WalletGraph
              walletAddress={walletAddress}
              userData={userData}
              currencyUsd={currencyUsd}
              activities={
                transactionHistory && currentWalletId in transactionHistory
                  ? transactionHistory[currentWalletId]
                  : []
              }
            />
          </div>

          {/* {!isMobile && walletComponent} */}
          <Divider
            className="col-span-12  md:col-span-10  mb-0 "
            style={{ marginLeft: -100, width: '120vw', marginTop: 10 }}
          />

          {/* 2xl:col-span-6 3xl:col-span-6  */}
          <div className="col-span-12 xl:col-span-7   ">
            <div className=" flex flex-row justify-between space-x-2">
              <div className="wallet-head22" style={{ display: 'block' }}>
                Transaction Details
              </div>
              <div className="flex space-x-2 items-start">
                <FilterDropdown>
                  <fieldset className="space-y-3 flex flex-col ">
                    <legend className="sr-only">History Filter</legend>
                    <div className="relative flex items-start">
                      <div className="flex h-5 items-center ml-3 cursor-pointer">
                        <input
                          id="deposit"
                          type="checkbox"
                          checked={filtersTransactionsByType.deposit}
                          onChange={optionHandler}
                          value="deposit"
                          className="checkbox w-4 h-4 rounded-sm"
                        />
                        <label
                          for="deposit"
                          className="ml-2 text-sm font-medium text-gray-700 mb-0"
                        >
                          Deposit
                        </label>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-5 items-center ml-3 cursor-pointer">
                        <input
                          id="withdraw"
                          type="checkbox"
                          checked={filtersTransactionsByType.withdraw}
                          onChange={optionHandler}
                          value="withdraw"
                          className="checkbox w-4 h-4 rounded-sm"
                        />
                        <label
                          for="withdraw"
                          className="ml-2 text-sm font-medium text-gray-700 mb-0"
                        >
                          Withdraw
                        </label>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-5 items-center ml-3 cursor-pointer">
                        <input
                          id="tokens"
                          type="checkbox"
                          checked={filtersTransactionsByType.tokens}
                          onChange={optionHandler}
                          value="tokens"
                          className="checkbox w-4 h-4 rounded-sm"
                        />
                        <label
                          for="tokens"
                          className="ml-2 text-sm font-medium text-gray-700 mb-0"
                        >
                          Tokens
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </FilterDropdown>

                <Tooltip placement="top" title="Export CSV">
                  <button
                    aria-label="Export CSV"
                    disabled={
                      !!transactionHistory &&
                        currentWalletId in transactionHistory
                        ? false
                        : true
                    }
                    onClick={dataforReports}
                  >
                    <ArrowDownTrayIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-gray-600"
                    />
                  </button>
                </Tooltip>
              </div>
            </div>
            <div id="transactionTable" className="overflow-scroll h-[41em]">
              <table className="pt-5 w-full">
                <thead>
                  <th></th>
                  <th></th>
                  <th></th>
                </thead>
                <tbody>
                  {transactionHistory ? (
                    currentWalletId in transactionHistory &&
                      Object.values(transactionHistory[currentWalletId]).length >
                      0 ? (
                      <InfiniteScroll
                        dataLength={
                          Object.values(transactionHistory[currentWalletId])
                            .length
                        }
                        next={refreshTransactions}
                        hasMore={canTransactionLoadMore}
                        loader={
                          <div className="py-3">
                            <div className="dots-loader"></div>
                          </div>
                        }
                        scrollableTarget="transactionTable"
                        scrollThreshold={0.9}
                        style={{ overflowY: 'hidden' }}
                      >
                        {' '}
                        {Object.values(filterTransactions()).map(
                          (transaction, index) =>
                            (transaction.totalAmount >= 1 ||
                              transaction.totalAmount < 0) && (
                              <tr className="py-3 fontSofiaPro place-content-between w-full flex flex-1 flex-row flex-nowrap">
                                {/** Transactions Objects: */}
                                <td className="flex-[2]">
                                  {' '}
                                  <div className="flex flex-none	flex-row flex-nowrap">
                                    {transaction.to[0].protocol == 'BSV' ? (
                                      transaction.type == 'debit' ? (
                                        <svg
                                          width="36"
                                          height="36"
                                          viewBox="0 0 36 36"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            width="36"
                                            height="36"
                                            rx="12"
                                            fill="#FBE6EC"
                                          />
                                          <path
                                            d="M26.97 7H24.03C22.76 7 22 7.76 22 9.03V11.97C22 13.24 22.76 14 24.03 14H26.97C28.24 14 29 13.24 29 11.97V9.03C29 7.76 28.24 7 26.97 7ZM27.19 10.31C27.07 10.43 26.91 10.49 26.75 10.49C26.59 10.49 26.43 10.43 26.31 10.31L26.13 10.13V12.37C26.13 12.72 25.85 13 25.5 13C25.15 13 24.87 12.72 24.87 12.37V10.13L24.69 10.31C24.45 10.55 24.05 10.55 23.81 10.31C23.57 10.07 23.57 9.67 23.81 9.43L25.06 8.18C25.11 8.13 25.18 8.09 25.25 8.06C25.27 8.05 25.29 8.05 25.31 8.04C25.36 8.02 25.41 8.01 25.47 8.01C25.49 8.01 25.51 8.01 25.53 8.01C25.6 8.01 25.66 8.02 25.73 8.05C25.74 8.05 25.74 8.05 25.75 8.05C25.82 8.08 25.88 8.12 25.93 8.17C25.94 8.18 25.94 8.18 25.95 8.18L27.2 9.43C27.44 9.67 27.44 10.07 27.19 10.31Z"
                                            fill="#FE2C3D"
                                          />
                                          <path
                                            opacity="0.4"
                                            d="M28 13.77V15H8V13.54C8 11.25 9.86 9.40002 12.15 9.40002H22V11.97C22 13.24 22.76 14 24.03 14H26.97C27.37 14 27.71 13.93 28 13.77Z"
                                            fill="#FC9BA6"
                                          />
                                          <path
                                            d="M8 15V22.46C8 24.75 9.86 26.6 12.15 26.6H23.85C26.14 26.6 28 24.75 28 22.46V15H8ZM14 23.25H12C11.59 23.25 11.25 22.91 11.25 22.5C11.25 22.09 11.59 21.75 12 21.75H14C14.41 21.75 14.75 22.09 14.75 22.5C14.75 22.91 14.41 23.25 14 23.25ZM20.5 23.25H16.5C16.09 23.25 15.75 22.91 15.75 22.5C15.75 22.09 16.09 21.75 16.5 21.75H20.5C20.91 21.75 21.25 22.09 21.25 22.5C21.25 22.91 20.91 23.25 20.5 23.25Z"
                                            fill="#FE2C3D"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          width="36"
                                          height="37"
                                          viewBox="0 0 36 37"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            y="0.444702"
                                            width="36"
                                            height="36"
                                            rx="12"
                                            fill="#EDEAFE"
                                          />
                                          <path
                                            d="M26.97 14H24.03C22.76 14 22 13.24 22 11.97V9.03C22 7.76 22.76 7 24.03 7H26.97C28.24 7 29 7.76 29 9.03V11.97C29 13.24 28.24 14 26.97 14ZM27.19 10.69C27.07 10.57 26.91 10.51 26.75 10.51C26.59 10.51 26.43 10.57 26.31 10.69L26.13 10.87V8.63C26.13 8.28 25.85 8 25.5 8C25.15 8 24.87 8.28 24.87 8.63V10.87L24.69 10.69C24.45 10.45 24.05 10.45 23.81 10.69C23.57 10.93 23.57 11.33 23.81 11.57L25.06 12.82C25.11 12.87 25.18 12.91 25.25 12.94C25.27 12.95 25.29 12.95 25.31 12.96C25.36 12.98 25.41 12.99 25.47 12.99C25.49 12.99 25.51 12.99 25.53 12.99C25.6 12.99 25.66 12.98 25.73 12.95C25.74 12.95 25.74 12.95 25.75 12.95C25.82 12.92 25.88 12.88 25.93 12.83C25.94 12.82 25.94 12.82 25.95 12.82L27.2 11.57C27.44 11.33 27.44 10.93 27.19 10.69Z"
                                            fill="#0075FF"
                                          />
                                          <path
                                            opacity="0.4"
                                            d="M28 13.77V15H8V13.54C8 11.25 9.86 9.40002 12.15 9.40002H22V11.97C22 13.24 22.76 14 24.03 14H26.97C27.37 14 27.71 13.93 28 13.77Z"
                                            fill="#8FBCFE"
                                          />
                                          <path
                                            d="M8 15V22.46C8 24.75 9.86 26.6 12.15 26.6H23.85C26.14 26.6 28 24.75 28 22.46V15H8ZM14 23.25H12C11.59 23.25 11.25 22.91 11.25 22.5C11.25 22.09 11.59 21.75 12 21.75H14C14.41 21.75 14.75 22.09 14.75 22.5C14.75 22.91 14.41 23.25 14 23.25ZM20.5 23.25H16.5C16.09 23.25 15.75 22.91 15.75 22.5C15.75 22.09 16.09 21.75 16.5 21.75H20.5C20.91 21.75 21.25 22.09 21.25 22.5C21.25 22.91 20.91 23.25 20.5 23.25Z"
                                            fill="#0075FF"
                                          />
                                        </svg>
                                      )
                                    ) : (
                                      <Image
                                        height={36}
                                        width={36}
                                        quality={50}
                                        objectFit="cover"
                                        onError={(e) => {
                                          e.target.onerror = null
                                          e.target.src =
                                            'https://relysia.com/_next/static/media/RelysiaLogo_1.4aba7d51.svg'
                                        }}
                                        onLoad={(e) => {
                                          e.target.className =
                                            'h-9 w-9 rounded-xl bg-gray-200'
                                        }}
                                        alt={'transaction' + (index + 1)}
                                        src={transaction.to[0].image}
                                        className="h-9 w-9 rounded-xl bg-gray-200 animate-pulse"
                                      />
                                    )}
                                    <div style={{ marginInline: 16 }}>
                                      <div
                                        className="font-bold"
                                        style={{ lineHeight: 1 }}
                                      >
                                        {transaction.type == 'debit'
                                          ? 'Withdrawal'
                                          : 'Deposit'}
                                      </div>

                                      <CopyToClipboard
                                        text={
                                          transaction.from
                                            ? transaction.from
                                            : transaction.to
                                        }
                                        onCopy={() => {
                                          if (toast.isActive(toastId)) {
                                            toast.dismiss(toastId)
                                            toastId = toastId + '2'
                                          }
                                          toast.success(
                                            'Wallet Address Copied.',
                                            {
                                              position: 'bottom-left',
                                              toastId: toastId,
                                              autoClose: 10000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                            },
                                          )
                                        }}
                                      >
                                        <div
                                          style={{
                                            opacity: '0.8',
                                            cursor: 'pointer',
                                          }}
                                        >
                                          {transaction.type == 'credit'
                                            ? 'from'
                                            : 'to'}{' '}
                                          {transaction.type == 'credit'
                                            ? (transaction.from?.substring(
                                              0,
                                              10,
                                            ) || '') + '..'
                                            : (transaction.to[0]?.to.substring(
                                              0,
                                              10,
                                            ) || '') + '..'}
                                        </div>
                                      </CopyToClipboard>
                                    </div>
                                  </div>
                                </td>
                                {!isMobile && (
                                  <td className="flex-[2]">
                                    <a
                                      style={{ cursor: 'pointer' }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      href={
                                        'https://whatsonchain.com/tx/' +
                                        transaction.txId
                                      }
                                    >
                                      <div>
                                        <div
                                          className="font-bold"
                                          style={{ lineHeight: 1 }}
                                        >
                                          {new Date(
                                            transaction.timestamp.split(' ')[0],
                                          ).toDateString()}
                                        </div>
                                        <div style={{ opacity: '0.6' }}>
                                          {transaction?.notes?.slice(0, 30)}
                                        </div>
                                      </div>
                                    </a>
                                  </td>
                                )}
                                <td className={!isMobile && 'flex-1'}>
                                  <div
                                    className="font-bold flex flex-row justify-end"
                                    style={{
                                      lineHeight: 1,
                                      color:
                                        transaction.type == 'credit'
                                          ? 'green'
                                          : 'red',
                                      textAlign: 'right',
                                    }}
                                  >
                                    {transaction.type == 'debit' ? '-' : '+'}{' '}
                                    {transaction.to[0].protocol == 'BSV' ? (
                                      tokenConverter(transaction.totalAmount)
                                    ) : (
                                      <span className="pl-1">
                                        {getTokenAmount(
                                          transaction.totalAmount,
                                        )}
                                      </span>
                                    )}
                                  </div>
                                  <div
                                    style={{
                                      opacity: '0.7',
                                      textAlign: 'right',
                                    }}
                                  >
                                    {' '}
                                    {transaction.type == 'credit'
                                      ? '+'
                                      : '-'}{' '}
                                    {stepSize(
                                      transaction.totalAmount * currencyUsd,
                                    )}
                                    $
                                  </div>
                                </td>
                              </tr>
                            ),
                        )}
                      </InfiniteScroll>
                    ) : (
                      <div>You have not made any transactions yet!</div>
                    )
                  ) : (
                    <CircularProgress />
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2xl:col-span-4 3xl:col-span-4 */}
          <div className="col-span-12 -mt-1  xl:col-span-3 rounded-md bg-gradient-to-b from-[rgba(141,192,255,0.13)] to-[rgba(141,192,255,0.05)] px-2">
            <TokenSideBar />
          </div>
        </div>
        {walletAddress && walletAddress.address && (
          <DepositDialog
            depositDialogState={depositDialogState}
            setDepositDialogState={setDepositDialogState}
            walletData={walletAddress}
          />
        )}
        {withdrawDialogState && (
          <WithdrawDialog
            dialogState={withdrawDialogState}
            setdialogState={setwithdrawDialogState}
            userDataRedux={userDataRedux}
            walletData={walletData ? walletData[currentWalletId] : null}
            // walletComputerObj={walletComputerObj}
            //       getTokens={getTokens}
            bsvRate={currencyUsd}
            tokensList={tokensList}
            settokensList={settokensList}
            walletStasTokens={walletStasTokens}
            refreshBalanceHandler={refreshBalanceHandler}
            refreshTransactions={refreshTransactions}
          // getWalletStasTokens={getWalletStasTokens}
          />
        )}
      </div>
      {mnemonic && (
        <Mnemonic
          open={mnemonic ? true : false}
          mnemonics={mnemonic}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default WalletPage
