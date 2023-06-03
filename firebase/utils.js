import { nftStorageBucket } from '@/config/init'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import apiConfig from '@/config/relysiaApi'
import { errorMessage } from '@/utils/error-message'

const axiosRetry = require('axios-retry')

const firebaseUploadNftImage = async ({ file, userId }) => {
  try {
    const imagePath = `nftTemp/${userId}/${uuidv4()}`
    const fileRef = ref(nftStorageBucket, imagePath)
    const metadata = {
      contentType: file.type,
    }
    const snapshot = await uploadBytes(fileRef, file, metadata)
    const fileUrl = await getDownloadURL(snapshot.ref)
    console.log(fileUrl)
    return { fileUrl }
  } catch (error) {
    let msg = errorMessage[error.code] || 'Error occured while uploading file'
    return { error: msg }
  }
}

const uploadNFTFile = async (formData) => {
  try {
    let retryApiConfig = apiConfig
    await axiosRetry(apiConfig, {
      retries: 10, // number of retries
      retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`)
        return 3000 // time interval between retries
      },
      retryCondition: (error) => {
        console.log('retry error call', error.message, error.response.data)
        // if retry condition is not specified, by default idempotent requests are retried
        return true
      },
    })

    const res = await retryApiConfig.post('/v1/upload', formData)
    console.log('file uploaded')
    return res.data
  } catch (err) {
    console.log('upload error', err, err?.response?.data)
    return false
  }
}

const mintNFT = async (nftDetails) => {
  const {
    url,
    description,
    name,
    supply,
    decimals,
    txId,
    symbol,
    type,
    currentWalletId,
    splitable,
  } = nftDetails

  const parameters = {
    name,
    protocolId: 'STAS',
    symbol,
    description,
    image: url,
    tokenSupply: supply,
    decimals: decimals,
    satsPerToken: 1,
    properties: {
      legal: {
        terms: 'Your token terms and description.',
        licenceId: 'T3ST-2',
      },
      issuer: {
        organisation: 'Vaionex Corp.',
        legalForm: 'Limited',
        governingLaw: 'US',
        issuerCountry: 'US',
        jurisdiction: 'US',
        email: 'info@vaionex.com',
      },
      meta: {
        schemaId: 'NFT1.0/MA',
        website: 'vaionex.com',
        legal: {
          terms:
            '© 2020 TAAL TECHNOLOGIES SEZC\nALL RIGHTS RESERVED. ANY USE OF THIS SOFTWARE IS SUBJECT TO TERMS AND CONDITIONS OF LICENSE. USE OF THIS SOFTWARE WITHOUT LICENSE CONSTITUTES INFRINGEMENT OF INTELLECTUAL PROPERTY. FOR LICENSE DETAILS OF THE SOFTWARE, PLEASE REFER TO: www.taal.com/stas-token-license-agreement',
        },
        media: [
          {
            URI: `{[B://${txId}]}`,
            type,
            altURI: url,
          },
        ],
      },
    },
    splitable: splitable, // nft-> false // token-> true
  }

  const response = await apiConfig.post('/v1/issue', parameters, {
    headers: {
      'Content-Type': 'application/json',
      walletID: currentWalletId,
      reminting: splitable,
    },
  })
  if (response?.data?.data?.status === 'success') {
    let d = { ...response.data, isMinted: true }
    return d
  } else {
    let msg = response?.response?.data?.data?.msg
      ? response?.response?.data?.data?.msg
      : response?.response?.data?.message
    return { isMinted: false, msg: msg }
  }
}

export { firebaseUploadNftImage, uploadNFTFile, mintNFT }
