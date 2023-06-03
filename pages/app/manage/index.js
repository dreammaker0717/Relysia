import React from 'react'
import NoSSR from '@/utils/noSSR'
import StasTokenComponent from '../../../components/stasTokens/index'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'
import Head from 'next/head'
import WithAuthProtection from '@/hooks/authProtection'

const StasTokenPage = () => {
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <StasTokenComponent />
        </DashboardSidebar>
      </div>
      <Head>
        <title>Manage | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
  user-scalable=0"
        />
      </Head>
    </NoSSR>
  )
}

export default WithAuthProtection(StasTokenPage)
