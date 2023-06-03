import React, { useState, useEffect } from 'react'
import { Dialog, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OtpInput from 'react-otp-input'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { PhoneMultiFactorGenerator, multiFactor } from 'firebase/auth'
import {
  RecaptchaVerifier,
  PhoneAuthProvider,
  updatePhoneNumber,
} from 'firebase/auth'
import { firebaseAuthFunc } from '@/config/init'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserDataAction } from '@/redux/slices/auth'
import authSelector from '@/redux/selectors/auth'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const useStyles = makeStyles((theme) => ({
  clipCon: {
    // cursor: 'pointer',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}))

// let applicationVer
const VerifyPhoneDialog = ({
  isOpen,
  phoneNumber,
  handleError,
  verificationId,
  setVerifyLoading,
  verifyLoading,
  updateType,
  handleClose,
}) => {
  const dispatch = useDispatch()
  const { userData } = useSelector(authSelector)

  const [otp, setOtp] = useState(null)

  const handleChange = (otp) => setOtp(otp)

  const enableMfa = () => {
    try {
      console.log('handle verify called')
      setVerifyLoading(true)

      const user = firebaseAuthFunc.currentUser

      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp)
      const multiFactorAssertion =
        PhoneMultiFactorGenerator.assertion(phoneCredential)
      multiFactor(user).enroll(multiFactorAssertion, 'personel number')
      toast.success('2-Factor Authentication is enabled.')
      setVerifyLoading(false)
      handleClose()
    } catch (error) {
      console.log(
        '🚀 ~ file: verifyPhoneDialog.js ~ line 77 ~ handleVerify ~ error',
        error,
      )
    }
  }

  const updatePhone = () => {
    try {
      console.log('handle verify called')
      setVerifyLoading(true)

      const user = firebaseAuthFunc.currentUser

      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp)

      updatePhoneNumber(user, phoneCredential)
        .then(() => {
          let newData = { ...userData }
          newData.phoneNumber = user.phoneNumber
          toast.success('Phone Updated')
          dispatch(updateUserDataAction(newData))
          setVerifyLoading(false)
          handleClose()
        })
        .catch((err) => {
          handleError(err)
          console.log('error generated ')
        })
    } catch (error) {
      console.log(
        '🚀 ~ file: verifyPhoneDialog.js ~ line 77 ~ handleVerify ~ error',
        error,
      )
    }
  }

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      style={{ zIndex: 1000 }}
      classes={{
        paper: `relative mb-[100px] md:mb-0 mt-[64px] md:mt-0 rounded-[26px] pt-10 px-8 md:px-18 lg:px-32 flex flex-col justify-between items-center h-[78%] max-h-[600px] md:h-[90%] md:max-h-[500px]  `,
      }}
      fullWidth
      maxWidth="sm"
    >
      <div>
        <h5 className="text-black">Verify Your Mobile Number</h5>
        <p className="text-black text-center">{phoneNumber}</p>
      </div>

      <div className="c-otp-box">
        <p className="text-black text-center py-3">Enter your OTP here</p>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          // separator={<span>-</span>}
          isInputNum={true}
          inputStyle={'c-otp-input'}
        />
      </div>
      <div className="w-full mb-8">
        <MaterialUiCustomButtom
          label="Verify"
          onClick={updateType === 'phone' ? updatePhone : enableMfa}
          loading={verifyLoading}
          disabled={otp && otp.length == 6 ? false : true}
        />
      </div>
    </Dialog>
  )
}

export default VerifyPhoneDialog
