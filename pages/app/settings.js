import React from 'react'
import NoSSR from '@/utils/noSSR'
import SettingsPage from '../../components/settings/SettingsPage'
import DashboardSidebar from '../../components/Layouts/DashboardSidebar'
import Head from 'next/head'
import WithAuthProtection from '@/hooks/authProtection'

const Settings = () => {
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <SettingsPage />
        </DashboardSidebar>
      </div>
      <Head>
        <title>Settings | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
  user-scalable=0"
        />
      </Head>
    </NoSSR>
  )
}

export default WithAuthProtection(Settings)
