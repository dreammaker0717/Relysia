import React from 'react'
import Head from 'next/head'
import ForgetContent from '../../../components/forgotPassword'
import NoSSR from '@/utils/noSSR'

function Login() {
  return (
    <NoSSR>
      <div>
        <Head>
          <title>Login | Relysia</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
          />
        </Head>
        <ForgetContent />
      </div>
    </NoSSR>
  )
}

export default Login
