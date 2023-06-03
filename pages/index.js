import React from 'react'
import NoSSR from '@/utils/noSSR'

import Head from 'next/head'
import Home from './home'

function Index() {
  return (
    <NoSSR>
      <Head>
        <title>Relysia Bitcoin Wallet</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=2, user-scalable=yes"
        />
      </Head>
      <Home />
    </NoSSR>
  )
}

export default Index
