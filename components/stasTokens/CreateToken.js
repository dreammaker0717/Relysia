import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core'
import { uploadNft } from '../../axios-connect/wallet'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'

import TokenStep1 from './step-1'
import StepsPagesComponent from '../common/StepsPagesComponent'
import { useRouter } from 'next/router'
import { firebaseUploadNftImage, mintNFT } from '@/firebase/utils'
import { isAlphaNumeric } from '@/utils/helper'
import dynamic from 'next/dynamic'
const TokenStep2 = dynamic(() => import('./step-2'))
const TokenStep3 = dynamic(() => import('./step-3'))
const TokenStep4 = dynamic(() => import('./step-4'))

const useStyles = makeStyles((theme) => ({
  dropZone: {
    width: '100%',
    position: 'relative',
    height: '50vh',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: ' rgba(225, 238, 255, 0.5)',
    '&:hover': {
      background: ' rgba(225, 238, 255, 1)',
    },
  },
  dropZoneActive: {
    background: 'green',
    position: 'relative',
    border: '2px dashed gray',
  },

  dropZoneReject: {
    background: 'red',
  },
  abutton: {
    width: '205px',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBlock: 15,
    paddingInline: 0,
    height: '38px',
    aspectRatio: '2.825',
    borderRadius: 12,
    boxShadow: '0px 20px 40px rgba(65, 124, 241, 0.15)',
    transition: 'all .20s linear',
    '&:hover': {
      filter: 'brightness(.9) saturate(.7)',
      boxShadow: '0px 20px 40px rgba(65, 124, 241, 0.45)',
      transform: 'translateY(-7px)',
    },
  },
}))

const tokensTypes = [
  {
    name: 'NFT',
    discription:
      'Create an NFT. NFTs have a variety of functions, from simply creating an Art NFT to festival tickets or access cards. STAS tokens last forever.',
  },
  {
    name: 'TOKEN',
    discription:
      'Create a traditional token that can track ownership shares or be used as a payment token. Ensure to consider and confirm regulatory compliance!.',
  },
]

export default function CreateToken() {
  const { userData } = useSelector(authSelector)
  const classes = useStyles()
  const router = useRouter()

  // console.log(tempId)
  const [loading, setloading] = useState(false)
  const [formData, setformData] = useState({
    walletType: null,
    submittedForm: false,
    finalStep: true,
  })

  const [enteredData, setenteredData] = useState({
    name: '', //
    symbol: '', //
    description: '', //
    image: '', //
    tokenSupply: 0, //
    decimals: 0, //
    satsPerToken: 1000,
    splitable: true,
  })
  const [index1, setIndex1] = useState(null)
  const [fileList, setFileList] = useState([])
  const { currentWalletId } = useSelector(walletSelector)

  function deleteUploadedFiles() {
    setFileList([])
  }

  function beforeUploaded(acceptedFiles, fileRejections) {
    let msg = ''
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === 'file-too-large') msg = 'File is larger than 3MB'
        if (err.code === 'file-invalid-type') msg = err.message
      })
    })
    if (msg) {
      setFileList([])
      return toast.error(msg, {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
    setFileList(acceptedFiles)
  }

  const onUpload = async () => {
    setloading(true)
    toast.loading('Uploading Image...', {
      toastId: 'loadingToast',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    const file = fileList[0]

    const blob = new Blob([file], { type: file.type })

    const { error, fileUrl } = await firebaseUploadNftImage({
      file: blob,
      userId: userData.uid,
    })
    if (error) {
      setloading(false)
      if (toast.isActive('loadingToast')) {
        toast.dismiss('loadingToast')
      }
      return toast.error(error, {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
    try {
      const formData = {
        type: 'media',
        fileUrl,
        fileName: enteredData.name,
        notes: 'Empty notes',
      }
      const upload = await uploadNft(formData, currentWalletId)
      const { url, txid } = upload

      if (!upload) {
        throw new Error(
          'Failed to upload file to blockchain, please press "Save" again',
        )
      }

      const dataToMint = {
        url: fileUrl,
        splitable: enteredData.splitable,
        description: enteredData.description,
        name: enteredData.name,
        supply: enteredData.tokenSupply,
        decimals: enteredData.decimals,
        uri: url,
        symbol: enteredData.symbol,
        type: fileList[0].type,
        txId: txid,
        currentWalletId,
      }
      const mintResponse = await mintNFT(dataToMint)

      if (!mintResponse.isMinted) {
        let msg = mintResponse.msg || 'Failed to mint NFT'
        throw new Error(msg)
      }
      if (toast.isActive('loadingToast')) {
        toast.dismiss('loadingToast')
      }
      toast.success('created Succesfully', {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      await router.push('/app/wallet')
    } catch (error) {
      const { message } = error
      setloading(false)
      if (toast.isActive('loadingToast')) {
        toast.dismiss('loadingToast')
      }
      toast.error(message, {
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

  function validateUploadFunction() {
    if (fileList.length) {
      return true
    } else {
      toast.error('Please Upload a File. ', {
        toastId: 'uplaod Error',
      })
      return false
    }
  }
  function validateStep3() {
    if (!isAlphaNumeric(enteredData?.symbol)) {
      toast.error('special characters are not allowed as a symbol', {
        toastId: 'symbol Error',
      })
      return false
    }
    return true
  }
  const tokenCreationData = [
    {
      icon: '/images/tokens/step1.svg',
      name: 'Token type',
      description: 'Step 1 of 4',
      component: (
        <TokenStep1
          setIndex1={setIndex1}
          tokensTypes={tokensTypes}
          setformData={setformData}
          formData={formData}
          setSplittable={(splitable) =>
            setenteredData({ ...enteredData, splitable })
          }
        />
      ),
      img: '/images/tokens/step1.webp',

      hideActionBottums: true,
    },
    {
      icon: '/images/tokens/step2.svg',
      name: 'Upload',
      description: 'Step 2 of 4',
      component: (
        <TokenStep2
          fileList={fileList}
          beforeUploaded={beforeUploaded}
          classes={classes}
        />
      ),
      validateFunction: validateUploadFunction,
      backFunction: deleteUploadedFiles,
      img: '/images/tokens/step2.webp',
    },
    {
      icon: '/images/tokens/step3.svg',
      name: 'Token Details',
      description: 'Step 3 of 4',
      component: (
        <TokenStep3 enteredData={enteredData} setenteredData={setenteredData} />
      ),
      validateFunction: validateStep3,
      img: '/images/tokens/step3.webp',
    },
    {
      icon: '/images/tokens/step4.svg',
      name: 'Token Supply',
      description: 'Step 4 of 4',
      component: (
        <TokenStep4
          enteredData={enteredData}
          setenteredData={setenteredData}
          splittable={formData.walletType !== 'NFT'}
        />
      ),
      img: '/images/tokens/step4.webp',
    },
  ]

  return (
    <div className="px-12 pt-8 fontSofiaPro">
      <div className="w-[100%] ">
        <StepsPagesComponent
          loading={loading}
          data={tokenCreationData}
          stepsWidth="70%"
          submitAction={onUpload}
        />
      </div>
    </div>
  )
}
