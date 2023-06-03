import { firebaseAuthFunc } from '@/config/init'
import {
  reauthenticateWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
let googleProvider = new GoogleAuthProvider()
let githubProvider = new GithubAuthProvider()
/**
 *
 * @param {number} value
 * @returns {string}
 */
export function tokenConverter(value) {
  return value >= 1.0e6 || value < -1.0e6
    ? value / 100000000 + ' BSV'
    : formatter(value) + ' SATS'
}

export const getTokenAmount = (amount) =>
  amount == 1 ? '1 Token' : `${amount} Tokens`

export function convertToBSV(value) {
  return value * 1000000
}

export function stepSize(value) {
  const pstValue = Math.abs(value)
  const up = 0
  const newSize = pstValue
    .toFixed(11)
    .toString()
    .split('')
    .map((step, idx) => {
      if (step > 0 && up == 0 && idx > 4) {
        up += 1
        return step
      } else {
        if (up > 0) {
          return null
        } else {
          return step
        }
      }
    })
  return newSize.join('').replaceAll(null, '')
}

function formatter(value) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export const isAlphaNumeric = (inputtxt) => {
  var letters = /^[0-9a-zA-Z]+$/
  if (inputtxt.match(letters)) {
    return true
  } else {
    return false
  }
}

export const refreshSignIn = async (userData, password) => {
  const user = firebaseAuthFunc.currentUser

  if (!userData.providerUserInfo.find((a) => a.providerId === 'password')) {
    if (
      userData.providerUserInfo.find((a) => a.providerId.includes('google'))
    ) {
      await reauthenticateWithPopup(user, googleProvider)
      return
    }
    if (
      userData.providerUserInfo.find((a) => a.providerId.includes('github'))
    ) {
      await reauthenticateWithPopup(user, githubProvider)
      return
    }
  } else {
    var oldCredential = EmailAuthProvider.credential(user.email, password)
    console.log("oldCredential: ", oldCredential);
    await reauthenticateWithCredential(user, oldCredential)
    return
  }
}
