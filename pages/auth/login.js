import React, { useEffect } from 'react'
import Head from 'next/head'
import LoginContent from '../../components/login'

function Login() {
  return (
    <div>
      <Head>
        <title>Login | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
      <LoginContent />
    </div>
  )
}

export default Login
