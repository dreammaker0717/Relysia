import DashboardLayout from 'pages/dashboard/[id]/DashboadLayout'
import Setting from 'pages/dashboard/[id]/Setting'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
//import axios
import axios from 'axios'

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
]

export default function () {
  const [settings, setSettings] = useState([
    {
      title: 'Classical',
      subtext: 'Let users pay for transaction fees with BSV',
      img: '/assets/images/money-send.svg',
      enabled: true,
    },
    {
      title: 'Miner',
      subtext: 'User a miner api to cover your costs (e.g TAAL)',
      img: '/assets/images/bitcoin-card.svg',
      enabled: true,
    },
    {
      title: 'Dynamic',
      subtext: 'Cover the costs of your users to a certain limit (Fee Manager)',
      img: '/assets/images/setting-3.svg',
      enabled: true,
    },
  ])
  const [plan, setPlan] = useState('Classical')

  const router = useRouter()

  const [id, setId] = useState(null)

  useEffect(() => {
    if (!router) return
    const { id } = router.query
    console.log('router id')
    console.log(id)
    setId(id)
  }, [router])

  const [authToken, setAuthToken] = useState(null)
  const [allUtxos, setallUtxos] = useState([])
  const [feeBalance, setFeeBalance] = useState([])
  const [feeAddress, setFeeAddress] = useState([])

  const getUxto = () => {
    setallUtxos([])
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        serviceID: id,
      },
    }

    var postData = {
      email: 'service@vaionex.com',
      password: '`saQY[F9=c7m/z5$J@[4_*HgWmS!^+!~',
    }

    axios
      .post('https://api.relysia.com/v1/auth', postData, axiosConfig)
      .then((response) => {
        setAuthToken(response.data)
        console.log('authToken')
        console.log(response.data.data.token)
        axios
          .get('https://api.relysia.com/v1/feeUtxoState', {
            headers: {
              serviceID: id,
              authToken: response.data.data.token,
            },
          })
          .then((response) => {
            let allUtxosVar = [].concat.apply(
              [],
              [
                response.data?.data?.allUtxos?.availableUtxos,
                response.data?.data?.allUtxos?.dustUtxos,
                response.data?.data?.failedUtxos?.availableUtxos,
              ],
            )
            setallUtxos(allUtxosVar)
            setFeeBalance(response.data.data.totalBalance)
          })
      })
      .then((response) => {
        console.log('this is the authToken')
        console.log(authToken)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    //axios get request with header
    if (id) {
      getUxto()
    }
  }, [id])

  useEffect(() => {
    if (authToken) {
      axios
        .get('https://api.relysia.com/v1/feeAddressBeta', {
          headers: {
            serviceID: id,
            authToken: authToken.data.token,
          },
        })
        .then((response) => {
          console.log(response?.data)
          console.log('this is the address')
          setFeeAddress(response?.data?.data)
        })

        .catch((error) => {
          console.log(error)
        })
    }
  }, [authToken])

  //axios get endpoint function to feeMetricsBeta to get fee metrics
  const getFeeMetrics = () => {
    axios
      .get('https://api.relysia.com/v1/feeMetricsBeta', {
        headers: {
          serviceID: id,
          authToken: authToken.data.token,
        },
      })
      .then((response) => {
        console.log(response?.data)
        getUxto()
      })
  }

  //convert timestamp into short 24h time format
  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    //add date
    const day = date.getDate()
    const month = date.getMonth() + 1

    const hours = date.getHours()
    const minutes = '0' + date.getMinutes()
    const seconds = '0' + date.getSeconds()
    return (
      day +
      '/' +
      month +
      ' ' +
      hours +
      ':' +
      minutes.substr(-2) +
      ':' +
      seconds.substr(-2)
    )
  }

  function handleSettingsToggle(title) {
    const index = settings.findIndex((setting) => setting.title === title)
    if (index < 0) return

    const temp = [...settings]
    temp[index].enabled = !temp[index].enabled
    setSettings(temp)
  }

  return (
    <DashboardLayout>
      <div className="mb-8 px-4">
        <h1 className="text-black text-4xl">Fee Manager</h1>
        <h2 className="text-black text-lg font-light">
          The feeManager makes token transactions and data uploads a seamless
          experience. See your feeManager status below.
        </h2>
      </div>

      <div>
        <div className="mt-8 flex flex-col px-4 pb-10">
          <div className="sm:flex sm:items-center pb-4">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Address</h1>
              <p className="mt-2 text-sm text-gray-700">
                Your recharge address. Ensure to refresh the UTXOs after sending
                your transaction to the address.
              </p>
            </div>
          </div>
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        BSV Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr key={'balances'}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                        {feeAddress?.addresses?.[0]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col px-4 pb-10">
          <div className="sm:flex sm:items-center pb-4">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Balance</h1>
              <p className="mt-2 text-sm text-gray-700">
                The feeManager pays for your users transactions and gets
                automatically refilled each month. For high usage, you can
                manually refill the feeManager.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={() => {
                  getFeeMetrics()
                }}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Refresh UTXOs
              </button>
            </div>
          </div>
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Available Balance (in Sats)
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Dust Balance
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Failed Balance
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr key={'balances'}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                        {feeBalance?.availableBalance?.toString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                        {feeBalance?.dustBalance?.toString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                        {feeBalance?.failedBalance?.toString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col px-4 pb-10">
          <div className="sm:flex sm:items-center pb-4">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">UTXOs</h1>
              <p className="mt-2 text-sm text-gray-700">
                Unspent Transaction Outputs (UTXOs) are the atomic unit of
                bitcoin transactions that drive your users transactions.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Value
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Txid
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Vout
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          TimeStamp
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          State
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {allUtxos.map((index) => (
                        <tr key={index?.txHash}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {index?.value}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {index?.tx_hash}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {index?.tx_pos}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {convertTime(index?.createdAt)}
                          </td>
                          <td
                            className={
                              index?.state == 'available'
                                ? 'inline-flex rounded-full bg-green-100 px-3 my-4 text-xs font-semibold leading-5 text-green-800'
                                : 'inline-flex rounded-full bg-green-100 px-3 my-4 text-xs font-semibold leading-5 text-orange-800'
                            }
                          >
                            {index?.state}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href={
                                'https://whatsonchain.com/tx/' + index?.tx_hash
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                              <span className="sr-only">, {index?.state}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
