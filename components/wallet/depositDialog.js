import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { toast } from 'react-toastify'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid'

var QRCode = require('qrcode.react')

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
  clipCon: {
    cursor: 'pointer',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}))

export default function DepositDialog({
  walletData,
  setDepositDialogState,
  depositDialogState,
}) {
  const classes = useStyles()

  const handleClose = () => {
    setDepositDialogState(false)
  }

  let toastId = 'customId'
  return (
    <Dialog
      open={depositDialogState}
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
      <h5 className="text-black	">Add Funds</h5>
      <p className="text-black	">Scan the QR code to add money.</p>

      <div>
        <QRCode value={'bitcoin:' + walletData.address} renderAs="svg" />
      </div>
      <CopyToClipboard
        text={walletData.paymail}
        onCopy={() => {
          if (toast.isActive(toastId)) {
            toast.dismiss(toastId)
            toastId = toastId + '2'
          }
          toast.success('Wallet Paymail Copied.', {
            position: 'bottom-left',
            toastId: toastId,
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }}
      >
        <div className={classes.clipCon} style={{ marginTop: 20 }}>
          <div className="flex justify-between items-center">
            <h3
              variant="subtitle1"
              style={{ color: 'black', display: 'flex', alignItems: 'center' }}
            >
              <span style={{ marginRight: '5px' }}>PAYMAIL</span>{' '}
              <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                Recommended!
              </span>
            </h3>
            <ClipboardDocumentIcon className="h-5 w-5 text-[#3f51b5]" />
          </div>

          <p
            style={{
              color: 'black',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            variant="body1"
          >
            {walletData.paymail}
          </p>
        </div>
      </CopyToClipboard>
      <CopyToClipboard
        text={walletData.address}
        onCopy={() => {
          if (toast.isActive(toastId)) {
            toast.dismiss(toastId)
            toastId = toastId + '2'
          }
          toast.success('Wallet Address Copied.', {
            position: 'bottom-left',
            toastId: toastId,
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }}
      >
        <div className={classes.clipCon}>
          <div className="flex justify-between items-center">
            <h3 variant="subtitle1" style={{ color: 'black' }}>
              LEGACY ADDRESS
            </h3>
            <ClipboardDocumentIcon className="h-5 w-5 text-[#3f51b5]" />
          </div>

          <p
            style={{
              color: 'black',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
            variant="body1"
          >
            {walletData.address}
          </p>
        </div>
      </CopyToClipboard>

      <div className="w-[50%] mb-3">
        <MaterialUiCustomButtom
          label="Close"
          onClick={handleClose}
          // loading={loading}
        />
      </div>
    </Dialog>
  )
}
