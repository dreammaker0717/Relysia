import React, { useState, useEffect } from 'react'
import NoSSR from '@/utils/noSSR'
import Head from 'next/head'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getRegisteredAppList } from '@/redux/actions/registeredApp/action'
import { useRouter } from 'next/router'
import AppInfoTemplate from '../../../components/Layouts/appInfoTemplate'
import appsSelector from '@/redux/selectors/apps'

function ConnectedApp() {
  const { data } = useSelector(appsSelector)
  const dispatch = useDispatch()
  const router = useRouter()
  const [appId, setAppId] = useState(null)
  const [selectedApp, setSelectedApp] = useState({})

  useEffect(() => {
    if (!data.length) getRegisteredAppList(dispatch)
  }, [])

  useEffect(() => {
    const id = router.query.app_id
    setAppId(id)
    if (id && data.length) getIndividualAppData(id)
  }, [router.query.id, data])

  const getIndividualAppData = () => {
    const id = router.query.app_id
    const filteredData = data.find((item) => item.id === id)
    setSelectedApp(filteredData)
  }

  console.log(selectedApp, 'selectedAppselectedApp')
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <div className="container">
            <AppInfoTemplate selectedApp={selectedApp} />
          </div>
        </DashboardSidebar>
      </div>
      <Head>
        <title>app-info | Relysia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <style jsx>
        {`
          .addApplication {
            background: #0075ff;
            border-radius: 16px;
          }
          .applicationBtn {
            background: #ffffff;
            border-radius: 12px;
            cursor: pointer;
          }
          .plusSign {
            background: #0075ff;
            opacity: 0.4;
            padding: 0px 6px 6px;
            border-radius: 5px;
            color: white;
          }
          .addHeading {
            color: #0075ff;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: bold;
          }
          .container {
            margin: 20px 20px 20px 0;
          }
        `}
      </style>
    </NoSSR>
  )
}

export default ConnectedApp
