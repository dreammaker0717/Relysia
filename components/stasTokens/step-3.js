import React, { useState, useRef } from 'react'
import InputwithIcon from '../common/inputs/InputwithIcon'

export default function TokenStep3(props) {
  let { enteredData, setenteredData, walletID, setwalletID } = props
  function TokenChange(e) {
    var modifiedObj = { ...enteredData }
    modifiedObj.name = e.target.value
    setenteredData(modifiedObj)
  }
  function discripchange(e) {
    var modifiedObj = { ...enteredData }
    modifiedObj.description = e.target.value
    setenteredData(modifiedObj)
  }
  function symbolChange(e) {
    var modifiedObj = { ...enteredData }
    modifiedObj.symbol = e.target.value.replaceAll(' ', '')
    setenteredData(modifiedObj)
  }
  return (
    <>
      <div className="w-full mt-6">
        {' '}
        <InputwithIcon
          onChange={TokenChange}
          name="Token Name*"
          // iconState="wallet"
          //  helperText="Please Enter Email"
          value={enteredData.name}
          required
        />
      </div>
      <div className="w-full mt-6">
        {' '}
        <InputwithIcon
          onChange={discripchange}
          name="Description*"
          // iconState="wallet"
          //  helperText="Please Enter Email"
          value={enteredData.description}
          required
        />
      </div>
      <div className="w-full mt-6">
        {' '}
        <InputwithIcon
          onChange={symbolChange}
          name="Symbol*"
          // iconState="wallet"
          //  helperText="Please Enter Email"
          value={enteredData.symbol}
          required
        />
      </div>
    </>
  )
}
