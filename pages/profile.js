import React, { useEffect } from 'react'
import GoTop from '../components/Layouts/GoTop'
import PageTitle from '../components/profile/PageTitle'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'

function Features() {
  const router = useRouter()
  const { userData } = useSelector(authSelector)
  useEffect(() => {
    if (!userData) {
      router.push('/auth/login')
    }
  }, [])

  return (
    <div>
      <PageTitle />

      <GoTop scrollStepInPx="50" delayInMs="16.66" />
      <Head>
        <title>Profile | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
    </div>
  )
}

export default Features
