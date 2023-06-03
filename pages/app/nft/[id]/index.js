import React from 'react'
import NoSSR from '@/utils/noSSR'
import NFTPage from '../../../../components/app/nft/details'
import DashboardSidebar from '../../../../components/Layouts/DashboardSidebar'
import WithAuthProtection from '@/hooks/authProtection'

import Head from 'next/head'

const CustomWalletPage = () => {
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <NFTPage />
        </DashboardSidebar>
      </div>
      <Head>
        <title>NFT | Relysia</title>
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
