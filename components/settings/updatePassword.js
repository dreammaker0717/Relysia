import React, { useState } from 'react'
import { useRouter } from 'next/router'
import MaterialUiCustomButtom from '../common/materialUi-button'
import InputwithPassword from '../common/inputs/InputwithPassword'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import { firebaseAuthFunc } from '@/config/init'
import { toast } from 'react-toastify'

import {
  getAuth,
  updatePassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

function UpdatePassword(props) {
  const { userData } = useSelector(authSelector)
  const [show, setShow] = React.useState('opacity-0')
  React.useEffect(() => {
    setShow('opacity-1')
  }, [])
  const [password, setPassword] = React.useState('')
  const [newPassword, setnewPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  //
  var actionCodeSettings = {
    url: `${window.location.origin}/auth/login`,
  }
  function handleError(error) {
    setLoading(false)
    switch (error.code) {
      case 'auth/invalid-email':
        toast.error('Please Enter Valid Email')
        break
      case 'auth/user-not-found':
        toast.error(error.message)
        break
      case 'auth/wrong-password':
        toast.error('Invalid Password')
        break
      default:
        toast.error(error.message)
        break
    }
  }
  const onPasswordReset = async (e) => {
    if (success) {
      return toast.info('Check your Email !', {
        toastId: 'successAlready',
      })
    }

    // e.preventDefault()
    setLoading(true)
    var user = firebaseAuthFunc.currentUser
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, user.email, password)
      .then(() => {
        updatePassword(auth.currentUser, newPassword).then(() => {
          toast.success('Password updated successfully')
          setLoading(false)
        })
      })
      .catch((error) => {
        setLoading(false)
        handleError(error)
      })
    // await firebase
    //   .auth()
    //   .sendPasswordResetEmail(userData.email, actionCodeSettings)
    //   .then(() => {
    //     toast.success('Check your Email !')
    //     setSuccess(true)
    //     setLoading(false)
    //   })
    //   .catch(handleError)
  }
  function onPassChange(e) {
    setPassword(e.target.value)
  }
  function onNewPassChange(e) {
    setnewPassword(e.target.value)
  }
  return (
    <form
      className={`animate__animated ${show}	transition-all duration-300 ease-in-out	 fontSofiaPro w-full flex flex-col pr-2 pl-2  md:pr-10 md:pl-6`}
    >
      <h1>UPDATE YOUR PASSWORD</h1>
      <>
        <span className="text-sm">
          Click to send password reset instructions to your email{' '}
          {userData.email}
        </span>
        <div className="w-full mt-6">
          {' '}
          <InputwithPassword
            onChange={onPassChange}
            name="current password"
            value={password}
          />
        </div>
        <div className="w-full mt-6 mb-12">
          {' '}
          <InputwithPassword
            onChange={onNewPassChange}
            name="new password"
            value={newPassword}
          />
        </div>
        <div className="w-full mt-6">
          <MaterialUiCustomButtom
            label={'Change Password'}
            onClick={onPasswordReset}
            loading={loading}
          />
        </div>{' '}
      </>

      {/* <div className="w-full mt-6">
        <MaterialUiCustomButtom
          label={success ? 'Check your Email Inbox' : 'Send Instructions'}
          onClick={onPasswordReset}
          loading={loading}
        />
      </div> */}
    </form>
  )
}

export default UpdatePassword
