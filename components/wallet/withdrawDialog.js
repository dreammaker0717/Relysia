import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { toast } from 'react-toastify'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, IconButton } from '@material-ui/core'
import InputwithIcon from '../common/inputs/InputwithIcon'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'
import { sendToken } from '../../axios-connect/wallet'
import QrcodeReader from 'components/app/qrcode-reader'
import { useRouter } from 'next/router'
import useTokens from 'hooks/useTokens'
import { useCurrentBsv } from 'hooks/useCurrentBsv'
import { checkBalancefromApi } from '../../axios-connect/wallet'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import Loader from '../loader'

const logo = '/assets/images/RelysiaLogo_1.svg'
const useStyles = makeStyles((theme) => ({
  inputselectRoot: {
    padding: '15px 15px 12px 10px',
  },
  inputselect: {
    '&.MuiFilledInput-root': {
      background: 'rgba(65, 124, 241, 0.1)',
      borderRadius: 12,
      '&:hover': {
        background: 'rgba(65, 124, 241, 0.15)',
      },
      input: { padding: '0px' },
      '&.Mui-focused': {
        borderRadius: 12,
        background: 'rgba(65, 124, 241, 0.1)',
      },
    },
    '&.MuiFilledInput-input': { padding: '0px' },
  },

  select: {
    '&:before': {
      borderColor: '#f48665',
    },
    '&:after': {
      borderColor: '#f48665',
    },
  },
  icon: {
    fill: '#039855',
    // fill: '#f48665',
  },
  root: {
    flexGrow: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const WithdrawDialog = (props) => {
  const classes = useStyles()
  const [loading, setloading] = useState(false)
  const [walletAomunt, setwalletAomunt] = useState(0)
  const [walletAmountBsv, setwalletAmountBsv] = useState('')

  const [transferMessage, setTransferMessage] = useState(null)
  const { push } = useRouter()

  const {
    currencyUsd: bsvRate,
    currentWalletId,
    balance,
    walletStasTokens = [],
  } = useSelector(walletSelector)
  const { userData } = useSelector(authSelector)

  const [openQRCodeReader, setOpenQRCodeReader] = useState(false)

  const [walletAddress, setwalletAddress] = useState('')
  const [note, setNote] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [selectedToken, setSelectedToken] = useState(null)
  // const [selectedToken, setSelectedToken] = useState(
  //   (walletStasTokens || [])[selectedIndex] || null,
  // )

  const changewalletAddress = (e) => {
    setwalletAddress(e.target.value)
  }
  
  const updateNote = (e) => {
    setNote(e.target.value)
  }

  const { tokens, canLoadMore, loadMore, loading: isLoading } = useTokens()

  const handleClose = () => {
    setwalletAmountBsv('')
    props.setdialogState(false)
  }

  const renderValue = (token) => {
    if (!token.sn) {
      return token.amount
    }
    return `${token.supply - token.amount} / ${token.supply}`
  }

  const handleSubmit = async () => {
    let msg = ''
    if (!walletAddress) msg = 'Please Enter wallet Address'
    if (!walletAomunt) msg = 'Please Enter Amount to transfer'
    if (msg) {
      toast.error(msg, {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
    setloading(true)
    try {
      const res = await sendToken(
        currentWalletId,
        walletAddress,
        note,
        walletAmountBsv,
        selectedToken?.tokenId || undefined,
      )
      if (res === 200) {
        setTransferMessage('success')
        props.refreshTransactions()
      } else {
        setTransferMessage('failure')
        handleClose()
        toast.error(res, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      setTransferMessage('failure')
      toast.error('Failure', {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setloading(false)
    }
  }

  const handleChange = (event) => {
    const index = event.target.value
    setSelectedIndex(index)
    if (index >= 0) {
      setSelectedToken(tokens[index])
    } else {
      setSelectedToken(null)
    }
  }

  const handleQrCodeReader = (text) => {
    const splitQrText = text.split('bitcoin:')[1]
    setwalletAddress(splitQrText)
    setOpenQRCodeReader(false)
  }

  useEffect(() => {
    if (props.dialogState && props.preselectedTokenID) {
      let sT = tokens?.find(
        (wl) => wl?.tokenId == props.preselectedTokenID,
      )
      setSelectedToken(sT)
      let sI = tokens?.findIndex(
        (sl) => sl?.tokenId == props.preselectedTokenID,
      )
      setSelectedIndex(sI)
    }
  }, [props.dialogState])

  useEffect(() => {
    if (tokens) {
      setSelectedToken(tokens[selectedIndex]);
    }
  }, [tokens])

  const handleBackToWallet = () => {
    handleClose()
    setSelectedIndex(-1)
    setwalletAddress('')
    setwalletAmountBsv('')
    setwalletAomunt(0)
    setTransferMessage(null)
    push('/app/wallet')
  }

  const handleBackToWithdraw = () => {
    setSelectedIndex(-1)
    setwalletAomunt(0)
    setwalletAmountBsv('')
    setwalletAddress('')
    setTransferMessage(null)
  }

  const nftSymbol = selectedIndex >= 0 ? tokens[selectedIndex]['symbol'] : 'BSV'

  const renderTokenImage = React.memo((token, index) => (
    <img
      width={56}
      height={56}
      src={token.image}
      onError={() => {
        tokens[index].image =
          'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/setting_page%2FbitcoinSv.svg?alt=media'
      }}
    />
  ))

  const handleMore = async (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight
    console.log(
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight,
      bottom,
    )
    if (bottom && canLoadMore) {
      await loadMore()
      e.target.scrollTo({ top: e.target.clientHeight })
    }
  }

  return (
    <Dialog
      open={props.dialogState}
      TransitionComponent={Transition}
      // keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{
        paper: `relative pt-10 px-8 md:px-32 lg:px-44 flex flex-col justify-between items-center h-[78%] max-h-[600px] md:h-[90%] md:max-h-[700px]  mb-[100px] md:mb-0 mt-[64px] md:mt-0 rounded-[26px]`,
      }}
      fullWidth
      maxWidth="md"
    >
      <div
        onClick={!transferMessage ? handleClose : handleBackToWithdraw}
        className=" hover:opacity-90 space-x-2 absolute left-4 top-4 flex items-center cursor-pointer "
      >
        <ArrowLongLeftIcon className="h-5 w-5 text-blue-500 stroke-2" />

        <div className="pb-1">Back</div>
      </div>
      <div className="absolute right-2 top-1.5 flex items-center">
        <IconButton onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </IconButton>
      </div>
      {!transferMessage ? (
        <>
          <div className="text-center	text-3xl	flex flex-col items-center">
            <img src={logo} width={50} height={50} alt="Relysia Logo" />
            Transfer
          </div>

          <FormControl variant="filled" className="w-full">
            <label id="demo-simple-select-filled-label">Select Asset</label>
            <Select
              fullWidth
              style={{ width: '100%' }}
              className={classes.inputselect}
              classes={{ root: classes.inputselectRoot }}
              MenuProps={{
                PaperProps: {
                  onScroll: handleMore,
                },
              }}
              renderValue={(value) => {
                return (
                  <div className="pl-2 h-full w-full flex flex-row  items-center relative">
                    <img
                      width={56}
                      height={56}
                      src={
                        selectedToken?.image ||
                        'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/setting_page%2FbitcoinSv.svg?alt=media'
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src =
                          'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/setting_page%2FbitcoinSv.svg?alt=media'
                      }}
                    />
                    <div className="pl-2 flex flex-col">
                      <div className="font-bold text-sm">
                        {selectedToken?.symbol || 'BSV'}
                      </div>
                      <div>{selectedToken?.symbol || 'BSV'}</div>
                    </div>

                    <div className="absolute right-1">
                      {selectedToken
                        ? selectedToken?.amount
                        : `${balance?.bsvBal} BSV`}
                    </div>
                  </div>
                )
              }}
              id="demo-simple-select-filled"
              disableUnderline={true}
              value={selectedIndex}
              onChange={handleChange}
            >
              <MenuItem value={-1}>
                {' '}
                <div className="pl-2 h-full w-full flex flex-row  items-center relative">
                  <img
                    width={56}
                    height={56}
                    src="https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/setting_page%2FbitcoinSv.svg?alt=media"
                  />
                  <div className="pl-2 fontSofiaPro flex flex-col">
                    <div>Bitcoin SV</div>
                    <div className="font-bold text-xs	">BSV</div>
                  </div>

                  <div className="absolute right-1">{balance?.bsvBal}</div>
                </div>
              </MenuItem>

              {tokens?.map((token, index) => (
                <MenuItem value={index} key={token.symbol}>
                  <div className="pl-2 h-full w-full flex flex-row  items-center relative">
                    <img
                      width={56}
                      height={56}
                      src={token.image}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src =
                          'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/setting_page%2FbitcoinSv.svg?alt=media'
                      }}
                    />
                    <div className="pl-2 fontSofiaPro flex flex-col">
                      <div>{token.symbol}</div>
                      <div className="font-bold text-xs	">{token.protocol}</div>
                    </div>

                    <div className="absolute right-1">{renderValue(token)}</div>
                  </div>
                </MenuItem>
              ))}

              {isLoading && (
                <MenuItem value={-1}>
                  <div className="flex flex-row w-full justify-center">
                    <div className="py-3">
                      <div className="dots-loader"></div>
                    </div>
                  </div>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <div className="w-full mt-4 relative">
            <InputwithIcon
              required
              onChange={changewalletAddress}
              name="Address or Paymail*"
              placeholder="satoshi@relysia.com"
              type="text"
              icon="doc-text"
              // helperText={addressInputHelper()}
              value={walletAddress}
              endEndorment={
                <button onClick={() => setOpenQRCodeReader(true)}>
                  <img src="/images/inputIcons/qr.png" width="25" height="25" />
                </button>
              }
            />
          </div>
          <div className="w-full mt-4 relative">
            <InputwithIcon
              onChange={updateNote}
              name="Note (optional)"
              placeholder="thanks for the coffee!"
              type="text"
              icon="doc-text"
              // helperText={addressInputHelper()}
              value={note}
            />
          </div>
          <div className="w-full my-4">
            <InputwithIcon
              required
              onChange={(e) => {
                setwalletAmountBsv(e.target.value)
                //converting bsv to  amount
                var bsvVal = parseFloat(e.target.value)
                var calculation = bsvVal * bsvRate * 100000000
                setwalletAomunt(calculation)
              }}
              iconState={selectedIndex < 0 ? 'bitcoinSv' : ''}
              name="Amount to transfer*"
              placeholder="0.01"
              type="number"
              iconColor="unSet"
              inputProps={{
                min: selectedIndex < 0 ? 1 / 10e8 : 1,
                step: selectedIndex < 0 ? 1 / 10e8 : selectedToken?.splitable,
              }}
              endEndorment={
                selectedIndex < 0
                  ? walletAomunt
                    ? '$ ' +
                    (walletAomunt > 1
                      ? walletAomunt.toFixed(2)
                      : walletAomunt.toFixed(6))
                    : '$ 0.00'
                  : ''
              }
              //  helperText="Please Enter Email"
              value={walletAmountBsv}
            />
          </div>
          <div className="w-full mb-8">
            <MaterialUiCustomButtom
              label={'Transfer now'}
              onClick={handleSubmit}
              loading={loading}
              type="submit"
            />
          </div>
          <QrcodeReader
            open={openQRCodeReader}
            setOpen={setOpenQRCodeReader}
            onText={handleQrCodeReader}
          />
        </>
      ) : (
        <TransferSuccess
          selectedIndex={selectedIndex}
          nftSymbol={nftSymbol}
          classes={classes}
          handleBackToWallet={handleBackToWallet}
          walletAmountBsv={walletAmountBsv}
          walletAomunt={walletAomunt}
          walletAddress={walletAddress}
          variant={transferMessage}
        />
      )}
    </Dialog>
  )
}

const TransferSuccess = ({
  classes,
  handleBackToWallet,
  walletAmountBsv,
  walletAomunt,
  walletAddress,
  nftSymbol,
  selectedIndex,
  variant,
}) => {
  const isSuccess = variant === 'success'
  return (
    <div className="align-middle flex flex-col gap-8 h-[100%] justify-center text-center">
      <div className="text-center text-3xl flex flex-col items-center">
        <img src={logo} width={50} height={50} alt="Relysia Logo" />
      </div>
      <div className="text-4xl">
        {isSuccess ? 'Transfer Success' : 'Transfer Failure'}
      </div>
      <div
        className="w-14 h-14 my-0 mx-auto rounded-full flex justify-center items-center"
        style={{ background: isSuccess ? '#d1fadf' : '#ffd1d1' }}
      >
        {isSuccess ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        )}
      </div>
      <div>
        <p className="text-black">
          {isSuccess
            ? `You have transferred ${walletAmountBsv} ${nftSymbol}${selectedIndex === -1 ? ` or $${walletAomunt.toFixed(2)}` : ''
            } to ${walletAddress}. You can access the transaction history in the wallet. Let's go back to the wallet.`
            : `There was an error while transferring ${walletAmountBsv} ${nftSymbol}${selectedIndex === -1 ? ` or $${walletAomunt.toFixed(2)}` : ''
            } to ${walletAddress}. Please try again or contact us for assistance.`}
        </p>
      </div>
      <div className="w-full mb-8">
        <MaterialUiCustomButtom
          label={'Back to wallet'}
          onClick={handleBackToWallet}
        // loading={loading}
        />
      </div>
    </div>
  )
}

export default WithdrawDialog
