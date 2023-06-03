import React from 'react'
import CreateToken from '../../../components/stasTokens/CreateToken'
import Head from 'next/head'
import NoSSR from '@/utils/noSSR'
import DashboardSidebar from '../../../components/Layouts/DashboardSidebar'
import WithAuthProtection from '@/hooks/authProtection'
import dynamic from 'next/dynamic'
// const CreateToken = dynamic(() => import('../../../components/stasTokens/CreateToken'))

const Mint = () => {
  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <CreateToken />
        </DashboardSidebar>
      </div>
      <Head>
        <title>Create New Token | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=5.0, 
    "
        />
      </Head>
    </NoSSR>
  )
}

export default WithAuthProtection(Mint)
