import React from 'react'
import GoTop from '../../components/Layouts/GoTop'
import ServicesContent from '../../components/services/ServicesContent'
import Head from 'next/head'

class Features extends React.Component {
  render() {
    return (
      <div>
        <ServicesContent />
        <GoTop scrollStepInPx="50" delayInMs="16.66" />
        <Head>
          <title>Services | Relysia</title>
          <meta name="viewport" content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0" />
        </Head>
      </div>
    )
  }
}

export default Features
