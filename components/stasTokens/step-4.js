import React, { useState, useRef } from 'react'
import InputwithIcon from '../common/inputs/InputwithIcon'
export default function TokenStep4(props) {
  const [supplyError, setSupplyError] = useState(null)
  const [decimalError, setDecimalError] = useState(null)
  function tokenSupply(e) {
    if (Number(e.target.value) > 999) {
      setSupplyError('It can be no more than 999')
    } else {
      setSupplyError(null)
      var modifiedObj = { ...enteredData }
      modifiedObj.tokenSupply = Number(e.target.value)

      setenteredData(modifiedObj)
    }
  }
  function decimals(e) {
    if (Number(e.target.value) > 9999) {
      setDecimalError('It can be no more than 9999')
    } else {
      setDecimalError(null)
      var modifiedObj = { ...enteredData }
      modifiedObj.decimals = Number(e.target.value)
      setenteredData(modifiedObj)
    }
  }
  let { enteredData, setenteredData } = props

  return (
    <>
      <div className="w-full mt-6">
        <InputwithIcon
          onChange={tokenSupply}
          name="Token Supply*"
          type="number"
          // iconState="wallet"
          //  helperText="Please Enter Email"
          inputProps={{ min: 0, step: 1 }}
          value={enteredData.tokenSupply || ''}
          required
        />
        {supplyError && <div className="text-red-500">{supplyError}</div>}
      </div>
      {props.splittable && (
        <div className="w-full mt-6">
          <InputwithIcon
            onChange={decimals}
            name="Decimals*"
            type="number"
            inputProps={{ min: 0, step: 1 }}
            // iconState="wallet"
            //  helperText="Please Enter Email"
            value={enteredData.decimals}
            required
          />
          {decimalError && <div className="text-red-500">{decimalError}</div>}
        </div>
      )}
    </>
  )
}
