import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'
import { firebaseConfigure } from './firebase'

let firebaseApp

if (!getApps().length) {
  firebaseApp = initializeApp({ ...firebaseConfigure })
}
const firebaseFunctions = getFunctions(firebaseApp)
const firebaseDB = getFirestore(firebaseApp)
const firebaseAuthFunc = getAuth(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)
const nftStorageBucket = getStorage(
  firebaseApp,
  `gs://${firebaseConfigure['storageBucket']}`,
)

export {
  firebaseApp,
  firebaseFunctions,
  firebaseAuthFunc,
  firebaseDB,
  firebaseStorage,
  nftStorageBucket,
}
