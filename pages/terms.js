import React from 'react'
import NoSSR from '@/utils/noSSR'
import GoTop from '../components/Layouts/GoTop'
import PageTitle from '../components/terms/PageTitle'
import AboutArea from '../components/terms/AboutArea'
import Head from 'next/head'

const Terms = () => {
  return (
    <NoSSR>
      <PageTitle />
      <AboutArea />
      <GoTop scrollStepInPx="50" delayInMs="16.66" />
      <Head>
        <title>Terms & Condition | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
  user-scalable=0"
        />
      </Head>
    </NoSSR>
  )
}

export default Terms
