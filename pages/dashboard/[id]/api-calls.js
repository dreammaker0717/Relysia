

import DashboardLayout from './DashboadLayout'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'


export default function (){
  const router = useRouter()
  const [id, setId] = useState('')

  useEffect(() => {
    if(!router) return
    const { id } = router.query
    setId(id)
  }, [router])

  return <DashboardLayout className="mx-auto text-center">
  <div className='mb-8'>
    <h3 className='text-black text-lg font-light'>Your Project credentials in one view.</h3>
  </div>
  <div>
    <h2 className='text-black text-2xl'>Service ID: {id}</h2>
  </div>
  <div style={{height:'600px'}} className="my-5"> 
  <iframe height = '600'  width = '100%' src="https://player.vimeo.com/video/718846535?h=99a96e8184&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Relysia Service ID.mp4"></iframe>
  </div>
  
</DashboardLayout>
}