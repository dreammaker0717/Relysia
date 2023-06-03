import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import CustomInput from '../common/inputs/custom-input'
import LoginRegister from '../login-register'
import styles from './index.module.css'
import Title from '../common/title'
import Button from '../common/button'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import validationSchema from './validationScheme'
import Loader from '../loader'
import MaterialUiCustomButtom from '@/components/common/materialUi-button'
import { useDispatch, useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import { firebaseAuthFunc } from '@/config/init'
import {
  register,
  setAuthenticated,
  updateUserDataAction,
  login,
} from '@/redux/slices/auth'
const userIcon = '/assets/images/user-login.svg'
const keyIcon = '/assets/images/key-login.svg'
const mailIcon = '/assets/images/mail-icon.svg'
const GoogleIcon = '/assets/images/google-icon.svg'
const GithubIcon = '/assets/images/github-icon.svg'
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseLoginWithGoogle } from '@/firebase/auth'
import { errorMessage } from '@/utils/error-message'

let githubProvider = new GithubAuthProvider()

const inputAttributes = [
  {
    type: 'text',
    placeholder: 'Display Name',
    name: 'name',
    title: 'Name',
    icon: userIcon,
    required: true,
  },
  {
    type: 'email',
    placeholder: 'E-mail',
    name: 'email',
    title: 'Email',
    icon: mailIcon,
    required: true,
  },
  {
    type: 'password',
    placeholder: 'Choose a password',
    name: 'password',
    title: 'Password',
    icon: keyIcon,
    required: true,
  },
  {
    type: 'password',
    placeholder: 'Confirm your password',
    name: 'confirmPassword',
    title: 'Confirm Password',
    icon: keyIcon,
    required: true,
  },
]

const RegisterContent = () => {
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })
  const { errors } = formState
  const { userData } = useSelector(authSelector)
  const [verifyID, setVerifyID] = useState(null)
  const [verifyVal, setVerifyVal] = useState('')
  const router = useRouter()
  const { stage } = router.query
  const [mfa, setMfa] = useState(false)
  const [error, setError] = useState(false)
  const [Loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [remainingTime, setRemainingTime] = useState(30)

  useEffect(() => {
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
  }, [])

  const onUserLogin = async (e) => {
    e.preventDefault()
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
      console.log('error', e)
    }
  }

  const onFormSubmit = async (data) => {
    const { email, name, password } = data
    setLoading(true)
    try {
      setMfa(true)
      const user = await dispatch(
        register({
          username: name,
          email: email,
          password: password,
        }),
      ).unwrap()
      if (user && !user?.error) {
        dispatch(setAuthenticated(true))
        toast.success('User Registered Successfully', {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (e) {
      setMfa(false)
      toast.error(e, {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setLoading(false)
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
        toast.success('User Logged in Successfully', {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        router.push('/')
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
    const { user, error } = await firebaseLoginWithGoogle({ setVerifyID })
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
      toast.error(error, {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  useEffect(() => {
    if (!mfa && userData) {
      router.push('/')
    } else if (mfa && userData) {
      router.replace('/auth/register?stage=mfa')
    }
  }, [userData, mfa])

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

  return (
    <LoginRegister>
      {!Loading ? (
        <div className={styles.wrapper}>
          {stage ? (
            <div className="flex flex-col space-y-2">
              <MaterialUiCustomButtom
                label="Enable 2-Factor Authentication"
                onClick={() => router.push('/app/settings?current=4')}
                type="button"
              />
              <MaterialUiCustomButtom
                label="Not yet"
                onClick={() => router.push('/')}
                type="button"
              />
            </div>
          ) : !verifyID ? (
            <>
              <div className={styles.texts}>
                <Title heading="h3">Sign Up</Title>
                <p className={styles.p}>
                  Relysia helps businesses to process payments easily with
                  BitcoinSV Wallet. Explore complete our products and guides to
                  use Relysia.
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

                <div className={styles.actions}>
                  <div className={styles.actionWith}>
                    <Button
                      className="text-sm"
                      icon={GoogleIcon}
                      appearance="outlined"
                      flat
                      onClick={signInWithGoogle}
                    >
                      Sign Up with Google
                    </Button>
                    <Button
                      className="text-sm"
                      icon={GithubIcon}
                      appearance="outlined"
                      flat
                      onClick={signInWithGithub}
                    >
                      Sign Up with Github
                    </Button>
                  </div>
                  <Button className="py-4" appearance="primary" flat>
                    Sign Up
                  </Button>
                </div>
              </form>
              <div className="flex justify-evenly mt-2 text-center w-full">
                Already have an account?
                <Link href="/auth/login">
                  <a className="font-bold">Login here</a>
                </Link>
              </div>
            </>
          ) : (
            <form onSubmit={onUserLogin}>
              <h1 heading="h3" className="mb-1 text-xl">
                Check Your Phone
              </h1>
              <p className="mb-5 text-gray-500">
                {' '}
                We just sent you an SMS code{' '}
              </p>
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
        </div>
      ) : (
        <Loader />
      )}
    </LoginRegister>
  )
}

export default RegisterContent
