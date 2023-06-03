import ComingSoon from '../../../components/common/soon/soon'
import React from 'react'
import Head from 'next/head'
import NoSSR from '@/utils/noSSR'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'
import WithAuthProtection from '@/hooks/authProtection'

const Friends = () => {
  return (
    <>
      <div>
        <NoSSR>
          <DashboardSidebar>
            <ComingSoon />
          </DashboardSidebar>
        </NoSSR>
      </div>
      <Head>
        <title>Friends | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
    </>
  )
}

export default WithAuthProtection(Friends)
