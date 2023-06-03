import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { IconButton } from '@material-ui/core'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { firebaseVerifyMail } from '@/firebase/auth'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const EmailVerifyPopup = ({ open, setOpen }) => {
  const [status, setStatus] = useState(false)
  const [msg, setMsg] = useState(null)
  const closeHandler = () => {
    setOpen(false)
  }

  const verifyMailHandler = async () => {
    await firebaseVerifyMail()
    setStatus(true)
    setMsg('A verification link has been sent to your email account.')
  }
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{
        paper: `relative flex flex-col px-8 pt-10 pb-2 justify-between items-center md:max-h-[200px] max-w-[550px] mt-[64px] md:mt-0 rounded-[26px]`,
      }}
      fullWidth
      maxWidth="md"
    >
      <div className="absolute right-2 top-1.5 flex items-center">
        <IconButton onClick={closeHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </IconButton>
      </div>
      <div className="text-center text-lg flex flex-col items-center">
        If you are adding your mobile number for the first time, you must first
        confirm your email address.
      </div>
      <div className="mt-2 w-full">
        <MaterialUiCustomButtom
          label="Verify Email Address"
          onClick={verifyMailHandler}
          loading={false}
          disabled={status}
          type="submit"
        />
      </div>
      {msg && <div className="text-green-500">{msg}</div>}
    </Dialog>
  )
}

export default EmailVerifyPopup
