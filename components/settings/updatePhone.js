import React, { useEffect, useState, useRef } from 'react'
import InputwithIcon from '../common/inputs/InputwithIcon'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { multiFactor } from 'firebase/auth'
import { firebaseAuthFunc } from '@/config/init'
import { toast } from 'react-toastify'
import { RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth'
import { Dialog, Slide } from '@material-ui/core'
import VerifyPhoneDialog from './verifyPhoneDialog'
import EmailVerifyPopup from './emailVerifyPopup'
import { errorMessage } from '@/utils/error-message'
import InputwithPassword from '../common/inputs/InputwithPassword'
import { refreshSignIn } from '@/utils/helper'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

let applicationVer
function UpdatePhone({ userData }) {
  const [show, setShow] = useState('opacity-0')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [mfaLoading, setMfaLoading] = useState(false)
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [updateType, setUpdateType] = useState(null)
  const [verificationId, setVerificationId] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [mfaPopup, setMfaPopup] = useState(false)
  const [password, setPassword] = useState('')
  const [emailVerify, setEmailVerify] = useState(false)
  const captchaContainer = useRef()

  useEffect(() => {
    if (userData) {
      setValue(userData.phoneNumber)
    }
  }, [userData])

  const disableMfa = async () => {
    if (
      userData &&
      userData.providerUserInfo.find((a) => a.providerId === 'password') &&
      !password
    ) {
      toast.error('Please Enter Password')
      setMfaPopup(false)
      setMfaLoading(false)
      return
    }
    setMfaPopup(false)
    setMfaLoading(true)
    try {
      const options = multiFactor(firebaseAuthFunc.currentUser).enrolledFactors
      const r = await multiFactor(firebaseAuthFunc.currentUser)
        .unenroll(options[0])
        .then((r) => r)
      console.log(r)
      toast.success('2-Factor Authentication successfully disabled.')
    } catch (error) {
      handleError(error)
    } finally {
      setMfaLoading(false)
    }
  }

  const enableMfa = async () => {
    setUpdateType('mfa')
    setMfaLoading(true)
    await refreshSignIn(userData, password)

    if (applicationVer && captchaContainer.current) {
      applicationVer.clear()
      applicationVer = null
      document.getElementById('recaptcha-container222').innerHTML =
        '<div id="recaptcha-container"></div>'
    }

    applicationVer = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      firebaseAuthFunc,
    )

    try {
      await multiFactor(firebaseAuthFunc.currentUser)
        .getSession()
        .then(function (multiFactorSession) {
          const phoneInfoOptions = {
            phoneNumber: value,
            session: multiFactorSession,
          }
          const phoneAuthProvider = new PhoneAuthProvider(firebaseAuthFunc)
          phoneAuthProvider
            .verifyPhoneNumber(phoneInfoOptions, applicationVer)
            .then((verificationId) => {
              setVerificationId(verificationId)
              setIsVerifyDialogOpen(true)
            })
            .catch((err) => {
              handleError(err)
            })
        })
        .catch((err) => {
          handleError(err)
        })
    } catch (err) {
      handleError(err)
    } finally {
      setMfaLoading(false)
    }
  }

  React.useEffect(() => {
    setShow('opacity-1')
  }, [])
  function handleError(error) {
    let msg = errorMessage[error.code] || error.message
    setLoading(false)
    setVerifyLoading(false)
    toast.error(msg)
  }

  function onChange(e) {
    setValue(e.target.value)
  }

  // console.log(captchaContainer.current.innerHtml)
  const updatePhone = async (e) => {
    e.preventDefault()
    setUpdateType('phone')
    // setVerifyLoading(true)
    await refreshSignIn(userData, password)

    if (applicationVer && captchaContainer.current) {
      applicationVer.clear()
      applicationVer = null
      document.getElementById('recaptcha-container222').innerHTML =
        '<div id="recaptcha-container"></div>'
    }
    applicationVer = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      firebaseAuthFunc,
    )

    const provider = new PhoneAuthProvider(firebaseAuthFunc)
    provider
      .verifyPhoneNumber(value, applicationVer)
      .then((verificationId) => {
        setVerificationId(verificationId)
        setIsVerifyDialogOpen(true)
        console.log('works')
      })
      .catch(handleError)
  }

  const handleVerifyDialogClose = () => {
    setIsVerifyDialogOpen(false)
    setVerifyLoading(false)
    setLoading(false)
  }

  return (
    <div className="flex flex-col">
      <form
        className={`animate__animated ${show}	transition-all duration-300 ease-in-out	 fontSofiaPro w-full flex flex-col pr-2 pl-2  md:pr-10 md:pl-6`}
        onSubmit={updatePhone}
      >
        <h1>UPDATE YOUR NUMBER</h1>
        <span className="text-sm">
          We will send a code to your mobile number to verify your account.
        </span>

        {userData &&
          userData.providerUserInfo.find(
            (a) => a.providerId === 'password',
          ) && (
            <>
              <div className="w-full mt-6">
                <InputwithPassword
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  value={password}
                  required
                />
              </div>
            </>
          )}

        <div className="w-full my-6">
          {' '}
          <InputwithIcon
            onChange={onChange}
            name={
              userData?.phoneNumber
                ? 'current phone number'
                : 'mobile number (+123456789)'
            }
            type="tel"
            iconState="phone"
            //  helperText="Please Enter Email"
            value={value}
            pattern="[+]{1}[0-9]{11,14}"
            required
          />
        </div>

        <div id="recaptcha-container222" ref={captchaContainer}>
          <div id="recaptcha-container"></div>
        </div>

        <MaterialUiCustomButtom
          label="Update Phone"
          loading={loading}
          type="submit"
        />
      </form>
      {!userData?.emailVerified && (
        <>
          <div className="px-2 md:pr-10 md:pl-6 mt-2">
            <MaterialUiCustomButtom
              label="Verify Mail"
              onClick={() => setEmailVerify(true)}
              type="button"
            />
          </div>

          <div
            className="flex px-2 md:pr-10 md:pl-6 mt-2 text-sm text-blue-700 rounded-lg "
            role="alert"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">
                Verify your email address to use the multi factor feature.
              </span>
            </div>
          </div>
        </>
      )}
      {userData &&
        userData.emailVerified &&
        multiFactor(firebaseAuthFunc?.currentUser).enrolledFactors.length ===
          0 && (
          <div className="px-2 md:pr-10 md:pl-6 mt-2">
            <MaterialUiCustomButtom
              label="Enable 2-Factor"
              loading={mfaLoading}
              onClick={enableMfa}
              background="linear-gradient(134.44deg, #3DB8F5 3.12%, #1F42EF 100%)"
              type="button"
            />
          </div>
        )}
      {userData &&
        userData.emailVerified &&
        multiFactor(firebaseAuthFunc?.currentUser).enrolledFactors.length >
          0 && (
          <div className="px-2 md:pr-10 md:pl-6 mt-2">
            <MaterialUiCustomButtom
              label="Disable 2-Factor"
              loading={mfaLoading}
              onClick={() => setMfaPopup(true)}
              type="button"
            />
          </div>
        )}
      {isVerifyDialogOpen && (
        <VerifyPhoneDialog
          isOpen={isVerifyDialogOpen}
          phoneNumber={value}
          handleError={(err) => handleError(err)}
          verificationId={verificationId}
          verifyLoading={verifyLoading}
          updateType={updateType}
          setVerifyLoading={setVerifyLoading}
          handleClose={handleVerifyDialogClose}
        />
      )}
      <Dialog
        open={mfaPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setMfaPopup(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{ zIndex: 1000 }}
        classes={{
          paper: `relative mb-[100px] md:mb-0 mt-[64px] md:mt-0 rounded-[26px] pt-10 px-8 md:px-18 flex flex-col items-center bg-yellow-100`,
        }}
        fullWidth
        maxWidth="sm"
      >
        <div
          className="flex w-full px-4 text-sm text-yellow-800 rounded-lg"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            Closing the 2 Factor Authentication may lead to a security
            vulnerability. Are you sure you want to close ?
          </div>
        </div>
        <div className="w-full mt-2 flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0 pb-2">
          <div className="max-w-xs">
            <MaterialUiCustomButtom
              label="Not Yet"
              className
              loading={mfaLoading}
              onClick={() => setMfaPopup(false)}
              background="linear-gradient(134.44deg, #3DB8F5 3.12%, #1F42EF 100%)"
              type="button"
            />
          </div>
          <div className="max-w-xs">
            <MaterialUiCustomButtom
              label="Disable 2-Factor"
              loading={mfaLoading}
              onClick={disableMfa}
              type="button"
            />
          </div>
        </div>
      </Dialog>
      <EmailVerifyPopup open={emailVerify} setOpen={setEmailVerify} />
    </div>
  )
}
export default UpdatePhone
