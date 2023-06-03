import React from 'react'
import GoTop from '../components/Layouts/GoTop'
import ContactBody from '../components/contact/ContactBody'
import Head from 'next/head'

const Contact = () => (
  <div>
    <ContactBody />
    <GoTop scrollStepInPx="50" delayInMs="16.66" />
    <Head>
      <title>Contact | Relysia</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
      />
    </Head>
  </div>
)

export default Contact
