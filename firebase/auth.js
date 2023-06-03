import { firebaseAuthFunc, firebaseFunctions } from '@/config/init'
import { httpsCallable } from 'firebase/functions'
import { toast } from 'react-toastify'
import { getWallets, checkCurrencyfromAPI } from 'axios-connect/init'
import apiConfig from '@/config/relysiaApi'
import { errorMessage as errorMessageCustom } from '../utils/error-message'

import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  getMultiFactorResolver,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth'
import { updateUserDataAction, setStateChecked } from '@/redux/slices/auth'
import store from '@/redux/store'
import { connectToRelysiaSocket } from '@/utils/relysia-socket'
import { checkAdressfromApi } from '@/axios-connect/wallet'

const firebaseGetUserInfoFromDb = async (id) => {
  try {
    const docRef = doc(firebaseDb, 'access_keys', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (error) {
    console.error(error)
  }
}

let rsl
const firebaseLoginMfa = async ({ verificationId, verificationCode }) => {
  const cred = PhoneAuthProvider.credential(verificationId, verificationCode)
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred)
  // Complete sign-in.
  const { user } = await rsl.resolveSignIn(multiFactorAssertion)
  if (user) {
    apiConfig.defaults.headers.common['authToken'] = user.accessToken
    return {
      accessToken: user.accessToken,
      uid: user.uid,
      ...user.reloadUserInfo,
    }
  }
}

const firebaseLogin = async ({ email, password, setVerifyID }) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    '2fa-captcha',
    {
      callback: (verificationId) => setVerifyID(verificationId),
      'expired-callback': () => setVerifyID(null),
      size: 'invisible',
    },
    firebaseAuthFunc,
  )
  const user = await setPersistence(
    firebaseAuthFunc,
    browserLocalPersistence,
  ).then(async () => {
    const usr = await signInWithEmailAndPassword(
      firebaseAuthFunc,
      email,
      password,
    )
      .then(async (userCredential) => {
        if (userCredential) {
          return {
            accessToken: userCredential.user.accessToken,
            uid: userCredential.user.uid,
            ...userCredential.user.reloadUserInfo,
          }
        }
      })
      // Signed in

      .catch(async (error) => {
        console.log(error)
        if (error.code == 'auth/multi-factor-auth-required') {
          const resolver = getMultiFactorResolver(firebaseAuthFunc, error)
          // Ask user which second factor to use.

          const phoneInfoOptions = {
            multiFactorHint: resolver.hints[0],
            session: resolver.session,
          }
          const phoneAuthProvider = new PhoneAuthProvider(firebaseAuthFunc)
          // Send SMS verification code
          phoneAuthProvider
            .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
            .then(function (verificationId) {
              setVerifyID(verificationId)
            })
          rsl = resolver
        } else {
          let msg = errorMessageCustom[error.code] || JSON.stringify(error)
          toast.error(msg, {
            position: 'bottom-left',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
      })
    return usr
  })

  return user64356799b6d0fbc8958c5a27
}

const firebaseGetAuthorizedUser = () => {
  if (firebaseAuthFunc) {
    const fn = firebaseAuthFunc.onAuthStateChanged(async (userResponse) => {
      //check user role
      if (userResponse) {
        apiConfig.defaults.headers.common['authToken'] =
          userResponse.accessToken
        localStorage.setItem('auth__token', userResponse.accessToken)
        store.dispatch(
          updateUserDataAction({
            ...userResponse.reloadUserInfo,
            uid: userResponse.uid,
            accessToken: userResponse.accessToken,
            displayName: userResponse.displayName,
          }),
        )
      }
    })

    return fn
  } else {
    console.log('not auth')
    store.dispatch(setAuthenticated(false))
    setTimeout(() => {
      store.dispatch(setUserPending(false))
    }, 1000)
  }
}

const firebaseOnIdTokenChange = async () => {
  const defaultWallet = '00000000-0000-0000-0000-000000000000'
  if (firebaseAuthFunc) {
    firebaseAuthFunc.onIdTokenChanged(async (user) => {
      if (user) {
        apiConfig.defaults.headers.common['authToken'] = user.accessToken
        localStorage.setItem('auth__token', user.accessToken)
        await connectToRelysiaSocket(user.accessToken)
        await checkCurrencyfromAPI()
        await getWallets(user.accessToken)
        await checkAdressfromApi(defaultWallet)
      } else {
        store.dispatch(setStateChecked(true))
      }
    })
  }
}

const firebaseRegister = async ({ username, email, password }) => {
  try {
    const userInfos = await createUserWithEmailAndPassword(
      firebaseAuthFunc,
      email,
      password,
    ).then(async (result) => {
      await updateProfile(result.user, {
        displayName: username,
      })

      return {
        accessToken: result.user.accessToken,
        uid: result.user.uid,
        displayName: username,
        ...result.user.reloadUserInfo,
      }
    })
    return { ...userInfos }
  } catch (error) {
    const errorCode = error?.code
    let errorMessage =
      errorMessageCustom[errorCode] || error?.message || 'Something went wrong'
    if (errorCode === 'auth/weak-password') {
      return { error: 'Password should be at least 6 characters' }
    } else {
      return { error: errorMessage }
    }
  }
}

const firebaseLogout = async () => {
  await firebaseAuthFunc.signOut()
}

const firebaseLoginWithGoogle = async ({ setVerifyID, setAuthError }) => {
  const firebaseGoogleProvider = new GoogleAuthProvider()
  firebaseGoogleProvider.addScope('email')
  const userInfo = await signInWithPopup(
    firebaseAuthFunc,
    firebaseGoogleProvider,
  )
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user
      store.dispatch(
        updateUserDataAction({
          accessToken: token,
          uid: user.uid,
          ...user.reloadUserInfo,
        }),
      )
      await connectToRelysiaSocket(token)
      return { credential, token, user }
    })
    .catch(async (error) => {
      if (error.code == 'auth/multi-factor-auth-required') {
        setAuthError(error)
        const resolver = getMultiFactorResolver(firebaseAuthFunc, error)
        // Ask user which second factor to use.

        const phoneInfoOptions = {
          multiFactorHint: resolver.hints[0],
          session: resolver.session,
        }
        const phoneAuthProvider = new PhoneAuthProvider(firebaseAuthFunc)
        // Send SMS verification code
        phoneAuthProvider
          .verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier)
          .then(function (verificationId) {
            setVerifyID(verificationId)
          })
        rsl = resolver
      } else if (error.code == 'auth/wrong-password') {
        const errorMessage = error.message
        toast.error(errorMessage, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
      const errorCode = error?.code
      let errorMessage =
        errorMessageCustom[errorCode] ||
        error?.message ||
        'Something went wrong'
      return { errorMessage }
    })
  return userInfo
}

const firebaseResendAuthCode = (error, setVerifyID) => {
  const resolver = getMultiFactorResolver(firebaseAuthFunc, error)
  // Ask user which second factor to use.

  const phoneInfoOptions = {
    multiFactorHint: resolver.hints[0],
    session: resolver.session,
  }
  const phoneAuthProvider = new PhoneAuthProvider(firebaseAuthFunc)
  // Send SMS verification code
  phoneAuthProvider
    .verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier)
    .then(function (verificationId) {
      setVerifyID(verificationId)
    })
  rsl = resolver
}

const firebaseVerifyMail = async () => {
  const actionCodeSettings = {
    url: 'https://www.relysia.com/app/settings',
  }
  await sendEmailVerification(
    firebaseAuthFunc.currentUser,
    actionCodeSettings,
  ).then(() => {
    // Email verification sent!
    console.log('Email Verification sent! Check your mail box')
    // ...
  })

  return true
}

export {
  firebaseLogin,
  firebaseRegister,
  firebaseGetAuthorizedUser,
  firebaseLogout,
  firebaseLoginWithGoogle,
  firebaseOnIdTokenChange,
  firebaseLoginMfa,
  firebaseVerifyMail,
  firebaseResendAuthCode,
}
