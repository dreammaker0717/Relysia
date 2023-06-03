import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Image from 'next/image'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import apiConfig from '@/config/relysiaApi'

const currencies = [
  {
    value: 'USD',
    label: '$',
    img: '/assets/images/btcsv-logo.png',
  },
  {
    value: 'EUR',
    label: '€',
    img: '/assets/images/btcsv-logo.png',
  },
]

export default function MultilineTextFields() {
  const [sendCurrency, setSendCurrency] = useState('EUR')
  const [getCurrency, setGetCurrency] = useState('USD')
  const [buttonEffect, setButtonEffect] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(0)

  const handleSendChange = (event) => {
    setSendCurrency(event.target.value)
  }

  const handleGetChange = (event) => {
    setGetCurrency(event.target.value)
  }

  useEffect(() => {
    const checkCurrencyfromAPI = () => {
      apiConfig
        .get('/v1/currencyConversion', {
          headers: {
            satoshis: `1`,
            currency: sendCurrency,
          },
        })
        .then((balanceData) => {
          if (
            balanceData &&
            balanceData.data &&
            balanceData.data.data &&
            balanceData.data.data.status === 'success'
          ) {
            const balance = balanceData.data.data.balance
            setCurrentBalance(balance)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    checkCurrencyfromAPI()
  }, [sendCurrency])

  return (
    <div className="px-4 max-w-6xl mx-auto flex-1 my-auto">
      <form
        className="min-h-[200px] flex flex-col sm:flex-row sm:space-x-5 items-center justify-between py-20 sm:py-0"
        noValidate
        autoComplete="off"
      >
        <div id="send" className="flex">
          <TextField
            id="standard-select-currency"
            select
            value={sendCurrency}
            onChange={handleSendChange}
            label="Send"
            InputProps={{ disableUnderline: true }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <div className="flex justify-between w-10">
                  <div>
                    <Image src={option.img} width={20} height={20} />
                  </div>
                  <div>{option.label}</div>
                </div>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-basic"
            label=""
            placeholder="0.00"
            InputProps={{ disableUnderline: true }}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => setButtonEffect((state) => !state)}
            className={`relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden  font-medium text-gray-200 rounded-lg mt-6`}
            style={{
              background:
                'linear-gradient(111.07deg, #E70060 10.57%, #FC8F0C 105.27%)',
            }}
          >
            <ArrowPathIcon
              className={`${buttonEffect ? 'animate-spin' : ''} h-7 w-7`}
            />
          </button>
        </div>
        <div id="get" className="flex">
          <TextField
            id="standard-select-currency"
            select
            label="Get"
            value={getCurrency}
            onChange={handleGetChange}
            InputProps={{ disableUnderline: true }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <div className="flex justify-between w-10">
                  <div>
                    <Image src={option.img} width={20} height={20} />
                  </div>
                  <div>{option.label}</div>
                </div>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-basic"
            label=""
            placeholder="0.00"
            InputProps={{ disableUnderline: true }}
          />
        </div>
      </form>
    </div>
  )
}
