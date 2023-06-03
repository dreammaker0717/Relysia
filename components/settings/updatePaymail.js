import React, { useState, useEffect } from 'react'
import InputwithIcon from '../common/inputs/InputwithIcon'
import MaterialUiCustomButtom from '../common/materialUi-button'
import 'animate.css'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import { updatePaymail, checkAdressfromApi } from '../../axios-connect/wallet'
import { updateWalletPaymailRedux } from '@/redux/slices/wallet'

function UpdatePaymail(props) {
  const dispatch = useDispatch()

  const [show, setShow] = React.useState('opacity-0')
  React.useEffect(() => {
    setShow('opacity-1')
  }, [])

  const [loading, setLoading] = React.useState(false)
  const [Username, setUsername] = React.useState('')

  const { currentWalletId, walletData, walletAddress } =
    useSelector(walletSelector)

  useEffect(() => {
    setUsername(walletAddress?.paymail)
  }, [walletData, currentWalletId, walletAddress])

  function onPaymailChange(e) {
    setUsername(e.target.value)
  }

  const isValidUsername = (username) => /^[a-zA-Z]+$/.test(username)

  const handleResponse = async (status, data) => {
    switch (status) {
      case 200:
        toast.success('Paymail Updated!')
        dispatch(
          updateWalletPaymailRedux({
            paymail: `${Username}@relysia.com`,
            id: currentWalletId,
          }),
        )
        await checkAdressfromApi(currentWalletId)
        break
      case 409:
        toast.error('Paymail is already in use, please select another one!')
        break
      default:
      // Handle other status codes
    }
  }

  const handlerFunction = async (e) => {
    e.preventDefault()
    if (!isValidUsername(Username)) {
      toast.error('No special signs or numbers are allowed.')
      return
    }

    try {
      setLoading(true)
      const { data, status } = await updatePaymail(
        {
          newPaymailId: `${Username}@relysia.com`,
        },
        currentWalletId,
      )
      handleResponse(status, data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <form
      className={`animate__animated ${show}	transition-all duration-300 ease-in-out	 fontSofiaPro w-full flex flex-col pr-2 pl-2  md:pr-10 md:pl-6`}
      onSubmit={handlerFunction}
    >
      <h1>UPDATE YOUR PAYMAIL</h1>
      <span className="text-sm">
        Enter a new paymail address to change your paymail.
      </span>
      <div className="w-full mt-6 mb-6">
        {' '}
        <InputwithIcon
          onChange={onPaymailChange}
          name="Paymail Username"
          type="text"
          iconState="profile"
          value={Username}
          required
        />
      </div>

      <MaterialUiCustomButtom
        label="Save Settings"
        loading={loading}
        type="submit"
      />
    </form>
  )
}

export default UpdatePaymail
