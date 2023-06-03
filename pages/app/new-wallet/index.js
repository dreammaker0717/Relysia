import React from 'react'
import NoSSR from '@/utils/noSSR'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'
import NewWalletDialog from '../../../components/Layouts/newWalletDialog'
import WithAuthProtection from '@/hooks/authProtection'

import Head from 'next/head'

const CustomWalletPage = () => {
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <NewWalletDialog />
        </DashboardSidebar>
      </div>
      <Head>
        <title>Create New Wallet | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
  user-scalable=0"
        />
      </Head>
    </NoSSR>
  )
}

export default WithAuthProtection(CustomWalletPage)
