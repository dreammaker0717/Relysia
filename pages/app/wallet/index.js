import React from 'react'
import NoSSR from '@/utils/noSSR'
import WalletPage from '../../../components/wallet/index'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'

import Head from 'next/head'
import WithAuthProtection from '@/hooks/authProtection'

const CustomWalletPage = () => {
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <WalletPage />
        </DashboardSidebar>
      </div>
      <Head>
        <title>Wallet | Relysia</title>
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
