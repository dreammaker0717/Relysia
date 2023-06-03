import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { updateUserDataAction } from '@/redux/slices/auth'
import { toast } from 'react-toastify'
import { firebaseAuthFunc } from '@/config/init'
import CustomInput from '../common/inputs/custom-input'
import LoginRegister from '../login-register'
import authSelector from '@/redux/selectors/auth'
import { setAuthenticated, login } from '@/redux/slices/auth'
import { Controller, useForm } from 'react-hook-form'

import styles from './index.module.css'
import Title from '../common/title'
import Button from '../common/button'

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import {
  firebaseLogin,
  firebaseLoginWithGoogle,
  firebaseResendAuthCode,
} from '@/firebase/auth'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import validationSchema from './validationSchema'
import { errorMessage } from '@/utils/error-message'
const keyIcon = '/assets/images/key-login.svg'
const mailIcon = '/assets/images/mail-icon.svg'
const GoogleIcon = '/assets/images/google-icon.svg'
const GithubIcon = '/assets/images/github-icon.svg'
let googleProvider = new GoogleAuthProvider()
let githubProvider = new GithubAuthProvider()

const inputAttributes = [
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
    title: 'Email',
    icon: mailIcon,
    required: true,
  },
  {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    title: 'Password',
    icon: keyIcon,
    required: true,
  },
]

const LoginContent = () => {
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })
  const { errors } = formState

  const [verifyID, setVerifyID] = useState(null)
  const [verifyVal, setVerifyVal] = useState('')
  const [authError, setAuthError] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const { userData } = useSelector(authSelector)
  const [remainingTime, setRemainingTime] = useState(30)

  useEffect(() => {
    if (userData) {
      router.replace('/')
    }
  }, [userData])

  useEffect(() => {
    if(verifyID) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1
          } else {
            clearInterval(interval)
            return 0
          }
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [verifyID])

  const intervalSetter = () => {
    let count = 30
    const intervalId = setInterval(() => {
      count--
      setRemainingTime(count)
      if (count === 0) {
        clearInterval(intervalId)
        console.log('Countdown complete!')
      }
    }, 1000)
  }

  const onUserLogin = async (e) => {
    e.preventDefault()
    if (remainingTime === 0) {
      firebaseResendAuthCode(authError, setVerifyID)
      intervalSetter()
    } else {
      try {
        const user = await dispatch(
          login({
            verificationId: verifyID,
            verificationCode: verifyVal,
          }),
        ).unwrap()
        if (user && !user?.error) {
          dispatch(setAuthenticated(true))
          toast.success('User Logged in Successfully', {
            position: 'bottom-left',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          router.replace('/')
        }
      } catch (e) {
        let msg = errorMessage[e.code] || e?.message

        toast.error(msg, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        console.log('error', e.code)
      }
    }
  }

  const onFormSubmit = async (data) => {
    const { email, password } = data
    try {
      firebaseLogin({ email, password, setVerifyID })
    } catch (e) {
      console.log('login error', e)
    }
  }

  const updateButtonText = () => {
    if (remainingTime === 0) {
      return 'Resend Code'
    } else {
      if (verifyVal.length === 0) {
        return 'Enter Code'
      } else if (verifyVal.length < 6) {
        return `${6 - verifyVal.length} numbers left`
      } else {
        return 'Login'
      }
    }
  }

  const signInWithGithub = (e) => {
    if (e) {
      e.preventDefault()
    }
    signInWithPopup(firebaseAuthFunc, githubProvider)
      .then(function (result) {
        if (result.user) {
          dispatch(updateUserDataAction(result.user))
        }
        toast.success('Logged in Successfully', {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        // router.push('/')
      })
      .catch(function (error) {
        let msg = errorMessage[error.code] || error.message

        toast.error(msg, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
  }

  const signInWithGoogle = async (e) => {
    if (e) {
      e.preventDefault()
    }
    const { user, errorMessage } = await firebaseLoginWithGoogle({
      setVerifyID,
      setAuthError,
    })
    if (!user) return
    if (user) {
      toast.success('User Logged in Successfully', {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      setTimeout(() => {
        router.push('/')
      }, 300)
    } else {
      toast.error(errorMessage, {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  return (
    <LoginRegister>
      {!verifyID ? (
        <div className={styles.wrapper}>
          <div id="recaptcha-container"></div>
          <div className={styles.texts}>
            <Title heading="h3">Login to your account</Title>
            <p className={styles.p}>
              Relysia helps businesses to process payments easily with our
              Bitcoin SV Wallet.
            </p>
          </div>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {inputAttributes.map((inputAttribute) => (
              <div
                className="flex flex-col input-field"
                key={inputAttribute.name}
              >
                <Controller
                  name={inputAttribute.name}
                  control={control}
                  render={({ field }) => {
                    return (
                      <CustomInput
                        icon={inputAttribute.icon}
                        forId={inputAttribute.name}
                        customStyle="mb-6"
                        placeholder={inputAttribute.placeholder}
                        inputType={inputAttribute.type}
                        required
                        {...field}
                      />
                    )
                  }}
                />
                <span className=" text-red-600 my-1">
                  {errors[inputAttribute.name]?.message}
                </span>
              </div>
            ))}
            <div className={styles.remember}>
              <CustomInput
                inputType="checkbox"
                forId="remember"
                label="Remember me"
              />
              <Link href="/auth/forget">
                <a className="font-bold">Forgot password?</a>
              </Link>
            </div>
            <div className={styles.actions}>
              <div className={styles.actionWith}>
                <Button
                  className="text-sm"
                  type="button"
                  icon={GoogleIcon}
                  appearance="outlined"
                  flat
                  onClick={signInWithGoogle}
                >
                  Login with Google
                </Button>
                <Button
                  className="text-sm"
                  type="button"
                  icon={GithubIcon}
                  appearance="outlined"
                  flat
                  onClick={signInWithGithub}
                >
                  Login with Github
                </Button>
              </div>
              <Button type="submit" className="py-4" appearance="primary" flat>
                Login
              </Button>
            </div>
          </form>

          <div className="flex justify-evenly mt-4">
            Don’t have an account?
            <Link href="/auth/register">
              <a className="font-bold">Sign Up</a>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={onUserLogin}>
          <h1 heading="h3" className="mb-1 text-xl">
            Check Your Phone
          </h1>
          <p className="mb-5 text-gray-500"> We just sent you an SMS code </p>
          <CustomInput
            icon={keyIcon}
            placeholder="Auth Code"
            onChange={(e) => {
              setVerifyVal(e.target.value)
            }}
            inputType="number"
            minLength={6}
            maxLength={6}
          />
          <div className="w-full mt-1">
            <div className="relative rounded-md shadow-sm inset-y-0 left-0 pl-14 text-sm text-gray-600 pointer-events-none">
              {remainingTime} seconds remaining
            </div>
          </div>
          <Button type="submit" className="py-4" appearance="primary" flat>
            {updateButtonText()}
          </Button>
        </form>
      )}
    </LoginRegister>
  )
}

export default LoginContent
