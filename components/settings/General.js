import React, { useState, useEffect } from 'react'
import { deleteWallet, getMnemonicfromApi } from '../../axios-connect/wallet'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { Divider } from 'antd'
import { IconButton, useMediaQuery } from '@material-ui/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { Dialog, Slide } from '@material-ui/core'
import walletSelector from '@/redux/selectors/wallet'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentWalletID } from '@/redux/slices/wallet'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function GeneralSettings({ currentWallet }) {
  const { walletAddress, balance, walletData } = useSelector(walletSelector)
  const [show, setShow] = useState('opacity-0')
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [walletPopup, setWalletPopup] = useState(false)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width:700px)')
  let mobileButtonStyles = isMobile
                          ? {
                              'min-height': '56px',
                              width: '90%',
                              fontSize: '12px',
                              whiteSpace: 'nowrap',
                            } : {}

  useEffect(() => {
    setShow('opacity-1')
  }, [])

  const [mnemonicStore, setmnemonicStore] = useState({})

  const deleteWalletHandler = async () => {
    const defaultWallet = '00000000-0000-0000-0000-000000000000'
    if (currentWallet?.walletID == defaultWallet) {
      toast.error('Can not delete default wallet', {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return
    }
      setDeleteLoading(true)
    await deleteWallet(currentWallet?.walletID)
    dispatch(updateCurrentWalletID(walletData[0]?.walletID))
    setDeleteLoading(false)
    setWalletPopup(false)
  toast.success('Wallet Deleted successfully!', {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
  }

  async function getMnemonic() {
    setLoading(true)
    var walletId = currentWallet.walletID
    if (walletId) {
      const mnemonic = await getMnemonicfromApi(walletId)
      setLoading(false)
      if (mnemonic) {
        var modifiedObj = { ...mnemonicStore }
        modifiedObj[`${walletId}`] = mnemonic
        setmnemonicStore(modifiedObj)
      }
    }
  }
  let toastId = 'customId'

  return (
    <>
      <div
        className={`animate__animated ${show}	transition-all duration-300 ease-in-out	 fontSofiaPro w-full flex flex-col pr-2 pl-2  md:pr-10 md:pl-6`}
      >
        <h5>WALLET SETTINGS</h5>
        <h5 className="text-sm	opacity-50	">Update your wallet preferences</h5>
        {currentWallet ? (
          <div className="mt-6">
            <h6>Wallet Name</h6>
            <p className="opacity-80	">
              {currentWallet.walletTitle ? currentWallet.walletTitle : '-'}
            </p>
            <Divider />
            <h6>Wallet ID</h6>
            <p className="	opacity-80	">
              {currentWallet ? currentWallet.walletID : '-'}
            </p>
            <Divider />
            <h6 className="mt-4">Mnemonic Phrase</h6>

            <div className="mt-2" style={{ width: '100%' }}>
              {mnemonicStore[currentWallet.walletID] ? (
                <>
                  {' '}
                  <div className="	opacity-80 flex items-center	">
                    {mnemonicStore[currentWallet.walletID]}

                    <CopyToClipboard
                      text={
                        mnemonicStore[currentWallet.walletID]
                          ? mnemonicStore[currentWallet.walletID]
                          : '-'
                      }
                      onCopy={async () => {
                        if (toast.isActive(toastId)) {
                          toast.dismiss(toastId)
                          toastId = toastId + '2'
                        }

                        toast.success('Mnemonic Coppied .', {
                          position: 'bottom-left',
                          toastId: toastId,
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        })
                      }}
                    >
                      <IconButton>
                        {' '}
                        <img
                          style={{
                            filter:
                              'invert(25%) sepia(73%) saturate(4457%) hue-rotate(343deg) brightness(118%) contrast(99%)',
                          }}
                          src="/images/inputIcons/copy.svg"
                        />
                      </IconButton>
                    </CopyToClipboard>
                  </div>
                  <div className="w-full mt-3 flex h-[40px] items-center py-2 rounded-[7px] bg-[rgba(254,44,61,0.1)] ">
                    <img
                      className="mx-2"
                      src="/images/inputIcons/warning.svg"
                      alt="warning"
                    />
                    Please Keep backup of this to secure your wallet.
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <div>
                    <MaterialUiCustomButtom
                      label="Get Mnemonic"
                      onClick={getMnemonic}
                      loading={loading}
                      background="linear-gradient(134.44deg, #3DB8F5 3.12%, #1F42EF 100%)"
                      style={mobileButtonStyles}
                    />
                  </div>
                  <div>
                    <MaterialUiCustomButtom
                      label="Delete Wallet"
                      onClick={() => setWalletPopup(true)}
                      style={
                        mobileButtonStyles
                      }
                      // loading={deleteLoading}
                    />
                  </div>
                </div>
              )}
            </div>
            <Divider />
          </div>
        ) : (
          <div className="generalSet-con-main">
            <p>You didn't have any apps yet </p>
          </div>
        )}
        <Dialog
          open={walletPopup}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setWalletPopup(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{ zIndex: 1000 }}
          classes={{
            paper: `relative mb-[100px] bg-red-100 md:mb-0 mt-[64px] md:mt-0 rounded-[26px] pt-10 px-8 md:px-18 flex flex-col items-center`,
          }}
          fullWidth
          maxWidth="sm"
        >
          <div
            class="flex px-4 mb-4 text-sm text-black rounded-lg"
            role="alert"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="#c74444"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Danger</span>
            <div>
              <span class="font-semibold text-base">
                Warning ! After this operation, you will lose your wallet and
                related balance.
              </span>
              <ul class="mt-1.5 ml-4 text-black list-disc list-inside">
                <li>
                  Name:{' '}
                  <span className="text-red-600 underline underline-offset-2 font-semibold text-base">
                    {currentWallet?.walletTitle}
                  </span>
                </li>
                <li>
                  WalletID:{' '}
                  <span className="text-red-600 underline underline-offset-2 font-semibold text-base">
                    {currentWallet?.walletID}
                  </span>
                </li>
                <li>
                  Paymail:{' '}
                  <span className="text-red-600 underline underline-offset-2 font-semibold text-base">
                    {walletAddress?.paymail}
                  </span>
                </li>
                <li>
                  Balance:{' '}
                  <span className="text-red-600 underline underline-offset-2 font-semibold text-base">
                    {balance?.bsvBal}
                  </span>{' '}
                  BSV
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0 pb-2">
            <div className="max-w-xs">
              <MaterialUiCustomButtom
                label="Not Yet"
                className
                // loading={mfaLoading}
                onClick={() => setWalletPopup(false)}
                background="linear-gradient(134.44deg, #3DB8F5 3.12%, #1F42EF 100%)"
                type="button"
              />
            </div>
            <div className="max-w-xs">
              <MaterialUiCustomButtom
                label="Confirm"
                loading={deleteLoading}
                onClick={deleteWalletHandler}
                type="button"
              />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default GeneralSettings
