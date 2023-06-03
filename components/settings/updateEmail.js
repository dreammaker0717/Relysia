import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { firebaseAuthFunc } from '@/config/init'
import InputwithIcon from '../common/inputs/InputwithIcon'
import MaterialUiCustomButtom from '../common/materialUi-button'
import 'animate.css'
import InputwithPassword from '../common/inputs/InputwithPassword'
import { toast } from 'react-toastify'
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth'

import { getAuth, updateEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { updateUserDataAction } from '@/redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import { errorMessage } from '@/utils/error-message'

function UpdateEmail(props) {
  const user = firebaseAuthFunc.currentUser
  const { userData } = useSelector(authSelector)

  const [show, setShow] = React.useState('opacity-0')
  React.useEffect(() => {
    setShow('opacity-1')
  }, [])

  useEffect(() => {
    setEmail(userData?.email)
  }, [userData])

  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  function onEmailChange(e) {
    setEmail(e.target.value)
  }
  function onPassChange(e) {
    setPassword(e.target.value)
  }
  function handleError(e) {
    let msg = errorMessage[e.code] || e?.message || 'Can not update email'
    setLoading(false)
    toast.error(msg)
  }
  function linknewAccount(user, credential, oldAcc, oldCredential) {
    linkWithCredential(user, credential)
      .then((usercred) => {
        if (!oldAcc) {
          // console.log('Account linking success')
          toast.success('Account linking success')
        }

        setLoading(false)
      })
      .catch((err) => {
        handleError(err)
        if (oldCredential) {
          linknewAccount(user, oldCredential, true)
        }
      })
  }

  async function handeFunction(e) {
    try {
      e.preventDefault()
      if (email === '' || password === '') return
      setLoading(true)
      var credential = EmailAuthProvider.credential(email, password)
      if (!user.providerData.find((a) => a.providerId === 'password')) {
        linknewAccount(user, credential)
      } else {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, user.email, password)
        await updateEmail(auth.currentUser, email)
        let storedUser = { ...userData }
        storedUser.email = email
        dispatch(updateUserDataAction(storedUser))
        toast.success('Email updated successfully')
      }
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  // const canChange =
  //   user?.providerData
  //     .map((data) => data.providerId)
  //     .some((id) => id === 'password') || false

  // if (!canChange) {
  //   return <h1>You can change email only if you signed up using email</h1>
  // }

  return (
    <form
      className={`animate__animated ${show}	transition-all duration-300 ease-in-out	 fontSofiaPro w-full flex flex-col pr-2 pl-2  md:pr-10 md:pl-6`}
      onSubmit={handeFunction}
    >
      <h1>UPDATE YOUR EMAIL</h1>
      <span className="text-sm">
        Enter a new email address and password to change your email address.
      </span>
      <div className="w-full mt-6">
        {' '}
        <InputwithIcon
          onChange={onEmailChange}
          name="New Email"
          type="email"
          iconState="email"
          //  helperText="Please Enter Email"
          value={email}
          required
        />
      </div>
      <div className="w-full mt-6 mb-6">
        {' '}
        <InputwithPassword
          onChange={onPassChange}
          name="Current Password"
          //  helperText="Please Enter Email"
          value={password}
          required={true}
        />{' '}
      </div>
      <MaterialUiCustomButtom
        label="Save Settings"
        loading={loading}
        type="submit"
      />
    </form>
  )
}

export default UpdateEmail
