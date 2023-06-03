import DashboardLayout from './DashboadLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import React from 'react'
import Settings from 'components/infrastructure/Settings/index'

export default function () {
  const router = useRouter()

  const [id, setId] = useState(null)

  useEffect(() => {
    if (!router) return
    const { id } = router.query
    setId(id)
  }, [router])

  return (
    <DashboardLayout className="mx-auto text-center">
      <Settings id={id} />
    </DashboardLayout>
  )
}
