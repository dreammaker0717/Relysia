import React, { useState, useEffect } from 'react'
import NoSSR from '@/utils/noSSR'
import Head from 'next/head'
import DashboardForm from '../../components/dashboard/dashboardForm'
import DashboardSidebar from '../../components/Layouts/DashboardSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getRegisteredAppList } from '@/redux/actions/registeredApp/action'
import { useRouter } from 'next/router'
import appsSelector from '@/redux/selectors/apps'
import WithAuthProtection from '@/hooks/authProtection'

function Dashboard() {
  const { data } = useSelector(appsSelector)
  const dispatch = useDispatch()
  const router = useRouter()
  const [appId, setAppId] = useState(null)
  const [selectedApp, setSelectedApp] = useState({})

  useEffect(() => {
    if (!data.length) getRegisteredAppList(dispatch)
  }, [])

  useEffect(() => {
    const id = router.query.id
    setAppId(id)
    if (id && data.length) getIndividualAppData(id)
  }, [router.query.id, data])

  const getIndividualAppData = () => {
    const id = router.query.id
    const filteredData = data.find((item) => item.id === id)
    setSelectedApp(filteredData)
  }
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <DashboardForm selectedApp={selectedApp} />
        </DashboardSidebar>
      </div>
      <Head>
        <title>Dashboard | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
    </NoSSR>
  )
}

export default WithAuthProtection(Dashboard)
