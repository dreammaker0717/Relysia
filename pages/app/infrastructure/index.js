import React from 'react'
import Head from 'next/head'
import NoSSR from '@/utils/noSSR'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'
import InfrastructurePage from 'components/app/infrastructure'
import WithAuthProtection from '@/hooks/authProtection'

const Infrastructure = () => {
  return (
    <>
      <div>
        <NoSSR>
          <DashboardSidebar>
            <InfrastructurePage />
          </DashboardSidebar>
        </NoSSR>
      </div>
      <Head>
        <title>Infrastructure | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0,
    user-scalable=0"
        />
      </Head>
    </>
  )
}

export default WithAuthProtection(Infrastructure)
