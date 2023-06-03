import React from 'react'
import NoSSR from '@/utils/noSSR'
import GoTop from '../../components/Layouts/GoTop'
import ZapsPage from '../../components/zaps/index'
import DashboardSidebar from '../../components/Layouts/DashboardSidebar'
import Head from 'next/head'
import WithAuthProtection from '@/hooks/authProtection'

const Zaps = () => {
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          {/* <ComingSoon /> */}
          <ZapsPage />
        </DashboardSidebar>

        <GoTop scrollStepInPx="50" delayInMs="16.66" />
      </div>
      <Head>
        <title>Connect with Zapier | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
  user-scalable=0"
        />
      </Head>
    </NoSSR>
  )
}

export default WithAuthProtection(Zaps)
