import DashboardLayout from './DashboadLayout'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'

export default function () {
  const router = useRouter()
  const [id, setId] = useState('')

  useEffect(() => {
    if (!router) return
    const { id } = router.query
    setId(id)
  }, [router])

  const MyPureIframe = React.memo(({ src, width, height }) => (
    <iframe src={src} width={width} height={height} />
  ))

  const bgGradient = styles['bg-gradient']
  const columns = [
    'Project',
    'API calls over time',
    'Wallet Created',
    'Token Created',
    'Apps Connected',
    'Fee Manager',
  ]
  return (
    <DashboardLayout className="mb-2">
      <div
        className="pb-4 p-2"
        style={{ backgroundColor: '#F8FAFD!important' }}
      >
        <h1 className="text-black text-4xl">Service Health</h1>
        <h2 className="text-black text-lg font-light">
          Accumulated data of all API services your project interacts with.
        </h2>
      </div>
      <div style={{ height: '1020px' }} className="pb-5">
        <MyPureIframe
          src={
            'https://vaionex-backend-log-management.kb.eu-west-2.aws.cloud.es.io:9243/app/dashboards?auth_provider_hint=anonymous1#/view/8fcc6f70-10dd-11ed-bed0-f79cb2968c10?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A30000)%2Ctime%3A(from%3Anow-24h%2Cto%3Anow))&hide-filter-bar=true'
          }
          width={'100%'}
          height={'1020px'}
        />
      </div>
    </DashboardLayout>
  )
}
