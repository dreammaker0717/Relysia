import Project from '../../components/dashboard/Project'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { firebaseAuthFunc } from '@/config/init'
import { getServiceIDs, getService } from '../../axios-connect/api'

export default function () {
  const [user, setUser] = useState()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => firebaseAuthFunc.onAuthStateChanged(setUser), [])

  useEffect(() => {
    if (!user) return
    getServiceIDs(user)
      .then((response) =>
        Promise.all(
          response.data.data.serviceIds.map((id) => getService(user, id)),
        ),
      )
      .then((responses) => {
        setServices(responses.map((response) => response.data.data))
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }, [user])

  function handleDelete(id) {
    setServices(services.filter((service) => service.id !== id))
  }

  function Services() {
    if (services.length < 1)
      return (
        <div className="text-4xl text-white">
          You don't have any projects. Start by{' '}
          <Link href="/onboarding">
            <a className="underline"> creating one.</a>
          </Link>
        </div>
      )
    return (
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Project
            key={'id:' + service.id}
            id={service.id}
            title={service.projectName}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    )
  }

  return (
    <div role="list" className="container mx-auto py-10">
      {loading ? 'Loading...' : <Services />}
    </div>
  )
}
