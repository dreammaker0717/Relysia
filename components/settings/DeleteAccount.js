import React from 'react'
import InputwithIcon from '../common/inputs/InputwithIcon'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { useDispatch, useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import InputwithPassword from '../common/inputs/InputwithPassword'
import { toast } from 'react-toastify'
import { reauthenticateWithPopup } from 'firebase/auth'
import { firebaseAuthFunc } from '@/config/init'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth'
import { logout, updateUserDataAction } from '@/redux/slices/auth'
import {
  destroyWalletAction,
  updateWalletDataAction,
} from '@/redux/slices/wallet'
import { errorMessage } from '@/utils/error-message'
let googleProvider = new GoogleAuthProvider()
let githubProvider = new GithubAuthProvider()

function DeleteAccount(props) {
  const user = firebaseAuthFunc.currentUser

  const [show, setShow] = React.useState('opacity-0')
  React.useEffect(() => {
    setShow('opacity-1')
  }, [])
  const [password, setPassword] = React.useState('')
  const [deleteMessage, setDeleteMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const { userData } = useSelector(authSelector)
  const dispatch = useDispatch()

  const intervalRef = React.useRef(null)
  React.useEffect(() => {
    return () => stopCounter() // when App is unmounted we should stop counter
  }, [])
  function handleError(error) {
    let msg = errorMessage[error.code] || error.message
    setLoading(false)
    console.log(error)
    setCounter(0)
    toast.error(msg)
  }
  const signOutFunction = async () => {
    await dispatch(logout()).unwrap()
    dispatch(destroyWalletAction(null))
    dispatch(updateUserDataAction(null))
    localStorage.setItem('auth__token', '')
  }
  React.useEffect(() => {
    if (counter === 5) {
      if ('DELETE' !== deleteMessage) {
        toast.error('Please Enter DELETE')
        setCounter(0)
        return
      }

      if (!userData.providerUserInfo.find((a) => a.providerId === 'password')) {
        if (
          userData.providerUserInfo.find((a) => a.providerId.includes('google'))
        ) {
          // firebase.auth().signInWithPopup(googleProvider)
          return reauthenticateWithPopup(user, googleProvider)
            .then(function () {
              user
                .delete()
                .then(() => {
                  toast.success('Account Has been Deleted')
                  signOutFunction()
                  setCounter(0)
                })
                .catch(handleError)
            })
            .catch(handleError)
        }
        if (
          userData.providerUserInfo.find((a) => a.providerId.includes('github'))
        ) {
          reauthenticateWithPopup(user, githubProvider)
            .then(function () {
              user
                .delete()
                .then(() => {
                  toast.success('Account Has been Deleted')
                  signOutFunction()
                })
                .catch(handleError)
            })
            .catch(handleError)
        }
      } else {
        var oldCredential = EmailAuthProvider.credential(user.email, password)
        reauthenticateWithCredential(user, oldCredential)
          .then(function () {
            deleteUser(user)
              .then(() => {
                toast.success('Account Has been Deleted')
                signOutFunction()
              })
              .catch(handleError)
          })
          .catch(handleError)
      }
    }
  }, [counter])
  const startCounter = () => {
    if (counter < 5) {
      setCounter(1)
      if (intervalRef.current) return
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1)
      }, 1000)
    }
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      if (counter < 5) {
        clearInterval(intervalRef.current)
        setCounter(0)
        intervalRef.current = null
      } else {
        clearInterval(intervalRef.current)
      }
    }
  }
  // console.log(value)
  function onChange(e) {
    setPassword(e.target.value)
  }
  function onDeleteMessage(e) {
    setDeleteMessage(e.target.value)
  }

  function getSubmitValue() {
    if (counter > 4) {
      return 'Deleting Now'
    } else {
      switch (counter) {
        case 1:
          return '4 Seconds Left'
        case 2:
          return '3 Seconds Left'
        case 3:
          return '2 Seconds Left'
        case 4:
          return '1 Seconds Left'

        default:
          return 'Confirm Delete'
      }
    }
  }
  return (
    <div
      className={`animate__animated ${show}	transition-all duration-300 ease-in-out	 fontSofiaPro w-full flex flex-col pr-2 pl-2  md:pr-10 md:pl-6`}
    >
      <h1>DELETE YOUR ACCOUNT</h1>
      <span className="text-sm">
        This operation will remove all your wallet and their keys.
      </span>

      {userData &&
        userData.providerUserInfo.find((a) => a.providerId === 'password') && (
          <>
            {' '}
            <div className="w-full my-6">
              <InputwithPassword
                onChange={onChange}
                name="password"
                value={password}
              />
            </div>
          </>
        )}
      <div className="w-full mb-6">
        {' '}
        <InputwithIcon
          onChange={onDeleteMessage}
          name="Delete Confirmation"
          type="text"
          iconState="profile"
          helperText={`Please type DELETE to proceed`}
          value={deleteMessage}
        />
      </div>
      <div
        onMouseDown={startCounter}
        onMouseUp={stopCounter}
        onTouchStart={startCounter}
        onTouchEnd={stopCounter}
        onMouseLeave={stopCounter}
      >
        <MaterialUiCustomButtom
          label={getSubmitValue()} //onClick={handeFunction}
          loading={counter > 4}
        />
      </div>
    </div>
  )
}

export default DeleteAccount
