import React, { useEffect } from 'react'
import Head from 'next/head'
import RegisterContent from '../../components/register'

function Login() {
  return (
    <>
      <RegisterContent />
      <Head>
        <title>Register | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
    </>
  )
}

export default Login
