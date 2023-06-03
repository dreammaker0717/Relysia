import React, { useState } from 'react'
import PayButton from 'vionex-pay-button'

function WithdrawComponent(props) {
  const [amountField, setamountField] = useState('')
  const [addressField, setaddressField] = useState('')

  const onSuccess = () => {
    setamountField('')
    setaddressField('')
    setTimeout(() => {
      props.handleClose()
    }, 1000)
  }

  return (
    <div>
      <div className="form-group">
        <label>Amount (US$)</label>
        <input
          onChange={(e) => setamountField(e.target.value)}
          type="number"
          className="form-control"
          defaultValue=""
          placeholder="Enter the Amount"
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          onChange={(e) => setaddressField(e.target.value)}
          type="text"
          className="form-control"
          defaultValue=""
          placeholder="Enter the Wallet Address"
        />
      </div>
      <div
        style={{
          float: 'right',
          marginRight: 30,
          marginBottom: 10,
          marginTop: 15,
        }}
      >
        <PayButton
          amount={[amountField]}
          to={[addressField]}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  )
}

export default WithdrawComponent
