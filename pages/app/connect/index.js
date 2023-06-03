import ComingSoon from '../../../components/common/soon/soon'
import React from 'react'
import Head from 'next/head'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'
import NoSSR from '@/utils/noSSR'
import WithAuthProtection from '@/hooks/authProtection'

const Connect = () => {
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
        <title>Connect | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
    </>
  )
}

export default WithAuthProtection(Connect)
