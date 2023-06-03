import React, { useState } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { createWalletfromApi } from '../../../axios-connect/wallet'
import router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import NewWalletStep3 from './step-3'
import NewWalletStep2 from './step-2'
import NewWalletStep1 from './step-1'
import StepsPagesComponent from '../../common/StepsPagesComponent'
import { toast } from 'react-toastify'
import { updateCurrentWalletID } from '@/redux/slices/wallet'

const walletTypes = [
  {
    name: 'Standard',
    discription: 'A super functional, full featured wallet (recommended).',
    icon: '/images/newWallets/icons/standardswallet.svg',
  },
  {
    name: 'Secure',
    discription: 'Focused on security, requires a password to unlock.',
    icon: '/images/newWallets/icons/securedwallet.svg',
  },
  {
    name: 'Escrow',
    discription: 'An unencrypted open wallet for escrows.',
    icon: '/images/newWallets/icons/excrowwallet.svg',
  },
  {
    name: 'Shared',
    discription: 'Shared wallet with multiple owners.',
    icon: '/images/newWallets/icons/sharedwaller.svg',
  },
]
// const walletDefaultTokens = [
//   '/images/newWallets/icons/WalletCCCIcon.svg',
//   '/images/newWallets/icons/WalletOOOIcon.svg',
//   '/images/newWallets/icons/WalletSSSIcon.svg',
//   '/images/newWallets/icons/WalletUUUIcon.svg',
//   '/images/newWallets/icons/WalletXXXIcon.svg',
//   '/images/newWallets/icons/walletinfinityicons.svg',
// ]

const walletFirebseIcons = [
  'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletCCCIcon.svg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletOOOIcon.svg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletSSSIcon.svg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletUUUIcon.svg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletXXXIcon.svg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2Fwalletinfinityicons.svg?alt=media',
]

export default function NewWalletDialog(props) {
  const dispatch = useDispatch()

  const [loading, setloading] = useState(false)
  const [formData, setformData] = useState({
    walletType: null,
    submittedForm: false,
  })
  const [walletName, setwalletName] = useState('')
  const [mnemonicPhrase, setMnemonicPhrase] = useState('')
  const [walletPassword, setwalletPassword] = useState('')
  const { userData } = useSelector(authSelector)
  const [index1, setIndex1] = useState(null)
  // console.log(index1)
  const [walletIconIndex, setwalletIconIndex] = useState(0)
  const redirectto = router.query.redirectto

  const createNewWallet = async (e) => {
    if (e) {
      e.preventDefault()
    }
    setloading(true)
    if (walletIconIndex !== -1) {
      try {
        let walletLogo = walletFirebseIcons[3]
        if (walletIconIndex !== -1) {
          walletLogo = walletFirebseIcons[walletIconIndex]
        }
        toast.loading('Generating Wallet Keys..', {
          position: 'top-left',
          toastId: 'walletGenProg',
          draggable: true,
        })

        // Axios.defaults.baseURL = 'https://wallet.vaionex.com/v1';
        let walletRes = await createWalletfromApi(
          {
            authToken: userData.accessToken,
            walletTitle: walletName,
            walletPassword: walletPassword,
            walletLogo: walletLogo,
            type: formData.walletType.toLowerCase(),
            mnemonicPhrase: mnemonicPhrase,
          },
          dispatch,
        )
        console.log('Wallet Name', walletName)

        if (walletRes && walletRes.status === 'success') {
          // console.log('worked')
          // console.log(walletRes)
          toast.dismiss('walletGenProg')
          toast.success('Wallet created Successfully', {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          dispatch(updateCurrentWalletID(walletRes['walletID']))
          if (redirectto) {
            window.location.href = redirectto
          } else {
            setTimeout(() => {
              router.push(`/app/wallet`)
            }, 995)
          }

          setloading(false)
          setwalletPassword('')
          setwalletName('')
          setMnemonicPhrase('')

          setwalletIconIndex(0)
        } else {
          toast.dismiss('walletGenProg')
          toast.error(walletRes, {
            position: 'bottom-left',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          setloading(false)
        }
      } catch (err) {
        toast.dismiss('walletGenProg')
        // console.log('catch err', err)
        toast.error(err.message, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        setloading(false)
      }
    } else {
      toast.dismiss('walletGenProg')
      toast.error('Please select wallet icon!', {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      setloading(false)
    }
  }

  var newWalletCreationData = [
    {
      icon: '/images/newWallets/step1.svg',
      name: 'Wallet Type',
      description: 'Choose a wallet that suits your needs',
      hideActionBottums: true,
      component: (
        <NewWalletStep1
          walletTypes={walletTypes}
          setformData={setformData}
          setIndex1={setIndex1}
          index1={index1}
          formData={formData}
        />
      ),
    },
    {
      icon: '/images/newWallets/step2.svg',
      name: 'Wallet Details',
      description: 'Fill detailed information',
      component: (
        <NewWalletStep2
          walletTypes={walletTypes}
          index={index1}
          walletName={walletName}
          setwalletName={setwalletName}
          setwalletPassword={setwalletPassword}
          setMnemonicPhrase={setMnemonicPhrase}
        />
      ),
      img: '/images/newWallets/step2.webp',
    },
    {
      icon: '/images/newWallets/step3.svg',
      name: 'wallet Icon',
      description: 'Make your wallet unique',
      component: (
        <NewWalletStep3
          setwalletIconIndex={setwalletIconIndex}
          walletIconIndex={walletIconIndex}
          walletDefaultTokens={walletFirebseIcons}
        />
      ),
      img: '/images/newWallets/step3.webp',
    },
  ]

  return (
    <div className="pt-8 fontSofiaPro">
      <div className="w-full ">
        <StepsPagesComponent
          name={walletName}
          loading={loading}
          data={newWalletCreationData}
          stepsWidth="70%"
          submitAction={createNewWallet}
        />
      </div>
    </div>
  )
}
